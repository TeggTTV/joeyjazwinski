export interface FishDefinition {
	name: string;
	rarity:
		| 'Common'
		| 'Uncommon'
		| 'Rare'
		| 'Super Rare'
		| 'Ultra Rare'
		| 'Legendary'
		| 'Godly'
		| 'Impossible';
	xp: number;
	value: number;
	sprite: string;
	location: 'salt_water' | 'fresh_water';
}

export interface BaitDefinition {
	id: string;
	name: string;
	cost: number;
	sprite: string;
	fishMultiplier: number;
	rarityMultiplier: number;
}

export interface ChestDefinition {
	name: string;
	chance: number;
	minGold: number;
	maxGold: number;
	xp: number;
	value: number;
	color: string;
}

export const FISH_RARITY_RANKS = {
	Common: 0,
	Uncommon: 1,
	Rare: 2,
	'Super Rare': 3,
	'Ultra Rare': 4,
	Legendary: 5,
	Godly: 6,
	Impossible: 7,
};

const FISHING_CONFIG = {
	locations: [
		{ id: 'salt_water', name: 'Salt Water Reefs', requiresUpgrade: null },
		{
			id: 'fresh_water',
			name: 'Mystic Fresh Water Lake',
			requiresUpgrade: { type: 'boat', level: 3 },
		},
	],
	baits: [
		{
			id: 'worm',
			name: 'Wiggle Worm',
			cost: 30,
			sprite: '/images/fish/bait/Worm.png',
			fishMultiplier: 2,
			rarityMultiplier: 1.2,
		},
		{
			id: 'glowworm',
			name: 'Glow Worm',
			cost: 80,
			sprite: '/images/fish/bait/Worm Outline.png',
			fishMultiplier: 4,
			rarityMultiplier: 2.0,
		},
		{
			id: 'metalcan',
			name: 'Rusty Lure',
			cost: 120,
			sprite: '/images/fish/bait/Rusty Can.png',
			fishMultiplier: 6,
			rarityMultiplier: 3.5,
		},
	] as BaitDefinition[],
	chests: [
		{
			name: 'Wooden Chest',
			chance: 0.12,
			minGold: 50,
			maxGold: 150,
			xp: 80,
			value: 50,
			color: 'text-amber-700',
		},
		{
			name: 'Golden Chest',
			chance: 0.05,
			minGold: 200,
			maxGold: 500,
			xp: 200,
			value: 150,
			color: 'text-yellow-500',
		},
		{
			name: 'Platinum Chest',
			chance: 0.02,
			minGold: 600,
			maxGold: 1500,
			xp: 500,
			value: 400,
			color: 'text-zinc-300 animate-pulse',
		},
	] as ChestDefinition[],
	fish: [
		// Salt Water Fish
		{
			name: 'Anchovy',
			rarity: 'Common',
			xp: 15,
			value: 8,
			sprite: '/images/fish/salt water/Anchovy.png',
			location: 'salt_water',
		},
		{
			name: 'Clownfish',
			rarity: 'Uncommon',
			xp: 30,
			value: 18,
			sprite: '/images/fish/salt water/Clownfish.png',
			location: 'salt_water',
		},
		{
			name: 'Dungeness Crab',
			rarity: 'Rare',
			xp: 60,
			value: 45,
			sprite: '/images/fish/salt water/Crab - Dungeness.png',
			location: 'salt_water',
		},
		{
			name: 'Surgeonfish',
			rarity: 'Super Rare',
			xp: 100,
			value: 90,
			sprite: '/images/fish/salt water/Surgeonfish.png',
			location: 'salt_water',
		},
		{
			name: 'Pufferfish',
			rarity: 'Ultra Rare',
			xp: 180,
			value: 160,
			sprite: '/images/fish/salt water/Pufferfish.png',
			location: 'salt_water',
		},
		{
			name: 'Shrimp',
			rarity: 'Common',
			xp: 12,
			value: 6,
			sprite: '/images/fish/shrimp 1.png',
			location: 'salt_water',
		},
		{
			name: 'Starfish',
			rarity: 'Uncommon',
			xp: 25,
			value: 14,
			sprite: '/images/fish/starfish 1.png',
			location: 'salt_water',
		},

		// Fresh Water Fish
		{
			name: 'Goldfish',
			rarity: 'Common',
			xp: 20,
			value: 10,
			sprite: '/images/fish/fresh water/Goldfish.png',
			location: 'fresh_water',
		},
		{
			name: 'Angelfish',
			rarity: 'Uncommon',
			xp: 40,
			value: 25,
			sprite: '/images/fish/fresh water/Angelfish.png',
			location: 'fresh_water',
		},
		{
			name: 'Bass',
			rarity: 'Rare',
			xp: 80,
			value: 60,
			sprite: '/images/fish/fresh water/Bass.png',
			location: 'fresh_water',
		},
		{
			name: 'Rainbow Trout',
			rarity: 'Super Rare',
			xp: 130,
			value: 110,
			sprite: '/images/fish/fresh water/Rainbow Trout.png',
			location: 'fresh_water',
		},
		{
			name: 'Catfish',
			rarity: 'Ultra Rare',
			xp: 220,
			value: 200,
			sprite: '/images/fish/fresh water/Catfish.png',
			location: 'fresh_water',
		},
		{
			name: 'River Frog',
			rarity: 'Common',
			xp: 15,
			value: 7,
			sprite: '/images/fish/frog 1.png',
			location: 'fresh_water',
		},
		{
			name: 'River Crab',
			rarity: 'Uncommon',
			xp: 28,
			value: 16,
			sprite: '/images/fish/crab 1.png',
			location: 'fresh_water',
		},

		// High Tier / Legendary / Godly / Impossible Fish
		{
			name: 'Platinum Koi',
			rarity: 'Legendary',
			xp: 400,
			value: 400,
			sprite: '/images/fish/fresh water/Goldfish Outline.png',
			location: 'fresh_water',
		},
		{
			name: 'Golden Salmon',
			rarity: 'Godly',
			xp: 800,
			value: 1000,
			sprite: '/images/fish/fresh water/Rainbow Trout Outline.png',
			location: 'fresh_water',
		},
		{
			name: 'Ghost Shark',
			rarity: 'Impossible',
			xp: 2000,
			value: 3000,
			sprite: '/images/fish/salt water/Pufferfish Outline.png',
			location: 'salt_water',
		},

		// Rare Chest Drops (Valuables added directly to inventory list bag)
		{
			name: 'Black Pearl',
			rarity: 'Legendary',
			xp: 500,
			value: 800,
			sprite: '/images/fish/pearls/pearl 1.png',
			location: 'salt_water',
		},
		{
			name: 'Pink Pearl',
			rarity: 'Godly',
			xp: 1000,
			value: 1500,
			sprite: '/images/fish/pearls/pearl 2.png',
			location: 'salt_water',
		},
		{
			name: 'White Pearl',
			rarity: 'Rare',
			xp: 200,
			value: 300,
			sprite: '/images/fish/pearls/pearl 3.png',
			location: 'salt_water',
		},
	] as FishDefinition[],
};

export default FISHING_CONFIG;
