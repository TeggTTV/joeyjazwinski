import type { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'cookie';
import { prisma } from '../../utils/prisma';

type ResponseData = {
	isAuthenticated: boolean;
	userId?: string;
	isJoey?: boolean;
};

export default async function GET(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	try {
		const cookies = parse(req.headers.cookie || '');
		const authToken = cookies.authToken;

		if (!authToken) {
			return res.status(201).json({ isAuthenticated: false });
		}

		const user = await prisma.user.findUnique({
			where: { id: authToken },
			select: { id: true, thejoey: true },
		});

		if (!user) {
			return res.status(401).json({ isAuthenticated: false });
		}

		return res.status(200).json({ isAuthenticated: true, userId: user.id, isJoey: user.thejoey || false });
	} catch (error) {
		console.error('Error validating session:', error);
		return res.status(500).json({ isAuthenticated: false });
	}
}
