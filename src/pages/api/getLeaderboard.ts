import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/prisma';
import { User } from '@/generated/prisma';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
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
				experience: true,
				points: true,
				_count: {
					select: {
						LessonProgress: { where: { completed: true } },
						CourseProgress: { where: { completed: true } },
						badges: true,
					},
				},
			},
		});

		// Calculate Points / XP and format data
		const leaderboardData = users.map((user) => {
			const dbUser = user as any;
			const totalXP =
				dbUser.points !== undefined && dbUser.points > 0
					? dbUser.points
					: dbUser.experience !== undefined && dbUser.experience > 0
						? dbUser.experience
						: user._count.LessonProgress * 50 +
							user._count.CourseProgress * 500 +
							user._count.badges * 200;

			// Calculate level based on XP/Points (every 500 points is a level)
			const level = Math.floor(totalXP / 500) + 1;

			return {
				id: user.id,
				name: user.name || 'Anonymous Learner',
				username: user.username || 'user',
				profileImage: user.profileImage,
				currentStreak: user.currentStreak || 0,
				stats: {
					lessons: user._count.LessonProgress,
					courses: user._count.CourseProgress,
					badges: user._count.badges,
				},
				points: user.points,
				totalXP,
				level,
			};
		});

		// Sort by Total Points/XP descending
		const sortedLeaderboard = leaderboardData.sort(
			(a, b) => b.totalXP - a.totalXP,
		);

		// Return top 50 logged-in users
		res.status(200).json(sortedLeaderboard.slice(0, 50));
	} catch (error) {
		console.error('Error fetching leaderboard:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}
