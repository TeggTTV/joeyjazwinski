import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, User } from '../../generated/prisma/client';

type ResponseData = {
	message?: string;
	user?: User;
};

export default async function GET(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	const prisma = new PrismaClient();

	try {
		const authToken = req.cookies.authToken; // Assuming you have a userId in cookies
		if (!authToken) {
			await prisma.$disconnect();
			return res.status(201).json({ message: 'Unauthorized' });
		}

		const user = await prisma.user.findUnique({
			where: { id: authToken },
			include: {
				messages: {
					select: {
						id: true,
						title: true,
						description: true,
						createdAt: true,
					},
				},
			},
		});

		if (!user) {
			await prisma.$disconnect();
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
				lastDate.getDate()
			);
			const nowDateLocal = new Date(
				nowDate.getFullYear(),
				nowDate.getMonth(),
				nowDate.getDate()
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
				include: {
					messages: {
						select: {
							id: true,
							title: true,
							description: true,
							createdAt: true,
						},
					},
				},
			});
		}

		await prisma.$disconnect();
		return res.status(200).json({
			user: finalUser,
			message: 'User fetched successfully.',
		});
	} catch (error) {
		await prisma.$disconnect();
		console.error('Error fetching user:', error);
		return res.status(500).json({ message: 'Internal server error.' });
	}
}
