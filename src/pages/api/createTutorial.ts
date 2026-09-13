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

	const { title, description, content, tags } = req.body || {};

	try {
		await prisma.tutorialPost.create({
			data: {
				title,
				description: description, // Assuming description is not required for tutorials
				content,
				tags: tags ? { set: tags } : undefined,
				slug: title.toLowerCase().replace(/\s+/g, '-'), // Generate slug from title
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		});
		return res.status(201).json({ message: 'Tutorial post created successfully' });
	} catch (error) {
		console.error('Error creating tutorial post:', error);
		return res.status(500).json({ message: 'Failed to create tutorial post' });
	}
}

