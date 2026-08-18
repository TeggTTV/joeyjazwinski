import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';
import { ObjectId } from 'mongodb';
import { prisma } from '../../utils/prisma';

type ResponseData = {
	message: string;
};

export default async function POST(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>,
) {
	const { email, password } = req.body;

	try {
		if (!email) {
			res.status(400).json({ message: 'Email is required' });
			return;
		}

		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			res.status(401).json({ message: 'Invalid credentials' });
			return;
		}

		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) {
			res.status(401).json({ message: 'Invalid credentials' });
			return;
		}

		const sessionToken = new ObjectId().toHexString(); // Generate a valid MongoDB ObjectID

		await prisma.user.update({
			where: { id: user.id },
			data: { sessionToken },
		});

		const authCookie = serialize('authToken', user.id, {
			path: '/',
			httpOnly: true,
			// maxAge: 60 * 60 * 24, // 1 day
		});

		const sessionCookie = serialize('sessionToken', sessionToken, {
			path: '/',
			httpOnly: true,
			// maxAge: 60 * 60 * 24, // 1 day
		});

		res.setHeader('Set-Cookie', [authCookie, sessionCookie]);
		return res.status(200).json({ message: 'Login successful' });
	} catch (error) {
		console.error('Error logging in:', error);
		return res.status(500).json({ message: 'Failed to login' });
	}
}
