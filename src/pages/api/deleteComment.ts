import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';

type ResponseData = {
	message?: string;
	error?: any;
};

export default async function DELETE(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	if (req.method !== 'DELETE') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	const prisma = new PrismaClient();

	try {
		const { id } = req.query; // Get comment ID from query params
		const { authToken } = req.cookies;

		if (!id || typeof id !== 'string') {
			await prisma.$disconnect();
			return res.status(400).json({ message: 'Invalid comment ID' });
		}

		// Optional: Check ownership. For now, assuming if they have authToken they might be allowed,
		// but ideally check if comment.authorId === authToken.
		const comment = await prisma.comment.findUnique({
			where: { id },
		});

		if (!comment) {
			await prisma.$disconnect();
			return res.status(404).json({ message: 'Comment not found' });
		}

		if (authToken && comment.authorId !== authToken) {
			// Allow admin override if needed, but for now restrict to author
			// If you have an admin flag on user, check that too.
			// Assuming no admin check for now for simplicity unless 'thejoey' field is relevant.
			// Let's check user for 'thejoey'
			const user = await prisma.user.findUnique({
				where: { id: authToken },
			});
			if (!user?.thejoey) {
				await prisma.$disconnect();
				return res.status(403).json({ message: 'Unauthorized' });
			}
		} else if (!authToken) {
			await prisma.$disconnect();
			return res.status(401).json({ message: 'Not authenticated' });
		}

		await prisma.comment.delete({
			where: { id },
		});

		await prisma.$disconnect();
		return res
			.status(200)
			.json({ message: 'Comment deleted successfully.' });
	} catch (error) {
		await prisma.$disconnect();
		console.error('Error deleting comment:', error);
		return res
			.status(500)
			.json({ message: 'Internal server error.', error });
	}
}
