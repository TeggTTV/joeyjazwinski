import { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'cookie';
import { prisma } from '../../utils/prisma';
import { processUserStreak } from '../../utils/streak';
import { checkAndAwardBadges } from '../../utils/badges';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	const cookies = parse(req.headers.cookie || '');
	const authToken = cookies.authToken || req.cookies.authToken;
	const sessionToken = cookies.sessionToken || req.cookies.sessionToken;

	if (!authToken && !sessionToken) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	const token = authToken || sessionToken;

	try {
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
				name: true,
				email: true,
				username: true,
				bio: true,
				currentStreak: true,
				longestStreak: true,
				lastStreakDate: true,
				website: true,
				twitter: true,
				github: true,
				linkedin: true,
				profileImage: true,
				isProfileVerified: true,
				gameInventory: true,
				experience: true,
				points: true,
				lastLoginClaim: true,
				lastActivityDate: true,
				badges: {
					include: {
						Badge: true,
					},
				},
			},
		});

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

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
					name: true,
					email: true,
					username: true,
					bio: true,
					currentStreak: true,
					longestStreak: true,
					lastStreakDate: true,
					website: true,
					twitter: true,
					github: true,
					linkedin: true,
					profileImage: true,
					isProfileVerified: true,
					gameInventory: true,
					experience: true,
					points: true,
					lastLoginClaim: true,
					lastActivityDate: true,
					badges: {
						include: {
							Badge: true,
						},
					},
				},
			});

			if (streakResult.streakIncreased) {
				await checkAndAwardBadges(user.id);
			}
		}

		res.status(200).json(finalUser);
	} catch (error) {
		console.error('Error fetching profile:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}
