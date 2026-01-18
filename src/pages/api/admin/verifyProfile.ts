import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	const prisma = new PrismaClient();
	const token = req.cookies.authToken;

	if (!token) {
		await prisma.$disconnect();
		return res.status(401).json({ message: 'Unauthorized' });
	}

	const { userId, approve } = req.body;

	if (!userId) {
		return res.status(400).json({ message: 'User ID required' });
	}

	try {
		// Verify admin
		const admin = await prisma.user.findUnique({
			where: { id: token },
		});

		if (!admin || !admin.thejoey) {
			await prisma.$disconnect();
			return res.status(403).json({ message: 'Forbidden' });
		}

		if (approve) {
			// Approve: Set verified to true
			await prisma.user.update({
				where: { id: userId },
				data: { isProfileVerified: true },
			});
			res.status(200).json({ message: 'Profile verified' });
		} else {
			// Reject: We could delete fields, but for now lets just verify them essentially "ignoring" the update but keeping their data
			// Alternatively, we could clear their bio/links if they were inappropriate.
			// For safety, let's just mark it as unverified but strictly notify we reviewed it?
			// Actually, usually "Reject" implies reverting or clearing.
			// Let's implement a soft reject: just leave it unverified.

			// Or better: Clear the offensive fields? No that's destructive.
			// Let's just keep it unverified. If they update again, it shows up again.
			// To hide "pending" status, we might need a status field like 'rejected'.
			// For now, let's assume 'Reject' clears their bio if it was the issue.
			// Simpler: Just set verified to true (clearing the pending flag) BUT clear the status?
			// No, let's just leave it logic simple:
			// Approve -> isProfileVerified = true.
			// Reject -> resets fields to null? Risky.

			// Let's stick to Approve only for this MVP. Rejecting effectively means *not* approving.
			// But to clear it from the list, we MUST take action.
			// Let's say Reject clears the specific fields to null (resetting profile).

			await prisma.user.update({
				where: { id: userId },
				data: {
					bio: null,
					website: null,
					twitter: null,
					github: null,
					linkedin: null,
					profileImage: null,
					isProfileVerified: true, // Set to true so they aren't "pending" anymore, but they are empty now.
				},
			});

			res.status(200).json({ message: 'Profile rejected and reset' });
		}

		await prisma.$disconnect();
	} catch (error) {
		await prisma.$disconnect();
		console.error('Error verifying profile:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}
