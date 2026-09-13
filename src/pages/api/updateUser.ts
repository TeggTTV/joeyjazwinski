import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/prisma';
import { getSession } from '@/utils/auth';
import { rateLimit } from '@/utils/rateLimit';

type ResponseData = {
	message: string;
};

export default async function POST(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	const allowed = rateLimit(req, res, {
		windowMs: 60 * 1000,
		max: 30,
	});
	if (!allowed) return;

	const session = await getSession(req);
	if (!session?.user?.id) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	const { id, name, email, lastActivityDate, currentStreak } = req.body || {};
	const targetUserId = id || session.user.id;

	// Users may only update their own record unless they are admin
	if (targetUserId !== session.user.id && !session.user.thejoey) {
		return res.status(403).json({ message: 'Forbidden. You cannot update another user.' });
	}

	try {
		await prisma.user.update({
			where: { id: targetUserId },
			data: {
				...(name && typeof name === 'string' && { name: name.slice(0, 100) }),
				...(email && typeof email === 'string' && { email: email.slice(0, 254) }),
				...(lastActivityDate && { lastActivityDate: new Date(lastActivityDate) }),
				...(typeof currentStreak === 'number' && { currentStreak }),
			},
		});

		return res.status(200).json({ message: 'User updated successfully.' });
	} catch (error) {
		console.error('Error updating user:', error);
		return res.status(500).json({ message: 'Internal server error.' });
	}
}

