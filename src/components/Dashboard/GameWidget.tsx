import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaTimes, FaGamepad, FaCoins, FaSpinner } from 'react-icons/fa';
import { getFullUrl } from '@/utils/db';
import FISHING_CONFIG, {
	FISH_RARITY_RANKS,
	FishDefinition,
} from '@/config/fishingConfig';
import Image from 'next/image';

export default function GameWidget() {
	const [isOpen, setIsOpen] = useState(false);
	const [activeTab, setActiveTab] = useState<'cast' | 'shop' | 'travel'>(
		'cast',
	);
	const [, setLoading] = useState(true);

	// Cooldown states
	const [castCooldown, setCastCooldown] = useState(false);
	const [upgradeCooldown, setUpgradeCooldown] = useState(false);

	// User stats (simulated locally)
	const [xp, setXp] = useState(0);
	const [inventory, setInventory] = useState<any>({
		fish_caught: 0,
		gold: 50,
		rodLevel: 1,
		boatLevel: 1,
		offlineLevel: 0,
		fishBag: {},
		chestBag: {},
		baitsPurchased: {},
		equippedBait: null,
		currentLocation: 'salt_water',
		boostActiveUntil: null,
	});

	// Casting animations & outcomes
	const [isCasting, setIsCasting] = useState(false);
	const [castResult, setCastResult] = useState<{
		fish: { name: string; count: number; sprite: string; rarity: string }[];
		chests: { name: string; count: number; color: string }[];
		xpGained: number;
	} | null>(null);

	// Card sell feedback states { [fishName]: { sold: true, amount: 2, gold: 120 } }
	const [, setSellFeedback] = useState<
		Record<string, { sold: boolean; amount: number; gold: number }>
	>({});

	// Gold & XP animation trackers
	const [goldChange, setGoldChange] = useState<number | null>(null);
	const [xpChange, setXpChange] = useState<number | null>(null);

	// Audio sound effects helper
	const playSound = (soundName: 'hover' | 'click' | 'cast' | 'purchase') => {
		if (typeof window === 'undefined') return;
		try {
			const files = {
				hover: '/sound/Cursor Hover.mp3',
				click: '/sound/Cursor Click.mp3',
				cast: '/sound/Cast.mp3',
				purchase: '/sound/Purchase.mp3',
			};
			const audio = new Audio(files[soundName]);
			audio.volume = 0.1;
			audio.play().catch(() => {});
		} catch (e) {
			// Ignore audio playback errors
		}
	};

	const getLevel = (totalXp: number) => {
		return Math.floor(Math.sqrt(totalXp / 250)) + 1;
	};

	const getXPForLevel = (lvl: number) => {
		return Math.pow(lvl - 1, 2) * 250;
	};

	const RARITY_VALUES: Record<string, number> = {
		Common: 5,
		Uncommon: 15,
		Rare: 40,
		'Super Rare': 80,
		'Ultra Rare': 150,
		Legendary: 350,
		Godly: 900,
		Impossible: 2500,
	};

	const RARITY_XP: Record<string, number> = {
		Common: 10,
		Uncommon: 25,
		Rare: 60,
		'Super Rare': 120,
		'Ultra Rare': 200,
		Legendary: 450,
		Godly: 1000,
		Impossible: 2500,
	};

	// Auth and save promo states
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	// Ref to track state matches for saving updates
	const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const fetchUserStats = async () => {
		try {
			const res = await fetch(getFullUrl('/api/getProfile'));
			if (res.ok) {
				const data = await res.json();
				setIsAuthenticated(true);
				setXp(data.experience || 0);
				if (data.gameInventory) {
					setInventory(data.gameInventory);
				}
			} else if (res.status === 401) {
				setIsAuthenticated(false);
			}
		} catch (e) {
			console.error('Error fetching game profile info:', e);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (isOpen) {
			fetchUserStats();
		}
	}, [isOpen]);

	// Background DB sync function (debounced)
	const triggerBackgroundSync = (
		updatedInventory: any,
		updatedXP: number,
	) => {
		if (!isAuthenticated) return; // Only sync if logged in

		if (saveTimeoutRef.current) {
			clearTimeout(saveTimeoutRef.current);
		}

		saveTimeoutRef.current = setTimeout(async () => {
			try {
				await fetch('/api/gameAction', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						action: 'sync_local_state',
						details: {
							clientInventory: updatedInventory,
							clientXP: updatedXP,
						},
					}),
				});
			} catch (err) {
				console.error('Background sync failed:', err);
			}
		}, 1500);
	};

	// Clean up timeout on unmount
	useEffect(() => {
		return () => {
			if (saveTimeoutRef.current) {
				clearTimeout(saveTimeoutRef.current);
			}
		};
	}, []);

	// --- INSTANT CLIENT SIMULATIONS ---
	const castRod = () => {
		if (isCasting || castCooldown) return;

		playSound('cast');
		setCastCooldown(true);
		setIsCasting(true);
		setCastResult(null);
		setSellFeedback({}); // Reset sells feedback

		setTimeout(
			() => {
				setCastCooldown(false);
				// Copy stats
				let nextXP = xp;
				const nextInventory = JSON.parse(JSON.stringify(inventory));

				const rodLevel = nextInventory.rodLevel || 1;
				const currentLocation =
					nextInventory.currentLocation || 'salt_water';
				const userLevel = getLevel(nextXP);

				// Resolve equipped bait attributes
				let fishCountMultiplier = 1;
				let rarityMultiplier = 1.0;
				const equipped = nextInventory.equippedBait;

				if (equipped && nextInventory.baitsPurchased[equipped] > 0) {
					const baitDef = FISHING_CONFIG.baits.find(
						(b) => b.id === equipped,
					);
					if (baitDef) {
						fishCountMultiplier = baitDef.fishMultiplier;
						rarityMultiplier = baitDef.rarityMultiplier;
					}
					nextInventory.baitsPurchased[equipped] -= 1;
					if (nextInventory.baitsPurchased[equipped] <= 0) {
						nextInventory.equippedBait = null;
					}
				}

				// Quantity of fish caught per cast
				const baseQty = Math.floor(Math.random() * rodLevel) + 1;
				const fishCount = baseQty * fishCountMultiplier;

				const caughtThisCast: Record<string, number> = {};
				const chestsThisCast: Record<string, number> = {};

				// Resolve boost multipliers
				if (nextInventory.boostActiveUntil) {
					if (
						new Date(nextInventory.boostActiveUntil).getTime() >
						Date.now()
					) {
					}
				}

				// Filter target fish pool matching location
				const locationFish = FISHING_CONFIG.fish.filter(
					(f) => f.location === currentLocation,
				);

				for (let i = 0; i < fishCount; i++) {
					const roll = Math.random() * rarityMultiplier;
					console.log(roll);
					let selectedFish: FishDefinition | null = null;

					if (roll > 0.998 && userLevel >= 16) {
						const pool = locationFish.filter(
							(f) => f.rarity === 'Impossible',
						);
						if (pool.length)
							selectedFish =
								pool[Math.floor(Math.random() * pool.length)];
					}
					if (!selectedFish && roll > 0.99 && userLevel >= 13) {
						const pool = locationFish.filter(
							(f) => f.rarity === 'Godly',
						);
						if (pool.length)
							selectedFish =
								pool[Math.floor(Math.random() * pool.length)];
					}
					if (!selectedFish && roll > 0.97 && userLevel >= 10) {
						const pool = locationFish.filter(
							(f) => f.rarity === 'Legendary',
						);
						if (pool.length)
							selectedFish =
								pool[Math.floor(Math.random() * pool.length)];
					}
					if (!selectedFish && roll > 0.93 && userLevel >= 8) {
						const pool = locationFish.filter(
							(f) => f.rarity === 'Ultra Rare',
						);
						if (pool.length)
							selectedFish =
								pool[Math.floor(Math.random() * pool.length)];
					}
					if (!selectedFish && roll > 0.85 && userLevel >= 6) {
						const pool = locationFish.filter(
							(f) => f.rarity === 'Super Rare',
						);
						if (pool.length)
							selectedFish =
								pool[Math.floor(Math.random() * pool.length)];
					}
					if (!selectedFish && roll > 0.7 && userLevel >= 4) {
						const pool = locationFish.filter(
							(f) => f.rarity === 'Rare',
						);
						if (pool.length)
							selectedFish =
								pool[Math.floor(Math.random() * pool.length)];
					}
					if (!selectedFish && roll > 0.45 && userLevel >= 2) {
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

					if (!selectedFish) {
						selectedFish = locationFish[0];
					}

					caughtThisCast[selectedFish.name] =
						(caughtThisCast[selectedFish.name] || 0) + 1;
				}

				// Roll Chests
				let chestsXPGained = 0;
				for (const chest of FISHING_CONFIG.chests) {
					if (Math.random() < chest.chance) {
						chestsThisCast[chest.name] =
							(chestsThisCast[chest.name] || 0) + 1;
					}
				}

				nextXP += chestsXPGained;
				nextInventory.fish_caught += fishCount;

				// Add to bag
				if (!nextInventory.fishBag) nextInventory.fishBag = {};
				if (!nextInventory.chestBag) nextInventory.chestBag = {};

				for (const [fishName, count] of Object.entries(
					caughtThisCast,
				)) {
					nextInventory.fishBag[fishName] =
						(nextInventory.fishBag[fishName] || 0) + count;
				}
				for (const [chestName, count] of Object.entries(
					chestsThisCast,
				)) {
					nextInventory.chestBag[chestName] =
						(nextInventory.chestBag[chestName] || 0) + count;
				}

				// Save states locally
				setXp(nextXP);
				setInventory(nextInventory);
				setIsCasting(false);

				// Render results
				const fishList = Object.entries(caughtThisCast)
					.map(([name, count]) => {
						const def = FISHING_CONFIG.fish.find(
							(f) => f.name === name,
						);
						return {
							name,
							count: count as number,
							sprite: def
								? def.sprite
								: '/images/fish/salt water/Anchovy.png',
							rarity: def ? def.rarity : 'Common',
						};
					})
					.sort((a, b) => {
						const rankA =
							FISH_RARITY_RANKS[
								a.rarity as keyof typeof FISH_RARITY_RANKS
							] || 0;
						const rankB =
							FISH_RARITY_RANKS[
								b.rarity as keyof typeof FISH_RARITY_RANKS
							] || 0;
						return rankA - rankB;
					});

				const chestsList = Object.entries(chestsThisCast).map(
					([name, count]) => {
						const def = FISHING_CONFIG.chests.find(
							(c) => c.name === name,
						);
						return {
							name,
							count: count as number,
							color: def ? def.color : 'text-zinc-400',
						};
					},
				);

				setCastResult({
					fish: fishList,
					chests: chestsList,
					xpGained: chestsXPGained,
				});

				// Trigger background DB Sync
				triggerBackgroundSync(nextInventory, nextXP);
			},
			Math.max(3000 - ((inventory.boatLevel || 1) - 1) * 100, 1400),
		);
	};

	const openChest = (chestName: string) => {
		const nextInventory = JSON.parse(JSON.stringify(inventory));
		let nextXP = xp;

		if (
			!nextInventory.chestBag ||
			!nextInventory.chestBag[chestName] ||
			nextInventory.chestBag[chestName] <= 0
		) {
			return;
		}

		// Resolve chest config bounds
		const def = FISHING_CONFIG.chests.find((c) => c.name === chestName);
		const minGold = def ? def.minGold : 50;
		const maxGold = def ? def.maxGold : 150;
		const baseXP = def ? def.xp : 85;

		let boostMultiplier = 1;
		if (nextInventory.boostActiveUntil) {
			if (
				new Date(nextInventory.boostActiveUntil).getTime() > Date.now()
			) {
				boostMultiplier = 2;
			}
		}

		const goldReward =
			(Math.floor(Math.random() * (maxGold - minGold)) + minGold) *
			boostMultiplier;
		const xpReward = baseXP * boostMultiplier;

		nextInventory.gold += goldReward;
		nextXP += xpReward;

		// Decrement chest count
		nextInventory.chestBag[chestName] -= 1;
		if (nextInventory.chestBag[chestName] <= 0) {
			delete nextInventory.chestBag[chestName];
		}

		// Roll rare Pearl drops when opening a chest
		// Wood: 5% chance, Gold: 15% chance, Platinum: 30% chance
		let pearlRolled: string | null = null;
		const pearlChance =
			chestName === 'Platinum Chest'
				? 0.3
				: chestName === 'Golden Chest'
					? 0.15
					: 0.05;
		if (Math.random() < pearlChance) {
			// Pick random pearl based on chest rarity
			if (chestName === 'Platinum Chest') {
				pearlRolled =
					Math.random() < 0.35 ? 'Pink Pearl' : 'Black Pearl';
			} else if (chestName === 'Golden Chest') {
				pearlRolled =
					Math.random() < 0.4 ? 'Black Pearl' : 'White Pearl';
			} else {
				pearlRolled = 'White Pearl';
			}

			if (!nextInventory.fishBag) nextInventory.fishBag = {};
			nextInventory.fishBag[pearlRolled] =
				(nextInventory.fishBag[pearlRolled] || 0) + 1;
		}

		// Trigger top header animations
		setGoldChange(goldReward);
		setXpChange(xpReward);
		setTimeout(() => {
			setGoldChange(null);
			setXpChange(null);
		}, 1200);

		if (pearlRolled) {
			toast.info(
				`✨ You found a rare ${pearlRolled} inside the chest! Added to your bag.`,
			);
		}

		setXp(nextXP);
		setInventory(nextInventory);
		triggerBackgroundSync(nextInventory, nextXP);
	};

	const sellSingleFish = (fishName: string) => {
		const nextInventory = JSON.parse(JSON.stringify(inventory));
		let nextXP = xp;
		let goldEarned = 0;
		let xpEarned = 0;

		let boostMultiplier = 1;
		if (nextInventory.boostActiveUntil) {
			if (
				new Date(nextInventory.boostActiveUntil).getTime() > Date.now()
			) {
				boostMultiplier = 2;
			}
		}

		if (nextInventory.fishBag && nextInventory.fishBag[fishName]) {
			const count = nextInventory.fishBag[fishName];
			const def = FISHING_CONFIG.fish.find((f) => f.name === fishName);
			const rarity = def ? def.rarity : 'Common';
			const val = RARITY_VALUES[rarity] || 5;
			const baseXp = RARITY_XP[rarity] || 10;

			goldEarned = val * count * boostMultiplier;
			xpEarned = baseXp * count * boostMultiplier;

			nextInventory.gold += goldEarned;
			nextXP += xpEarned;
			delete nextInventory.fishBag[fishName];
		}

		// Trigger top header animations
		setGoldChange(goldEarned);
		setXpChange(xpEarned);
		setTimeout(() => {
			setGoldChange(null);
			setXpChange(null);
		}, 1200);

		// Update UI state instantly
		const originalCount = inventory.fishBag?.[fishName] || 0;
		setSellFeedback((prev) => ({
			...prev,
			[fishName]: {
				sold: true,
				amount: originalCount,
				gold: goldEarned,
				xp: xpEarned,
			},
		}));

		// Clear feedback state after 1.5 seconds so card resets cleanly
		setTimeout(() => {
			setSellFeedback((prev) => {
				const next = { ...prev };
				delete next[fishName];
				return next;
			});
		}, 1500);

		setXp(nextXP);
		setInventory(nextInventory);
		triggerBackgroundSync(nextInventory, nextXP);
	};

	const purchaseUpgrade = (type: string, baitId?: string) => {
		if (upgradeCooldown) return;

		setUpgradeCooldown(true);
		setTimeout(() => setUpgradeCooldown(false), 1000);

		const nextInventory = JSON.parse(JSON.stringify(inventory));
		let cost = 0;

		if (type === 'rod') {
			const nextLvl = (nextInventory.rodLevel || 1) + 1;
			cost = nextLvl * 100;
			if (nextInventory.gold < cost) {
				toast.error('Insufficient Gold!');
				return;
			}
			nextInventory.gold -= cost;
			nextInventory.rodLevel = nextLvl;
		} else if (type === 'boat') {
			const nextLvl = (nextInventory.boatLevel || 1) + 1;
			if (nextLvl > 11) {
				toast.error('Speed Boat is already at maximum level!');
				return;
			}
			cost =
				Math.floor(Math.pow(nextInventory.boatLevel || 1, 2.0) * 400) +
				300;
			if (nextInventory.gold < cost) {
				toast.error('Insufficient Gold!');
				return;
			}
			nextInventory.gold -= cost;
			nextInventory.boatLevel = nextLvl;
		} else if (type === 'offline') {
			const nextLvl = (nextInventory.offlineLevel || 0) + 1;
			cost = nextLvl * 150;
			if (nextInventory.gold < cost) {
				toast.error('Insufficient Gold!');
				return;
			}
			nextInventory.gold -= cost;
			nextInventory.offlineLevel = nextLvl;
		} else if (type === 'boost') {
			cost = 120;
			if (nextInventory.gold < cost) {
				toast.error('Insufficient Gold!');
				return;
			}
			nextInventory.gold -= cost;
			nextInventory.boostActiveUntil = new Date(
				Date.now() + 300000,
			).toISOString();
		} else if (type === 'bait' && baitId) {
			const baitDef = FISHING_CONFIG.baits.find((b) => b.id === baitId);
			if (!baitDef) return;
			cost = baitDef.cost;
			if (nextInventory.gold < cost) {
				toast.error('Insufficient Gold!');
				return;
			}
			nextInventory.gold -= cost;
			if (!nextInventory.baitsPurchased)
				nextInventory.baitsPurchased = {};
			nextInventory.baitsPurchased[baitId] =
				(nextInventory.baitsPurchased[baitId] || 0) + 5;
		}

		// Trigger top header decrement animation
		setGoldChange(-cost);
		setTimeout(() => setGoldChange(null), 1200);

		setInventory(nextInventory);
		toast.success(`Purchased/Upgraded ${type}!`);
		triggerBackgroundSync(nextInventory, xp);
	};

	const equipBait = (baitId: string | null) => {
		const nextInventory = JSON.parse(JSON.stringify(inventory));
		if (
			baitId &&
			(!nextInventory.baitsPurchased[baitId] ||
				nextInventory.baitsPurchased[baitId] <= 0)
		) {
			toast.error('You do not own this bait!');
			return;
		}
		nextInventory.equippedBait = baitId || null;

		setInventory(nextInventory);
		toast.success(baitId ? 'Bait equipped!' : 'Bait unequipped!');
		triggerBackgroundSync(nextInventory, xp);
	};

	const travelToLocation = (locationId: string) => {
		const nextInventory = JSON.parse(JSON.stringify(inventory));
		const locationDef = FISHING_CONFIG.locations.find(
			(l) => l.id === locationId,
		);
		if (!locationDef) return;

		if (locationDef.requiresUpgrade) {
			const reqType = locationDef.requiresUpgrade.type;
			const reqLvl = locationDef.requiresUpgrade.level;

			if (reqType === 'level') {
				if (level < reqLvl) {
					toast.error(`Requires Level ${reqLvl} to travel here!`);
					return;
				}
			} else {
				const userLvl =
					reqType === 'boat'
						? nextInventory.boatLevel
						: nextInventory.rodLevel;

				if (userLvl < reqLvl) {
					toast.error(
						`Requires speed boat level ${reqLvl} to travel here!`,
					);
					return;
				}
			}
		}

		nextInventory.currentLocation = locationId;
		setInventory(nextInventory);
		setCastResult(null);
		toast.success(`Traveled to ${locationDef.name}!`);
		triggerBackgroundSync(nextInventory, xp);
	};

	const level = getLevel(xp);
	const currentLevelXPStart = getXPForLevel(level);
	const nextLevelXPEnd = getXPForLevel(level + 1);
	const xpInCurrentLevel = xp - currentLevelXPStart;
	const xpForNextLevel = nextLevelXPEnd - currentLevelXPStart;
	const xpPercentage = Math.min(
		(xpInCurrentLevel / xpForNextLevel) * 100,
		100,
	);

	const rodCost =
		Math.floor(Math.pow(inventory.rodLevel || 1, 1.8) * 150) + 100;
	const boatCost =
		Math.floor(Math.pow(inventory.boatLevel || 1, 2.0) * 400) + 300;

	// Check total sellable items (fish & chests in bag)
	const combinedBagItems = [
		...Object.entries(inventory.fishBag || {}).map(([name, count]) => ({
			name,
			count: count as number,
			isChest: false,
		})),
		...Object.entries(inventory.chestBag || {}).map(([name, count]) => ({
			name,
			count: count as number,
			isChest: true,
		})),
	].filter((item) => item.count > 0);

	return (
		<>
			{/* Mini floating launcher button */}
			<button
				// onMouseEnter={() => playSound('hover')}
				onClick={() => {
					setIsOpen(true);
				}}
				className="fixed bottom-6 right-6 z-50 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:scale-105 active:scale-95 text-zinc-800 dark:text-white p-4 rounded-full shadow-2xl transition-all flex items-center justify-center gap-2 group"
				title="Play Arcade Minigames"
				aria-label="Open Arcade Minigames"
			>
				<FaGamepad className="w-6 h-6 text-blue-500 dark:text-blue-400" />
				<span className="text-xs font-bold font-mono tracking-wider">
					ARCADE
				</span>
			</button>

			<AnimatePresence>
				{isOpen && (
					<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							className="bg-white dark:bg-zinc-950 border-2 border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl flex flex-col h-130 relative text-zinc-850 dark:text-white"
						>
							{/* Window Header */}
							<div className="bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-4 py-2.5 flex justify-between items-center">
								<span className="text-xs font-bold font-mono tracking-wide text-zinc-800 dark:text-white">
									Mini-Arcade
								</span>
								<button
									// onMouseEnter={() => playSound('hover')}
									onClick={() => {
										// playSound('click');
										setIsOpen(false);
									}}
									aria-label="Close Arcade Window"
									className="text-zinc-500 hover:text-zinc-850 dark:hover:text-white p-1 rounded-lg transition-colors"
								>
									<FaTimes size={12} />
								</button>
							</div>

							{/* Stats Dashboard */}
							<div className="bg-zinc-50 dark:bg-zinc-900/40 px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800 grid grid-cols-3 items-center text-[10px] font-mono text-zinc-500 dark:text-zinc-400 relative select-none">
								<div className="flex items-center gap-1.5 justify-start relative">
									<FaCoins className="text-yellow-500" />
									<span className="font-bold text-zinc-800 dark:text-white transition-all duration-300">
										{inventory.gold || 0}G
									</span>

									<AnimatePresence>
										{goldChange !== null && (
											<motion.span
												initial={{
													opacity: 0,
													scale: 0.8,
													x: -5,
												}}
												animate={{
													opacity: 1,
													scale: 1,
													x: 0,
												}}
												exit={{
													opacity: 0,
													scale: 0.8,
												}}
												transition={{
													duration: 0.5,
													ease: 'easeOut',
												}}
												className={`ml-1 font-black text-[10px] ${
													goldChange > 0
														? 'text-green-500 dark:text-green-400'
														: 'text-red-500 dark:text-red-400'
												}`}
											>
												{goldChange > 0
													? `+${goldChange}`
													: goldChange}
											</motion.span>
										)}
									</AnimatePresence>
								</div>
								<div className="flex items-center gap-1.5 justify-center relative">
									<span className="text-zinc-800 dark:text-white font-bold whitespace-nowrap">
										LVL {level}
									</span>
									<div className="h-1.5 w-12 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden border border-zinc-300 dark:border-zinc-700 relative">
										<div
											className="h-full bg-blue-500 transition-all duration-500 ease-out"
											style={{
												width: `${xpPercentage}%`,
											}}
										/>
									</div>

									<AnimatePresence>
										{xpChange !== null && xpChange > 0 && (
											<motion.span
												initial={{
													opacity: 0,
													scale: 0.8,
													x: 5,
												}}
												animate={{
													opacity: 1,
													scale: 1,
													x: 0,
												}}
												exit={{
													opacity: 0,
													scale: 0.8,
												}}
												transition={{
													duration: 0.5,
													ease: 'easeOut',
												}}
												className="ml-1 font-black text-[10px] text-green-500 dark:text-green-400"
											>
												+{xpChange}
											</motion.span>
										)}
									</AnimatePresence>
								</div>
								<div className="text-[9px] text-zinc-600 dark:text-zinc-300 text-right font-bold whitespace-nowrap">
									{xpInCurrentLevel}/{xpForNextLevel} XP
								</div>
							</div>

							{/* Unified Game Content Pane */}
							<div className="flex-1 p-4 overflow-y-auto relative flex flex-col min-h-0 bg-zinc-50/30 dark:bg-zinc-950/20 pb-4">
								{/* Save Progress Banner Promo for guests */}
								{!isAuthenticated && (
									<div className="bg-blue-500/10 border border-blue-500/20 p-2.5 rounded-xl flex items-center justify-between text-[10px] mb-3 text-zinc-700 dark:text-zinc-300">
										<div>
											<span className="font-bold text-blue-600 dark:text-blue-400">
												Save Your Progress!
											</span>
											<p className="text-[9px] text-zinc-500">
												Create an account to save your
												gold & catches.
											</p>
										</div>
										<button
											// onMouseEnter={() =>
											// 	playSound('hover')
											// }
											// onClick={() => {
											// 	playSound('click');
											// 	window.location.href =
											// 		'/create-account';
											// }}
											className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded font-extrabold uppercase text-[8px] tracking-wider transition-colors"
										>
											Sign Up
										</button>
									</div>
								)}
								{/* Tab: CAST GAMEPLAY */}
								{activeTab === 'cast' && (
									<div className="flex-1 flex flex-col min-h-0">
										{/* Game Display Screen (Space above navigation) */}
										<div className="flex flex-col bg-zinc-100/50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-center mb-2 relative">
											{/* Top Sea Visual Environment */}
											<div className="w-full h-37.5 relative overflow-hidden rounded-lg bg-linear-to-b from-sky-400 to-blue-600 border border-blue-400 flex flex-col items-center justify-between p-3 select-none">
												{/* Sky & Clouds */}
												<div className="absolute inset-x-0 top-0 h-8 bg-sky-300/30 flex justify-around">
													<div
														className="w-6 h-2 bg-white/60 rounded-full blur-[1px] animate-pulse"
														style={{
															animationDuration:
																'4s',
														}}
													/>
													<div
														className="w-9 h-2.5 bg-white/60 rounded-full blur-[1px] animate-pulse"
														style={{
															animationDuration:
																'6s',
														}}
													/>
												</div>

												{/* Wooden Dock */}
												<div className="absolute left-0 bottom-8 w-10 h-12 bg-amber-800 border-r border-amber-950 flex flex-col justify-between p-1 z-10 shadow-lg">
													<div className="w-full h-0.5 bg-amber-900 rounded" />
													<div className="w-full h-0.5 bg-amber-900 rounded" />
												</div>

												{/* Floating Speed Boat */}
												<motion.div
													animate={{
														y: [0, -2, 0],
														rotate: [0, 0.5, 0],
													}}
													transition={{
														repeat: Infinity,
														duration: 2.2,
														ease: 'easeInOut',
													}}
													className="absolute left-8 bottom-6 z-15 flex flex-col items-center"
												>
													<div className="relative w-12 h-6 bg-zinc-100 border-b-2 border-blue-500 rounded-b-lg rounded-tr flex items-center justify-center shadow-md">
														<span className="text-[6px] font-bold text-zinc-600 uppercase tracking-widest absolute -top-2.5">
															{/* image of rod */}
															<Image
																src={
																	'/images/fish/fishing rod 1.png'
																}
																width={16}
																height={16}
																alt="Rod"
															/>
														</span>
														<div className="absolute right-1 -top-2 w-3 h-2 bg-cyan-300/50 border border-cyan-100 rounded-tr skew-x-12" />
													</div>
												</motion.div>

												{/* Animated Water / Waves */}
												<div className="absolute inset-x-0 bottom-0 h-10 bg-blue-700/80 border-t border-blue-400 overflow-hidden z-5">
													<div className="absolute inset-0 flex items-center justify-around opacity-50">
														<div className="w-full h-0.5 bg-sky-300 rounded animate-pulse animate-duration-1000" />
													</div>
												</div>
												{/* Splash / Bobber throwing animation - ONLY during active casting */}
												{isCasting && (
													<motion.div
														initial={{
															x: -45,
															y: -10,
															scale: 0.7,
															opacity: 0,
														}}
														animate={{
															x: 50,
															y: 0,
															scale: 1,
															opacity: 1,
														}}
														transition={{
															duration: 1.3,
															ease: [
																0.175, 0.885,
																0.32, 1.1,
															],
														}}
														className="absolute left-16 bottom-5 z-10 flex flex-col items-center"
													>
														{/* Bobber */}
														<motion.img
															animate={{
																y: [
																	0, 2, -1, 0,
																],
															}}
															transition={{
																repeat: Infinity,
																duration: 1.0,
															}}
															src="/images/fish/bobber 1.png"
															alt="Bobber"
															className="w-3.5 h-3.5 object-contain pixelated"
														/>
														{/* Ripple ring beneath bobber */}
														<div className="w-6 h-1.5 border border-cyan-200 rounded-full animate-ping absolute -bottom-0.5" />
													</motion.div>
												)}

												{/* Location Badge */}
												<div className="z-20 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10 text-white font-extrabold text-[8px] uppercase tracking-wider shadow-lg mb-auto">
													{
														FISHING_CONFIG.locations.find(
															(l) =>
																l.id ===
																inventory.currentLocation,
														)?.name
													}
												</div>
											</div>

											{/* Bottom Catches Result Log */}
											<div className="w-full mt-2.5 text-left border-t border-zinc-200 dark:border-zinc-800 pt-2 min-h-22.5 flex flex-col justify-start">
												<span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 block">
													Latest Cast Result:
												</span>

												{castResult ? (
													<div className="space-y-1.5 max-h-30 overflow-y-auto">
														{castResult.fish
															.length > 0 && (
															<div className="grid grid-cols-2 gap-1.5">
																{castResult.fish.map(
																	(f, i) => (
																		<motion.div
																			key={
																				i
																			}
																			initial={{
																				opacity: 0,
																				scale: 0.9,
																				y: 5,
																			}}
																			animate={{
																				opacity: 1,
																				scale: 1,
																				y: 0,
																			}}
																			transition={{
																				duration: 0.4,
																				delay:
																					i *
																					0.15,
																			}}
																			className={`flex items-center justify-between bg-zinc-100 dark:bg-zinc-900/60 p-1.5 rounded border border-zinc-200 dark:border-zinc-800 ${
																				castResult
																					.fish
																					.length %
																					2 !==
																					0 &&
																				i ===
																					castResult
																						.fish
																						.length -
																						1
																					? 'col-span-2'
																					: ''
																			}`}
																		>
																			<div className="flex items-center gap-1.5">
																				<img
																					src={
																						f.sprite
																					}
																					alt={
																						f.name
																					}
																					className="w-6 h-6 object-contain pixelated"
																				/>
																				<span className="text-[9px] font-bold text-zinc-800 dark:text-white truncate max-w-20">
																					{
																						f.name
																					}
																				</span>
																			</div>
																			<span className="text-[9px] font-mono font-bold text-zinc-500 dark:text-zinc-400">
																				x
																				{
																					f.count
																				}
																			</span>
																		</motion.div>
																	),
																)}
															</div>
														)}

														{castResult.chests
															.length > 0 && (
															<div className="flex flex-wrap gap-2 pt-1 border-t border-zinc-200 dark:border-zinc-800 mt-1">
																{castResult.chests.map(
																	(c, i) => (
																		<motion.span
																			key={
																				i
																			}
																			initial={{
																				opacity: 0,
																				scale: 0.8,
																			}}
																			animate={{
																				opacity: 1,
																				scale: 1,
																			}}
																			transition={{
																				duration: 0.4,
																				delay:
																					(castResult
																						.fish
																						.length +
																						i) *
																					0.15,
																			}}
																			className={`text-[9px] font-bold ${c.color}`}
																		>
																			🎁{' '}
																			{
																				c.name
																			}{' '}
																			x
																			{
																				c.count
																			}
																		</motion.span>
																	),
																)}
															</div>
														)}
													</div>
												) : (
													<div className="text-[9px] text-zinc-400 dark:text-zinc-600 italic py-4 text-center w-full">
														{isCasting
															? 'Waiting for catch...'
															: 'Cast your line to see what you catch!'}
													</div>
												)}
											</div>
										</div>

										{/* Anchored Cast Button inside the Fishing view */}
										<div className="mt-1 mb-3">
											<button
												disabled={
													isCasting || castCooldown
												}
												// onMouseEnter={() =>
												// 	playSound('hover')
												// }
												onClick={castRod}
												className="w-full bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-extrabold text-xs py-3 rounded-xl shadow-md border border-blue-500/30 flex items-center justify-center gap-1.5 transition-all"
											>
												{castCooldown ? (
													<FaSpinner className="animate-spin text-white" />
												) : (
													'Cast Line'
												)}
											</button>
										</div>

										{/* Sellable fish bag inventory and click-to-open chest options - always shown below the screen */}
										{combinedBagItems.length > 0 && (
											<div className="mt-2 text-left border-t border-zinc-200 dark:border-zinc-800 pt-3">
												<span className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2">
													Inventory Bag:
												</span>
												<div className="space-y-1.5 pr-1">
													{combinedBagItems.map(
														({
															name,
															count,
															isChest,
														}) => {
															const defFish =
																!isChest
																	? FISHING_CONFIG.fish.find(
																			(
																				f,
																			) =>
																				f.name ===
																				name,
																		)
																	: null;
															const defChest =
																isChest
																	? FISHING_CONFIG.chests.find(
																			(
																				c,
																			) =>
																				c.name ===
																				name,
																		)
																	: null;
															const sprite =
																defFish
																	? defFish.sprite
																	: '';
															const val = defFish
																? RARITY_VALUES[
																		defFish
																			.rarity
																	] || 5
																: defChest
																	? defChest.value
																	: 5;

															if (isChest) {
																return (
																	<div
																		key={
																			name
																		}
																		onMouseEnter={() =>
																			playSound(
																				'hover',
																			)
																		}
																		onClick={() => {
																			playSound(
																				'click',
																			);
																			openChest(
																				name,
																			);
																		}}
																		className="group relative h-12 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden cursor-pointer flex items-center justify-between px-3 transition-colors hover:border-yellow-500/40"
																	>
																		{/* Standard View */}
																		<div className="flex items-center gap-2.5 transition-opacity duration-200">
																			<span className="text-xl">
																				🎁
																			</span>
																			<div>
																				<p className="text-[11px] font-bold text-zinc-800 dark:text-white leading-none mb-0.5">
																					{
																						name
																					}
																				</p>
																				<p className="text-[8px] text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
																					Chest
																				</p>
																			</div>
																		</div>

																		<span className="text-xs font-mono font-bold text-zinc-500 dark:text-zinc-400 transition-opacity duration-200">
																			x
																			{
																				count
																			}
																		</span>

																		{/* Hover Open Overlay View */}
																		<div className="absolute inset-0 bg-yellow-100 dark:bg-yellow-950 border border-yellow-500/45 flex items-center justify-center text-[10px] font-bold text-yellow-800 dark:text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
																			Click
																			to
																			Open
																			Chest!
																		</div>
																	</div>
																);
															}

															return (
																<div
																	key={name}
																	onMouseEnter={() =>
																		playSound(
																			'hover',
																		)
																	}
																	onClick={() => {
																		playSound(
																			'click',
																		);
																		sellSingleFish(
																			name,
																		);
																	}}
																	className="group relative h-12 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden cursor-pointer flex items-center justify-between px-3 transition-colors hover:border-green-500/40"
																>
																	{/* Standard View */}
																	<div className="flex items-center gap-2.5 transition-opacity duration-200">
																		{sprite && (
																			<img
																				src={
																					sprite
																				}
																				alt={
																					name
																				}
																				className="w-8 h-8 object-contain pixelated"
																			/>
																		)}
																		<div>
																			<p className="text-[11px] font-bold text-zinc-800 dark:text-white leading-none mb-0.5">
																				{
																					name
																				}
																			</p>
																			<p className="text-[8px] text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
																				{
																					defFish?.rarity
																				}
																			</p>
																		</div>
																	</div>

																	<span className="text-xs font-mono font-bold text-zinc-500 dark:text-zinc-400 transition-opacity duration-200">
																		x{count}
																	</span>

																	{/* Hover Sell Overlay View */}
																	<div className="absolute inset-0 bg-green-100 dark:bg-green-950 border border-green-500/40 flex items-center justify-center text-[10px] font-bold text-green-800 dark:text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
																		Click to
																		Sell x
																		{count}{' '}
																		for{' '}
																		{val *
																			count}
																		G
																	</div>
																</div>
															);
														},
													)}
												</div>
											</div>
										)}
									</div>
								)}

								{/* Tab: UPGRADE SHOP */}
								{activeTab === 'shop' && (
									<div className="space-y-3.5">
										{/* Bait Selection Dropdown */}
										<div className="bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl space-y-2">
											<div className="flex justify-between items-center text-xs">
												<span className="font-bold text-zinc-800 dark:text-white">
													Equipped Bait:
												</span>
												<select
													value={
														inventory.equippedBait ||
														''
													}
													// onMouseEnter={() =>
													// 	playSound('hover')
													// }
													onChange={(e) => {
														playSound('click');
														equipBait(
															e.target.value ||
																null,
														);
													}}
													className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-850 dark:text-white rounded px-2 py-1 text-[11px] outline-none"
												>
													<option value="">
														None (Empty)
													</option>
													{FISHING_CONFIG.baits.map(
														(b) => {
															const count =
																inventory
																	.baitsPurchased?.[
																	b.id
																] || 0;
															return (
																<option
																	key={b.id}
																	value={b.id}
																	disabled={
																		count <=
																		0
																	}
																>
																	{b.name} (
																	{count}{' '}
																	left)
																</option>
															);
														},
													)}
												</select>
											</div>
										</div>

										{/* Upgrades list */}
										<div className="space-y-2 text-xs">
											{/* Rod */}
											<div className="bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-2.5 rounded-xl flex justify-between items-center">
												<div className="flex items-center gap-2">
													<img
														src={`/images/fish/fishing rod ${Math.min(inventory.rodLevel || 1, 3)}.png`}
														alt="Fishing Rod"
														className="w-8 h-8 object-contain pixelated"
													/>
													<div>
														<h4 className="font-bold text-zinc-800 dark:text-white text-[11px]">
															Fishing Rod (Lvl{' '}
															{inventory.rodLevel ||
																1}
															)
														</h4>
														<p className="text-[9px] text-zinc-500">
															More fish per cast.
														</p>
													</div>
												</div>
												<button
													disabled={upgradeCooldown}
													// onMouseEnter={() =>
													// 	playSound('hover')
													// }
													onClick={() => {
														playSound('purchase');
														purchaseUpgrade('rod');
													}}
													className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] py-1.5 px-3 rounded flex items-center gap-1.5 min-w-12.5 justify-center"
												>
													{upgradeCooldown ? (
														<FaSpinner className="animate-spin" />
													) : (
														`${rodCost}G`
													)}
												</button>
											</div>

											{/* Boat */}
											<div className="bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-2.5 rounded-xl flex justify-between items-center">
												<div className="flex items-center gap-2">
													<span className="text-xl">
														🚢
													</span>
													<div>
														<h4 className="font-bold text-zinc-800 dark:text-white text-[11px]">
															Speed Boat (Lvl{' '}
															{inventory.boatLevel ||
																1}
															)
														</h4>
														<p className="text-[9px] text-zinc-500">
															Reduces casting
															cooldown by 100ms
															(Current cooldown -
															3000 -{' '}
															{(inventory.boatLevel ||
																1) * 100}{' '}
															={' '}
															{3000 -
																(inventory.boatLevel ||
																	1) *
																	100}
															).
														</p>
													</div>
												</div>
												<button
													disabled={
														upgradeCooldown ||
														(inventory.boatLevel ||
															1) >= 11
													}
													onMouseEnter={() =>
														playSound('hover')
													}
													onClick={() => {
														playSound('purchase');
														purchaseUpgrade('boat');
													}}
													className="bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-bold text-[10px] py-1.5 px-3 rounded flex items-center gap-1.5 min-w-12.5 justify-center"
												>
													{upgradeCooldown ? (
														<FaSpinner className="animate-spin" />
													) : (inventory.boatLevel ||
															1) >= 11 ? (
														'MAX'
													) : (
														`${boatCost}G`
													)}
												</button>
											</div>

											{/* Baits Purchase list */}
											<div className="border-t border-zinc-200 dark:border-zinc-800 pt-3">
												<h3 className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2">
													Buy Bait Supplies
												</h3>
												<div className="space-y-2">
													{FISHING_CONFIG.baits.map(
														(b) => (
															<div
																key={b.id}
																className="bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-2 rounded-xl flex justify-between items-center"
															>
																<div className="flex items-center gap-2">
																	<img
																		src={
																			b.sprite
																		}
																		alt={
																			b.name
																		}
																		className="w-7 h-7 object-contain pixelated"
																	/>
																	<div>
																		<h4 className="font-bold text-zinc-800 dark:text-white text-[11px]">
																			{
																				b.name
																			}
																		</h4>
																		<p className="text-[9px] text-zinc-500">
																			Multiplier:
																			x
																			{
																				b.fishMultiplier
																			}{' '}
																			fish
																		</p>
																	</div>
																</div>
																<button
																	disabled={
																		upgradeCooldown
																	}
																	onMouseEnter={() =>
																		playSound(
																			'hover',
																		)
																	}
																	onClick={() => {
																		playSound(
																			'purchase',
																		);
																		purchaseUpgrade(
																			'bait',
																			b.id,
																		);
																	}}
																	className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] py-1.5 px-3 rounded flex items-center gap-1.5 min-w-12.5 justify-center"
																>
																	{upgradeCooldown ? (
																		<FaSpinner className="animate-spin" />
																	) : (
																		`${b.cost}G`
																	)}
																</button>
															</div>
														),
													)}
												</div>
											</div>
										</div>
									</div>
								)}

								{/* Tab: TRAVEL LOCATIONS */}
								{activeTab === 'travel' && (
									<div className="space-y-3">
										{FISHING_CONFIG.locations.map((loc) => {
											const isCurrent =
												inventory.currentLocation ===
												loc.id;
											const isLocked =
												loc.requiresUpgrade &&
												(loc.requiresUpgrade.type ===
												'level'
													? level <
														loc.requiresUpgrade
															.level
													: (inventory.boatLevel ||
															1) <
														loc.requiresUpgrade
															.level);
											return (
												<div
													key={loc.id}
													className={`p-3 rounded-xl border flex justify-between items-center transition-all ${
														isCurrent
															? 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-500/40 text-blue-950 dark:text-white'
															: 'bg-zinc-100 dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800'
													}`}
												>
													<div>
														<h4 className="text-xs font-bold text-zinc-800 dark:text-white">
															{loc.name}
														</h4>
														{isLocked && (
															<p className="text-[9px] text-red-500 dark:text-red-400 mt-0.5">
																Requires Level{' '}
																{
																	loc
																		.requiresUpgrade
																		?.level
																}
															</p>
														)}
													</div>

													{!isCurrent && (
														<button
															disabled={
																!!isLocked
															}
															onMouseEnter={() =>
																playSound(
																	'hover',
																)
															}
															onClick={() => {
																playSound(
																	'click',
																);
																travelToLocation(
																	loc.id,
																);
															}}
															className={`px-3 py-1.5 rounded text-[10px] font-bold transition-colors ${
																isLocked
																	? 'bg-zinc-200 dark:bg-zinc-950 text-zinc-500 dark:text-zinc-600 border border-zinc-300 dark:border-zinc-855'
																	: 'bg-blue-600 hover:bg-blue-700 text-white'
															}`}
														>
															{isLocked
																? 'Locked'
																: 'Travel'}
														</button>
													)}

													{isCurrent && (
														<span className="text-[10px] bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded">
															Current Location
														</span>
													)}
												</div>
											);
										})}
									</div>
								)}
							</div>

							{/* Bottom Navigation System */}
							<div className="bg-zinc-100 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-3 text-center text-xs z-20">
								<button
									// onMouseEnter={() => playSound('hover')}
									onClick={() => {
										playSound('click');
										setActiveTab('cast');
									}}
									className={`py-3 font-bold transition-all border-r border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center gap-1 border-t ${
										activeTab === 'cast'
											? 'bg-white dark:bg-zinc-950 text-blue-600 dark:text-blue-400 border-t-blue-500'
											: 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 border-t-transparent'
									}`}
								>
									<span className="text-lg">🎣</span>
									<span>Fishing</span>
								</button>

								<button
									// onMouseEnter={() => playSound('hover')}
									onClick={() => {
										playSound('click');
										setActiveTab('shop');
									}}
									className={`py-3 font-bold transition-all border-r border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center gap-1 border-t ${
										activeTab === 'shop'
											? 'bg-white dark:bg-zinc-950 text-blue-600 dark:text-blue-400 border-t-blue-500'
											: 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 border-t-transparent'
									}`}
								>
									<span className="text-lg">🛒</span>
									<span>Upgrades</span>
								</button>

								<button
									// onMouseEnter={() => playSound('hover')}
									onClick={() => {
										playSound('click');
										setActiveTab('travel');
									}}
									className={`py-3 font-bold transition-all flex flex-col items-center justify-center gap-1 border-t ${
										activeTab === 'travel'
											? 'bg-white dark:bg-zinc-950 text-blue-600 dark:text-blue-400 border-t-blue-500'
											: 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 border-t-transparent'
									}`}
								>
									<span className="text-lg">🗺️</span>
									<span>Travel</span>
								</button>
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</>
	);
}
