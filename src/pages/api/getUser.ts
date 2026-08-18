import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../utils/prisma';

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
				currentStreak: true,
				longestStreak: true,
				lastActivityDate: true,
				experience: true,
				thejoey: true,
			},
		});

		if (!user) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		// Calculate streak updates server-side
		let currentStreak = user.currentStreak || 0;
		let longestStreak = user.longestStreak || 0;
		let updatedLastActivityDate = user.lastActivityDate;
		let didUpdate = false;

		const nowDate = new Date();
		if (user.lastActivityDate) {
			const lastDate = new Date(user.lastActivityDate);

			const lastDateLocal = new Date(
				lastDate.getFullYear(),
				lastDate.getMonth(),
				lastDate.getDate(),
			);
			const nowDateLocal = new Date(
				nowDate.getFullYear(),
				nowDate.getMonth(),
				nowDate.getDate(),
			);

			const diffTime = nowDateLocal.getTime() - lastDateLocal.getTime();
			const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

			if (diffDays === 1) {
				currentStreak += 1;
				if (currentStreak > longestStreak) {
					longestStreak = currentStreak;
				}
				updatedLastActivityDate = nowDate;
				didUpdate = true;
			} else if (diffDays > 1) {
				currentStreak = 1;
				updatedLastActivityDate = nowDate;
				didUpdate = true;
			}
		} else {
			currentStreak = 1;
			if (longestStreak < 1) longestStreak = 1;
			updatedLastActivityDate = nowDate;
			didUpdate = true;
		}

		let finalUser = user;
		if (didUpdate) {
			finalUser = await prisma.user.update({
				where: { id: user.id },
				data: {
					currentStreak,
					longestStreak,
					lastActivityDate: updatedLastActivityDate,
				},
				select: {
					id: true,
					email: true,
					name: true,
					username: true,
					createdAt: true,
					currentStreak: true,
					longestStreak: true,
					lastActivityDate: true,
					experience: true,
					thejoey: true,
				},
			});
		}

		return res.status(200).json({
			user: finalUser,
			message: 'User fetched successfully.',
		});
	} catch (error) {
		console.error('Error fetching user:', error);
		return res.status(500).json({ message: 'Internal server error.' });
	}
}
