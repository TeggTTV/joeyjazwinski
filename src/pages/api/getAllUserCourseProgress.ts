import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';
import { parse } from 'cookie';

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	const cookies = parse(req.headers.cookie || '');
	const userId = cookies.authToken;

	if (!userId) {
		return res.status(200).json({ progress: {} });
	}

	try {
		const courseProgresses = await prisma.courseProgress.findMany({
			where: { userId },
		});

		const progressMap: Record<string, boolean> = {};
		courseProgresses.forEach((cp) => {
			progressMap[cp.courseSlug] = cp.completed || false;
		});

		return res.status(200).json({ progress: progressMap });
	} catch (error) {
		console.error('Error fetching user course progress:', error);
		return res.status(500).json({ error: 'Internal server error' });
	} finally {
		await prisma.$disconnect();
	}
}
