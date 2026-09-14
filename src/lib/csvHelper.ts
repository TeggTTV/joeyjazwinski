/**
 * Client-side CSV/TSV and Markdown Table parsing utilities.
 * Compliant with RFC 4180 quotation handling.
 */

export type Alignment = 'left' | 'center' | 'right';

/**
 * Parses RFC 4180 compliant CSV/TSV/DSV text into a 2D matrix of strings.
 */
export function parseDelimitedText(text: string, delimiter?: string): { data: string[][]; detectedDelimiter: string } {
	const raw = text.trim();
	if (!raw) {
		return { data: [], detectedDelimiter: ',' };
	}

	// Delimiter detection if not explicitly specified
	let delim = delimiter;
	if (!delim || delim === 'auto') {
		const firstLine = raw.split(/\r?\n/)[0] || '';
		const counts: Record<string, number> = {
			',': (firstLine.match(/,/g) || []).length,
			'\t': (firstLine.match(/\t/g) || []).length,
			';': (firstLine.match(/;/g) || []).length,
			'|': (firstLine.match(/\|/g) || []).length,
		};
		delim = Object.entries(counts).reduce((a, b) => (b[1] > a[1] ? b : a))[0] || ',';
		if (counts[delim] === 0) delim = ',';
	}

	const rows: string[][] = [];
	let currentRow: string[] = [];
	let currentCell = '';
	let insideQuotes = false;

	for (let i = 0; i < raw.length; i++) {
		const char = raw[i];
		const nextChar = raw[i + 1];

		if (char === '"') {
			if (insideQuotes && nextChar === '"') {
				currentCell += '"';
				i++; // Skip escaped quote
			} else {
				insideQuotes = !insideQuotes;
			}
		} else if (char === delim && !insideQuotes) {
			currentRow.push(currentCell.trim());
			currentCell = '';
		} else if ((char === '\r' || char === '\n') && !insideQuotes) {
			if (char === '\r' && nextChar === '\n') i++; // Skip CRLF
			currentRow.push(currentCell.trim());
			if (currentRow.some((c) => c.length > 0)) {
				rows.push(currentRow);
			}
			currentRow = [];
			currentCell = '';
		} else {
			currentCell += char;
		}
	}

	if (currentCell.length > 0 || currentRow.length > 0) {
		currentRow.push(currentCell.trim());
		if (currentRow.some((c) => c.length > 0)) {
			rows.push(currentRow);
		}
	}

	return { data: rows, detectedDelimiter: delim };
}

/**
 * Formats a 2D matrix of cells into a GitHub Flavored Markdown table.
 */
export function matrixToMarkdown(
	matrix: string[][],
	alignments: Alignment[] = [],
	prettyPad = true,
): string {
	if (matrix.length === 0) return '';

	const colCount = Math.max(...matrix.map((row) => row.length));
	if (colCount === 0) return '';

	// Normalize all rows to have colCount columns
	const normalized = matrix.map((row) => {
		const filled = [...row];
		while (filled.length < colCount) filled.push('');
		return filled;
	});

	const headers = normalized[0];
	const dataRows = normalized.slice(1);

	// Compute max width per column
	const colWidths = Array(colCount).fill(3);
	if (prettyPad) {
		normalized.forEach((row) => {
			row.forEach((cell, colIdx) => {
				colWidths[colIdx] = Math.max(colWidths[colIdx], cell.length);
			});
		});
	}

	const pad = (str: string, width: number, align: Alignment) => {
		if (!prettyPad) return str;
		if (align === 'center') {
			const diff = width - str.length;
			const left = Math.floor(diff / 2);
			const right = diff - left;
			return ' '.repeat(left) + str + ' '.repeat(right);
		}
		if (align === 'right') {
			return str.padStart(width, ' ');
		}
		return str.padEnd(width, ' ');
	};

	// Build headers
	const headerLine =
		'| ' +
		headers
			.map((h, i) => pad(h, colWidths[i], alignments[i] || 'left'))
			.join(' | ') +
		' |';

	// Build dividers with alignment colons
	const dividerLine =
		'| ' +
		Array.from({ length: colCount })
			.map((_, i) => {
				const align = alignments[i] || 'left';
				const width = Math.max(3, colWidths[i]);
				if (align === 'center') {
					return ':' + '-'.repeat(Math.max(1, width - 2)) + ':';
				}
				if (align === 'right') {
					return '-'.repeat(Math.max(2, width - 1)) + ':';
				}
				return ':' + '-'.repeat(Math.max(2, width - 1));
			})
			.join(' | ') +
		' |';

	// Build data rows
	const bodyLines = dataRows.map((row) => {
		return (
			'| ' +
			row
				.map((cell, i) => pad(cell, colWidths[i], alignments[i] || 'left'))
				.join(' | ') +
			' |'
		);
	});

	return [headerLine, dividerLine, ...bodyLines].join('\n');
}

/**
 * Parses a GitHub Flavored Markdown table back into a 2D matrix.
 */
export function markdownToMatrix(md: string): string[][] {
	const lines = md
		.trim()
		.split(/\r?\n/)
		.map((l) => l.trim())
		.filter((l) => l.startsWith('|') && l.endsWith('|'));

	if (lines.length < 2) return [];

	const parsed = lines
		.map((line) => {
			const inner = line.slice(1, -1);
			return inner.split('|').map((c) => c.trim());
		})
		.filter((row) => {
			// Filter out divider row e.g. | :--- | :---: | ---: |
			const isDivider = row.every((c) => /^:?-+:?$/.test(c.replace(/\s/g, '')));
			return !isDivider;
		});

	return parsed;
}

/**
 * Converts a 2D matrix back into CSV format.
 */
export function matrixToCsv(matrix: string[][], delimiter = ','): string {
	return matrix
		.map((row) =>
			row
				.map((cell) => {
					if (
						cell.includes(delimiter) ||
						cell.includes('"') ||
						cell.includes('\n')
					) {
						return `"${cell.replace(/"/g, '""')}"`;
					}
					return cell;
				})
				.join(delimiter),
		)
		.join('\n');
}

/**
 * Converts a 2D matrix into a JSON array of objects.
 */
export function matrixToJson(matrix: string[][]): string {
	if (matrix.length < 2) return '[]';
	const headers = matrix[0];
	const rows = matrix.slice(1);
	const objects = rows.map((row) => {
		const obj: Record<string, string> = {};
		headers.forEach((h, i) => {
			obj[h || `col_${i + 1}`] = row[i] || '';
		});
		return obj;
	});
	return JSON.stringify(objects, null, 2);
}
