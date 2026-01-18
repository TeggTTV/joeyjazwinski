import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/prisma';
import { parse } from 'cookie';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	try {
		const cookies = parse(req.headers.cookie || '');
		const authToken = cookies.authToken;

		if (!authToken) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		const user = await prisma.user.findUnique({
			where: { id: authToken },
			select: { thejoey: true },
		});

		if (!user || !user.thejoey) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		const messages = await prisma.contactMessage.findMany({
			orderBy: {
				createdAt: 'desc',
			},
		});

		res.status(200).json({ messages });
	} catch (error) {
		console.error('Error fetching contact messages:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}
