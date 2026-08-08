import { PrismaClient } from '../generated/prisma/client';

export const BADGE_DEFINITIONS = [
	{
		name: 'First Steps',
		description: 'Completed your first lesson.',
		icon: 'footsteps',
		criteria: { type: 'lessons', count: 1 },
	},
	{
		name: 'On Fire',
		description: 'Reached a 3-day learning streak.',
		icon: 'fire',
		criteria: { type: 'streak', count: 3 },
	},
	{
		name: 'Unstoppable',
		description: 'Reached a 7-day learning streak.',
		icon: 'rocket',
		criteria: { type: 'streak', count: 7 },
	},
	{
		name: 'Dedicated',
		description: 'Completed 10 lessons.',
		icon: 'medal',
		criteria: { type: 'lessons', count: 10 },
	},
	{
		name: 'Course Conqueror',
		description: 'Completed your first course.',
		icon: 'trophy',
		criteria: { type: 'courses', count: 1 },
	},
	{
		name: 'Deep Sea Angler',
		description: 'Catch 15 fish in the fishing minigame.',
		icon: 'anchor',
		criteria: { type: 'fish_caught', count: 15 },
	},
	{
		name: 'Master Miner',
		description: 'Mine 50 gems/ores in the mining minigame.',
		icon: 'pickaxe',
		criteria: { type: 'minerals_mined', count: 50 },
	},
	{
		name: 'Grand Synthesizer',
		description: 'Merge 30 items in the merge minigame.',
		icon: 'merge',
		criteria: { type: 'items_merged', count: 30 },
	},
];

export async function checkAndAwardBadges(userId: string) {
	try {
		const prisma = new PrismaClient();

		const user = await prisma.user.findUnique({
			where: { id: userId },
			include: {
				badges: { include: { Badge: true } },
				LessonProgress: { where: { completed: true } },
				CourseProgress: { where: { completed: true } },
			},
		});

		if (!user) return [];

		const newBadges = [];

		for (const def of BADGE_DEFINITIONS) {
			// Check if user already has this badge (by name)
			const hasBadge = user.badges.some(
				(ub) => ub.Badge.name === def.name
			);
			if (hasBadge) continue;

			let earned = false;

			if (def.criteria.type === 'lessons') {
				if (user.LessonProgress.length >= def.criteria.count) {
					earned = true;
				}
			} else if (def.criteria.type === 'streak') {
				if (user.currentStreak >= def.criteria.count) {
					earned = true;
				}
			} else if (def.criteria.type === 'courses') {
				if (user.CourseProgress.length >= def.criteria.count) {
					earned = true;
				}
			} else if (def.criteria.type === 'fish_caught' || def.criteria.type === 'minerals_mined' || def.criteria.type === 'items_merged') {
				const inventory = (user.gameInventory as any) || {};
				const count = inventory[def.criteria.type] || 0;
				if (count >= def.criteria.count) {
					earned = true;
				}
			}

			if (earned) {
				// Ensure Badge exists in DB first
				const badge = await prisma.badge.upsert({
					where: { name: def.name },
					update: {},
					create: {
						name: def.name,
						description: def.description,
						icon: def.icon,
						criteria: def.criteria,
					},
				});

				// Award to user
				await prisma.userBadge.create({
					data: {
						userId: user.id,
						badgeId: badge.id,
					},
				});
				newBadges.push(badge);
			}
		}

		return newBadges;
	} catch (error) {
		console.error('Error checking badges:', error);
		return [];
	}
}
