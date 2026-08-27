import type { NextApiRequest, NextApiResponse } from 'next';
import { createPoll, getRecentPolls } from '@/services/pollService';
import { getSession } from '@/utils/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 30;
			const category = req.query.category as string | undefined;
			const polls = await getRecentPolls(limit, category);
			return res.status(200).json(polls);
		} catch (error: any) {
			console.error('Error fetching polls:', error);
			return res.status(500).json({ message: error.message || 'Failed to fetch polls' });
		}
	}

	if (req.method === 'POST') {
		try {
			const session = await getSession(req);
			const { title, description, options, durationHours, allowMultiple, category } = req.body;

			if (!title || !options || !Array.isArray(options) || options.length < 2) {
				return res.status(400).json({ message: 'Title and at least 2 options are required' });
			}

			const poll = await createPoll({
				title,
				description,
				options,
				durationHours: Number(durationHours) || 24,
				allowMultiple: !!allowMultiple,
				category: category || 'General',
				authorId: session?.user?.id || null,
				authorName: session?.user?.name || null,
			});

			return res.status(201).json(poll);
		} catch (error: any) {
			console.error('Error creating poll:', error);
			return res.status(500).json({ message: error.message || 'Failed to create poll' });
		}
	}

	res.setHeader('Allow', ['GET', 'POST']);
	return res.status(405).json({ message: `Method ${req.method} not allowed` });
}
