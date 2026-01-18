import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';

// Basic safety check for URLs
const isValidUrl = (url: string) => {
	try {
		const parsed = new URL(url);
		return ['http:', 'https:'].includes(parsed.protocol);
	} catch {
		return false;
	}
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	const prisma = new PrismaClient();
	const token = req.cookies.authToken;

	if (!token) {
		await prisma.$disconnect();
		return res.status(401).json({ message: 'Unauthorized' });
	}

	const { username, bio, website, twitter, github, linkedin, profileImage } =
		req.body;

	// Validate URLs if present
	if (website && !isValidUrl(website))
		return res.status(400).json({ message: 'Invalid Website URL' });
	if (twitter && !isValidUrl(twitter))
		return res.status(400).json({ message: 'Invalid Twitter URL' });
	if (github && !isValidUrl(github))
		return res.status(400).json({ message: 'Invalid GitHub URL' });
	if (linkedin && !isValidUrl(linkedin))
		return res.status(400).json({ message: 'Invalid LinkedIn URL' });

	try {
		const user = await prisma.user.findFirst({
			where: {
				OR: [{ id: token }, { sessionToken: token }],
			},
			select: { id: true },
		});

		if (!user) {
			await prisma.$disconnect();
			return res.status(404).json({ message: 'User not found' });
		}

		await prisma.user.update({
			where: { id: user.id },
			data: {
				username,
				bio,
				website,
				twitter,
				github,
				linkedin,
				profileImage,
				isProfileVerified: false,
			},
		});

		await prisma.$disconnect();
		res.status(200).json({
			message: 'Profile updated! Pending admin verification.',
		});
	} catch (error: any) {
		await prisma.$disconnect();
		console.error('Error updating profile:', error);
		if (error.code === 'P2002') {
			return res.status(409).json({ message: 'Username already taken' });
		}
		res.status(500).json({ message: 'Internal server error' });
	}
}
