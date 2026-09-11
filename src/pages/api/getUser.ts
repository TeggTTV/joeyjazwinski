import type { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'cookie';
import { prisma } from '../../utils/prisma';
import { processUserStreak } from '../../utils/streak';
import { checkAndAwardBadges } from '../../utils/badges';

type ResponseData = {
	message?: string;
	user?: any;
};

export default async function GET(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>,
) {
	try {
		const cookies = parse(req.headers.cookie || '');
		const authToken = cookies.authToken || req.cookies.authToken;
		const sessionToken = cookies.sessionToken || req.cookies.sessionToken;

		if (!authToken && !sessionToken) {
			return res.status(201).json({ message: 'Unauthorized' });
		}

		const token = authToken || sessionToken;

		const user = await prisma.user.findFirst({
			where: {
				OR: [
					...(authToken ? [{ id: authToken }] : []),
					...(sessionToken ? [{ sessionToken: sessionToken }] : []),
					...(token ? [{ id: token }, { sessionToken: token }] : []),
				],
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
				lastActivityDate: true,
				lastStreakDate: true,
				experience: true,
				thejoey: true,
				messages: true,
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

		const now = new Date();
		const streakResult = processUserStreak(user, timeZone, now);

		let finalUser: any = {
			...user,
			currentStreak: streakResult.currentStreak,
			longestStreak: streakResult.longestStreak,
			lastStreakDate: streakResult.lastStreakDate,
		};

		// If streak updated OR user had no lastStreakDate stored in DB yet, persist to DB
		if (streakResult.didUpdate || !user.lastStreakDate) {
			finalUser = await prisma.user.update({
				where: { id: user.id },
				data: {
					currentStreak: streakResult.currentStreak,
					longestStreak: streakResult.longestStreak,
					lastStreakDate: streakResult.lastStreakDate,
					lastActivityDate: now,
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
					messages: true,
				},
			});

			if (streakResult.streakIncreased) {
				await checkAndAwardBadges(user.id);
			}
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
