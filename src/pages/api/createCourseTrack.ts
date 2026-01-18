import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	const prisma = new PrismaClient();
	const token = req.cookies.authToken;

	if (!token) {
		await prisma.$disconnect();
		return res.status(401).json({ message: 'Unauthorized' });
	}

	const { title, description, slug, courseSlugs } = req.body;

	if (
		!title ||
		!description ||
		!slug ||
		!courseSlugs ||
		!Array.isArray(courseSlugs)
	) {
		return res.status(400).json({ message: 'Invalid data provided' });
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

		const newTrack = await prisma.courseTrack.create({
			data: {
				title,
				description,
				slug,
				courseSlugs,
			},
		});

		await prisma.$disconnect();
		res.status(200).json(newTrack);
	} catch (error) {
		await prisma.$disconnect();
		console.error('Error creating course track:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}
