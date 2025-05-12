import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const userId = req.cookies.authToken; // Assuming userId is stored in cookiesx

	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	const { slug, rating } = JSON.parse(req.body);

	if (
		!slug ||
		typeof rating !== 'number' ||
		rating < 1 ||
		rating > 5 ||
		!userId
	) {
		return res.status(400).json({ message: 'Invalid input' });
	}

	const prisma = new PrismaClient();

	try {
		const course = await prisma.course.findUnique({
			where: {
				slug,
			},
		});

		if (!course) {
			return res.status(404).json({ message: 'Course not found' });
		}

		// Ensure the `rating` field is initialized as an empty array if null or not an array
		interface Rating {
			userId: string;
			rating: number;
		}
		const ratings: Rating[] = Array.isArray(course.rating)
			? (course.rating.filter(
					(r) => typeof r === 'object' && r !== null && 'userId' in r
			  ) as unknown as Rating[])
			: [];

		// Check if the user has already rated
		const existingRating = ratings.find((r) => r!.userId === userId);

		// Return a 409 status code if the user has already rated
		if (existingRating) {
			return res
				.status(409)
				.json({ message: 'User has already rated this course' });
		}

		// Update the course with the new rating
		await prisma.course
			.update({
				where: {
					slug,
				},
				data: {
					rating: {
						set: [...ratings, { userId, rating }], // Use `set` to replace the array with the updated one
					},
				},
			})
			.catch((error) => {
				console.error('Error updating course rating:', error);
				return res
					.status(500)
					.json({ message: 'Internal server error' });
			});

		res.status(200).json({ message: 'Rating added successfully' });
		await prisma.$disconnect();
	} catch (error) {
		console.error('Error adding rating:', error);
		res.status(500).json({ message: 'Internal server error' });
		await prisma.$disconnect();
	}
}
