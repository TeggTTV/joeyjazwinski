import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	const { trackSlug } = req.body;

	if (!trackSlug) {
		return res.status(400).json({ message: 'Track slug is required' });
	}

	const prisma = new PrismaClient();
	const token = req.cookies.authToken;

	if (!token) {
		await prisma.$disconnect();
		return res.status(401).json({ message: 'Unauthorized' });
	}

	try {
		const user = await prisma.user.findUnique({
			where: { id: token },
		});

		if (!user) {
			await prisma.$disconnect();
			return res.status(401).json({ message: 'User not found' });
		}

		const enrollment = await prisma.courseTrackEnrollment.create({
			data: {
				userId: user.id,
				trackSlug,
			},
		});

		await prisma.$disconnect();
		res.status(200).json({ message: 'Enrolled successfully', enrollment });
	} catch (error: any) {
		await prisma.$disconnect();
		if (error.code === 'P2002') {
			return res.status(200).json({ message: 'Already enrolled' });
		}
		console.error('Error enrolling in track:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}
