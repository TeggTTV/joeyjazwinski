import type { NextApiRequest, NextApiResponse } from 'next';
import { votePoll } from '@/services/pollService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST']);
		return res.status(405).json({ message: `Method ${req.method} not allowed` });
	}

	const { id } = req.query;
	const { optionIds, optionId } = req.body;

	if (!id || typeof id !== 'string') {
		return res.status(400).json({ message: 'Invalid poll ID' });
	}

	const targetOptionIds: string[] = Array.isArray(optionIds)
		? optionIds
		: optionId
		? [optionId]
		: [];

	if (targetOptionIds.length === 0) {
		return res.status(400).json({ message: 'At least one option must be selected to vote' });
	}

	try {
		const updatedPoll = await votePoll(id, targetOptionIds);
		return res.status(200).json(updatedPoll);
	} catch (error: any) {
		console.error('Error voting on poll:', error);
		const status = error.message?.includes('expired') ? 400 : 500;
		return res.status(status).json({ message: error.message || 'Failed to submit vote' });
	}
}
