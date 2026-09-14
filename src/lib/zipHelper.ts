import { calculateCrc32 } from './hashHelper';

export interface ZipFileEntry {
	name: string;
	data: Uint8Array;
}

/**
 * Creates a standard ZIP archive (PKZIP 2.0 uncompressed store) in pure TypeScript.
 * Runs completely in-memory without external dependencies.
 */
export function createZipArchive(files: ZipFileEntry[]): Blob {
	const textEncoder = new TextEncoder();
	const localFileHeaders: Uint8Array[] = [];
	const centralDirHeaders: Uint8Array[] = [];
	let offset = 0;

	for (const file of files) {
		const nameBytes = textEncoder.encode(file.name);
		const dataBytes = file.data;
		const crc = parseInt(calculateCrc32(dataBytes), 16) || 0;
		const size = dataBytes.length;

		// --- Local File Header (30 bytes + name length) ---
		const localHeader = new Uint8Array(30 + nameBytes.length);
		const lView = new DataView(localHeader.buffer);

		lView.setUint32(0, 0x04034b50, true); // Local file header signature
		lView.setUint16(4, 20, true);         // Version needed to extract (2.0)
		lView.setUint16(6, 0, true);          // General purpose bit flag
		lView.setUint16(8, 0, true);          // Compression method (0 = Store)
		lView.setUint16(10, 0, true);         // File last mod time
		lView.setUint16(12, 0, true);         // File last mod date
		lView.setUint32(14, crc, true);        // CRC-32
		lView.setUint32(18, size, true);       // Compressed size
		lView.setUint32(22, size, true);       // Uncompressed size
		lView.setUint16(26, nameBytes.length, true); // File name length
		lView.setUint16(28, 0, true);         // Extra field length
		localHeader.set(nameBytes, 30);

		localFileHeaders.push(localHeader, dataBytes);

		// --- Central Directory Header (46 bytes + name length) ---
		const centralHeader = new Uint8Array(46 + nameBytes.length);
		const cView = new DataView(centralHeader.buffer);

		cView.setUint32(0, 0x02014b50, true); // Central directory signature
		cView.setUint16(4, 20, true);         // Version made by
		cView.setUint16(6, 20, true);         // Version needed
		cView.setUint16(8, 0, true);          // General purpose bit flag
		cView.setUint16(10, 0, true);         // Compression method (0 = Store)
		cView.setUint16(12, 0, true);         // Mod time
		cView.setUint16(14, 0, true);         // Mod date
		cView.setUint32(16, crc, true);        // CRC-32
		cView.setUint32(20, size, true);       // Compressed size
		cView.setUint32(24, size, true);       // Uncompressed size
		cView.setUint16(28, nameBytes.length, true); // File name length
		cView.setUint16(30, 0, true);         // Extra field length
		cView.setUint16(32, 0, true);         // File comment length
		cView.setUint16(34, 0, true);         // Disk number start
		cView.setUint16(36, 0, true);         // Internal file attributes
		cView.setUint32(38, 0, true);         // External file attributes
		cView.setUint32(42, offset, true);     // Relative offset of local header
		centralHeader.set(nameBytes, 46);

		centralDirHeaders.push(centralHeader);

		offset += localHeader.length + dataBytes.length;
	}

	const centralDirOffset = offset;
	let centralDirSize = 0;
	for (const ch of centralDirHeaders) {
		centralDirSize += ch.length;
	}

	// --- End of Central Directory Record (22 bytes) ---
	const eocd = new Uint8Array(22);
	const eView = new DataView(eocd.buffer);
	eView.setUint32(0, 0x06054b50, true);        // End of central dir signature
	eView.setUint16(4, 0, true);                 // Number of this disk
	eView.setUint16(6, 0, true);                 // Number of the disk with start
	eView.setUint16(8, files.length, true);       // Total entries on this disk
	eView.setUint16(10, files.length, true);      // Total entries in central dir
	eView.setUint32(12, centralDirSize, true);    // Size of central directory
	eView.setUint32(16, centralDirOffset, true);  // Offset of start of central directory
	eView.setUint16(20, 0, true);                // Comment length

	const finalParts: any[] = [...localFileHeaders, ...centralDirHeaders, eocd];
	return new Blob(finalParts, { type: 'application/zip' });
}
