/**
 * Client-side JSON repair, analysis, and formatting utilities.
 * Pure JavaScript without external dependencies.
 */

export interface JsonStats {
	byteSize: number;
	nodeCount: number;
	maxDepth: number;
	keysCount: number;
	arraysCount: number;
}

/**
 * Attempts to repair common JSON syntax errors:
 * - Single quotes instead of double quotes
 * - Trailing commas in arrays and objects
 * - Unquoted object keys
 * - Python-style booleans/None (True, False, None)
 * - Single-line and multi-line comments
 */
export function repairJsonString(raw: string): { repaired: string; fixesApplied: string[] } {
	const fixes: string[] = [];
	let text = raw.trim();

	if (!text) {
		return { repaired: '', fixesApplied: [] };
	}

	// 1. Remove single-line comments: // ...
	if (/\/\/.*$/m.test(text)) {
		text = text.replace(/\/\/.*$/gm, '');
		fixes.push('Stripped single-line comments');
	}

	// 2. Remove multi-line comments: /* ... */
	if (/\/\*[\s\S]*?\*\//.test(text)) {
		text = text.replace(/\/\*[\s\S]*?\*\//g, '');
		fixes.push('Stripped multi-line comments');
	}

	// 3. Replace Python constants: True, False, None outside of quotes
	const pythonReplaced = text
		.replace(/(:\s*)True(\b)/g, '$1true$2')
		.replace(/(:\s*)False(\b)/g, '$1false$2')
		.replace(/(:\s*)None(\b)/g, '$1null$2');
	if (pythonReplaced !== text) {
		text = pythonReplaced;
		fixes.push('Replaced Python literals (True/False/None)');
	}

	// 4. Quote unquoted keys: e.g. { foo: 1, bar_baz: 2, 123: 3 }
	const unquotedKeyRegex = /([{,]\s*)([a-zA-Z0-9_$]+)\s*:/g;
	if (unquotedKeyRegex.test(text)) {
		text = text.replace(unquotedKeyRegex, '$1"$2":');
		fixes.push('Quoted unquoted object keys');
	}

	// 5. Replace single-quoted strings: 'value' -> "value"
	if (/'(?:[^'\\]|\\.)*'/.test(text)) {
		text = text.replace(/'((?:[^'\\]|\\.)*)'/g, (_, content) => {
			const sanitized = content
				.replace(/"/g, '\\"')
				.replace(/\\'/g, "'");
			return `"${sanitized}"`;
		});
		fixes.push('Converted single quotes to double quotes');
	}

	// 6. Remove trailing commas: ,} or ,]
	const trailingCommaRegex = /,\s*([}\]])/g;
	if (trailingCommaRegex.test(text)) {
		text = text.replace(trailingCommaRegex, '$1');
		fixes.push('Removed trailing commas');
	}

	return { repaired: text, fixesApplied: fixes };
}

/**
 * Calculates structural statistics from a parsed JSON value.
 */
export function calculateJsonStats(value: unknown): JsonStats {
	let nodeCount = 0;
	let keysCount = 0;
	let arraysCount = 0;
	let maxDepth = 0;

	function traverse(val: unknown, currentDepth: number) {
		if (currentDepth > maxDepth) {
			maxDepth = currentDepth;
		}
		nodeCount++;

		if (val === null || typeof val !== 'object') {
			return;
		}

		if (Array.isArray(val)) {
			arraysCount++;
			for (const item of val) {
				traverse(item, currentDepth + 1);
			}
		} else {
			keysCount += Object.keys(val).length;
			for (const key of Object.keys(val)) {
				traverse((val as Record<string, unknown>)[key], currentDepth + 1);
			}
		}
	}

	traverse(value, 1);

	let byteSize = 0;
	try {
		const str = JSON.stringify(value);
		byteSize = new TextEncoder().encode(str).length;
	} catch {
		byteSize = 0;
	}

	return {
		byteSize,
		nodeCount,
		maxDepth,
		keysCount,
		arraysCount,
	};
}
