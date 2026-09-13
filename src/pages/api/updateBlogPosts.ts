import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/prisma';
import { BlogPostData } from '@/utils/db';
import { getSession } from '@/utils/auth';
import { rateLimit } from '@/utils/rateLimit';

type ResponseData = {
	message?: string;
	error?: string;
};

export default async function POST(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
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

	try {
		const rawBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
		const data = rawBody as BlogPostData[];

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
	}
}

