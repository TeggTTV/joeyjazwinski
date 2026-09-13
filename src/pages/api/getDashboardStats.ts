import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/prisma';
import { getSession } from '@/utils/auth';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession(req);
	if (!session?.user?.thejoey) {
		return res.status(403).json({ message: 'Forbidden. Admin access required.' });
	}
	try {
		// Fetch real counts
		const userCount = await prisma.user.count();
		const courseCount = await prisma.course.count();
		const blogCount = await prisma.blogPost.count();
		const patchNotesCount = await prisma.patchNote.count();

		// Views/Revenue are placeholders as we don't have analytics/payments yet
		// but we can at least return 0 or 'N/A' instead of fake high numbers to be honest.

		return res.status(200).json({
			users: userCount,
			courses: courseCount,
			blogs: blogCount,
			patchNotes: patchNotesCount,
			views: 0, // Placeholder
			revenue: 0, // Placeholder
		});
	} catch (error: any) {
		console.error('Error fetching dashboard stats:', error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

