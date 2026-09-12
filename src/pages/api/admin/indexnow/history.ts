import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	try {
		const { db } = await connectToDatabase();
		const logs = await db
			.collection('indexnow_logs')
			.find({})
			.sort({ submittedAt: -1 })
			.limit(30)
			.toArray();

		const formattedLogs = logs.map((log) => ({
			id: log._id ? log._id.toString() : Math.random().toString(),
			urls: log.urls || [],
			urlCount: log.urlCount || (log.urls ? log.urls.length : 0),
			statusCode: log.statusCode ?? 200,
			success: Boolean(log.success),
			responseMessage: log.responseMessage || '',
			submittedAt: log.submittedAt
				? new Date(log.submittedAt).toISOString()
				: new Date().toISOString(),
		}));

		res.setHeader(
			'Cache-Control',
			'public, s-maxage=5, stale-while-revalidate=15',
		);
		return res.status(200).json({ logs: formattedLogs });
	} catch (error: any) {
		console.error('Error fetching IndexNow submission logs:', error);
		return res.status(500).json({
			message: 'Failed to fetch IndexNow history',
			error: error?.message || String(error),
		});
	}
}
