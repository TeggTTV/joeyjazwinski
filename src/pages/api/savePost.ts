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

	const { title, content, tags, description, slug } = req.body;

	if (!title || !content || !description || !slug) {
		await prisma.$disconnect();
		return res
			.status(400)
			.json({ message: 'Missing required fields', body: req.body });
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
