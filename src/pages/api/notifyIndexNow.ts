import { NextApiRequest, NextApiResponse } from 'next';
import { notifyIndexNow } from '@/utils/indexNowNotifier';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	const { blogUrls } = req.body;

	if (!Array.isArray(blogUrls) || blogUrls.length === 0) {
		return res.status(400).json({ error: 'Invalid or missing blog URLs' });
	}

	try {
		for (const url of blogUrls) {
			await notifyIndexNow(url);
		}
		return res
			.status(200)
			.json({ message: 'IndexNow notifications sent successfully' });
	} catch (error) {
		console.error('Error notifying IndexNow:', error);
		return res.status(500).json({ error: 'Failed to notify IndexNow' });
	}
}
