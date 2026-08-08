import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';

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
		// Try to find user by ID or sessionToken
		const user = await prisma.user.findFirst({
			where: {
				OR: [{ id: token }, { sessionToken: token }],
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
				isProfileVerified: true,
				gameEnergy: true,
				gameInventory: true,
				experience: true,
				lastLoginClaim: true,
			},
		});

		if (!user) {
			await prisma.$disconnect();
			return res.status(404).json({ message: 'User not found' });
		}

		await prisma.$disconnect();
		res.status(200).json(user);
	} catch (error) {
		await prisma.$disconnect();
		console.error('Error fetching profile:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}
