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
		max: 10,
	});
	if (!allowed) return;

	const session = await getSession(req);
	if (!session?.user?.thejoey) {
		return res.status(403).json({ message: 'Forbidden. Admin access required.' });
	}

	const userId = typeof req.body === 'string' ? req.body : req.body?.id || req.body?.userId;

	if (!userId || typeof userId !== 'string') {
		return res.status(400).json({ message: 'Invalid user ID' });
	}

	try {
		await prisma.user.delete({
			where: { id: userId },
		});

		return res.status(200).json({ message: 'User deleted successfully.' });
	} catch (error) {
		console.error('Error deleting user:', error);
		return res.status(500).json({ message: 'Internal server error.' });
	}
}
