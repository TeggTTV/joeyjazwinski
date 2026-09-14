/**
 * Client-side JSON Web Token (JWT) utilities.
 * Uses native Web Crypto APIs for HMAC-SHA256 signing and verification.
 */

export function base64UrlEncode(str: string): string {
	const utf8Bytes = new TextEncoder().encode(str);
	let binary = '';
	for (let i = 0; i < utf8Bytes.length; i++) {
		binary += String.fromCharCode(utf8Bytes[i]);
	}
	return btoa(binary)
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '');
}

export function base64UrlDecode(str: string): string {
	let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
	while (base64.length % 4) {
		base64 += '=';
	}
	const binary = atob(base64);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) {
		bytes[i] = binary.charCodeAt(i);
	}
	return new TextDecoder().decode(bytes);
}

export function bufferToBase64Url(buffer: ArrayBuffer): string {
	const bytes = new Uint8Array(buffer);
	let binary = '';
	for (let i = 0; i < bytes.length; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return btoa(binary)
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '');
}

/**
 * Verifies an HMAC-SHA256 JWT signature using Web Crypto.
 */
export async function verifyHs256Signature(
	signingInput: string,
	signatureB64Url: string,
	secret: string,
): Promise<boolean> {
	if (!secret || !signingInput || !signatureB64Url) return false;

	try {
		const keyBytes = new TextEncoder().encode(secret);
		const cryptoKey = await crypto.subtle.importKey(
			'raw',
			keyBytes,
			{ name: 'HMAC', hash: 'SHA-256' },
			false,
			['verify'],
		);

		// Decode the provided signature
		let base64 = signatureB64Url.replace(/-/g, '+').replace(/_/g, '/');
		while (base64.length % 4) {
			base64 += '=';
		}
		const binary = atob(base64);
		const sigBytes = new Uint8Array(binary.length);
		for (let i = 0; i < binary.length; i++) {
			sigBytes[i] = binary.charCodeAt(i);
		}

		const dataBytes = new TextEncoder().encode(signingInput);
		return await crypto.subtle.verify('HMAC', cryptoKey, sigBytes, dataBytes);
	} catch {
		return false;
	}
}

/**
 * Signs a JWT with HMAC-SHA256 using Web Crypto.
 */
export async function signHs256Jwt(
	headerObj: Record<string, unknown>,
	payloadObj: Record<string, unknown>,
	secret: string,
): Promise<string> {
	const headerB64 = base64UrlEncode(JSON.stringify(headerObj));
	const payloadB64 = base64UrlEncode(JSON.stringify(payloadObj));
	const signingInput = `${headerB64}.${payloadB64}`;

	if (!secret) {
		return `${signingInput}.unsigned`;
	}

	const keyBytes = new TextEncoder().encode(secret);
	const cryptoKey = await crypto.subtle.importKey(
		'raw',
		keyBytes,
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['sign'],
	);

	const dataBytes = new TextEncoder().encode(signingInput);
	const sigBuf = await crypto.subtle.sign('HMAC', cryptoKey, dataBytes);
	const sigB64 = bufferToBase64Url(sigBuf);

	return `${signingInput}.${sigB64}`;
}
