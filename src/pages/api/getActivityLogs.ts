import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	try {
		const logs = await prisma.activityLog.findMany({
			orderBy: {
				createdAt: 'desc',
			},
			take: 20, // Limit to recent 20
		});

		// Format dates relative to now if needed, or just send raw
		return res.status(200).json({ logs });
	} catch (error: any) {
		console.error('Error fetching activity logs:', error);
		return res
			.status(500)
			.json({ message: 'Internal server error', error: error.message });
	} finally {
		await prisma.$disconnect();
	}
}
