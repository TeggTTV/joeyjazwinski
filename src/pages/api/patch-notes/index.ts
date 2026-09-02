import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@/generated/prisma';
import { getSynchronizedPatchNotes } from '@/utils/patchNotesSync';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const prisma = new PrismaClient();

	try {
		if (req.method === 'GET') {
			const { version } = req.query;

			if (version && typeof version === 'string') {
				const note = await prisma.patchNote.findUnique({
					where: { version },
				});
				if (!note) {
					return res.status(404).json({ message: 'Patch note not found' });
				}
				return res.status(200).json({ patchNote: note });
			}

			// Automatically synchronizes any new git commits into MongoDB and returns sorted notes
			const patchNotes = await getSynchronizedPatchNotes();

			res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60');
			return res.status(200).json({ patchNotes });
		}

		if (req.method === 'POST') {
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

			const { version, title, date, changes, type } = req.body;

			if (!version || !title || !Array.isArray(changes) || changes.length === 0) {
				return res.status(400).json({
					message: 'Missing required fields: version, title, changes array',
				});
			}

			// Check for duplicate version
			const existing = await prisma.patchNote.findUnique({
				where: { version },
			});

			if (existing) {
				return res.status(409).json({
					message: `Patch note version ${version} already exists.`,
				});
			}

			const newPatchNote = await prisma.patchNote.create({
				data: {
					version: String(version).trim(),
					title: String(title).trim(),
					date: date ? String(date) : `Commits on ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
					changes: changes.map((c: any) => String(c).trim()).filter(Boolean),
					type: type === 'major' || type === 'minor' ? type : 'patch',
				},
			});

			// Also log administrative activity
			await prisma.activityLog.create({
				data: {
					action: 'Created Patch Note',
					description: `Published version ${newPatchNote.version}: ${newPatchNote.title}`,
					userId: admin.id,
				},
			});

			return res.status(201).json({
				message: 'Patch note created successfully',
				patchNote: newPatchNote,
			});
		}

		return res.status(405).json({ message: 'Method not allowed' });
	} catch (error: any) {
		console.error('Error in /api/patch-notes:', error);
		return res.status(500).json({
			message: 'Internal server error',
			error: error?.message || String(error),
		});
	} finally {
		await prisma.$disconnect();
	}
}
