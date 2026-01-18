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

	const { lessonSlug, content } = req.body;

	if (!lessonSlug) {
		return res.status(400).json({ message: 'Lesson slug required' });
	}

	try {
		const user = await prisma.user.findUnique({
			where: { id: token },
		});

		if (!user) {
			await prisma.$disconnect();
			return res.status(401).json({ message: 'User not found' });
		}

		const note = await prisma.lessonNote.upsert({
			where: {
				userId_lessonSlug: {
					userId: user.id,
					lessonSlug: lessonSlug,
				},
			},
			update: {
				content: content,
			},
			create: {
				userId: user.id,
				lessonSlug: lessonSlug,
				content: content || '',
			},
		});

		await prisma.$disconnect();
		res.status(200).json(note);
	} catch (error) {
		await prisma.$disconnect();
		console.error('Error saving lesson note:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}
