import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@/generated/prisma/client';
import { parse } from 'cookie';
import { checkAndAwardBadges } from '@/utils/badges';
import FISHING_CONFIG, { FishDefinition } from '@/config/fishingConfig';

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	const cookies = parse(req.headers.cookie || '');
	const userId = cookies.authToken;

	if (!userId) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	const { action, details } = req.body;

	try {
		const user = await prisma.user.findUnique({
			where: { id: userId },
		});

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		let currentInventory: any = user.gameInventory || {};

		// Setup default game state
		if (currentInventory.fish_caught === undefined)
			currentInventory.fish_caught = 0;
		if (currentInventory.minerals_mined === undefined)
			currentInventory.minerals_mined = 0;
		if (currentInventory.items_merged === undefined)
			currentInventory.items_merged = 0;
		if (!currentInventory.fishList) currentInventory.fishList = [];
		if (!currentInventory.gemList) currentInventory.gemList = [];
		if (!currentInventory.mergeGrid)
			currentInventory.mergeGrid = Array(16).fill(null);

		// Incremental custom stats
		if (currentInventory.gold === undefined) currentInventory.gold = 50;
		if (currentInventory.rodLevel === undefined)
			currentInventory.rodLevel = 1;
		if (currentInventory.boatLevel === undefined)
			currentInventory.boatLevel = 1;
		if (currentInventory.offlineLevel === undefined)
			currentInventory.offlineLevel = 0;
		if (currentInventory.boostActiveUntil === undefined)
			currentInventory.boostActiveUntil = null;

		// Config-driven additions
		if (currentInventory.fishBag === undefined)
			currentInventory.fishBag = {}; // waiting to be sold
		if (currentInventory.chestBag === undefined)
			currentInventory.chestBag = {}; // chests caught waiting to be sold
		if (currentInventory.baitsPurchased === undefined)
			currentInventory.baitsPurchased = {}; // bait inventory { worm: 12, etc }
		if (currentInventory.equippedBait === undefined)
			currentInventory.equippedBait = null;
		if (currentInventory.currentLocation === undefined)
			currentInventory.currentLocation = 'salt_water';

		let currentXP = user.experience || 0;
		let responseData: any = {};

		// Calculate offline earnings since last activity
		const now = new Date();
		let offlineGoldEarned = 0;
		if (user.lastActivityDate && currentInventory.offlineLevel > 0) {
			const lastAct = new Date(user.lastActivityDate);
			const diffSeconds = Math.floor(
				(now.getTime() - lastAct.getTime()) / 1000,
			);
			if (diffSeconds > 60) {
				const minutes = Math.floor(diffSeconds / 60);
				const cappedMinutes = Math.min(minutes, 720);
				offlineGoldEarned =
					cappedMinutes * currentInventory.offlineLevel * 2;
				currentInventory.gold += offlineGoldEarned;
			}
		}

		// Check if bait boost is active
		let boostMultiplier = 1;
		if (currentInventory.boostActiveUntil) {
			if (
				new Date(currentInventory.boostActiveUntil).getTime() >
				now.getTime()
			) {
				boostMultiplier = 2;
			}
		}

		if (action === 'sync_local_state') {
			const { clientInventory, clientXP } = details;
			
			await prisma.user.update({
				where: { id: userId },
				data: {
					experience: clientXP,
					gameInventory: clientInventory,
					lastActivityDate: now,
				},
			});

			responseData = {
				message: 'State synchronized successfully',
				inventory: clientInventory,
				xp: clientXP,
			};
		} else if (action === 'play_fishing') {
			const rodLevel = currentInventory.rodLevel || 1;
			const currentLocation =
				currentInventory.currentLocation || 'salt_water';

			// Resolve level based on total XP
			const userLevel = Math.floor(currentXP / 1000) + 1;

			// Resolve equipped bait attributes
			let fishCountMultiplier = 1;
			let rarityMultiplier = 1.0;
			const equipped = currentInventory.equippedBait;

			if (equipped && currentInventory.baitsPurchased[equipped] > 0) {
				const baitDef = FISHING_CONFIG.baits.find(
					(b) => b.id === equipped,
				);
				if (baitDef) {
					fishCountMultiplier = baitDef.fishMultiplier;
					rarityMultiplier = baitDef.rarityMultiplier;
				}
				// Deduct bait use
				currentInventory.baitsPurchased[equipped] -= 1;
				if (currentInventory.baitsPurchased[equipped] <= 0) {
					currentInventory.equippedBait = null;
				}
			}

			// Quantity of fish caught per cast
			const baseQty = Math.floor(Math.random() * rodLevel) + 1;
			const fishCount = baseQty * fishCountMultiplier;

			const caughtThisCast: Record<string, number> = {};
			const chestsThisCast: Record<string, number> = {};
			let totalXpGained = 0;

			// Gather all fish eligible for current location
			const locationFish = FISHING_CONFIG.fish.filter(
				(f) => f.location === currentLocation,
			);

			for (let i = 0; i < fishCount; i++) {
				// Roll index value biased by rarity multiplier
				const roll = Math.random() * rarityMultiplier;
				let selectedFish: FishDefinition | null = null;

				// Progressive Unlock: Check rarities user can target based on level
				// Common: Lvl 1+
				// Uncommon: Lvl 2+
				// Rare: Lvl 4+
				// Super Rare: Lvl 6+
				// Ultra Rare: Lvl 8+
				// Legendary: Lvl 10+
				// Godly: Lvl 13+
				// Impossible: Lvl 16+

				if (roll > 3.0 && userLevel >= 16) {
					const pool = locationFish.filter(
						(f) => f.rarity === 'Impossible',
					);
					if (pool.length)
						selectedFish =
							pool[Math.floor(Math.random() * pool.length)];
				}
				if (!selectedFish && roll > 1.8 && userLevel >= 13) {
					const pool = locationFish.filter(
						(f) => f.rarity === 'Godly',
					);
					if (pool.length)
						selectedFish =
							pool[Math.floor(Math.random() * pool.length)];
				}
				if (!selectedFish && roll > 1.2 && userLevel >= 10) {
					const pool = locationFish.filter(
						(f) => f.rarity === 'Legendary',
					);
					if (pool.length)
						selectedFish =
							pool[Math.floor(Math.random() * pool.length)];
				}
				if (!selectedFish && roll > 0.85 && userLevel >= 8) {
					const pool = locationFish.filter(
						(f) => f.rarity === 'Ultra Rare',
					);
					if (pool.length)
						selectedFish =
							pool[Math.floor(Math.random() * pool.length)];
				}
				if (!selectedFish && roll > 0.65 && userLevel >= 6) {
					const pool = locationFish.filter(
						(f) => f.rarity === 'Super Rare',
					);
					if (pool.length)
						selectedFish =
							pool[Math.floor(Math.random() * pool.length)];
				}
				if (!selectedFish && roll > 0.45 && userLevel >= 4) {
					const pool = locationFish.filter(
						(f) => f.rarity === 'Rare',
					);
					if (pool.length)
						selectedFish =
							pool[Math.floor(Math.random() * pool.length)];
				}
				if (!selectedFish && roll > 0.2 && userLevel >= 2) {
					const pool = locationFish.filter(
						(f) => f.rarity === 'Uncommon',
					);
					if (pool.length)
						selectedFish =
							pool[Math.floor(Math.random() * pool.length)];
				}
				if (!selectedFish) {
					const pool = locationFish.filter(
						(f) => f.rarity === 'Common',
					);
					if (pool.length)
						selectedFish =
							pool[Math.floor(Math.random() * pool.length)];
				}

				// Fallback to absolute starter
				if (!selectedFish) {
					selectedFish = locationFish[0];
				}

				caughtThisCast[selectedFish.name] =
					(caughtThisCast[selectedFish.name] || 0) + 1;
				totalXpGained += selectedFish.xp;
			}

			// Roll Chests
			for (const chest of FISHING_CONFIG.chests) {
				if (Math.random() < chest.chance) {
					chestsThisCast[chest.name] =
						(chestsThisCast[chest.name] || 0) + 1;

					// Grant instant chest rewards (Gold & XP)
					const goldReward =
						Math.floor(
							Math.random() * (chest.maxGold - chest.minGold),
						) + chest.minGold;
					currentInventory.gold += goldReward * boostMultiplier;
					totalXpGained += chest.xp;
				}
			}

			totalXpGained = totalXpGained * boostMultiplier;
			currentXP += totalXpGained;
			currentInventory.fish_caught += fishCount;

			// Add fish to bag
			for (const [fishName, count] of Object.entries(caughtThisCast)) {
				currentInventory.fishBag[fishName] =
					(currentInventory.fishBag[fishName] || 0) + count;
				currentInventory.fishList.push({
					name: fishName,
					count,
					caughtAt: now.toISOString(),
				});
			}

			// Add chests to bag
			for (const [chestName, count] of Object.entries(chestsThisCast)) {
				currentInventory.chestBag[chestName] =
					(currentInventory.chestBag[chestName] || 0) + count;
			}

			await prisma.user.update({
				where: { id: userId },
				data: {
					experience: currentXP,
					gameInventory: currentInventory,
					lastActivityDate: now,
				},
			});

			responseData = {
				caughtThisCast,
				chestsThisCast,
				xpGained: totalXpGained,
				xp: currentXP,
				inventory: currentInventory,
			};
		} else if (action === 'sell_fish') {
			let goldEarned = 0;
			const soldList: string[] = [];

			// Sell fish
			for (const [fishName, count] of Object.entries(
				currentInventory.fishBag,
			)) {
				const def = FISHING_CONFIG.fish.find(
					(f) => f.name === fishName,
				);
				const val = def ? def.value : 5;
				goldEarned += val * (count as number);
				soldList.push(`${count}x ${fishName}`);
			}

			// Sell chests
			for (const [chestName, count] of Object.entries(
				currentInventory.chestBag,
			)) {
				const def = FISHING_CONFIG.chests.find(
					(c) => c.name === chestName,
				);
				const val = def ? def.value : 30;
				goldEarned += val * (count as number);
				soldList.push(`${count}x ${chestName}`);
			}

			goldEarned = goldEarned * boostMultiplier;
			currentInventory.gold += goldEarned;
			currentInventory.fishBag = {};
			currentInventory.chestBag = {};

			await prisma.user.update({
				where: { id: userId },
				data: {
					gameInventory: currentInventory,
					lastActivityDate: now,
				},
			});

			responseData = {
				message:
					goldEarned > 0
						? `Sold: ${soldList.join(', ')} for ${goldEarned} Gold!`
						: 'No fish to sell!',
				inventory: currentInventory,
			};
		} else if (action === 'sell_single_fish') {
			const { fishName } = details;
			let goldEarned = 0;
			
			if (currentInventory.fishBag && currentInventory.fishBag[fishName]) {
				const count = currentInventory.fishBag[fishName];
				const def = FISHING_CONFIG.fish.find(f => f.name === fishName);
				const val = def ? def.value : 5;
				goldEarned = val * count * boostMultiplier;
				currentInventory.gold += goldEarned;
				delete currentInventory.fishBag[fishName];
			} else if (currentInventory.chestBag && currentInventory.chestBag[fishName]) {
				const count = currentInventory.chestBag[fishName];
				const def = FISHING_CONFIG.chests.find(c => c.name === fishName);
				const val = def ? def.value : 30;
				goldEarned = val * count * boostMultiplier;
				currentInventory.gold += goldEarned;
				delete currentInventory.chestBag[fishName];
			}

			await prisma.user.update({
				where: { id: userId },
				data: {
					gameInventory: currentInventory,
					lastActivityDate: now,
				},
			});

			responseData = {
				goldEarned,
				inventory: currentInventory,
			};
		} else if (action === 'buy_upgrade') {
			const { upgradeType, baitId } = details;
			let cost = 0;

			if (upgradeType === 'rod') {
				const nextLvl = currentInventory.rodLevel + 1;
				cost = nextLvl * 100;
				if (currentInventory.gold < cost) {
					return res
						.status(400)
						.json({ message: 'Insufficient Gold!' });
				}
				currentInventory.gold -= cost;
				currentInventory.rodLevel = nextLvl;
			} else if (upgradeType === 'boat') {
				const nextLvl = currentInventory.boatLevel + 1;
				cost = nextLvl * 250;
				if (currentInventory.gold < cost) {
					return res
						.status(400)
						.json({ message: 'Insufficient Gold!' });
				}
				currentInventory.gold -= cost;
				currentInventory.boatLevel = nextLvl;
			} else if (upgradeType === 'offline') {
				const nextLvl = currentInventory.offlineLevel + 1;
				cost = nextLvl * 150;
				if (currentInventory.gold < cost) {
					return res
						.status(400)
						.json({ message: 'Insufficient Gold!' });
				}
				currentInventory.gold -= cost;
				currentInventory.offlineLevel = nextLvl;
			} else if (upgradeType === 'boost') {
				cost = 120;
				if (currentInventory.gold < cost) {
					return res
						.status(400)
						.json({ message: 'Insufficient Gold!' });
				}
				currentInventory.gold -= cost;
				currentInventory.boostActiveUntil = new Date(
					now.getTime() + 300000,
				).toISOString();
			} else if (upgradeType === 'bait') {
				const baitDef = FISHING_CONFIG.baits.find(
					(b) => b.id === baitId,
				);
				if (!baitDef)
					return res
						.status(400)
						.json({ message: 'Invalid bait type' });

				cost = baitDef.cost;
				if (currentInventory.gold < cost) {
					return res
						.status(400)
						.json({ message: 'Insufficient Gold!' });
				}
				currentInventory.gold -= cost;
				// Grant 5 bait uses
				currentInventory.baitsPurchased[baitId] =
					(currentInventory.baitsPurchased[baitId] || 0) + 5;
			} else {
				return res
					.status(400)
					.json({ message: 'Invalid upgrade item' });
			}

			await prisma.user.update({
				where: { id: userId },
				data: {
					gameInventory: currentInventory,
					lastActivityDate: now,
				},
			});

			responseData = {
				message: `Successfully upgraded/purchased!`,
				inventory: currentInventory,
			};
		} else if (action === 'equip_bait') {
			const { baitId } = details;
			if (
				baitId &&
				(!currentInventory.baitsPurchased[baitId] ||
					currentInventory.baitsPurchased[baitId] <= 0)
			) {
				return res
					.status(400)
					.json({ message: 'You do not own this bait!' });
			}
			currentInventory.equippedBait = baitId || null;

			await prisma.user.update({
				where: { id: userId },
				data: {
					gameInventory: currentInventory,
					lastActivityDate: now,
				},
			});

			responseData = {
				message: baitId ? `Equipped bait!` : 'Unequipped bait!',
				inventory: currentInventory,
			};
		} else if (action === 'travel_to') {
			const { locationId } = details;
			const locationDef = FISHING_CONFIG.locations.find(
				(l) => l.id === locationId,
			);
			if (!locationDef)
				return res.status(400).json({ message: 'Invalid location' });

			if (locationDef.requiresUpgrade) {
				const reqType = locationDef.requiresUpgrade.type;
				const reqLvl = locationDef.requiresUpgrade.level;
				const userLvl =
					reqType === 'boat'
						? currentInventory.boatLevel
						: currentInventory.rodLevel;

				if (userLvl < reqLvl) {
					return res.status(400).json({
						message: `Requires boat level ${reqLvl} to travel here!`,
					});
				}
			}

			currentInventory.currentLocation = locationId;

			await prisma.user.update({
				where: { id: userId },
				data: {
					gameInventory: currentInventory,
					lastActivityDate: now,
				},
			});

			responseData = {
				message: `Traveled to ${locationDef.name}!`,
				inventory: currentInventory,
			};
		} else {
			return res.status(400).json({ message: 'Invalid action' });
		}

		if (offlineGoldEarned > 0) {
			responseData.offlineNotification = `Welcome back! Passive earnings generated: +${offlineGoldEarned} Gold.`;
		}

		const newBadges = await checkAndAwardBadges(userId);
		responseData.newBadges = newBadges;

		return res.status(200).json(responseData);
	} catch (error) {
		console.error('Error handling game action API:', error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}
