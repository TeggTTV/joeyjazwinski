import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/prisma';
import { rateLimit } from '@/utils/rateLimit';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	// Limit to 10 feedbacks per 10 minutes per IP
	const allowed = rateLimit(req, res, {
		windowMs: 10 * 60 * 1000,
		max: 10,
		message: 'Too many feedback submissions. Please slow down.',
	});
	if (!allowed) return;

	const { lessonSlug, feedback } = req.body || {};

	if (!lessonSlug || !feedback || typeof feedback !== 'string' || feedback.length > 2000) {
		return res.status(400).json({ message: 'Invalid feedback data' });
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
	}
}

