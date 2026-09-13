import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/prisma';
import { getSession } from '@/utils/auth';
import { rateLimit } from '@/utils/rateLimit';

type ResponseData = {
	message: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST']);
		return res
			.status(405)
			.json({ message: `Method ${req.method} not allowed.` });
	}

	const allowed = rateLimit(req, res, {
		windowMs: 60 * 1000,
		max: 20,
	});
	if (!allowed) return;

	const session = await getSession(req);
	if (!session?.user?.thejoey) {
		return res.status(403).json({ message: 'Forbidden. Admin access required.' });
	}

	const { title, description, content, tags, createdAt, updatedAt } =
		req.body || {};

		if (!title || !description || !content) {
			return res.status(200).json({
				message: 'Title, description, and content are required.',
			});
		}

		try {
			await prisma.tutorialPost.create({
				data: {
					title,
					description,
					content,
					tags,
					createdAt,
					updatedAt,
					slug: title.toLowerCase().replace(/\s+/g, '-'),
					difficulty: req.body.difficulty || 'beginner', // Default to beginner if not provided
				},
			});

			return res.status(201).json({
				message: 'Tutorial post created successfully.',
			});
		} catch (error) {
			console.error('Error creating tutorial post:', error);
			return res.status(500).json({ message: 'Internal server error.' });
		}
}

