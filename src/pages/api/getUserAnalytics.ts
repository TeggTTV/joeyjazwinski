import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@/generated/prisma/client';
import { BADGE_DEFINITIONS } from '@/utils/badges';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	const token = req.cookies.authToken;
	const prisma = new PrismaClient();

	if (!token) {
		await prisma.$disconnect();
		return res.status(401).json({ message: 'Unauthorized' });
	}

	try {
		const user = await prisma.user.findUnique({
			where: { id: token },
			include: {
				LessonProgress: {
					where: { completed: true },
					select: {
						id: true,
						lessonSlug: true,
						completed: true,
					},
				},
				CourseProgress: {
					where: { completed: true },
					select: {
						courseSlug: true,
						completed: true,
					},
				},
				badges: {
					include: {
						Badge: true,
					},
				},
			},
		});

		if (!user) {
			await prisma.$disconnect();
			return res.status(401).json({ message: 'User not found' });
		}

		const totalLessonsCompleted = user.LessonProgress.length;
		const totalCoursesCompleted = user.CourseProgress.length;

		// Gamification inventory counts
		const inventory: any = user.gameInventory || {};
		const fishCaught = inventory.fish_caught || 0;
		const mineralsMined = inventory.minerals_mined || 0;
		const itemsMerged = inventory.items_merged || 0;

		// Consolidate all badges
		const allBadges = BADGE_DEFINITIONS.map((def) => {
			const userBadge = user.badges.find(
				(ub) => ub.Badge.name === def.name
			);
			return {
				id: userBadge ? userBadge.Badge.id : def.name,
				name: def.name,
				description: def.description,
				icon: def.icon,
				earned: !!userBadge,
				earnedAt: userBadge ? userBadge.earnedAt : null,
			};
		});

		const recentActivity = await prisma.activityLog.findMany({
			where: { userId: user.id },
			orderBy: { createdAt: 'desc' },
			take: 5,
		});

		await prisma.$disconnect();

		res.status(200).json({
			stats: {
				totalLessons: totalLessonsCompleted,
				totalCourses: totalCoursesCompleted,
				currentStreak: user.currentStreak || 0,
				longestStreak: user.longestStreak || 0,
				experience: user.experience || 0,
				gameEnergy: user.gameEnergy !== undefined ? user.gameEnergy : 100,
				gameInventory: inventory,
			},
			badges: allBadges,
			recentActivity,
		});
	} catch (error) {
		await prisma.$disconnect();
		console.error('Error fetching analytics:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}
