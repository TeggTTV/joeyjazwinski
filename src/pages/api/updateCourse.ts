import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';
import { Course } from '@/lib/mdx';

type ResponseData = {
	message?: string;
	error?: string;
};
export default async function POST(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	try {
		const prisma = new PrismaClient();

		await prisma.$connect(); // Connect to the database

		const data = JSON.parse(req.body) as Course[]; // Corrected type from Cours[] to Course[]

		await Promise.all(
			Object.values(data).map(async (course) => {
				await prisma.course.updateMany({
					where: { id: course.id },
					data: {
						title: course.title,
						description: course.description,
						progressional: course.progressional,
						order: course.order,
						ratings: course.ratings,
						duration: course.duration,
					},
				});
				await Promise.all(
					course.lessons.map(async (lesson) => {
						await prisma.lesson.updateMany({
							where: { id: lesson.id },
							data: {
								title: lesson.title,
								description: lesson.description,
								courseSlug: lesson.courseSlug,
							},
						});

						await Promise.all(
							lesson.exercises.map(async (exercise) => {
								await prisma.exercise.updateMany({
									where: { id: exercise.id },
									data: {
										question: exercise.question,
										type: exercise.type,
										options: exercise.options,
										correctAnswer: exercise.correctAnswer,
										hint: exercise.hint,
										lessonSlug: lesson.slug,
									},
								});
							})
						);
					})
				);
			})
		);

		// console.log('Courses and lessons seeded successfully.');
		return res.status(200).json({
			message: 'Courses and lessons seeded successfully.',
		});
	} catch (error) {
		console.error('Error initializing PrismaClient:', error);
		return res.status(500).json({
			message: 'Internal server error',
			error: error instanceof Error ? error.message : String(error),
		});
	}
}
