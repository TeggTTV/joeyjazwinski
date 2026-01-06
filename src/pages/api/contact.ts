import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	try {
		const { name, email, subject, message } = req.body;

		if (!name || !email || !message) {
			return res.status(400).json({ message: 'Missing required fields' });
		}

		await prisma.contactMessage.create({
			data: {
				name,
				email,
				subject,
				message,
			},
		});

		return res.status(200).json({ message: 'Message sent successfully' });
	} catch (error) {
		console.error('Error sending message:', error);
		return res.status(500).json({ message: 'Internal server error' });
	} finally {
		await prisma.$disconnect();
	}
}
