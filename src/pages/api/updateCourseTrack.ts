import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/prisma';
import { getSession } from '@/utils/auth';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	const session = await getSession(req);
	if (!session || !session.user || !session.user.thejoey) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	const { id, title, description, slug, courseSlugs } = req.body;

	if (!id || !title || !slug || !Array.isArray(courseSlugs)) {
		return res.status(400).json({ message: 'Missing required fields' });
	}

	try {
		await prisma.courseTrack.update({
			where: { id },
			data: {
				title,
				description,
				slug,
				courseSlugs,
			},
		});

		res.status(200).json({ success: true });
	} catch (error) {
		console.error('Error updating course track:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}
