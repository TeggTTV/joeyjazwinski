import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/prisma';
import { getSession } from '@/utils/auth';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	const session = await getSession(req);
	if (!session || !session.user || !session.user.thejoey) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	const { id } = req.body;

	if (!id) {
		return res.status(400).json({ message: 'Missing track ID' });
	}

	try {
		const track = await prisma.courseTrack.findUnique({
			where: { id },
			select: { slug: true },
		});

		if (!track) {
			return res.status(404).json({ message: 'Track not found' });
		}

		await prisma.$transaction([
			prisma.courseTrackEnrollment.deleteMany({
				where: { trackSlug: track.slug },
			}),
			prisma.courseTrack.delete({
				where: { id },
			}),
		]);

		res.status(200).json({ success: true });
	} catch (error) {
		console.error('Error deleting course track:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}
