import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/prisma';
import { rateLimit } from '@/utils/rateLimit';

type ResponseData = {
	message?: string;
	comment?: any;
	error?: any;
};

export default async function POST(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	// Limit comments to 10 per minute per IP
	const allowed = rateLimit(req, res, {
		windowMs: 60 * 1000,
		max: 10,
		message: 'Too many comments submitted. Please slow down.',
	});
	if (!allowed) return;

	try {
		const { content, slug, parentId } = req.body || {};
		const { authToken } = req.cookies; // Assuming you have a userId in cookies

		if (!authToken) {
			return res.status(401).json({ message: 'Unauthorized. Sign in to comment.' });
		}

		if (!content || typeof content !== 'string' || content.trim().length === 0) {
			return res.status(400).json({ message: 'Comment content cannot be empty.' });
		}

		if (content.length > 2000) {
			return res.status(400).json({ message: 'Comment cannot exceed 2000 characters.' });
		}

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

			return res.status(200).json({
				comment: newComment,
				message: 'Comment created successfully.',
			});
		}

		return res
			.status(400)
			.json({ message: 'Bad request.', error: 'Invalid data' });
	} catch (error) {
		console.error('Error creating comment:', error);
		return res
			.status(500)
			.json({ message: 'Internal server error.', error });
	}
}

