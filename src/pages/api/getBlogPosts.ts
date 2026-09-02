import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/prisma';
import { BlogPostData } from '@/utils/db';

type ResponseData = {
	message?: string;
	blogPosts?: BlogPostData[];
	blogPost?: BlogPostData;
};

export default async function GET(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	try {
		const { slug } = req.query;

		// Set Cache-Control header to enable caching of JSON responses
		res.setHeader(
			'Cache-Control',
			'public, s-maxage=60, stale-while-revalidate=300'
		);

		if (slug) {
			const blogPost = await prisma.blogPost.findUnique({
				where: { slug: String(slug) },
			});

			if (!blogPost) {
				return res
					.status(404)
					.json({ message: 'Blog post not found.' });
			}

			return res.status(200).json({
				blogPost: { ...blogPost, content: blogPost.content ?? '' },
			});
		}

		// When listing all posts, omit the huge Markdown content field to compress and speed up JSON payload
		const blogPosts = await prisma.blogPost.findMany({
			select: {
				id: true,
				title: true,
				description: true,
				slug: true,
				tags: true,
				createdAt: true,
				updatedAt: true,
				isAI: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		const sanitizedBlogPosts = blogPosts.map((post) => ({
			...post,
			content: '',
		}));

		res.setHeader('Content-Type', 'application/json');
		return res.status(200).json({ blogPosts: sanitizedBlogPosts });
	} catch (error) {
		console.error('Error fetching blog posts:', error);
		res.setHeader('Content-Type', 'application/json');
		return res.status(500).json({ message: 'Internal server error.' });
	}
}
