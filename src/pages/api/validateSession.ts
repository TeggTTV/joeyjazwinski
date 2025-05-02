import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';
import { parse } from 'cookie';

type ResponseData = {
	isAuthenticated: boolean;
	userId?: string;
	isJoey?: boolean;
};

export default async function GET(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	const prisma = new PrismaClient();

	try {
		const cookies = parse(req.headers.cookie || '');
		const authToken = cookies.authToken;

		if (!authToken) {
			await prisma.$disconnect();
			return res.status(201).json({ isAuthenticated: false });
			return;
		}

		const user = await prisma.user.findUnique({
			where: { id: authToken },
			select: { id: true, thejoey: true },
		});

		if (!user) {
			await prisma.$disconnect();
			return res.status(401).json({ isAuthenticated: false });
		}

		await prisma.$disconnect();
		return res.status(200).json({ isAuthenticated: true, userId: user.id, isJoey: user.thejoey || false });
	} catch (error) {
		await prisma.$disconnect();
		console.error('Error validating session:', error);
		return res.status(500).json({ isAuthenticated: false });
	} finally {
		await prisma.$disconnect();
	}
}
