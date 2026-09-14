export type SqlInsertDialect = 'postgresql' | 'mysql' | 'sqlite' | 'mssql';

export interface JsonSqlOptions {
	tableName: string;
	dialect: SqlInsertDialect;
	batchSize: number;
	includeCreateTable: boolean;
	upsertMode: 'none' | 'ignore' | 'replace' | 'update';
	conflictKey?: string;
}

export const DEFAULT_JSON_SQL_OPTIONS: JsonSqlOptions = {
	tableName: 'users',
	dialect: 'postgresql',
	batchSize: 50,
	includeCreateTable: false,
	upsertMode: 'none',
	conflictKey: 'id',
};

/**
 * Escapes an identifier (table or column name) for a given SQL dialect.
 */
export function escapeIdentifier(id: string, dialect: SqlInsertDialect): string {
	const clean = id.replace(/[`"\[\]]/g, '');
	switch (dialect) {
		case 'mysql':
			return `\`${clean}\``;
		case 'mssql':
			return `[${clean}]`;
		case 'postgresql':
		case 'sqlite':
		default:
			return `"${clean}"`;
	}
}

/**
 * Formats a JavaScript value into an SQL value literal.
 */
export function formatSqlValue(val: any, dialect: SqlInsertDialect): string {
	if (val === null || val === undefined) {
		return 'NULL';
	}

	if (typeof val === 'boolean') {
		if (dialect === 'sqlite' || dialect === 'mssql') {
			return val ? '1' : '0';
		}
		return val ? 'TRUE' : 'FALSE';
	}

	if (typeof val === 'number') {
		if (isNaN(val) || !isFinite(val)) return 'NULL';
		return val.toString();
	}

	if (typeof val === 'object') {
		// Array or nested object -> JSON string
		const str = JSON.stringify(val).replace(/'/g, "''");
		if (dialect === 'postgresql') {
			return `'${str}'::jsonb`;
		}
		return `'${str}'`;
	}

	// String value
	const str = String(val).replace(/'/g, "''");
	return `'${str}'`;
}

/**
 * Infers SQL column type from sample values.
 */
function inferSqlType(values: any[], dialect: SqlInsertDialect): string {
	const nonNull = values.filter((v) => v !== null && v !== undefined);
	if (nonNull.length === 0) return 'TEXT';

	const allBool = nonNull.every((v) => typeof v === 'boolean');
	if (allBool) {
		if (dialect === 'sqlite') return 'INTEGER';
		if (dialect === 'mysql') return 'TINYINT(1)';
		if (dialect === 'mssql') return 'BIT';
		return 'BOOLEAN';
	}

	const allInt = nonNull.every((v) => typeof v === 'number' && Number.isInteger(v));
	if (allInt) {
		return dialect === 'sqlite' ? 'INTEGER' : 'INT';
	}

	const allNum = nonNull.every((v) => typeof v === 'number');
	if (allNum) {
		return dialect === 'sqlite' ? 'REAL' : 'DECIMAL(12, 2)';
	}

	const allObjects = nonNull.every((v) => typeof v === 'object');
	if (allObjects) {
		if (dialect === 'postgresql') return 'JSONB';
		if (dialect === 'sqlite') return 'TEXT';
		return 'JSON';
	}

	// Check if ISO date string
	const allDates = nonNull.every(
		(v) => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2})?/.test(v),
	);
	if (allDates) {
		if (dialect === 'postgresql') return 'TIMESTAMPTZ';
		if (dialect === 'sqlite') return 'TEXT';
		return 'DATETIME';
	}

	return 'TEXT';
}

/**
 * Generates CREATE TABLE statement from rows.
 */
export function generateCreateTableFromRows(
	rows: Record<string, any>[],
	options: JsonSqlOptions,
): string {
	if (rows.length === 0) return '';
	const keys = Array.from(new Set(rows.flatMap((r) => Object.keys(r))));
	const cols: string[] = [];

	for (const k of keys) {
		const values = rows.map((r) => r[k]);
		const colType = inferSqlType(values, options.dialect);
		const idEscaped = escapeIdentifier(k, options.dialect);
		let def = `  ${idEscaped} ${colType}`;
		if (k.toLowerCase() === 'id' || k.toLowerCase() === (options.conflictKey || '').toLowerCase()) {
			def += ' PRIMARY KEY';
		}
		cols.push(def);
	}

	const tName = escapeIdentifier(options.tableName, options.dialect);
	return `CREATE TABLE IF NOT EXISTS ${tName} (\n${cols.join(',\n')}\n);\n\n`;
}

/**
 * Converts JSON input into SQL insert queries.
 */
export function generateSqlInserts(
	rawJson: string,
	options: JsonSqlOptions = DEFAULT_JSON_SQL_OPTIONS,
): string {
	if (!rawJson.trim()) return '';

	let parsed: any;
	try {
		parsed = JSON.parse(rawJson);
	} catch (e: any) {
		return `-- JSON Parse Error: ${e.message}`;
	}

	const rows: Record<string, any>[] = Array.isArray(parsed)
		? parsed
		: typeof parsed === 'object' && parsed !== null
		? [parsed]
		: [];

	if (rows.length === 0) {
		return '-- Error: JSON must be an array of objects or a single JSON object.';
	}

	// Collect unique keys across all rows
	const keys = Array.from(new Set(rows.flatMap((r) => (typeof r === 'object' && r !== null ? Object.keys(r) : []))));
	if (keys.length === 0) {
		return '-- Error: No key-value pairs found in JSON objects.';
	}

	const tName = escapeIdentifier(options.tableName, options.dialect);
	const colHeaders = keys.map((k) => escapeIdentifier(k, options.dialect)).join(', ');

	const lines: string[] = [];

	if (options.includeCreateTable) {
		lines.push(generateCreateTableFromRows(rows, options));
	}

	const batchSize = Math.max(1, options.batchSize);

	for (let i = 0; i < rows.length; i += batchSize) {
		const batch = rows.slice(i, i + batchSize);

		let insertPrefix = `INSERT INTO ${tName} (${colHeaders}) VALUES`;
		if (options.dialect === 'sqlite') {
			if (options.upsertMode === 'ignore') {
				insertPrefix = `INSERT OR IGNORE INTO ${tName} (${colHeaders}) VALUES`;
			} else if (options.upsertMode === 'replace') {
				insertPrefix = `INSERT OR REPLACE INTO ${tName} (${colHeaders}) VALUES`;
			}
		}

		const valuesStrings = batch.map((row) => {
			const formattedCols = keys.map((k) => formatSqlValue(row[k], options.dialect));
			return `  (${formattedCols.join(', ')})`;
		});

		let statement = `${insertPrefix}\n${valuesStrings.join(',\n')}`;

		// Handle Upsert / Conflicts
		if (options.upsertMode !== 'none') {
			const cKey = options.conflictKey || 'id';
			const cKeyEscaped = escapeIdentifier(cKey, options.dialect);

			if (options.dialect === 'postgresql') {
				if (options.upsertMode === 'ignore') {
					statement += `\nON CONFLICT (${cKeyEscaped}) DO NOTHING`;
				} else if (options.upsertMode === 'update') {
					const updates = keys
						.filter((k) => k !== cKey)
						.map((k) => `${escapeIdentifier(k, options.dialect)} = EXCLUDED.${escapeIdentifier(k, options.dialect)}`);
					statement += `\nON CONFLICT (${cKeyEscaped}) DO UPDATE SET\n  ${updates.join(',\n  ')}`;
				}
			} else if (options.dialect === 'mysql') {
				if (options.upsertMode === 'ignore') {
					statement = statement.replace(/^INSERT INTO/, 'INSERT IGNORE INTO');
				} else if (options.upsertMode === 'update') {
					const updates = keys
						.filter((k) => k !== cKey)
						.map((k) => `${escapeIdentifier(k, options.dialect)} = VALUES(${escapeIdentifier(k, options.dialect)})`);
					statement += `\nON DUPLICATE KEY UPDATE\n  ${updates.join(',\n  ')}`;
				}
			}
		}

		statement += ';';
		lines.push(statement);
	}

	return lines.join('\n\n');
}

export const JSON_SQL_PRESETS = [
	{
		label: 'Users List',
		json: JSON.stringify(
			[
				{
					id: 1,
					username: 'alice_dev',
					email: 'alice@example.com',
					role: 'admin',
					is_active: true,
					login_count: 42,
					last_login: '2026-09-14T12:00:00Z',
				},
				{
					id: 2,
					username: 'bob_builder',
					email: 'bob@example.com',
					role: 'member',
					is_active: true,
					login_count: 7,
					last_login: '2026-09-13T18:30:00Z',
				},
				{
					id: 3,
					username: 'carol_sec',
					email: 'carol@example.com',
					role: 'auditor',
					is_active: false,
					login_count: 0,
					last_login: null,
				},
			],
			null,
			2,
		),
	},
	{
		label: 'Products Catalog',
		json: JSON.stringify(
			[
				{
					sku: 'PROD-001',
					name: 'Ergonomic Mechanical Keyboard',
					price: 149.99,
					tags: ['hardware', 'peripherals'],
					in_stock: true,
					stock_quantity: 85,
				},
				{
					sku: 'PROD-002',
					name: 'Ultra-Wide 4K Monitor',
					price: 599.5,
					tags: ['hardware', 'display'],
					in_stock: true,
					stock_quantity: 14,
				},
				{
					sku: 'PROD-003',
					name: 'Noise Canceling Headphones',
					price: 249.0,
					tags: ['audio'],
					in_stock: false,
					stock_quantity: 0,
				},
			],
			null,
			2,
		),
	},
	{
		label: 'Telemetry Event Logs',
		json: JSON.stringify(
			[
				{
					event_id: 'evt_99182',
					event_type: 'page_view',
					path: '/developer-tools/sql-to-prisma',
					duration_ms: 182,
					client_meta: { browser: 'Chrome', os: 'Windows' },
				},
				{
					event_id: 'evt_99183',
					event_type: 'button_click',
					path: '/developer-tools/code-sandbox',
					duration_ms: 45,
					client_meta: { browser: 'Firefox', os: 'macOS' },
				},
			],
			null,
			2,
		),
	},
];
