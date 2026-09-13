import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/prisma';
import { getSession } from '@/utils/auth';
import { rateLimit } from '@/utils/rateLimit';

export default async function savePost(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
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

	const { title, content, tags, description, slug, image } = req.body || {};
	const isAI = req.body.isAI || false; // Default to false if not provided
	//const isDraft = req.body.isDraft || false; // Default to false if not provided

	if (!title || !content || !description || !slug) {
		const requiredFields = [];
		if (!title) requiredFields.push('title');
		if (!content) requiredFields.push('content');
		if (!description) requiredFields.push('description');
		if (!slug) requiredFields.push('slug');
		if (!tags) requiredFields.push('tags');
		return res.status(400).json({
			message: `Missing required fields: ${requiredFields.join(', ')}`,
		});
	}

	try {
		await prisma.blogPost.create({
			data: {
				title,
				description,
				content,
				tags,
				createdAt: new Date(),
				updatedAt: new Date(),
				slug,
				image,
				isAI,
			},
		});

		return res.status(200).json({ message: 'Post saved successfully' });
	} catch (error) {
		console.error('Error saving post:', error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

