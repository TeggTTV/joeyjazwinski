import { execFileSync } from 'child_process';
import { prisma } from '@/utils/prisma';
import { PATCH_NOTES, PatchNote } from '@/data/patchNotes';

export interface PatchNoteData {
	id?: string;
	version: string;
	title: string;
	date: string;
	changes: string[];
	type: 'major' | 'minor' | 'patch';
}

function parseSemver(v: string): number[] {
	return v.replace(/^v/, '').split('.').map((p) => parseInt(p, 10) || 0);
}

export function compareSemverDesc(a: string, b: string): number {
	const pa = parseSemver(a);
	const pb = parseSemver(b);
	for (let i = 0; i < 3; i++) {
		if ((pa[i] || 0) > (pb[i] || 0)) return -1;
		if ((pa[i] || 0) < (pb[i] || 0)) return 1;
	}
	return 0;
}

function generateTitleFromChanges(changes: string[]): string {
	const feats = changes.filter((c) => c.toLowerCase().startsWith('feat:'));
	if (feats.length > 0) {
		const raw = feats[0].replace(/^feat:\s*/i, '');
		const clean = raw.split(' and ')[0].split(',')[0].trim();
		return clean.charAt(0).toUpperCase() + clean.slice(1);
	}
	const fixes = changes.filter((c) => c.toLowerCase().startsWith('fix:'));
	if (fixes.length > 0) return 'Fixes & Performance Improvements';
	return 'System Updates & Improvements';
}

function formatDateLabel(dateStr: string): string {
	// dateStr is 'YYYY-MM-DD'
	const [y, m, d] = dateStr.split('-').map(Number);
	const dateObj = new Date(Date.UTC(y, m - 1, d));
	const monthStr = dateObj.toLocaleDateString('en-US', {
		month: 'short',
		timeZone: 'UTC',
	});
	return `Commits on ${monthStr} ${d}, ${y}`;
}

export function detectReleaseType(changes: string[]): 'major' | 'minor' | 'patch' {
	const hasBreaking = changes.some((c) => c.includes('BREAKING') || c.includes('major'));
	if (hasBreaking) return 'major';
	const featCount = changes.filter((c) => c.toLowerCase().startsWith('feat:')).length;
	if (featCount >= 2) return 'minor';
	return 'patch';
}

/**
 * Syncs any new git commits directly into MongoDB patch_notes collection.
 * Any commits on days not yet registered as a patch note version will be automatically
 * bundled into a new patch release note and persisted to the database.
 */
export async function syncGitCommitsToDatabase(): Promise<void> {
	try {
		// 1. Get all existing notes from database
		let dbNotes = await prisma.patchNote.findMany();

		// If DB has no notes yet, seed them from PATCH_NOTES
		if (dbNotes.length === 0) {
			for (const note of PATCH_NOTES) {
				await prisma.patchNote.create({
					data: {
						version: note.version,
						title: note.title,
						date: note.date,
						changes: note.changes,
						type: note.type,
					},
				});
			}
			dbNotes = await prisma.patchNote.findMany();
		}

		// Map existing dates/versions to avoid duplicate creation
		const existingVersions = new Set(dbNotes.map((n) => n.version));
		const existingDates = new Set(
			dbNotes.map((n) => n.date.toLowerCase().replace(/\s+/g, ' ').trim())
		);

		// 2. Read git commits
		const raw = execFileSync('git', ['log', '--date=short', '--pretty=format:%h|||%ad|||%s'], {
			cwd: process.cwd(),
			encoding: 'utf-8',
			maxBuffer: 10 * 1024 * 1024,
		});

		const lines = raw.split('\n').filter((l) => l.trim().length > 0);
		const dateMap = new Map<string, string[]>();

		for (const line of lines) {
			const [hash, date, subject] = line.split('|||');
			if (!date || !subject) continue;
			if (!dateMap.has(date)) dateMap.set(date, []);
			dateMap.get(date)!.push(subject.trim());
		}

		// Sort existing versions to know what the highest version currently is
		const sortedVersions = Array.from(existingVersions).sort(compareSemverDesc);
		let [curMajor, curMinor, curPatch] = sortedVersions.length > 0
			? parseSemver(sortedVersions[0])
			: [1, 9, 10];

		// Iterate through dates from oldest to newest to generate version increments sequentially
		const allCommitDates = Array.from(dateMap.keys()).sort(); // ascending 'YYYY-MM-DD'

		for (const dateStr of allCommitDates) {
			const formattedDate = formatDateLabel(dateStr).toLowerCase();
			const isoDate = dateStr.toLowerCase();

			// Check if this date is already covered by an existing patch note
			const isCovered = Array.from(existingDates).some(
				(d) => d.includes(formattedDate) || d.includes(isoDate)
			);

			if (!isCovered) {
				const changes = dateMap.get(dateStr)!;
				const releaseType = detectReleaseType(changes);
				if (releaseType === 'major') {
					curMajor += 1;
					curMinor = 0;
					curPatch = 0;
				} else if (releaseType === 'minor') {
					curMinor += 1;
					curPatch = 0;
				} else {
					curPatch += 1;
				}

				let newVersion = `${curMajor}.${curMinor}.${curPatch}`;
				// Ensure version uniqueness
				while (existingVersions.has(newVersion)) {
					curPatch += 1;
					newVersion = `${curMajor}.${curMinor}.${curPatch}`;
				}

				const title = generateTitleFromChanges(changes);
				const labelDate = formatDateLabel(dateStr);

				// Create in MongoDB
				await prisma.patchNote.create({
					data: {
						version: newVersion,
						title,
						date: labelDate,
						type: releaseType,
						changes,
					},
				});

				existingVersions.add(newVersion);
				existingDates.add(labelDate.toLowerCase());
				existingDates.add(isoDate);
			}
		}
	} catch (error) {
		console.error('Error during syncGitCommitsToDatabase:', error);
	}
}

/**
 * Returns all patch notes from MongoDB sorted by semver descending,
 * automatically running syncGitCommitsToDatabase first.
 */
export async function getSynchronizedPatchNotes(): Promise<PatchNoteData[]> {
	// Sync new git commits to MongoDB first
	await syncGitCommitsToDatabase();

	const notes = await prisma.patchNote.findMany();
	const mapped: PatchNoteData[] = notes.map((n) => ({
		id: n.id,
		version: n.version,
		title: n.title,
		date: n.date,
		changes: n.changes,
		type: (n.type as 'major' | 'minor' | 'patch') || 'patch',
	}));

	mapped.sort((a, b) => compareSemverDesc(a.version, b.version));
	return mapped;
}
