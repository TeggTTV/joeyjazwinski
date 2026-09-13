import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';
import { rateLimit } from '@/utils/rateLimit';

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	// Limit to 5 submissions per hour per IP
	const allowed = rateLimit(req, res, {
		windowMs: 60 * 60 * 1000,
		max: 5,
		message: 'Too many contact messages submitted. Please try again in an hour.',
	});
	if (!allowed) return;

	try {
		const { name, email, subject, message } = req.body || {};

		if (!name || !email || !message) {
			return res.status(400).json({ message: 'Missing required fields' });
		}

		if (
			typeof name !== 'string' ||
			typeof email !== 'string' ||
			typeof message !== 'string' ||
			name.length > 150 ||
			email.length > 254 ||
			(subject && typeof subject === 'string' && subject.length > 300) ||
			message.length > 5000
		) {
			return res.status(400).json({ message: 'Input exceeds allowed size limits.' });
		}

		await prisma.contactMessage.create({
			data: {
				name: name.trim(),
				email: email.trim().toLowerCase(),
				subject: typeof subject === 'string' ? subject.trim() : undefined,
				message: message.trim(),
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

