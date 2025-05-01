import { PrismaClient } from '../../generated/prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'cookie';

const prisma = new PrismaClient();

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
	const cookies = parse(req.headers.cookie || '');
	const userId = cookies.authToken;
	const sessionToken = cookies.sessionToken;

	const { courseSlug, lessonSlug, dataToStore } = req.body;
	try {
		if (req.method === 'POST') {
			if (
				!userId ||
				!sessionToken ||
				!courseSlug ||
				!lessonSlug ||
				!dataToStore
			) {
				await prisma.$disconnect();
				return res.status(400).json({
					error: 'Missing required fields',
					fields: [userId, courseSlug, lessonSlug, dataToStore],
				});
			}

			// console.log('Data to store:', courseSlug, lessonSlug, dataToStore);

			// update course for the user
			// await prisma.user.update({
			//     where: {
			//         id: userId as string,
			//         sessionToken: sessionToken as string,
			//     },
			//     data: {

			// },

			// await prisma.user.update({
			// 	where: {
			// 		id: userId as string,
			// 		sessionToken: sessionToken as string,
			// 	},

			// });

			await prisma.$disconnect();
			return res.status(200).json({
				message: 'User course data updated successfully',
				data: { courseSlug, lessonSlug },
			});
		} else {
			await prisma.$disconnect();
			res.setHeader('Allow', ['POST']);
			return res
				.status(405)
				.json({ error: `Method ${req.method} not allowed` });
		}
	} catch (error) {
		await prisma.$disconnect();
		console.error('Error updating user course data:', error);
		return res
			.status(500)
			.json({ error: 'Internal server error: ' + error });
	}
}
