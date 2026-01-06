import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	const { lessonSlug, feedback } = req.body;

	if (!lessonSlug || !feedback) {
		return res.status(400).json({ message: 'Missing fields' });
	}

	try {
		await prisma.lessonFeedback.create({
			data: {
				lessonSlug,
				feedback,
			},
		});

		return res.status(200).json({ message: 'Feedback submitted' });
	} catch (error) {
		console.error('Error submitting feedback:', error);
		return res.status(500).json({ message: 'Internal server error' });
	} finally {
		await prisma.$disconnect();
	}
}
