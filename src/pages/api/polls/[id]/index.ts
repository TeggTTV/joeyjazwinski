import type { NextApiRequest, NextApiResponse } from 'next';
import { getPollById, deletePoll } from '@/services/pollService';
import { getSession } from '@/utils/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { id } = req.query;

	if (!id || typeof id !== 'string') {
		return res.status(400).json({ message: 'Invalid poll ID' });
	}

	if (req.method === 'GET') {
		try {
			const poll = await getPollById(id);
			if (!poll) {
				return res.status(404).json({ message: 'Poll not found' });
			}
			return res.status(200).json(poll);
		} catch (error: any) {
			console.error('Error fetching poll:', error);
			return res.status(500).json({ message: error.message || 'Internal server error' });
		}
	}

	if (req.method === 'DELETE') {
		try {
			const session = await getSession(req);
			const poll = await getPollById(id);

			if (!poll) {
				return res.status(404).json({ message: 'Poll not found' });
			}

			// If poll has authorId, verify matching user or admin (thejoey)
			if (poll.authorId && session?.user?.id !== poll.authorId && !session?.user?.thejoey) {
				return res.status(403).json({ message: 'Unauthorized to delete this poll' });
			}

			const success = await deletePoll(id, session?.user?.id);
			if (!success) {
				return res.status(500).json({ message: 'Failed to delete poll' });
			}

			return res.status(200).json({ message: 'Poll deleted successfully' });
		} catch (error: any) {
			console.error('Error deleting poll:', error);
			return res.status(500).json({ message: error.message || 'Failed to delete poll' });
		}
	}

	res.setHeader('Allow', ['GET', 'DELETE']);
	return res.status(405).json({ message: `Method ${req.method} not allowed` });
}
