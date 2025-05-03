import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';

type ResponseData = {
	message: string;
};

export default async function POST(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	const prisma = new PrismaClient();
	const authToken = req.cookies.authToken; // Assuming you have a userId in cookies
	if (!authToken) {
		await prisma.$disconnect();
		return res.status(401).json({ message: 'Unauthorized' });
	}

	try {
		const user = await prisma.user.findUnique({
			where: { id: authToken },
		});

		if (!user) {
			await prisma.$disconnect();
			return res.status(401).json({ message: 'Unauthorized' });
		}

		const slug = req.body;
		await prisma.blogPost
			.delete({
				where: { slug: slug },
			})
			.catch((error) => {
				console.error('Error deleting blog post:', error);
				return res
					.status(400)
					.json({ message: 'Failed to delete blog post.' });
			});

		await prisma.$disconnect();
		return res
			.status(200)
			.json({ message: 'Blog post deleted successfully.' });
	} catch (error) {
		await prisma.$disconnect();
		console.error('Error deleting blog post:', error);
		return res.status(500).json({ message: 'Internal server error.' });
	}
}
