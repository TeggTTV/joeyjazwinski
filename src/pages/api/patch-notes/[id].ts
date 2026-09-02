import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@/generated/prisma';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const prisma = new PrismaClient();

	try {
		const token = req.cookies.authToken;
		if (!token) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		const admin = await prisma.user.findUnique({
			where: { id: token },
		});
		if (!admin || !admin.thejoey) {
			return res.status(403).json({ message: 'Forbidden' });
		}

		const { id } = req.query;
		if (!id || typeof id !== 'string') {
			return res.status(400).json({ message: 'Valid ID is required' });
		}

		if (req.method === 'PUT') {
			const { version, title, date, changes, type } = req.body;

			const updated = await prisma.patchNote.update({
				where: { id },
				data: {
					...(version && { version: String(version).trim() }),
					...(title && { title: String(title).trim() }),
					...(date && { date: String(date).trim() }),
					...(changes && Array.isArray(changes) && {
						changes: changes.map((c: any) => String(c).trim()).filter(Boolean),
					}),
					...(type && { type }),
				},
			});

			await prisma.activityLog.create({
				data: {
					action: 'Updated Patch Note',
					description: `Modified version ${updated.version}`,
					userId: admin.id,
				},
			});

			return res.status(200).json({
				message: 'Patch note updated successfully',
				patchNote: updated,
			});
		}

		if (req.method === 'DELETE') {
			const deleted = await prisma.patchNote.delete({
				where: { id },
			});

			await prisma.activityLog.create({
				data: {
					action: 'Deleted Patch Note',
					description: `Deleted version ${deleted.version} (${deleted.title})`,
					userId: admin.id,
				},
			});

			return res.status(200).json({
				message: 'Patch note deleted successfully',
			});
		}

		return res.status(405).json({ message: 'Method not allowed' });
	} catch (error: any) {
		console.error(`Error in /api/patch-notes/[id]:`, error);
		return res.status(500).json({
			message: 'Internal server error',
			error: error?.message || String(error),
		});
	} finally {
		await prisma.$disconnect();
	}
}
