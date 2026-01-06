import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';

type ResponseData = {
	message?: string;
	error?: string;
	course?: {
		title: string;
		description: string;
		tags: string[];
	};
};

export default async function POST(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	const data: {
		slug?: string;
	} = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
	const prisma = new PrismaClient();

	try {
		await prisma.$connect();

		await prisma.course
			.findFirst({
				where: {
					slug: data.slug,
				},
				include: {
					lessons: {
						include: {
							exercises: true,
						},
					},
				},
			})
			.then(async (course) => {
				if (!course) {
					return res.status(404).json({
						error: 'Course not found.',
					});
				}

				await prisma.$disconnect();

				return res.status(200).json({
					course,
				});
			})
			.catch(async (error) => {
				await prisma.$disconnect();
				console.error('Error fetching course:', error);
				return res.status(500).json({
					error: 'Internal server error.',
				});
			});
	} catch (error: unknown) {
		await prisma.$disconnect();
		console.error('Error fetching course:', error);
		return res.status(500).json({
			error: 'Internal server error.',
		});
	}
}
