import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/prisma';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	try {
		// Fetch users with their progress counts
		const users = await prisma.user.findMany({
			select: {
				id: true,
				name: true,
				username: true,
				profileImage: true,
				currentStreak: true,
				_count: {
					select: {
						LessonProgress: { where: { completed: true } },
						CourseProgress: { where: { completed: true } },
						badges: true,
					},
				},
			},
		});

		// Calculate XP and format data
		const leaderboardData = users.map((user) => {
			const lessonsXP = user._count.LessonProgress * 50;
			const coursesXP = user._count.CourseProgress * 500;
			const badgesXP = user._count.badges * 200;
			const totalXP = lessonsXP + coursesXP + badgesXP;

			// Calculate level roughly based on XP (same formula as frontend)
			const level = Math.floor(totalXP / 1000) + 1;

			return {
				id: user.id,
				name: user.name || 'Anonymous User',
				username: user.username || 'user',
				profileImage: user.profileImage,
				currentStreak: user.currentStreak,
				stats: {
					lessons: user._count.LessonProgress,
					courses: user._count.CourseProgress,
					badges: user._count.badges,
				},
				totalXP,
				level,
			};
		});

		// Sort by Total XP descending
		const sortedLeaderboard = leaderboardData.sort(
			(a, b) => b.totalXP - a.totalXP
		);

		// Return top 50
		res.status(200).json(sortedLeaderboard.slice(0, 50));
	} catch (error) {
		console.error('Error fetching leaderboard:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}
