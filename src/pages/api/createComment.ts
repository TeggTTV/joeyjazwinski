import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';

type ResponseData = {
	message?: string;
	comment?: any;
	error?: any;
};

export default async function POST(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	const prisma = new PrismaClient();

	try {
		console.log('Request body:', req.body, typeof req.body); // Log the request body for debugging

		// if(!JSON.parse(req.body)) {
		// 	await prisma.$disconnect();
		// 	return res.status(400).json({ message: req.body });
		// }

		const { content, slug, parentId } = req.body;
		const { authToken } = req.cookies; // Assuming you have a userId in cookies

		if (content && slug) {
			const userName = await prisma.user
				.findFirst({
					where: { id: authToken },
					select: { name: true },
				})
				.catch((error) => {
					console.error('Error fetching user name:', error);
					return null;
				});

			const newComment = await prisma.comment
				.create({
					data: {
						authorId: authToken,
						authorName: userName?.name ?? null, // Replace with actual author name if available
						content,
						createdAt: new Date(),
						updatedAt: new Date(),
						postSlug: slug,
						replyingToId: parentId || null,
					},
				})
				.catch((error) => {
					console.error('Error creating comment:', error);
					return res.status(500).json({
						message: 'Internal server error.',
						error: error,
					});
				});

			// Log Activity
			if (newComment) {
				try {
					await prisma.activityLog.create({
						data: {
							action: 'New Comment',
							description: `Comment by ${
								userName?.name || 'Anonymous'
							} on ${slug}`,
							userId: authToken,
						},
					});
				} catch (logError) {
					console.error('Failed to log activity:', logError);
				}
			}

			await prisma.$disconnect();
			return res.status(200).json({
				comment: newComment,
				message: 'Comment created successfully.',
			});
		}

		await prisma.$disconnect();
		return res
			.status(400)
			.json({ message: 'Bad request.', error: 'Invalid data' });
	} catch (error) {
		await prisma.$disconnect();
		console.error('Error fetching blog posts:', error);
		return res
			.status(500)
			.json({ message: 'Internal server error.', error: error });
	}
}
