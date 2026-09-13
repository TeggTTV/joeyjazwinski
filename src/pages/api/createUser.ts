import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';
import { rateLimit } from '@/utils/rateLimit';

type ResponseData = {
	message: string;
};

export default async function POST(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	// Restrict to 5 account creations per hour per IP
	const allowed = rateLimit(req, res, {
		windowMs: 60 * 60 * 1000,
		max: 5,
		message: 'Too many accounts created from this network. Please try again later.',
	});
	if (!allowed) return;

	const prisma = new PrismaClient();
	const { email, password, name } = req.body || {};

	if (!email || !password) {
		res.status(400).json({ message: 'Email and password are required' });
		return;
	}

	if (
		typeof email !== 'string' ||
		typeof password !== 'string' ||
		email.length > 254 ||
		password.length > 128 ||
		(name && typeof name === 'string' && name.length > 100)
	) {
		res.status(400).json({ message: 'Invalid field length or type.' });
		return;
	}

	try {
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});
		if (existingUser) {
			res.status(409).json({ message: 'User already exists' });
			return;
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const sessionToken = new ObjectId().toHexString(); // Generate a valid MongoDB ObjectID

		console.log('Creating user with:', { name, email, hashedPassword, sessionToken });
	
		await prisma.user.create({
			data: {
				name,
				email,
				username: name || email.split('@')[0], // Use name or derive from email
				password: hashedPassword,
				sessionToken: sessionToken, // Generate a valid MongoDB ObjectID
			},
		});

		// Log Activity
		try {
			await prisma.activityLog.create({
				data: {
					action: 'New User Signup',
					description: `New user signed up: ${name || email}`,
				},
			});
		} catch (logError) {
			console.error('Failed to log activity:', logError);
		}

		await prisma.$disconnect();
		return res.status(201).json({ message: 'User created successfully' });
	} catch (error) {
		await prisma.$disconnect();
		console.error('Error creating user:', error);
		return res.status(500).json({ message: 'Failed to create user' });
	} finally {
		await prisma.$disconnect();
	}
}
