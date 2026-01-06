import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	try {
		const { slug } = req.body;
		const userId = req.cookies.authToken;

		const course = await prisma.course.findUnique({
			where: { slug },
			select: { rating: true },
		});

		// Define interface for Rating
		interface Rating {
			userId: string;
			rating: number;
		}

		let rawRatings = course?.rating;
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

		const average =
			ratings.length > 0
				? ratings.reduce((a, b) => a + b.rating, 0) / ratings.length
				: 0;

		const userRatingEntry = userId
			? ratings.find((r) => r.userId === userId)
			: null;
		const userRating = userRatingEntry ? userRatingEntry.rating : null;

		return res.status(200).json({
			averageRating: average,
			totalRatings: ratings.length,
			userRating: userRating,
		});
	} catch (error: any) {
		console.error('Error getting rating:', error);
		return res.status(500).json({ message: 'Internal server error' });
	} finally {
		await prisma.$disconnect();
	}
}
