import dns from 'node:dns';
import { MongoClient, Db } from 'mongodb';

// Ensure DNS servers include reliable public resolvers if the default resolver fails on SRV lookups
try {
	const currentServers = dns.getServers();
	if (
		!currentServers ||
		currentServers.length === 0 ||
		currentServers.every((s) => s === '127.0.0.1' || s === '::1')
	) {
		dns.setServers(['8.8.8.8', '1.1.1.1', ...currentServers]);
	}
} catch {
	// Ignore if environment restricts changing dns servers
}

const uri = process.env.DATABASE_URL || '';

if (!uri) {
	console.warn('DATABASE_URL environment variable is missing.');
}

interface MongoCache {
	client: MongoClient | null;
	promise: Promise<MongoClient> | null;
}

let cached: MongoCache = (global as any)._mongoCache;

if (!cached) {
	cached = (global as any)._mongoCache = { client: null, promise: null };
}

export async function connectToDatabase(): Promise<{
	client: MongoClient;
	db: Db;
}> {
	if (cached.client) {
		const db = cached.client.db();
		return { client: cached.client, db };
	}

	if (!cached.promise) {
		const options = {
			maxPoolSize: 10,
			serverSelectionTimeoutMS: 8000,
		};
		cached.promise = MongoClient.connect(uri, options).then((client) => {
			return client;
		});
	}

	try {
		cached.client = await cached.promise;
	} catch (e) {
		cached.promise = null;
		throw e;
	}

	const db = cached.client.db();
	return { client: cached.client, db };
}
