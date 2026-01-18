import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	const { lessonSlug } = req.query;

	if (!lessonSlug || typeof lessonSlug !== 'string') {
		return res.status(400).json({ message: 'Lesson slug required' });
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

		const note = await prisma.lessonNote.findUnique({
			where: {
				userId_lessonSlug: {
					userId: user.id,
					lessonSlug: lessonSlug,
				},
			},
		});

		await prisma.$disconnect();
		// Return minimal object if no note found, rather than 404, to simplify frontend logic
		res.status(200).json(note || { content: '' });
	} catch (error) {
		await prisma.$disconnect();
		console.error('Error fetching lesson note:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}
