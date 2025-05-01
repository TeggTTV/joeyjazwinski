import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';
import { TutorialData } from '../../utils/db';

type ResponseData = {
	message?: string;
	error?: string;
	tutorialPost?: TutorialData;
	tutorials?: TutorialData[];
};

export default async function GET(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	const prisma = new PrismaClient();

	try {
		const { slug } = req.query;

		if (slug) {
			const tutorialPost = await prisma.tutorialPost.findUnique({
				where: { slug: String(slug) },
			});

			if (!tutorialPost) {
				return res.status(404).json({
					error: 'Tutorial post not found.',
				});
			}

			// console.log('Fetched tutorial post:', tutorialPost);

			await prisma.$disconnect();
			return res.status(200).json({
				tutorialPost: {
					title: tutorialPost.title,
					description: tutorialPost.description,
					content: tutorialPost.content ?? '',
					tags: tutorialPost.tags ?? [],
					createdAt: tutorialPost.createdAt ?? '',
					updatedAt: tutorialPost.updatedAt ?? '',
				},
				message: 'Tutorial post found.',
			});
		}

		const tutorialPosts = await prisma.tutorialPost.findMany();
		const sanitizedTutorialPosts = tutorialPosts.map((post) => ({
			...post,
			content: post.content ?? '',
			difficulty: ['Beginner', 'Intermediate', 'Advanced'].includes(
				post.difficulty ?? ''
			)
				? (post.difficulty as 'Beginner' | 'Intermediate' | 'Advanced')
				: undefined,
		}));
		await prisma.$disconnect();
		return res.status(200).json({ tutorials: sanitizedTutorialPosts });
	} catch (error: any) {
		console.error('Error fetching tutorial posts:', error);

		// Ensure the error response is always JSON
		await prisma.$disconnect();
		return res.status(500).json({
			message: 'Internal server error.',
			error: error.message || 'Failed to fetch tutorial posts.',
		});
	} finally {
		await prisma.$disconnect();
	}
}
