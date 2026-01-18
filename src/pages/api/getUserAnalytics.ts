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
						// We don't strictly capture "completedAt" for lessons in current schema properly except via logging
						// But we can count them
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

		// Consolidate all badges
		const allBadges = BADGE_DEFINITIONS.map((def) => {
			const userBadge = user.badges.find(
				(ub) => ub.Badge.name === def.name
			);
			return {
				id: userBadge ? userBadge.Badge.id : def.name, // Use name as ID fall back for unearned
				name: def.name,
				description: def.description,
				icon: def.icon,
				earned: !!userBadge,
				earnedAt: userBadge ? userBadge.earnedAt : null,
			};
		});

		// Mocking recent activity from activity logs if available, or just generic data
		// For strictly "Recent Activity", we'd need a timestamp on LessonProgress or an ActivityLog model
		// We have ActivityLog model, let's fetch it

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
