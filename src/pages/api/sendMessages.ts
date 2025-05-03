import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';

type ResponseData = {
	message?: string;
};

export default async function GET(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	const prisma = new PrismaClient();
	const data = JSON.parse(req.body);

	try {
		const authToken = req.cookies.authToken; // Assuming you have a userId in cookies
		if (!authToken) {
			await prisma.$disconnect();
			return res.status(401).json({ message: 'Unauthorized' });
		}


		data.users.forEach(async (user: string) => {
            console.log('User ID:', user, data.users);
            
            await prisma.message
				.create({
					data: {
						title: data.title,
						description: data.description,
						createdAt: new Date(),
						User: {
							connect: {
								id: user,
							},
						},
					},
				})
				.catch((error) => {
					// console.error('Error creating message:', error);
					return res
						.status(500)
						.json({ message: 'Internal server error.' });
				});
		});
		return res.status(200).json({ message: 'ok' });
	} catch (error) {
		await prisma.$disconnect();
		console.error('Error sending message(s):', error);
		return res.status(500).json({ message: 'Internal server error.' });
	}
}
