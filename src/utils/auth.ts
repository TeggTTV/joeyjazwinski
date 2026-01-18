import { NextApiRequest } from 'next';
import { prisma } from './prisma';
import { parse } from 'cookie';

export type Session = {
	user: {
		id: string;
		thejoey?: boolean;
		name?: string | null;
		email?: string | null;
	} | null;
} | null;

export async function getSession(req: NextApiRequest): Promise<Session> {
	const cookies = parse(req.headers.cookie || '');
	const authToken = cookies.authToken;

	if (!authToken) {
		return null;
	}

	try {
		const user = await prisma.user.findUnique({
			where: { id: authToken },
			select: {
				id: true,
				thejoey: true,
				name: true,
				email: true,
			},
		});

		if (!user) {
			return null;
		}

		return {
			user: {
				...user,
				thejoey: user.thejoey || false,
			},
		};
	} catch (error) {
		console.error('Error getting session:', error);
		return null;
	}
}
