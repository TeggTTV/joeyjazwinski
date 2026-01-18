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

	try {
		const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
		const count = await prisma.user.count({
			where: {
				lastActivityDate: {
					gte: fiveMinutesAgo,
				},
			},
		});

		await prisma.$disconnect();
		res.status(200).json({ count });
	} catch (error) {
		await prisma.$disconnect();
		console.error('Error getting online count:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}
