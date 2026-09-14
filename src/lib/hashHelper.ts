/**
 * Client-side hash utilities: CRC32, MD5, and Web Crypto helpers.
 * Runs 100% in browser with no external packages.
 */

// Pre-computed CRC32 lookup table (IEEE 802.3)
const crc32Table: Uint32Array = (() => {
	const table = new Uint32Array(256);
	for (let i = 0; i < 256; i++) {
		let c = i;
		for (let k = 0; k < 8; k++) {
			c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
		}
		table[i] = c >>> 0;
	}
	return table;
})();

/**
 * Calculates CRC32 checksum of a byte buffer.
 */
export function calculateCrc32(bytes: Uint8Array): string {
	let crc = 0xffffffff;
	for (let i = 0; i < bytes.length; i++) {
		crc = (crc >>> 8) ^ crc32Table[(crc ^ bytes[i]) & 0xff];
	}
	const result = (crc ^ 0xffffffff) >>> 0;
	return result.toString(16).padStart(8, '0');
}

/**
 * Pure JavaScript MD5 implementation (RFC 1321) for client-side hashing.
 */
export function calculateMd5(bytes: Uint8Array): string {
	function safeAdd(x: number, y: number): number {
		const lsw = (x & 0xffff) + (y & 0xffff);
		const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return (msw << 16) | (lsw & 0xffff);
	}

	function bitRotateLeft(num: number, cnt: number): number {
		return (num << cnt) | (num >>> (32 - cnt));
	}

	function md5cmn(q: number, a: number, b: number, x: number, s: number, t: number): number {
		return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
	}
	function md5ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
		return md5cmn((b & c) | (~b & d), a, b, x, s, t);
	}
	function md5gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
		return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
	}
	function md5hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
		return md5cmn(b ^ c ^ d, a, b, x, s, t);
	}
	function md5ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
		return md5cmn(c ^ (b | ~d), a, b, x, s, t);
	}

	const n = bytes.length;
	const words: number[] = [];
	for (let i = 0; i < n; i++) {
		words[i >> 2] |= bytes[i] << ((i % 4) * 8);
	}
	words[n >> 2] |= 0x80 << ((n % 4) * 8);
	words[(((n + 8) >> 6) << 4) + 14] = n * 8;

	let a = 1732584193;
	let b = -271733879;
	let c = -1732584194;
	let d = 271733878;

	for (let i = 0; i < words.length; i += 16) {
		const olda = a;
		const oldb = b;
		const oldc = c;
		const oldd = d;

		const x = words.slice(i, i + 16);
		while (x.length < 16) x.push(0);

		a = md5ff(a, b, c, d, x[0], 7, -680876936);
		d = md5ff(d, a, b, c, x[1], 12, -389564586);
		c = md5ff(c, d, a, b, x[2], 17, 606105819);
		b = md5ff(b, c, d, a, x[3], 22, -1044525330);
		a = md5ff(a, b, c, d, x[4], 7, -176418897);
		d = md5ff(d, a, b, c, x[5], 12, 1200080426);
		c = md5ff(c, d, a, b, x[6], 17, -1473231341);
		b = md5ff(b, c, d, a, x[7], 22, -45705983);
		a = md5ff(a, b, c, d, x[8], 7, 1770035416);
		d = md5ff(d, a, b, c, x[9], 12, -1958414417);
		c = md5ff(c, d, a, b, x[10], 17, -42063);
		b = md5ff(b, c, d, a, x[11], 22, -1990404162);
		a = md5ff(a, b, c, d, x[12], 7, 1804603682);
		d = md5ff(d, a, b, c, x[13], 12, -40341101);
		c = md5ff(c, d, a, b, x[14], 17, -1502002290);
		b = md5ff(b, c, d, a, x[15], 22, 1236535329);

		a = md5gg(a, b, c, d, x[1], 5, -165796510);
		d = md5gg(d, a, b, c, x[6], 9, -1069501632);
		c = md5gg(c, d, a, b, x[11], 14, 643717713);
		b = md5gg(b, c, d, a, x[0], 20, -373897302);
		a = md5gg(a, b, c, d, x[5], 5, -701558691);
		d = md5gg(d, a, b, c, x[10], 9, 38016083);
		c = md5gg(c, d, a, b, x[15], 14, -660478335);
		b = md5gg(b, c, d, a, x[4], 20, -405537848);
		a = md5gg(a, b, c, d, x[9], 5, 568446438);
		d = md5gg(d, a, b, c, x[14], 9, -1019803690);
		c = md5gg(c, d, a, b, x[3], 14, -187363961);
		b = md5gg(b, c, d, a, x[8], 20, 1163531501);
		a = md5gg(a, b, c, d, x[13], 5, -1444681467);
		d = md5gg(d, a, b, c, x[2], 9, -51403784);
		c = md5gg(c, d, a, b, x[7], 14, 1735328473);
		b = md5gg(b, c, d, a, x[12], 20, -1926607734);

		a = md5hh(a, b, c, d, x[5], 4, -378558);
		d = md5hh(d, a, b, c, x[8], 11, -2022574463);
		c = md5hh(c, d, a, b, x[11], 16, 1839030562);
		b = md5hh(b, c, d, a, x[14], 23, -35309556);
		a = md5hh(a, b, c, d, x[1], 4, -1530992060);
		d = md5hh(d, a, b, c, x[4], 11, 1272893353);
		c = md5hh(c, d, a, b, x[7], 16, -155497632);
		b = md5hh(b, c, d, a, x[10], 23, -1094730640);
		a = md5hh(a, b, c, d, x[13], 4, 681279174);
		d = md5hh(d, a, b, c, x[0], 11, -358537222);
		c = md5hh(c, d, a, b, x[3], 16, -722521979);
		b = md5hh(b, c, d, a, x[6], 23, 76029189);
		a = md5hh(a, b, c, d, x[9], 4, -640364487);
		d = md5hh(d, a, b, c, x[12], 11, -421815835);
		c = md5hh(c, d, a, b, x[15], 16, 530742520);
		b = md5hh(b, c, d, a, x[2], 23, -995338651);

		a = md5ii(a, b, c, d, x[0], 6, -198630844);
		d = md5ii(d, a, b, c, x[7], 10, 1126891415);
		c = md5ii(c, d, a, b, x[14], 15, -1416354905);
		b = md5ii(b, c, d, a, x[5], 21, -57434055);
		a = md5ii(a, b, c, d, x[12], 6, 1700485571);
		d = md5ii(d, a, b, c, x[3], 10, -1894986606);
		c = md5ii(c, d, a, b, x[10], 15, -1051523);
		b = md5ii(b, c, d, a, x[1], 21, -2054922799);
		a = md5ii(a, b, c, d, x[8], 6, 1873313359);
		d = md5ii(d, a, b, c, x[15], 10, -30611744);
		c = md5ii(c, d, a, b, x[6], 15, -1560198380);
		b = md5ii(b, c, d, a, x[13], 21, 1309151649);
		a = md5ii(a, b, c, d, x[4], 6, -145523070);
		d = md5ii(d, a, b, c, x[11], 10, -1120210379);
		c = md5ii(c, d, a, b, x[2], 15, 718787259);
		b = md5ii(b, c, d, a, x[9], 21, -343485551);

		a = safeAdd(a, olda);
		b = safeAdd(b, oldb);
		c = safeAdd(c, oldc);
		d = safeAdd(d, oldd);
	}

	const hexChars = '0123456789abcdef';
	let out = '';
	for (const val of [a, b, c, d]) {
		for (let i = 0; i < 4; i++) {
			out += hexChars.charAt((val >> (i * 8 + 4)) & 0x0f) + hexChars.charAt((val >> (i * 8)) & 0x0f);
		}
	}
	return out;
}

/**
 * Computes all supported hashes for given Uint8Array data.
 */
export async function computeAllHashes(data: Uint8Array): Promise<Record<string, string>> {
	const results: Record<string, string> = {};

	// CRC32
	results['CRC32'] = calculateCrc32(data);

	// MD5
	results['MD5'] = calculateMd5(data);

	// Web Crypto hashes: SHA-1, SHA-256, SHA-384, SHA-512
	const webAlgos = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
	for (const algo of webAlgos) {
		try {
			const buf = await crypto.subtle.digest(algo, data as Uint8Array<ArrayBuffer>);
			const arr = Array.from(new Uint8Array(buf));
			results[algo] = arr.map((b) => b.toString(16).padStart(2, '0')).join('');
		} catch {
			results[algo] = 'Unsupported in browser';
		}
	}

	return results;
}
