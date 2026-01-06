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

	const { slug, rating } = req.body;

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

		let rawRatings = course.rating;
		// Handle malformed data where Prisma saved { set: [...] } literal object in JSON field
		if (
			rawRatings &&
			typeof rawRatings === 'object' &&
			!Array.isArray(rawRatings) &&
			'set' in rawRatings
		) {
			rawRatings = (rawRatings as any).set;
		}

		const ratings: Rating[] = Array.isArray(rawRatings)
			? (rawRatings.filter(
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

		// Serialize the ratings array to ensure compatibility with InputJsonValue
		const updatedRatings = [...ratings, { userId, rating }];

		// Update the course with the new rating
		await prisma.course
			.update({
				where: {
					slug,
				},
				data: {
					rating: updatedRatings as any, // Save directly as JSON array
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
