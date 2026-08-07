import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';
import { BlogPostData } from '@/utils/db';

type ResponseData = {
	message?: string;
	error?: string;
};

export default async function POST(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	const prisma = new PrismaClient();

	try {
		await prisma.$connect(); // Connect to the database

		const data = JSON.parse(req.body) as BlogPostData[];

		await Promise.all(
			data.map(async (blog) => {
				await prisma.blogPost.updateMany({
					where: { slug: blog.slug },
					data: {
						title: blog.title,
						description: blog.description,
						tags: blog.tags,
					},
				});
			})
		);

		return res.status(200).json({
			message: 'Blog posts updated successfully.',
		});
	} catch (error) {
		console.error('Error updating blog posts:', error);
		return res.status(500).json({
			message: 'Internal server error',
			error: error instanceof Error ? error.message : String(error),
		});
	} finally {
		await prisma.$disconnect();
	}
}
