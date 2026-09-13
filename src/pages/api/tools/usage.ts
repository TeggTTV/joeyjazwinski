import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { rateLimit } from '@/utils/rateLimit';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const { db } = await connectToDatabase();
		const toolUsageCollection = db.collection('tool_usage');

		if (req.method === 'GET') {
			// Retrieve all tool usage records and format as an object map: { [toolSlug]: usesCount }
			const records = await toolUsageCollection.find({}).toArray();
			const usage: Record<string, number> = {};
			for (const r of records) {
				if (r.tool && typeof r.uses === 'number') {
					usage[r.tool] = r.uses;
				}
			}

			// Add short cache header for quick lookups
			res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60');
			return res.status(200).json({ usage });
		}

		if (req.method === 'POST') {
			// Limit to 30 usage increments per minute per IP
			const allowed = rateLimit(req, res, {
				windowMs: 60 * 1000,
				max: 30,
				message: 'Too many tool usage pings. Please slow down.',
			});
			if (!allowed) return;

			const { tool } = req.body || {};
			if (!tool || typeof tool !== 'string') {
				return res.status(400).json({ message: 'Missing or invalid tool identifier' });
			}

			// Clean tool slug
			const cleanTool = tool
				.replace(/^\/developer-tools\/?/, '')
				.replace(/\/$/, '')
				.trim()
				.toLowerCase();

			if (!cleanTool) {
				return res.status(400).json({ message: 'Invalid tool slug' });
			}

			const now = new Date();
			const result = await toolUsageCollection.findOneAndUpdate(
				{ tool: cleanTool },
				{
					$inc: { uses: 1 },
					$setOnInsert: { createdAt: now },
					$set: { updatedAt: now },
				},
				{ upsert: true, returnDocument: 'after' }
			);

			const updatedUses = result?.uses ?? 1;

			return res.status(200).json({
				success: true,
				tool: cleanTool,
				uses: updatedUses,
			});
		}

		return res.status(405).json({ message: 'Method not allowed' });
	} catch (error) {
		console.error('Error handling tool usage API:', error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}
