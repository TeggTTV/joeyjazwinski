import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';

type ResponseData = {
	message?: string;
	user?: any;
};

export default async function GET(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	const prisma = new PrismaClient();

	try {
		const authToken = req.cookies.authToken; // Assuming you have a userId in cookies
		if (!authToken) {
			await prisma.$disconnect();
			return res.status(401).json({ message: 'Unauthorized' });
		}

		await prisma.user
			.findUnique({
				where: { id: authToken },
				include: {
					messages: {
						select: {
							id: true,
							title: true,
							description: true,
							createdAt: true,
						},
					},
				},
			})
			.then(async (user) => {
				if (!user) {
					await prisma.$disconnect();
					return res.status(401).json({ message: 'Unauthorized' });
				}
				return res.status(200).json({
					user: user,
					message: 'User fetched successfully.',
				});
			});
	} catch (error) {
		await prisma.$disconnect();
		console.error('Error fetching blog posts:', error);
		return res.status(500).json({ message: 'Internal server error.' });
	}
}
