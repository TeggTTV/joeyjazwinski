import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';

type ResponseData = {
	message: string;
};

export default async function POST(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	const prisma = new PrismaClient();
	const messageId = req.body; // Assuming you have a userId in cookies
	const authToken = req.cookies.authToken; // Assuming you have a userId in cookies

	try {
		if (!authToken) {
			await prisma.$disconnect();
			return res.status(401).json({ message: 'Unauthorized' });
		}

		const message = await prisma.message.delete({
			where: { id: messageId },
		});

		if (!message) {
			await prisma.$disconnect();
			return res.status(404).json({ message: 'Message not found' });
		}

		await prisma.$disconnect();
		return res
			.status(200)
			.json({ message: 'Message deleted successfully' });
	} catch (error) {
		await prisma.$disconnect();
		console.error('Error deleting message:', error);
		return res.status(500).json({ message: 'Internal server error' });
	} finally {
		await prisma.$disconnect();
	}
}
