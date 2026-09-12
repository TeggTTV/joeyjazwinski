import { connectToDatabase } from '@/lib/mongodb';

export const INDEX_NOW_KEY = '5v3zcfx3c5vxhmctq733ryjw3u8va7f4';
export const SITE_HOST = 'joeyjazwinski.com';
export const KEY_LOCATION = `https://${SITE_HOST}/${INDEX_NOW_KEY}.txt`;

export interface IndexNowResult {
	success: boolean;
	statusCode: number;
	urls: string[];
	message: string;
	timestamp: string;
}

/**
 * Submit one or multiple URLs to the official IndexNow gateway via HTTP POST.
 * Automatically synchronizes with Bing, Yandex, Seznam, Naver, and other participating search engines.
 * Logs submission records into the MongoDB database 'indexnow_logs' collection.
 */
export async function notifyIndexNow(
	urls: string | string[],
): Promise<IndexNowResult> {
	const rawList = Array.isArray(urls) ? urls : [urls];
	const urlList = Array.from(
		new Set(
			rawList
				.map((u) => u.trim())
				.filter((u) => u.startsWith('http://') || u.startsWith('https://')),
		),
	);

	if (urlList.length === 0) {
		return {
			success: false,
			statusCode: 400,
			urls: [],
			message: 'No valid HTTP/HTTPS URLs provided.',
			timestamp: new Date().toISOString(),
		};
	}

	const payload = {
		host: SITE_HOST,
		key: INDEX_NOW_KEY,
		keyLocation: KEY_LOCATION,
		urlList,
	};

	let statusCode = 500;
	let responseText = '';
	let success = false;

	try {
		const response = await fetch('https://api.indexnow.org/indexnow', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
			body: JSON.stringify(payload),
		});

		statusCode = response.status;
		responseText = await response.text();

		// IndexNow returns 200 OK or 202 Accepted on successful ingestion
		success = response.ok || statusCode === 200 || statusCode === 202;
	} catch (networkError: any) {
		console.error('IndexNow gateway request error:', networkError);
		responseText = networkError?.message || 'Network request failed';
	}

	const result: IndexNowResult = {
		success,
		statusCode,
		urls: urlList,
		message: success
			? `Successfully notified IndexNow for ${urlList.length} URL(s) (Status ${statusCode})`
			: `IndexNow submission returned status ${statusCode}: ${responseText || 'Error'}`,
		timestamp: new Date().toISOString(),
	};

	// Persist submission log in MongoDB
	try {
		const { db } = await connectToDatabase();
		await db.collection('indexnow_logs').insertOne({
			urls: urlList,
			urlCount: urlList.length,
			statusCode,
			success,
			responseMessage: responseText.slice(0, 500),
			submittedAt: new Date(),
		});
	} catch (dbError) {
		console.error('Failed to log IndexNow submission to MongoDB:', dbError);
	}

	return result;
}

