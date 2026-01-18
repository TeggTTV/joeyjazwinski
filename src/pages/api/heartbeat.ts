import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	const prisma = new PrismaClient();
	const token = req.cookies.authToken;

	if (!token) {
		// We only track logged-in users for now
		await prisma.$disconnect();
		return res.status(200).json({ status: 'ok', tracked: false });
	}

	try {
		await prisma.user.updateMany({
			where: {
				OR: [{ id: token }, { sessionToken: token }],
			},
			data: {
				lastActivityDate: new Date(),
			},
		});

		await prisma.$disconnect();
		res.status(200).json({ status: 'ok', tracked: true });
	} catch (error) {
		await prisma.$disconnect();
		console.error('Error updating heartbeat:', error);
		// Don't fail the client for heartbeat errors
		res.status(200).json({ status: 'error' });
	}
}
