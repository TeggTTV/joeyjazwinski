/**
 * Text cleanup, normalization, and casing transformation helpers.
 */

export function stripHtml(text: string): string {
	return text.replace(/<[^>]*>/g, '');
}

export function normalizeWhitespace(text: string): string {
	return text
		.replace(/[ \t]+/g, ' ')
		.replace(/\n\s*\n\s*\n+/g, '\n\n')
		.trim();
}

export function removeDuplicateLines(text: string): string {
	const lines = text.split('\n');
	const seen = new Set<string>();
	const result: string[] = [];

	for (const line of lines) {
		const trimmed = line.trim();
		if (trimmed === '') {
			result.push(line);
			continue;
		}
		if (!seen.has(trimmed)) {
			seen.add(trimmed);
			result.push(line);
		}
	}

	return result.join('\n');
}

export function toTitleCase(text: string): string {
	return text.replace(
		/\w\S*/g,
		(txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase(),
	);
}

export function toSentenceCase(text: string): string {
	return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
}

export function sortLines(text: string, descending = false): string {
	const lines = text.split('\n');
	lines.sort((a, b) => {
		return descending
			? b.localeCompare(a, undefined, { numeric: true })
			: a.localeCompare(b, undefined, { numeric: true });
	});
	return lines.join('\n');
}
