import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../../generated/prisma/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	const prisma = new PrismaClient();
	const token = req.cookies.authToken;

	if (!token) {
		await prisma.$disconnect();
		return res.status(401).json({ message: 'Unauthorized' });
	}

	try {
		// Verify admin
		const admin = await prisma.user.findUnique({
			where: { id: token },
		});

		if (!admin || !admin.thejoey) {
			await prisma.$disconnect();
			return res.status(403).json({ message: 'Forbidden' });
		}

		const pendingUsers = await prisma.user.findMany({
			where: {
				isProfileVerified: false,
				// Ensure they have meaningful data to verify, not just new empty users
				OR: [
					{ bio: { not: null } },
					{ website: { not: null } },
					{ twitter: { not: null } },
					{ github: { not: null } },
					{ linkedin: { not: null } },
					{ profileImage: { not: null } },
				],
			},
			select: {
				id: true,
				name: true,
				email: true,
				username: true,
				bio: true,
				website: true,
				twitter: true,
				github: true,
				linkedin: true,
				profileImage: true,
				updatedAt: true,
			},
			orderBy: {
				updatedAt: 'desc',
			},
		});

		await prisma.$disconnect();
		res.status(200).json(pendingUsers);
	} catch (error) {
		await prisma.$disconnect();
		console.error('Error fetching pending profiles:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}
