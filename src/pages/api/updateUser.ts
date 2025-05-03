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

	const userId = req.body.id; // Assuming you are sending the userId in the request body
	const { name, email } = req.body; // Parse the request body to get the userId

	try {
		const user = await prisma.user.findUnique({
			where: { id: authToken },
		});

		if (!user) {
			await prisma.$disconnect();
			return res.status(401).json({ message: 'Unauthorized' });
		}

		await prisma.user
			.update({
				where: { id: userId },
				data: {
					name: name,
					email: email,
				},
			})
			.then(() => {
                console.log('User updated successfully.');
				return res
					.status(200)
					.json({ message: 'User updated successfully.' });
			})
			.catch((error) => {
				console.error('Error deleting user:', error);
				return res
					.status(400)
					.json({ message: 'Failed to delete user.' });
			});

		await prisma.$disconnect();
		return res.status(200).json({ message: 'User deleted successfully.' });
	} catch (error) {
		await prisma.$disconnect();
		console.error('Error deleting user:', error);
		return res.status(500).json({ message: 'Internal server error.' });
	} finally {
        await prisma.$disconnect();
    }
}
