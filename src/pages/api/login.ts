import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';

type ResponseData = {
	message: string;
};

export default async function POST(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	const prisma = new PrismaClient();
	const { email, password } = req.body;

	try {
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			await prisma.$disconnect();
			res.status(401).json({ message: 'Invalid credentials' });
			return;
		}

		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) {
			await prisma.$disconnect();
			res.status(401).json({ message: 'Invalid credentials' });
			return;
		}

		const randomNumber = Math.floor(Math.random() * 1000000).toString();
		const now = new Date().toISOString() + randomNumber;
		const hashedSessionToken = bcrypt
			.hashSync(now, 10)
			.replaceAll(/\$/g, '');

		await prisma.user.update({
			where: { id: user.id },
			data: { sessionToken: hashedSessionToken },
		});

		const authCookie = serialize('authToken', user.id, {
			path: '/',
			httpOnly: true,
			// maxAge: 60 * 60 * 24, // 1 day
		});

		const sessionCookie = serialize('sessionToken', hashedSessionToken, {
			path: '/',
			httpOnly: true,
			// maxAge: 60 * 60 * 24, // 1 day
		});

		await prisma.$disconnect();
		res.setHeader('Set-Cookie', [authCookie, sessionCookie]);
		return res.status(200).json({ message: 'Login successful' });
	} catch (error) {
		await prisma.$disconnect();
		console.error('Error logging in:', error);
		return res.status(500).json({ message: 'Failed to login' });
	} finally {
		await prisma.$disconnect();
	}
}
