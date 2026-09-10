import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../utils/prisma';
import { calculateStreak } from '../../utils/streak';

type ResponseData = {
	message?: string;
	user?: any;
};

export default async function GET(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>,
) {
	try {
		const authToken = req.cookies.authToken; // Assuming you have a userId in cookies
		if (!authToken) {
			return res.status(201).json({ message: 'Unauthorized' });
		}

		const user = await prisma.user.findUnique({
			where: { id: authToken },
			select: {
				id: true,
				email: true,
				name: true,
				username: true,
				createdAt: true,
				profileImage: true,
				currentStreak: true,
				longestStreak: true,
				lastActivityDate: true,
				lastStreakDate: true,
				experience: true,
				thejoey: true,
			},
		});

		if (!user) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		// Read timezone from query params, headers, or default
		const timeZone =
			(req.query.timeZone as string) ||
			(req.headers['x-timezone'] as string) ||
			undefined;

		// Calculate streak updates server-side using dedicated lastStreakDate (falling back to lastActivityDate for initial migration)
		const previousStreakDate = user.lastStreakDate || user.lastActivityDate;
		const streakResult = calculateStreak(
			previousStreakDate,
			user.currentStreak || 0,
			user.longestStreak || 0,
			timeZone,
			new Date(),
		);

		let finalUser: any = {
			...user,
			currentStreak: streakResult.currentStreak,
			longestStreak: streakResult.longestStreak,
			lastStreakDate: streakResult.lastStreakDate,
		};

		if (streakResult.didUpdate) {
			finalUser = await prisma.user.update({
				where: { id: user.id },
				data: {
					currentStreak: streakResult.currentStreak,
					longestStreak: streakResult.longestStreak,
					lastStreakDate: streakResult.lastStreakDate,
					lastActivityDate: new Date(),
				},
				select: {
					id: true,
					email: true,
					name: true,
					username: true,
					createdAt: true,
					profileImage: true,
					currentStreak: true,
					longestStreak: true,
					lastStreakDate: true,
					lastActivityDate: true,
					experience: true,
					thejoey: true,
				},
			});
		}

		return res.status(200).json({
			user: finalUser,
			message: streakResult.message || 'User fetched successfully.',
		});
	} catch (error) {
		console.error('Error fetching user:', error);
		return res.status(500).json({ message: 'Internal server error.' });
	}
}

