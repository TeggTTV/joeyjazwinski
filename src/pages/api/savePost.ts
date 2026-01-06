import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';

export default async function savePost(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}
	const prisma = new PrismaClient();

	const { title, content, tags, description, slug, image } = req.body;
	const isAI = req.body.isAI || false; // Default to false if not provided
	//const isDraft = req.body.isDraft || false; // Default to false if not provided

	if (!title || !content || !description || !slug) {
		const requiredFields = [];
		if (!title) requiredFields.push('title');
		if (!content) requiredFields.push('content');
		if (!description) requiredFields.push('description');
		if (!slug) requiredFields.push('slug');
		if (!tags) requiredFields.push('tags');
		await prisma.$disconnect();
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

		await prisma.$disconnect();
		return res.status(200).json({ message: 'Post saved successfully' });
	} catch (error) {
		await prisma.$disconnect();
		console.error('Error saving post:', error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}
