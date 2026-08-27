import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';

export interface PollOption {
	id: string;
	text: string;
	votes: number;
}

export interface Poll {
	id: string;
	_id?: string;
	title: string;
	description?: string;
	options: PollOption[];
	totalVotes: number;
	durationHours: number;
	expiresAt: string | null;
	isExpired: boolean;
	allowMultiple: boolean;
	category: string;
	authorId?: string | null;
	authorName?: string | null;
	authorUsername?: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface CreatePollInput {
	title: string;
	description?: string;
	options: string[];
	durationHours?: number; // 1, 6, 24, 72, 168, 0
	allowMultiple?: boolean;
	category?: string;
	authorId?: string | null;
	authorName?: string | null;
	authorUsername?: string | null;
}

const COLLECTION_NAME = 'polls';

function formatPollDoc(doc: any): Poll {
	const now = new Date();
	const expiresAtDate = doc.expiresAt ? new Date(doc.expiresAt) : null;
	const isExpired = expiresAtDate ? now > expiresAtDate : false;

	return {
		id: doc._id ? doc._id.toString() : doc.id,
		title: doc.title,
		description: doc.description || '',
		options: (doc.options || []).map((opt: any) => ({
			id: opt.id,
			text: opt.text,
			votes: opt.votes || 0,
		})),
		totalVotes: doc.totalVotes || 0,
		durationHours: doc.durationHours !== undefined ? doc.durationHours : 24,
		expiresAt: doc.expiresAt ? new Date(doc.expiresAt).toISOString() : null,
		isExpired,
		allowMultiple: !!doc.allowMultiple,
		category: doc.category || 'General',
		authorId: doc.authorId ? doc.authorId.toString() : null,
		authorName: doc.authorName || null,
		authorUsername: doc.authorUsername || null,
		createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString(),
		updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : new Date().toISOString(),
	};
}

export async function createPoll(input: CreatePollInput): Promise<Poll> {
	const { db } = await connectToDatabase();

	const title = input.title.trim();
	if (!title) {
		throw new Error('Poll title is required');
	}

	const cleanedOptions = (input.options || [])
		.map((opt) => opt.trim())
		.filter((opt) => opt.length > 0);

	if (cleanedOptions.length < 2) {
		throw new Error('At least 2 options are required');
	}

	const durationHours = typeof input.durationHours === 'number' ? input.durationHours : 24;
	const now = new Date();
	let expiresAt: Date | null = null;
	if (durationHours > 0) {
		expiresAt = new Date(now.getTime() + durationHours * 60 * 60 * 1000);
	}

	const options: PollOption[] = cleanedOptions.map((text, idx) => ({
		id: `opt_${idx + 1}_${Math.random().toString(36).substring(2, 8)}`,
		text,
		votes: 0,
	}));

	const doc = {
		title,
		description: input.description?.trim() || '',
		options,
		totalVotes: 0,
		durationHours,
		expiresAt,
		allowMultiple: !!input.allowMultiple,
		category: input.category?.trim() || 'General',
		authorId: input.authorId ? new ObjectId(input.authorId) : null,
		authorName: input.authorName || null,
		authorUsername: input.authorUsername || null,
		createdAt: now,
		updatedAt: now,
	};

	const result = await db.collection(COLLECTION_NAME).insertOne(doc);
	return formatPollDoc({ ...doc, _id: result.insertedId });
}

export async function getPollById(id: string): Promise<Poll | null> {
	if (!id) return null;
	const { db } = await connectToDatabase();

	let doc: any = null;
	if (ObjectId.isValid(id)) {
		doc = await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
	}

	if (!doc) {
		doc = await db.collection(COLLECTION_NAME).findOne({ id });
	}

	if (!doc) return null;
	return formatPollDoc(doc);
}

export async function getRecentPolls(limit = 30, category?: string): Promise<Poll[]> {
	const { db } = await connectToDatabase();
	const query: any = {};
	if (category && category !== 'All') {
		query.category = category;
	}

	const docs = await db
		.collection(COLLECTION_NAME)
		.find(query)
		.sort({ createdAt: -1 })
		.limit(limit)
		.toArray();

	return docs.map(formatPollDoc);
}

export async function votePoll(pollId: string, optionIds: string[]): Promise<Poll> {
	if (!pollId || !optionIds || optionIds.length === 0) {
		throw new Error('Poll ID and Option ID(s) are required');
	}

	const { db } = await connectToDatabase();
	const poll = await getPollById(pollId);

	if (!poll) {
		throw new Error('Poll not found');
	}

	if (poll.isExpired) {
		throw new Error('This poll has already expired');
	}

	// Validate options exist in the poll
	const validIds = new Set(poll.options.map((opt) => opt.id));
	const selectedValid = optionIds.filter((id) => validIds.has(id));

	if (selectedValid.length === 0) {
		throw new Error('Invalid option selected');
	}

	if (!poll.allowMultiple && selectedValid.length > 1) {
		throw new Error('This poll allows only a single vote');
	}

	const query = ObjectId.isValid(pollId)
		? { _id: new ObjectId(pollId) }
		: { id: pollId };

	// Update each selected option count and totalVotes atomically
	for (const optId of selectedValid) {
		await db.collection(COLLECTION_NAME).updateOne(
			{ ...query, 'options.id': optId },
			{
				$inc: {
					'options.$.votes': 1,
					totalVotes: 1,
				},
				$set: {
					updatedAt: new Date(),
				},
			}
		);
	}

	const updated = await getPollById(pollId);
	if (!updated) {
		throw new Error('Error updating poll');
	}
	return updated;
}

export async function deletePoll(pollId: string, userId?: string | null): Promise<boolean> {
	if (!pollId) return false;
	const { db } = await connectToDatabase();
	const poll = await getPollById(pollId);

	if (!poll) {
		throw new Error('Poll not found');
	}

	// If poll has an authorId and a userId was provided, verify ownership
	if (poll.authorId && userId && poll.authorId !== userId) {
		throw new Error('Unauthorized to delete this poll');
	}

	const query = ObjectId.isValid(pollId)
		? { _id: new ObjectId(pollId) }
		: { id: pollId };

	const result = await db.collection(COLLECTION_NAME).deleteOne(query);
	return result.deletedCount > 0;
}
