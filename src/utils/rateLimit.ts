import type { NextApiRequest, NextApiResponse } from 'next';

interface RateLimitRecord {
	count: number;
	resetTime: number;
}

// In-memory store with periodic sweep
const rateLimitMap = new Map<string, RateLimitRecord>();

// Clean expired records every 60 seconds
if (typeof setInterval !== 'undefined') {
	const timer = setInterval(() => {
		const now = Date.now();
		for (const [key, record] of rateLimitMap.entries()) {
			if (record.resetTime <= now) {
				rateLimitMap.delete(key);
			}
		}
	}, 60000);
	if (timer.unref) {
		timer.unref();
	}
}

export interface RateLimitOptions {
	windowMs: number; // Time window in milliseconds
	max: number; // Maximum allowed hits in windowMs
	message?: string; // Custom error message
	keyGenerator?: (req: NextApiRequest) => string; // Custom key derivation
}

/**
 * Extracts best-effort client IP from headers or socket.
 */
export function getClientIp(req: NextApiRequest): string {
	const xForwardedFor = req.headers['x-forwarded-for'];
	if (typeof xForwardedFor === 'string' && xForwardedFor.trim()) {
		return xForwardedFor.split(',')[0].trim();
	}
	if (Array.isArray(xForwardedFor) && xForwardedFor.length > 0) {
		return xForwardedFor[0].trim();
	}

	const xRealIp = req.headers['x-real-ip'];
	if (typeof xRealIp === 'string' && xRealIp.trim()) {
		return xRealIp.trim();
	}

	const cfConnectingIp = req.headers['cf-connecting-ip'];
	if (typeof cfConnectingIp === 'string' && cfConnectingIp.trim()) {
		return cfConnectingIp.trim();
	}

	return req.socket.remoteAddress || '127.0.0.1';
}

/**
 * Applies sliding/fixed window rate limiting on a NextApiRequest.
 * Returns true if request is allowed, false if rate limited (and sets 429 response).
 */
export function rateLimit(
	req: NextApiRequest,
	res: NextApiResponse,
	options: RateLimitOptions,
): boolean {
	const now = Date.now();
	const windowMs = options.windowMs;
	const max = options.max;
	const message =
		options.message ||
		'Too many requests from this client. Please slow down and try again later.';

	const ip = getClientIp(req);
	const keyPrefix = options.keyGenerator ? options.keyGenerator(req) : ip;
	const key = `${keyPrefix}:${req.url?.split('?')[0] || 'unknown'}`;

	let record = rateLimitMap.get(key);

	if (!record || record.resetTime <= now) {
		record = {
			count: 1,
			resetTime: now + windowMs,
		};
		rateLimitMap.set(key, record);

		const remaining = Math.max(0, max - 1);
		res.setHeader('X-RateLimit-Limit', max);
		res.setHeader('X-RateLimit-Remaining', remaining);
		res.setHeader(
			'X-RateLimit-Reset',
			Math.ceil(record.resetTime / 1000).toString(),
		);
		return true;
	}

	record.count += 1;
	const remaining = Math.max(0, max - record.count);
	const retryAfterSeconds = Math.max(
		1,
		Math.ceil((record.resetTime - now) / 1000),
	);

	res.setHeader('X-RateLimit-Limit', max);
	res.setHeader('X-RateLimit-Remaining', remaining);
	res.setHeader(
		'X-RateLimit-Reset',
		Math.ceil(record.resetTime / 1000).toString(),
	);

	if (record.count > max) {
		res.setHeader('Retry-After', retryAfterSeconds.toString());
		res.status(429).json({
			error: 'Too Many Requests',
			message,
			retryAfter: retryAfterSeconds,
		});
		return false;
	}

	return true;
}
