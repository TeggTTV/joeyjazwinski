import { NextApiRequest, NextApiResponse } from 'next';
import { notifyIndexNow } from '@/utils/indexNowNotifier';
import { getSession } from '@/utils/auth';
import { rateLimit } from '@/utils/rateLimit';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	const allowed = rateLimit(req, res, {
		windowMs: 60 * 1000,
		max: 10,
		message: 'IndexNow submission rate limit reached. Please wait a minute.',
	});
	if (!allowed) return;

	const session = await getSession(req);
	if (!session?.user?.thejoey) {
		return res.status(403).json({ error: 'Forbidden. Admin access required.' });
	}

	const { blogUrls, urls, url } = req.body || {};

	let targetUrls: string[] = [];

	if (Array.isArray(urls)) {
		targetUrls = urls;
	} else if (typeof urls === 'string' && urls.trim()) {
		targetUrls = [urls.trim()];
	} else if (typeof url === 'string' && url.trim()) {
		targetUrls = [url.trim()];
	} else if (Array.isArray(blogUrls)) {
		targetUrls = blogUrls;
	}

	if (targetUrls.length === 0) {
		return res
			.status(400)
			.json({ error: 'Invalid or missing URLs array or url string' });
	}

	try {
		const result = await notifyIndexNow(targetUrls);
		return res
			.status(result.success ? 200 : result.statusCode || 500)
			.json(result);
	} catch (error: any) {
		console.error('Error notifying IndexNow:', error);
		return res.status(500).json({
			error: 'Failed to notify IndexNow',
			details: error?.message || String(error),
		});
	}
}

