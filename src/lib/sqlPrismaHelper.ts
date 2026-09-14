export type SqlDialect = 'postgresql' | 'mysql' | 'sqlite' | 'mssql';

export interface ParsedColumn {
	name: string;
	rawType: string;
	isPrimary: boolean;
	isAutoIncrement: boolean;
	isUuid: boolean;
	isNullable: boolean;
	isUnique: boolean;
	defaultValue?: string;
	references?: {
		table: string;
		column: string;
	};
}

export interface ParsedTable {
	name: string;
	columns: ParsedColumn[];
	primaryKeys: string[];
}

/**
 * Converts a snake_case or kebab-case string into camelCase.
 */
export function toCamelCase(str: string): string {
	return str
		.toLowerCase()
		.replace(/[-_]([a-z0-9])/g, (_, g) => g.toUpperCase());
}

/**
 * Converts a plural or snake_case string into PascalCase.
 */
export function toPascalCase(str: string): string {
	const camel = toCamelCase(str);
	// If it ends in 's' and not 'ss', singularize common forms
	let singular = camel;
	if (singular.endsWith('ies')) {
		singular = singular.slice(0, -3) + 'y';
	} else if (singular.endsWith('s') && !singular.endsWith('ss') && !singular.endsWith('us') && !singular.endsWith('is')) {
		singular = singular.slice(0, -1);
	}
	return singular.charAt(0).toUpperCase() + singular.slice(1);
}

/**
 * Maps an SQL type string to a Prisma ORM type.
 */
export function mapSqlTypeToPrisma(rawType: string, dialect: SqlDialect): { type: string; isUuid?: boolean } {
	const t = rawType.toUpperCase().trim();

	if (/^SERIAL\b|^BIGSERIAL\b/i.test(t)) {
		return { type: t.startsWith('BIG') ? 'BigInt' : 'Int' };
	}

	if (/^UUID\b/i.test(t)) {
		return { type: 'String', isUuid: true };
	}

	if (/^INT\b|^INTEGER\b|^SMALLINT\b|^TINYINT\b|^MEDIUMINT\b/i.test(t)) {
		// TINYINT(1) in MySQL is often boolean
		if (dialect === 'mysql' && /TINYINT\s*\(\s*1\s*\)/i.test(t)) {
			return { type: 'Boolean' };
		}
		return { type: 'Int' };
	}

	if (/^BIGINT\b/i.test(t)) {
		return { type: 'BigInt' };
	}

	if (/^BOOL\b|^BOOLEAN\b|^BIT\b/i.test(t)) {
		return { type: 'Boolean' };
	}

	if (/^FLOAT\b|^REAL\b|^DOUBLE\b/i.test(t)) {
		return { type: 'Float' };
	}

	if (/^DECIMAL\b|^NUMERIC\b/i.test(t)) {
		return { type: 'Decimal' };
	}

	if (/^DATE\b|^TIME\b|^DATETIME\b|^TIMESTAMP\b|^TIMESTAMPTZ\b/i.test(t)) {
		return { type: 'DateTime' };
	}

	if (/^JSON\b|^JSONB\b/i.test(t)) {
		return { type: 'Json' };
	}

	if (/^BYTEA\b|^BLOB\b|^BINARY\b|^VARBINARY\b/i.test(t)) {
		return { type: 'Bytes' };
	}

	// Default fallback to String
	return { type: 'String' };
}

/**
 * Parses raw SQL CREATE TABLE statements into parsed tables.
 */
export function parseSqlTables(sql: string, dialect: SqlDialect): ParsedTable[] {
	const tables: ParsedTable[] = [];

	// Match CREATE TABLE [IF NOT EXISTS] `table_name` (...)
	const tableRegex = /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(?:[`"\[]?(\w+)[`"\]]?\.)?[`"\[]?(\w+)[`"\]]?\s*\(([\s\S]*?)\)(?:;|\s*$)/gi;

	let match: RegExpExecArray | null;
	while ((match = tableRegex.exec(sql)) !== null) {
		const rawTableName = match[2] || match[1];
		const body = match[3];

		const columns: ParsedColumn[] = [];
		const primaryKeys: string[] = [];

		// Split definitions by commas outside parentheses
		const lines: string[] = [];
		let currentLine = '';
		let depth = 0;

		for (let i = 0; i < body.length; i++) {
			const char = body[i];
			if (char === '(') depth++;
			else if (char === ')') depth--;

			if (char === ',' && depth === 0) {
				lines.push(currentLine.trim());
				currentLine = '';
			} else {
				currentLine += char;
			}
		}
		if (currentLine.trim()) lines.push(currentLine.trim());

		for (const rawLine of lines) {
			const line = rawLine.replace(/\s+/g, ' ').trim();

			// Table-level PRIMARY KEY (id, ...)
			const pkMatch = line.match(/^PRIMARY\s+KEY\s*\(([^)]+)\)/i);
			if (pkMatch) {
				const keys = pkMatch[1].split(',').map((k) => k.replace(/[`"\[\]\s]/g, ''));
				primaryKeys.push(...keys);
				continue;
			}

			// Table-level UNIQUE (col, ...)
			const uniqueMatch = line.match(/^UNIQUE\s*(?:KEY|INDEX)?\s*\(([^)]+)\)/i);
			if (uniqueMatch) {
				const cols = uniqueMatch[1].split(',').map((k) => k.replace(/[`"\[\]\s]/g, ''));
				for (const c of cols) {
					const colObj = columns.find((col) => col.name === c);
					if (colObj) colObj.isUnique = true;
				}
				continue;
			}

			// Table-level FOREIGN KEY
			const fkMatch = line.match(/^FOREIGN\s+KEY\s*\(([^)]+)\)\s*REFERENCES\s+[`"\[]?(\w+)[`"\]]?\s*\(([^)]+)\)/i);
			if (fkMatch) {
				const colName = fkMatch[1].replace(/[`"\[\]\s]/g, '');
				const refTable = fkMatch[2];
				const refCol = fkMatch[3].replace(/[`"\[\]\s]/g, '');
				const colObj = columns.find((c) => c.name === colName);
				if (colObj) {
					colObj.references = { table: refTable, column: refCol };
				}
				continue;
			}

			// Skip constraints like CONSTRAINT name FOREIGN KEY...
			if (/^CONSTRAINT\b/i.test(line)) {
				const constraintPk = line.match(/CONSTRAINT\s+\w+\s+PRIMARY\s+KEY\s*\(([^)]+)\)/i);
				if (constraintPk) {
					const keys = constraintPk[1].split(',').map((k) => k.replace(/[`"\[\]\s]/g, ''));
					primaryKeys.push(...keys);
				}
				continue;
			}

			// Column definition: `col_name` TYPE [CONSTRAINTS...]
			const colTokens = line.split(/\s+/);
			if (colTokens.length < 2) continue;

			const rawName = colTokens[0].replace(/[`"\[\]]/g, '');
			// Check if first token is SQL keyword
			if (/^(KEY|INDEX|CHECK|FOREIGN|PRIMARY)$/i.test(rawName)) continue;

			const rawType = colTokens[1];
			const rest = colTokens.slice(2).join(' ');

			const isPrimary = /PRIMARY\s+KEY/i.test(rest) || /PRIMARY\s+KEY/i.test(line);
			const isAutoIncrement =
				/AUTO_INCREMENT/i.test(rest) ||
				/AUTOINCREMENT/i.test(rest) ||
				/IDENTITY\b/i.test(rest) ||
				/^SERIAL/i.test(rawType) ||
				/^BIGSERIAL/i.test(rawType);

			const isUnique = /UNIQUE/i.test(rest);
			const isNotNull = /NOT\s+NULL/i.test(rest);
			const isUuid = /UUID/i.test(rawType) || /gen_random_uuid\(\)/i.test(rest);

			let defaultValue: string | undefined;
			const defaultMatch = rest.match(/DEFAULT\s+([^,]+)/i);
			if (defaultMatch) {
				defaultValue = defaultMatch[1].trim();
			}

			columns.push({
				name: rawName,
				rawType,
				isPrimary,
				isAutoIncrement,
				isUuid,
				isNullable: !isNotNull && !isPrimary,
				isUnique,
				defaultValue,
			});

			if (isPrimary && !primaryKeys.includes(rawName)) {
				primaryKeys.push(rawName);
			}
		}

		// Ensure primary keys marked in columns
		for (const pk of primaryKeys) {
			const col = columns.find((c) => c.name === pk);
			if (col) col.isPrimary = true;
		}

		tables.push({
			name: rawTableName,
			columns,
			primaryKeys,
		});
	}

	return tables;
}

/**
 * Generates Prisma Schema from parsed tables.
 */
export function generatePrismaFromSql(sql: string, dialect: SqlDialect): string {
	const tables = parseSqlTables(sql, dialect);
	if (tables.length === 0) {
		return '// No valid CREATE TABLE statements detected in SQL.';
	}

	const lines: string[] = [
		`datasource db {`,
		`  provider = "${dialect === 'sqlite' ? 'sqlite' : dialect === 'mysql' ? 'mysql' : dialect === 'mssql' ? 'sqlserver' : 'postgresql'}"`,
		`  url      = env("DATABASE_URL")`,
		`}`,
		``,
		`generator client {`,
		`  provider = "prisma-client-js"`,
		`}`,
		``,
	];

	for (const table of tables) {
		const modelName = toPascalCase(table.name);
		lines.push(`model ${modelName} {`);

		for (const col of table.columns) {
			const fieldName = toCamelCase(col.name);
			const { type, isUuid } = mapSqlTypeToPrisma(col.rawType, dialect);

			let fieldType = type;
			if (col.isNullable && !col.isPrimary) {
				fieldType += '?';
			}

			const directives: string[] = [];

			if (col.isPrimary) {
				directives.push('@id');
				if (col.isAutoIncrement) {
					directives.push('@default(autoincrement())');
				} else if (col.isUuid || isUuid) {
					directives.push('@default(uuid())');
				}
			} else if (col.isUnique) {
				directives.push('@unique');
			}

			if (col.defaultValue && !directives.some((d) => d.startsWith('@default'))) {
				const dVal = col.defaultValue.toLowerCase();
				if (dVal.includes('now()') || dVal.includes('current_timestamp')) {
					directives.push('@default(now())');
				} else if (dVal === 'true' || dVal === 'false') {
					directives.push(`@default(${dVal})`);
				} else if (!isNaN(Number(col.defaultValue))) {
					directives.push(`@default(${col.defaultValue})`);
				} else if (/^['"].*['"]$/.test(col.defaultValue)) {
					directives.push(`@default(${col.defaultValue})`);
				}
			}

			if (fieldName !== col.name) {
				directives.push(`@map("${col.name}")`);
			}

			// Format padding
			const padField = fieldName.padEnd(14, ' ');
			const padType = fieldType.padEnd(10, ' ');
			const directiveStr = directives.length > 0 ? directives.join(' ') : '';
			lines.push(`  ${padField} ${padType} ${directiveStr}`.trimEnd());
		}

		if (modelName.toLowerCase() !== table.name.toLowerCase() || modelName !== table.name) {
			lines.push(``);
			lines.push(`  @@map("${table.name}")`);
		}

		lines.push(`}`);
		lines.push(``);
	}

	return lines.join('\n').trim();
}

/**
 * Reverse converter: Takes Prisma Schema models and generates SQL DDL CREATE TABLE statements.
 */
export function generateSqlFromPrisma(prismaCode: string, dialect: SqlDialect): string {
	const modelRegex = /model\s+(\w+)\s*\{([\s\S]*?)\}/gi;
	const sqlStatements: string[] = [];

	let modelMatch: RegExpExecArray | null;
	while ((modelMatch = modelRegex.exec(prismaCode)) !== null) {
		const modelName = modelMatch[1];
		const modelBody = modelMatch[2];

		let tableName = modelName.toLowerCase() + 's';
		const mapMatch = modelBody.match(/@@map\("([^"]+)"\)/);
		if (mapMatch) {
			tableName = mapMatch[1];
		}

		const columnDefs: string[] = [];
		const primaryKeys: string[] = [];

		const fieldLines = modelBody.split('\n');
		for (const rawLine of fieldLines) {
			const line = rawLine.trim();
			if (!line || line.startsWith('//') || line.startsWith('@@')) continue;

			const tokens = line.split(/\s+/);
			if (tokens.length < 2) continue;

			const fieldName = tokens[0];
			const fieldType = tokens[1];
			const directives = tokens.slice(2).join(' ');

			// Check @map("col_name")
			let columnName = fieldName;
			const colMapMatch = directives.match(/@map\("([^"]+)"\)/);
			if (colMapMatch) {
				columnName = colMapMatch[1];
			}

			const isId = /@id\b/.test(directives);
			const isAutoInc = /@default\(autoincrement\(\)\)/.test(directives);
			const isUuid = /@default\(uuid\(\)\)/.test(directives);
			const isNow = /@default\(now\(\)\)/.test(directives);
			const isUnique = /@unique\b/.test(directives);
			const isOptional = fieldType.endsWith('?');
			const baseType = fieldType.replace('?', '');

			let sqlType = 'VARCHAR(255)';

			if (baseType === 'Int') {
				if (dialect === 'postgresql' && isAutoInc) {
					sqlType = 'SERIAL';
				} else if (dialect === 'sqlite') {
					sqlType = 'INTEGER';
				} else {
					sqlType = 'INT';
				}
			} else if (baseType === 'BigInt') {
				sqlType = dialect === 'postgresql' && isAutoInc ? 'BIGSERIAL' : 'BIGINT';
			} else if (baseType === 'String') {
				if (isUuid && dialect === 'postgresql') {
					sqlType = 'UUID';
				} else {
					sqlType = 'VARCHAR(255)';
				}
			} else if (baseType === 'Boolean') {
				sqlType = dialect === 'sqlite' ? 'INTEGER' : dialect === 'mysql' ? 'TINYINT(1)' : 'BOOLEAN';
			} else if (baseType === 'DateTime') {
				sqlType = dialect === 'postgresql' ? 'TIMESTAMPTZ' : dialect === 'sqlite' ? 'TEXT' : 'DATETIME';
			} else if (baseType === 'Float') {
				sqlType = 'REAL';
			} else if (baseType === 'Decimal') {
				sqlType = 'DECIMAL(10,2)';
			} else if (baseType === 'Json') {
				sqlType = dialect === 'postgresql' ? 'JSONB' : dialect === 'sqlite' ? 'TEXT' : 'JSON';
			}

			const colParts: string[] = [columnName, sqlType];

			if (isId) {
				if (dialect === 'mysql' && isAutoInc) {
					colParts.push('AUTO_INCREMENT');
				} else if (dialect === 'sqlite' && isAutoInc) {
					colParts.push('PRIMARY KEY AUTOINCREMENT');
				} else {
					colParts.push('PRIMARY KEY');
				}
				primaryKeys.push(columnName);
			}

			if (!isOptional && !isId) {
				colParts.push('NOT NULL');
			}

			if (isUnique && !isId) {
				colParts.push('UNIQUE');
			}

			if (isNow) {
				colParts.push('DEFAULT CURRENT_TIMESTAMP');
			}

			columnDefs.push(`  ${colParts.join(' ')}`);
		}

		const quoteChar = dialect === 'mysql' ? '`' : '"';
		const createSql = `CREATE TABLE ${quoteChar}${tableName}${quoteChar} (\n${columnDefs.join(',\n')}\n);`;
		sqlStatements.push(createSql);
	}

	return sqlStatements.join('\n\n');
}

export const SQL_PRESETS = [
	{
		label: 'User Auth & Sessions',
		dialect: 'postgresql' as SqlDialect,
		sql: `CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id INT NOT NULL REFERENCES users(id),
  token VARCHAR(512) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
	},
	{
		label: 'E-Commerce Store',
		dialect: 'mysql' as SqlDialect,
		sql: `CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sku VARCHAR(64) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  in_stock BOOLEAN DEFAULT true,
  metadata JSON,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_email VARCHAR(255) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  placed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`,
	},
	{
		label: 'Blog & Comments',
		dialect: 'sqlite' as SqlDialect,
		sql: `CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
	},
];
