import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/prisma';
import { parse } from 'cookie';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	const { messageId } = req.body;

	if (!messageId) {
		return res.status(400).json({ message: 'Missing message ID' });
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

		await prisma.contactMessage.update({
			where: { id: messageId },
			data: { read: true },
		});

		res.status(200).json({ success: true });
	} catch (error) {
		console.error('Error marking message read:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}
