import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	const prisma = new PrismaClient();

	const postSlug = req.body;

	if (!postSlug) {
		return res.status(400).json({ error: 'Post ID is required' });
	}

	try {
		const comments = await prisma.comment.findMany({
			where: { postSlug },
			orderBy: { createdAt: 'asc' },
		});
        console.log('Fetched comments:', comments);
        
		return res.status(200).json({ comments });
	} catch (error) {
		console.error('Error fetching comments:', error);
		return res.status(500).json({ error: 'Internal server error' });
	}
}
