import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';

type ResponseData = {
	message: string;
};

export default async function POST(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	const prisma = new PrismaClient();
	const { title, content, description, tags } = req.body;

	try {
		await prisma.blogPost.create({
			data: {
				title,
				description: description, // Assuming description is not required for blogs
				content,
				tags: tags ? { set: tags } : undefined,
				createdAt: new Date(),
				updatedAt: new Date(),
				slug: title.toLowerCase().replace(/\s+/g, '-'),
			},
		});
		await prisma.$disconnect();
		return res
			.status(201)
			.json({ message: 'Blog post created successfully' });
	} catch (error) {
		console.error('Error creating blog post:', error);
		await prisma.$disconnect();
		return res.status(500).json({ message: 'Failed to create blog post' });
	} finally {
		await prisma.$disconnect();
	}
}
