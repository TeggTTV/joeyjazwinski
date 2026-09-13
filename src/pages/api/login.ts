import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';
import { ObjectId } from 'mongodb';
import { prisma } from '../../utils/prisma';
import { processUserStreak } from '../../utils/streak';
import { checkAndAwardBadges } from '../../utils/badges';
import { rateLimit } from '@/utils/rateLimit';

type ResponseData = {
	message: string;
	streak?: number;
};

export default async function POST(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>,
) {
	// Restrict to 10 login attempts per 15 minutes per IP
	const allowed = rateLimit(req, res, {
		windowMs: 15 * 60 * 1000,
		max: 10,
		message: 'Too many login attempts. Please wait 15 minutes before trying again.',
	});
	if (!allowed) return;

	const { email, password, timeZone: bodyTimeZone } = req.body || {};

	try {
		if (!email || !password) {
			res.status(400).json({ message: 'Email and password are required.' });
			return;
		}

		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			res.status(401).json({ message: 'Invalid credentials' });
			return;
		}

		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) {
			res.status(401).json({ message: 'Invalid credentials' });
			return;
		}

		const sessionToken = new ObjectId().toHexString(); // Generate a valid MongoDB ObjectID
		const timeZone =
			bodyTimeZone ||
			(req.headers['x-timezone'] as string) ||
			undefined;

		const now = new Date();
		const streakResult = processUserStreak(user, timeZone, now);

		await prisma.user.update({
			where: { id: user.id },
			data: {
				sessionToken,
				currentStreak: streakResult.currentStreak,
				longestStreak: streakResult.longestStreak,
				lastStreakDate: streakResult.lastStreakDate,
				lastActivityDate: now,
			},
		});

		if (streakResult.streakIncreased) {
			await checkAndAwardBadges(user.id);
		}

		const authCookie = serialize('authToken', user.id, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
		});

		const sessionCookie = serialize('sessionToken', sessionToken, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
		});

		res.setHeader('Set-Cookie', [authCookie, sessionCookie]);
		return res.status(200).json({
			message: 'Login successful',
			streak: streakResult.currentStreak,
		});
	} catch (error) {
		console.error('Error logging in:', error);
		return res.status(500).json({ message: 'Failed to login' });
	}
}
