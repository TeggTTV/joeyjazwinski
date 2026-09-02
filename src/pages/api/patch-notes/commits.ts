import type { NextApiRequest, NextApiResponse } from 'next';
import { execFileSync } from 'child_process';

export interface GitCommitItem {
	hash: string;
	shortHash: string;
	date: string;
	author: string;
	subject: string;
	type: 'feat' | 'fix' | 'refactor' | 'chore' | 'docs' | 'perf' | 'other';
}

function detectCommitType(subject: string): GitCommitItem['type'] {
	const lower = subject.toLowerCase().trim();
	if (lower.startsWith('feat') || lower.includes('feature')) return 'feat';
	if (lower.startsWith('fix') || lower.includes('bugfix') || lower.includes('patch')) return 'fix';
	if (lower.startsWith('refactor')) return 'refactor';
	if (lower.startsWith('chore')) return 'chore';
	if (lower.startsWith('docs')) return 'docs';
	if (lower.startsWith('perf')) return 'perf';
	return 'other';
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	try {
		const limit = typeof req.query.limit === 'string' ? Math.min(parseInt(req.query.limit, 10) || 50, 150) : 50;

		// Run git log safely with execFileSync
		// Delimiter chosen to be rare and safe
		const DELIMITER = '<--GIT_COMMIT_SEP-->';
		const format = `%H${DELIMITER}%h${DELIMITER}%ad${DELIMITER}%an${DELIMITER}%s`;

		const rawOutput = execFileSync(
			'git',
			['log', `-n`, `${limit}`, `--date=short`, `--pretty=format:${format}`],
			{
				cwd: process.cwd(),
				encoding: 'utf-8',
				maxBuffer: 10 * 1024 * 1024,
			}
		);

		const lines = rawOutput.split('\n').filter((l) => l.trim().length > 0);
		const commits: GitCommitItem[] = lines.map((line) => {
			const [hash, shortHash, date, author, subject] = line.split(DELIMITER);
			const cleanSubject = (subject || '').trim();
			return {
				hash: (hash || '').trim(),
				shortHash: (shortHash || '').trim(),
				date: (date || '').trim(),
				author: (author || '').trim(),
				subject: cleanSubject,
				type: detectCommitType(cleanSubject),
			};
		});

		res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60');
		return res.status(200).json({ commits, total: commits.length });
	} catch (error: any) {
		console.error('Error fetching git commits:', error);
		return res.status(500).json({
			message: 'Failed to retrieve repository commit history.',
			error: error?.message || String(error),
		});
	}
}
