import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/prisma';
import { rateLimit } from '@/utils/rateLimit';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	// Limit to 30 note updates per minute per IP
	const allowed = rateLimit(req, res, {
		windowMs: 60 * 1000,
		max: 30,
		message: 'Too many note updates. Please slow down.',
	});
	if (!allowed) return;

	const token = req.cookies.authToken;

	if (!token) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	const { lessonSlug, content } = req.body || {};

	if (!lessonSlug) {
		return res.status(400).json({ message: 'Lesson slug required' });
	}

	try {
		const user = await prisma.user.findUnique({
			where: { id: token },
		});

		if (!user) {
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

		return res.status(200).json(note);
	} catch (error) {
		console.error('Error saving lesson note:', error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

