import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/prisma';
import { getSession } from '@/utils/auth';
import { rateLimit } from '@/utils/rateLimit';

type ResponseData = {
	message: string;
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

	const { title, content, description, tags } = req.body || {};

	if (!title || !content) {
		return res.status(400).json({ message: 'Title and content are required.' });
	}

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

		// Log Activity
		try {
			await prisma.activityLog.create({
				data: {
					action: 'New Blog Post',
					description: `Published: ${title}`,
				},
			});
		} catch (logError) {
			console.error('Failed to log activity:', logError);
		}

		return res
			.status(201)
			.json({ message: 'Blog post created successfully' });
	} catch (error) {
		console.error('Error creating blog post:', error);
		return res.status(500).json({ message: 'Failed to create blog post' });
	}
}

