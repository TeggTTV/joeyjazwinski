import {
	PDFDocument,
	PDFDict,
	PDFName,
	PDFArray,
	PDFHexString,
	PDFString,
	rgb,
	StandardFonts,
} from 'pdf-lib';
import { decryptPDF, isEncrypted } from '@pdfsmaller/pdf-decrypt';
import { encryptPDF } from '@pdfsmaller/pdf-encrypt';
import type { QpdfRunner } from 'qpdf-run';

export interface PdfSecurityInfo {
	encrypted: boolean;
	algorithm?: 'AES-256' | 'AES-128' | 'RC4' | 'Unknown';
	version?: number;
	revision?: number;
	keyLength?: number;
	canDecryptWithoutPassword: boolean;
	pageCount?: number;
	fileSizeBytes: number;
	error?: string;
}

export interface DecryptionResult {
	success: boolean;
	decryptedBytes?: Uint8Array;
	blobUrl?: string;
	originalSize: number;
	decryptedSize?: number;
	pageCount?: number;
	engineUsed?: 'WebCrypto' | 'QPDF-WASM';
	durationMs: number;
	error?: string;
	fileName: string;
}

export function formatBytes(bytes: number): string {
	if (bytes === 0) return '0 B';
	const k = 1024;
	const sizes = ['B', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function getCleanDecryptedFileName(fileName: string): string {
	const dotIndex = fileName.lastIndexOf('.');
	if (dotIndex === -1) return `${fileName}-decrypted.pdf`;
	const base = fileName.substring(0, dotIndex);
	return `${base}-decrypted.pdf`;
}

/**
 * Checks if a PDF is encrypted and whether it requires a password to open.
 */
export async function checkPdfEncryption(pdfBytes: Uint8Array): Promise<PdfSecurityInfo> {
	const fileSizeBytes = pdfBytes.length;

	try {
		const check = await isEncrypted(pdfBytes);

		if (!check.encrypted) {
			let pageCount: number | undefined;
			try {
				const doc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
				pageCount = doc.getPageCount();
			} catch {
				// Non-fatal if page count cannot be determined
			}

			return {
				encrypted: false,
				canDecryptWithoutPassword: true,
				fileSizeBytes,
				pageCount,
			};
		}

		// Document has encryption
		let canDecryptWithoutPassword = false;
		try {
			// Test if empty password opens an owner-restricted or blank password PDF
			const testOutput = await decryptPDF(pdfBytes, '');
			if (testOutput && testOutput.length > 0) {
				canDecryptWithoutPassword = true;
			}
		} catch {
			canDecryptWithoutPassword = false;
		}

		return {
			encrypted: true,
			algorithm: check.algorithm || 'Unknown',
			version: check.version,
			revision: check.revision,
			keyLength: check.keyLength,
			canDecryptWithoutPassword,
			fileSizeBytes,
		};
	} catch (err: any) {
		// When @pdfsmaller throws (e.g. Unsupported encryption: V=4, R=4),
		// inspect the encryption dictionary directly with pdf-lib to identify cipher parameters cleanly.
		try {
			const doc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
			const encryptRef = doc.context.trailerInfo.Encrypt;
			if (encryptRef) {
				const encryptDict =
					encryptRef instanceof PDFDict
						? encryptRef
						: (doc.context.lookup(encryptRef) as PDFDict);
				if (encryptDict && encryptDict instanceof PDFDict) {
					const V = encryptDict.get(PDFName.of('V'));
					const R = encryptDict.get(PDFName.of('R'));
					const Length = encryptDict.get(PDFName.of('Length'));
					const vNum = V
						? typeof (V as any).asNumber === 'function'
							? (V as any).asNumber()
							: Number(V.toString())
						: undefined;
					const rNum = R
						? typeof (R as any).asNumber === 'function'
							? (R as any).asNumber()
							: Number(R.toString())
						: undefined;
					const lenNum = Length
						? typeof (Length as any).asNumber === 'function'
							? (Length as any).asNumber()
							: Number(Length.toString())
						: undefined;

					let algorithm: 'AES-256' | 'AES-128' | 'RC4' | 'Unknown' = 'Unknown';
					if (vNum === 4) algorithm = 'AES-128';
					else if (vNum === 5) algorithm = 'AES-256';
					else if (vNum !== undefined && vNum <= 3) algorithm = 'RC4';

					let pageCount: number | undefined;
					try {
						pageCount = doc.getPageCount();
					} catch {
						// Non-fatal
					}

					return {
						encrypted: true,
						algorithm,
						version: vNum,
						revision: rNum,
						keyLength: lenNum,
						canDecryptWithoutPassword: false,
						fileSizeBytes,
						pageCount,
					};
				}
			}
		} catch {
			// Non-fatal fallback
		}

		return {
			encrypted: true,
			canDecryptWithoutPassword: false,
			fileSizeBytes,
			error: err?.message || 'Failed to inspect PDF security details.',
		};
	}
}

let sharedRunnerPromise: Promise<QpdfRunner> | null = null;

/**
 * Returns a cached singleton QPDF Web Worker runner.
 * Loads worker.js, qpdf.js, and qpdf.wasm once and keeps them in memory.
 */
export async function getSharedQpdfRunner(): Promise<QpdfRunner> {
	if (typeof window === 'undefined') {
		throw new Error('QPDF Web Worker can only run in the browser.');
	}

	if (!sharedRunnerPromise) {
		const { createBrowserQpdfRunner } = await import('qpdf-run');
		const origin = window.location.origin;

		sharedRunnerPromise = createBrowserQpdfRunner({
			workerUrl: `${origin}/vendor/qpdf/worker.js`,
			qpdfJsUrl: `${origin}/vendor/qpdf/qpdf.js`,
			wasmUrl: `${origin}/vendor/qpdf/qpdf.wasm`,
			timeoutMs: 120000,
		}).catch((err) => {
			sharedRunnerPromise = null;
			throw err;
		});
	}

	return sharedRunnerPromise;
}

/**
 * Destroys the shared runner when tearing down or clearing memory.
 */
export function resetSharedQpdfRunner(): void {
	if (sharedRunnerPromise) {
		sharedRunnerPromise
			.then((runner) => runner.destroy().catch(() => {}))
			.catch(() => {});
		sharedRunnerPromise = null;
	}
}

let qpdfWorkerQueue: Promise<any> = Promise.resolve();

/**
 * Runs QPDF in a browser Web Worker using the cached runner.
 * Always clones the buffer (pdfBytes.slice()) before transferring to runner.runOne
 * so that caller Uint8Arrays are never neutered/detached by worker postMessage.
 * Automatically recovers from out-of-bounds worker crashes by restarting the worker.
 * Serializes executions using a queue so batch decryptions do not conflict in worker FS.
 */
export async function runQpdfWorker(pdfBytes: Uint8Array, password?: string): Promise<Uint8Array> {
	const execute = async () => {
		const runner = await getSharedQpdfRunner();

		const args = password
			? ['--password=' + password, '--decrypt', '--', 'input.pdf', 'output.pdf']
			: ['--decrypt', '--', 'input.pdf', 'output.pdf'];

		try {
			const output = await runner.runOne({
				input: pdfBytes.slice(),
				inputName: 'input.pdf',
				outputName: 'output.pdf',
				args,
			});
			return output;
		} catch (err: any) {
			const msg = String(err?.message || '');
			if (
				msg.includes('memory access out of bounds') ||
				msg.includes('destroyed') ||
				msg.includes('timeout')
			) {
				resetSharedQpdfRunner();
				const freshRunner = await getSharedQpdfRunner();
				return await freshRunner.runOne({
					input: pdfBytes.slice(),
					inputName: 'input.pdf',
					outputName: 'output.pdf',
					args,
				});
			}
			throw err;
		}
	};

	const resultPromise = qpdfWorkerQueue.then(execute, execute);
	qpdfWorkerQueue = resultPromise.catch(() => {});
	return resultPromise;
}

// Standard PDF padding string (PDF 32000-1 specification)
const PDF_PADDING = new Uint8Array([
	0x28, 0xbf, 0x4e, 0x5e, 0x4e, 0x75, 0x8a, 0x41, 0x64, 0x00, 0x4e, 0x56,
	0xff, 0xfa, 0x01, 0x08, 0x2e, 0x2e, 0x00, 0xb6, 0xd0, 0x68, 0x3e, 0x80,
	0x2f, 0x0c, 0xa9, 0xfe, 0x64, 0x53, 0x69, 0x7a,
]);

function arraysEqual(a: Uint8Array, b: Uint8Array): boolean {
	if (a.length !== b.length) return false;
	for (let i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) return false;
	}
	return true;
}

function hexToBytes(hex: string): Uint8Array {
	const clean = hex.replace(/[^0-9a-fA-F]/g, '');
	const bytes = new Uint8Array(Math.floor(clean.length / 2));
	for (let i = 0; i < bytes.length; i++) {
		bytes[i] = parseInt(clean.substr(i * 2, 2), 16);
	}
	return bytes;
}

function extractPdfBytes(pdfObj: any, context?: any): Uint8Array | null {
	if (!pdfObj) return null;
	const resolved =
		context && typeof context.lookup === 'function' ? context.lookup(pdfObj) : pdfObj;
	if (!resolved) return null;
	if (resolved instanceof PDFHexString) return resolved.asBytes();
	if (resolved instanceof PDFString) return new Uint8Array(resolved.asBytes());
	if (typeof resolved.asBytes === 'function') return new Uint8Array(resolved.asBytes());
	const str = String(resolved);
	if (str.startsWith('<') && str.endsWith('>')) return hexToBytes(str.slice(1, -1));
	return null;
}

function md5(data: Uint8Array | string): Uint8Array {
	const bytes = typeof data === 'string' ? new TextEncoder().encode(data) : data;
	const S = [
		7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
		5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
		4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
		6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
	];
	const K = new Uint32Array([
		0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a,
		0xa8304613, 0xfd469501, 0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be,
		0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821, 0xf61e2562, 0xc040b340,
		0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
		0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8,
		0x676f02d9, 0x8d2a4c8a, 0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c,
		0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70, 0x289b7ec6, 0xeaa127fa,
		0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
		0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92,
		0xffeff47d, 0x85845dd1, 0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1,
		0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391,
	]);

	let a0 = 0x67452301,
		b0 = 0xefcdab89,
		c0 = 0x98badcfe,
		d0 = 0x10325476;
	const msgLen = bytes.length;
	const msgBitLen = msgLen * 8;
	const msgLenPadded = (msgLen + 9 + 63) & ~63;
	const msg = new Uint8Array(msgLenPadded);
	msg.set(bytes);
	msg[msgLen] = 0x80;

	const dataView = new DataView(msg.buffer);
	dataView.setUint32(msgLenPadded - 8, msgBitLen, true);
	dataView.setUint32(msgLenPadded - 4, Math.floor(msgBitLen / 0x100000000), true);

	for (let offset = 0; offset < msgLenPadded; offset += 64) {
		const chunk = new Uint32Array(msg.buffer, offset, 16);
		let a = a0,
			b = b0,
			c = c0,
			d = d0;

		for (let i = 0; i < 64; i++) {
			let f: number, g: number;
			if (i < 16) {
				f = (b & c) | (~b & d);
				g = i;
			} else if (i < 32) {
				f = (d & b) | (~d & c);
				g = (5 * i + 1) % 16;
			} else if (i < 48) {
				f = b ^ c ^ d;
				g = (3 * i + 5) % 16;
			} else {
				f = c ^ (b | ~d);
				g = (7 * i) % 16;
			}
			f = (f + a + K[i] + chunk[g]) >>> 0;
			a = d;
			d = c;
			c = b;
			b = (b + ((f << S[i]) | (f >>> (32 - S[i])))) >>> 0;
		}
		a0 = (a0 + a) >>> 0;
		b0 = (b0 + b) >>> 0;
		c0 = (c0 + c) >>> 0;
		d0 = (d0 + d) >>> 0;
	}

	const result = new Uint8Array(16);
	const rv = new DataView(result.buffer);
	rv.setUint32(0, a0, true);
	rv.setUint32(4, b0, true);
	rv.setUint32(8, c0, true);
	rv.setUint32(12, d0, true);
	return result;
}

class FastRC4 {
	private s = new Uint8Array(256);
	private i = 0;
	private j = 0;

	constructor(key: Uint8Array) {
		for (let i = 0; i < 256; i++) this.s[i] = i;
		let j = 0;
		for (let i = 0; i < 256; i++) {
			j = (j + this.s[i] + key[i % key.length]) & 255;
			const tmp = this.s[i];
			this.s[i] = this.s[j];
			this.s[j] = tmp;
		}
	}

	process(data: Uint8Array): Uint8Array {
		const out = new Uint8Array(data.length);
		let i = this.i;
		let j = this.j;
		for (let k = 0; k < data.length; k++) {
			i = (i + 1) & 255;
			j = (j + this.s[i]) & 255;
			const tmp = this.s[i];
			this.s[i] = this.s[j];
			this.s[j] = tmp;
			out[k] = data[k] ^ this.s[(this.s[i] + this.s[j]) & 255];
		}
		this.i = i;
		this.j = j;
		return out;
	}
}

function padPasswordBytes(password: string): Uint8Array {
	const padded = new Uint8Array(32);
	const len = Math.min(password.length, 32);
	for (let i = 0; i < len; i++) {
		padded[i] = password.charCodeAt(i) & 0xff;
	}
	if (len < 32) {
		padded.set(PDF_PADDING.subarray(0, 32 - len), len);
	}
	return padded;
}

function computeStandardKey(
	paddedPwd: Uint8Array,
	ownerKey: Uint8Array,
	permissions: number,
	fileId: Uint8Array,
	revision: number,
	keyLength: number,
	encryptMetadata = true,
): Uint8Array {
	let extra = 0;
	if (revision >= 4 && !encryptMetadata) extra = 4;
	const hashInput = new Uint8Array(paddedPwd.length + ownerKey.length + 4 + fileId.length + extra);
	let offset = 0;
	hashInput.set(paddedPwd, offset);
	offset += paddedPwd.length;
	hashInput.set(ownerKey, offset);
	offset += ownerKey.length;

	hashInput[offset++] = permissions & 0xff;
	hashInput[offset++] = (permissions >> 8) & 0xff;
	hashInput[offset++] = (permissions >> 16) & 0xff;
	hashInput[offset++] = (permissions >> 24) & 0xff;

	hashInput.set(fileId, offset);
	offset += fileId.length;

	if (revision >= 4 && !encryptMetadata) {
		hashInput[offset++] = 0xff;
		hashInput[offset++] = 0xff;
		hashInput[offset++] = 0xff;
		hashInput[offset++] = 0xff;
	}

	let hash = md5(hashInput);
	if (revision >= 3) {
		for (let i = 0; i < 50; i++) {
			hash = md5(hash.subarray(0, keyLength));
		}
	}
	return hash.subarray(0, keyLength);
}

function validateStandardSecurityPassword(
	password: string,
	ownerKey: Uint8Array,
	userKey: Uint8Array,
	permissions: number,
	fileId: Uint8Array,
	revision: number,
	keyLength: number,
	encryptMetadata = true,
): boolean {
	const padded = padPasswordBytes(password);

	// 1. Try as User Password (Algorithm 4 / Algorithm 5)
	const encKey = computeStandardKey(
		padded,
		ownerKey,
		permissions,
		fileId,
		revision,
		keyLength,
		encryptMetadata,
	);
	if (revision === 2) {
		const comp = new FastRC4(encKey).process(PDF_PADDING);
		if (arraysEqual(comp, userKey)) return true;
	} else {
		const hashInput = new Uint8Array(PDF_PADDING.length + fileId.length);
		hashInput.set(PDF_PADDING);
		hashInput.set(fileId, PDF_PADDING.length);
		const hash = md5(hashInput);
		let result = new FastRC4(encKey).process(hash);
		for (let i = 1; i <= 19; i++) {
			const iterKey = new Uint8Array(encKey.length);
			for (let j = 0; j < encKey.length; j++) iterKey[j] = encKey[j] ^ i;
			result = new FastRC4(iterKey).process(result);
		}
		if (arraysEqual(result.subarray(0, 16), userKey.subarray(0, 16))) return true;
	}

	// 2. Try as Owner Password (Algorithm 7)
	let ownerHash = md5(padded);
	if (revision >= 3) {
		for (let i = 0; i < 50; i++) {
			ownerHash = md5(ownerHash.subarray(0, keyLength));
		}
	}

	let recoveredUserKey: Uint8Array;
	if (revision === 2) {
		recoveredUserKey = new FastRC4(ownerHash.subarray(0, keyLength)).process(ownerKey);
	} else {
		recoveredUserKey = new Uint8Array(ownerKey);
		for (let i = 19; i >= 0; i--) {
			const iterKey = new Uint8Array(keyLength);
			for (let j = 0; j < keyLength; j++) iterKey[j] = ownerHash[j] ^ i;
			recoveredUserKey = new FastRC4(iterKey).process(recoveredUserKey);
		}
	}

	const recKey = computeStandardKey(
		recoveredUserKey,
		ownerKey,
		permissions,
		fileId,
		revision,
		keyLength,
		encryptMetadata,
	);
	if (revision === 2) {
		const comp = new FastRC4(recKey).process(PDF_PADDING);
		if (arraysEqual(comp, userKey)) return true;
	} else {
		const hashInput = new Uint8Array(PDF_PADDING.length + fileId.length);
		hashInput.set(PDF_PADDING);
		hashInput.set(fileId, PDF_PADDING.length);
		const hash = md5(hashInput);
		let result = new FastRC4(recKey).process(hash);
		for (let i = 1; i <= 19; i++) {
			const iterKey = new Uint8Array(recKey.length);
			for (let j = 0; j < recKey.length; j++) iterKey[j] = recKey[j] ^ i;
			result = new FastRC4(iterKey).process(result);
		}
		if (arraysEqual(result.subarray(0, 16), userKey.subarray(0, 16))) return true;
	}

	return false;
}

export interface PdfPasswordValidator {
	type: 'fast_standard' | 'webcrypto' | 'wasm';
	test(password: string): Promise<boolean> | boolean;
}

/**
 * Creates an ultra-fast, zero-overhead password tester for brute force recovery.
 * For RC4 and AES-128 (Revision 2, 3, 4), runs entirely in JavaScript memory (0.01ms per candidate),
 * avoiding all WebAssembly/Web Worker overhead and memory leaks.
 */
export async function createPdfPasswordValidator(
	pdfBytes: Uint8Array,
	preferredEngine: 'auto' | 'crypto' | 'wasm' = 'auto',
): Promise<PdfPasswordValidator> {
	if (preferredEngine === 'wasm') {
		return {
			type: 'wasm',
			test: async (password: string) => {
				try {
					const out = await runQpdfWorker(pdfBytes, password);
					return Boolean(out && out.length > 0);
				} catch {
					return false;
				}
			},
		};
	}

	try {
		const doc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
		const trailer = doc.context.trailerInfo;
		const encryptRef = trailer.Encrypt;
		if (!encryptRef) {
			return { type: 'fast_standard', test: () => true };
		}
		const encryptDict =
			encryptRef instanceof PDFDict
				? encryptRef
				: (doc.context.lookup(encryptRef) as PDFDict);

		if (encryptDict && encryptDict instanceof PDFDict) {
			const V = encryptDict.get(PDFName.of('V'));
			const R = encryptDict.get(PDFName.of('R'));
			const Length = encryptDict.get(PDFName.of('Length'));
			const vNum = V
				? typeof (V as any).asNumber === 'function'
					? (V as any).asNumber()
					: Number(V.toString())
				: 0;
			const rNum = R
				? typeof (R as any).asNumber === 'function'
					? (R as any).asNumber()
					: Number(R.toString())
				: 0;

			// Revision 2, 3, 4 (All RC4 and All AES-128 PDFs!)
			if (rNum <= 4) {
				const ownerKey = extractPdfBytes(encryptDict.get(PDFName.of('O')), doc.context);
				const userKey = extractPdfBytes(encryptDict.get(PDFName.of('U')), doc.context);
				const P = encryptDict.get(PDFName.of('P'));
				const permissions = P
					? typeof (P as any).asNumber === 'function'
						? (P as any).asNumber()
						: Number(P.toString())
					: 0;

				let keyLen = Length
					? typeof (Length as any).asNumber === 'function'
						? (Length as any).asNumber()
						: Number(Length.toString())
					: 40;
				if (rNum >= 3 && !Length) keyLen = 128;
				const keyLengthBytes = Math.floor(keyLen / 8);

				let fileId = new Uint8Array(0);
				const rawId = doc.context.lookup(trailer.ID);
				if (rawId) {
					if (rawId instanceof PDFArray) {
						const ext = extractPdfBytes(rawId.lookup(0), doc.context);
						if (ext) fileId = new Uint8Array(ext);
					} else if (Array.isArray(rawId) && rawId.length > 0) {
						const ext = extractPdfBytes(rawId[0], doc.context);
						if (ext) fileId = new Uint8Array(ext);
					}
				}

				const encryptMetadata = encryptDict.has(PDFName.of('EncryptMetadata'))
					? encryptDict.get(PDFName.of('EncryptMetadata'))?.toString() !== 'false'
					: true;

				if (ownerKey && userKey) {
					return {
						type: 'fast_standard',
						test: (password: string) =>
							validateStandardSecurityPassword(
								password,
								ownerKey,
								userKey,
								permissions,
								fileId,
								rNum,
								keyLengthBytes,
								encryptMetadata,
							),
					};
				}
			}

			// Revision 6 (AES-256)
			if (vNum === 5 && rNum === 6) {
				return {
					type: 'webcrypto',
					test: async (password: string) => {
						try {
							await decryptPDF(pdfBytes, password);
							return true;
						} catch {
							return false;
						}
					},
				};
			}
		}
	} catch {
		// Non-fatal fallback
	}

	// Fallback to WebCrypto or QPDF
	return {
		type: 'wasm',
		test: async (password: string) => {
			try {
				try {
					await decryptPDF(pdfBytes, password);
					return true;
				} catch {
					// Fallback to WASM
				}
				const out = await runQpdfWorker(pdfBytes, password);
				return Boolean(out && out.length > 0);
			} catch {
				return false;
			}
		},
	};
}

/**
 * Decrypts a PDF file using Web Crypto with automatic WASM fallback.
 */
export async function decryptPdf(
	pdfBytes: Uint8Array,
	password = '',
	preferredEngine: 'auto' | 'crypto' | 'wasm' = 'auto',
): Promise<{
	bytes: Uint8Array;
	engine: 'WebCrypto' | 'QPDF-WASM';
	durationMs: number;
	pageCount?: number;
}> {
	const startTime = Date.now();

	// Primary path: Web Crypto (Instant, lightweight, handles AES-256 and RC4)
	if (preferredEngine !== 'wasm') {
		try {
			const decrypted = await decryptPDF(pdfBytes, password);
			let pageCount: number | undefined;
			try {
				const verifiedDoc = await PDFDocument.load(decrypted);
				pageCount = verifiedDoc.getPageCount();
			} catch {
				// Decrypted successfully even if pdf-lib page counting is skipped
			}

			return {
				bytes: decrypted,
				engine: 'WebCrypto',
				durationMs: Date.now() - startTime,
				pageCount,
			};
		} catch (cryptoErr: any) {
			const msg = String(cryptoErr?.message || '');
			// If preferredEngine was strictly crypto, do not fallback
			if (preferredEngine === 'crypto') {
				if (msg.includes('Incorrect password') || msg.includes('does not match')) {
					throw new Error('Incorrect password. Please verify the password and try again.');
				}
				throw cryptoErr;
			}
			// In auto mode, fallback to QPDF WASM
		}
	}

	// Secondary / Fallback path: QPDF WASM Web Worker
	try {
		const decrypted = await runQpdfWorker(pdfBytes, password);
		let pageCount: number | undefined;
		try {
			const verifiedDoc = await PDFDocument.load(decrypted);
			pageCount = verifiedDoc.getPageCount();
		} catch {
			// Decrypted successfully
		}

		return {
			bytes: decrypted,
			engine: 'QPDF-WASM',
			durationMs: Date.now() - startTime,
			pageCount,
		};
	} catch (wasmErr: any) {
		const msg = String(wasmErr?.message || wasmErr?.stderr?.join(' ') || '');
		if (
			msg.includes('invalid password') ||
			msg.includes('password incorrect') ||
			msg.includes('Incorrect password')
		) {
			throw new Error('Incorrect password. Please verify the password and try again.');
		}
		throw new Error(
			wasmErr?.message || 'Decryption failed. The file format may be corrupted or unsupported.',
		);
	}
}

/**
 * Generates an encrypted sample PDF for instant testing in the browser.
 */
export async function generateDemoEncryptedPdf(): Promise<{
	fileName: string;
	bytes: Uint8Array;
	password: string;
}> {
	const doc = await PDFDocument.create();
	const fontTitle = await doc.embedFont(StandardFonts.HelveticaBold);
	const fontRegular = await doc.embedFont(StandardFonts.Helvetica);

	// Page 1: Summary Statement
	const page1 = doc.addPage([612, 792]);
	const { width, height } = page1.getSize();

	// Header background banner
	page1.drawRectangle({
		x: 40,
		y: height - 120,
		width: width - 80,
		height: 70,
		color: rgb(0.08, 0.12, 0.22),
	});

	page1.drawText('CONFIDENTIAL FINANCIAL REPORT', {
		x: 60,
		y: height - 85,
		size: 18,
		font: fontTitle,
		color: rgb(0.95, 0.95, 0.98),
	});

	page1.drawText('Document Classification: Strictly Protected (AES-256)', {
		x: 60,
		y: height - 105,
		size: 10,
		font: fontRegular,
		color: rgb(0.7, 0.75, 0.85),
	});

	// Content details
	page1.drawText('Account Identification: ACCT-9921-4829', {
		x: 60,
		y: height - 160,
		size: 12,
		font: fontTitle,
		color: rgb(0.15, 0.2, 0.3),
	});

	page1.drawText('Statement Period: Q3 Financial Summary', {
		x: 60,
		y: height - 185,
		size: 11,
		font: fontRegular,
		color: rgb(0.3, 0.35, 0.45),
	});

	page1.drawText(
		'This sample document was encrypted directly inside your browser using AES-256 encryption.',
		{
			x: 60,
			y: height - 225,
			size: 11,
			font: fontRegular,
			color: rgb(0.2, 0.2, 0.25),
		},
	);

	page1.drawText(
		'Enter password "demo123" to decrypt and download a password-free copy.',
		{
			x: 60,
			y: height - 250,
			size: 11,
			font: fontTitle,
			color: rgb(0.1, 0.5, 0.3),
		},
	);

	// Page 2: Transaction Appendix
	const page2 = doc.addPage([612, 792]);
	page2.drawText('Appendix A: Verified Transaction Ledger', {
		x: 60,
		y: height - 80,
		size: 16,
		font: fontTitle,
		color: rgb(0.1, 0.15, 0.25),
	});

	page2.drawText('All pages decrypt cleanly with layout, fonts, and vector paths preserved.', {
		x: 60,
		y: height - 110,
		size: 11,
		font: fontRegular,
		color: rgb(0.4, 0.4, 0.45),
	});

	const rawBytes = await doc.save();
	const password = 'demo123';
	const encryptedBytes = await encryptPDF(rawBytes, password, {
		algorithm: 'AES-256',
	});

	return {
		fileName: 'Confidential-Demo-Statement.pdf',
		bytes: encryptedBytes,
		password,
	};
}
