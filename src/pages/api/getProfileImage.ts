import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../utils/prisma';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	const token = req.cookies.authToken;
	if (!token) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	try {
		const user = await prisma.user.findUnique({
			where: { id: token },
			select: { profileImage: true },
		});

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		return res.status(200).json({ profileImage: user.profileImage });
	} catch (error) {
		console.error('Error fetching profile image:', error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}
