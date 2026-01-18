import type { NextApiRequest, NextApiResponse } from 'next';
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
		const tracks = await prisma.courseTrack.findMany({
			orderBy: { createdAt: 'desc' },
		});

		await prisma.$disconnect();
		res.status(200).json(tracks);
	} catch (error) {
		await prisma.$disconnect();
		console.error('Error fetching course tracks:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}
