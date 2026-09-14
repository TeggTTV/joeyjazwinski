import { useState, useMemo } from 'react';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import {
	Terminal,
	Copy,
	Check,
	Download,
	Sparkles,
	Sliders,
	Database,
	Layers,
} from 'lucide-react';
import {
	generateSqlInserts,
	JSON_SQL_PRESETS,
	JsonSqlOptions,
	SqlInsertDialect,
	DEFAULT_JSON_SQL_OPTIONS,
} from '@/lib/jsonSqlHelper';

export default function JsonToSqlInsert() {
	const [jsonInput, setJsonInput] = useState(JSON_SQL_PRESETS[0].json);
	const [options, setOptions] = useState<JsonSqlOptions>(DEFAULT_JSON_SQL_OPTIONS);
	const [copied, setCopied] = useState(false);

	// Calculate counts
	const stats = useMemo(() => {
		try {
			const parsed = JSON.parse(jsonInput);
			const rows = Array.isArray(parsed) ? parsed : [parsed];
			const keys = Array.from(new Set(rows.flatMap((r) => (r && typeof r === 'object' ? Object.keys(r) : []))));
			return { rows: rows.length, cols: keys.length, valid: true };
		} catch {
			return { rows: 0, cols: 0, valid: false };
		}
	}, [jsonInput]);

	// Generate SQL Output
	const sqlOutput = useMemo(() => {
		return generateSqlInserts(jsonInput, options);
	}, [jsonInput, options]);

	const handleCopy = () => {
		if (!sqlOutput) return;
		navigator.clipboard.writeText(sqlOutput);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleDownload = () => {
		if (!sqlOutput) return;
		const blob = new Blob([sqlOutput], { type: 'application/sql' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${options.tableName || 'inserts'}-${options.dialect}.sql`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	return (
		<>
			<NextSeo
				title="JSON to SQL Insert Script & Bulk Query Generator"
				description="Convert arrays of JSON objects into PostgreSQL, MySQL, SQLite, and MSSQL INSERT statements with batching, upsert clauses, and table schema inference."
				canonical="https://joeyjazwinski.com/developer-tools/json-to-sql-insert"
				openGraph={{
					title: 'JSON to SQL Insert Script & Bulk Query Generator',
					description:
						'Convert arrays of JSON objects into PostgreSQL, MySQL, SQLite, and MSSQL INSERT statements with batching, upsert clauses, and table schema inference.',
					url: 'https://joeyjazwinski.com/developer-tools/json-to-sql-insert',
					type: 'website',
					images: [
						{
							url: 'https://joeyjazwinski.com/ogimage.png',
							width: 1200,
							height: 630,
							alt: 'JSON to SQL Insert Script Generator',
						},
					],
				}}
				twitter={{
					handle: '@JoeyJazwinski',
					site: '@JoeyJazwinski',
					cardType: 'summary_large_image',
				}}
			/>
			<ToolJsonLd
				name="JSON to SQL Insert Script Generator"
				description="Convert arrays of JSON objects into PostgreSQL, MySQL, SQLite, and MSSQL INSERT statements with batching, upsert clauses, and table schema inference."
				url="https://joeyjazwinski.com/developer-tools/json-to-sql-insert"
				category="DeveloperApplication"
			/>
			<main className="bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-6xl mx-auto space-y-8">
					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Terminal className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary via-teal-500 to-cyan-500 bg-clip-text text-transparent">
							JSON to SQL Inserts
						</h1>
						<p className="text-muted-foreground text-lg">
							Turn structured array entries instantly into raw database
							INSERT statements with upserts and dialect escaping.
						</p>
					</div>

					{/* Presets Bar */}
					<div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border/80 shadow-md">
						<div className="flex flex-wrap items-center gap-2">
							<span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 mr-1">
								<Sparkles className="w-3.5 h-3.5 text-primary" />
								Presets:
							</span>
							{JSON_SQL_PRESETS.map((p, idx) => (
								<button
									key={idx}
									onClick={() => setJsonInput(p.json)}
									className="px-3 py-1.5 rounded-lg bg-secondary/80 hover:bg-secondary border border-border text-xs font-medium text-foreground transition cursor-pointer"
								>
									{p.label}
								</button>
							))}
						</div>

						{/* Quick stats strip */}
						<div className="flex items-center gap-4 text-xs font-mono">
							<div className="text-muted-foreground">
								Rows: <span className="text-foreground font-bold">{stats.rows}</span>
							</div>
							<div className="text-muted-foreground">
								Columns: <span className="text-foreground font-bold">{stats.cols}</span>
							</div>
							<div
								className={`px-2 py-0.5 rounded text-[10px] font-bold ${
									stats.valid
										? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
										: 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
								}`}
							>
								{stats.valid ? 'Valid JSON' : 'Invalid JSON'}
							</div>
						</div>
					</div>

					{/* Options Panel */}
					<div className="bg-card border border-border/80 rounded-2xl p-5 shadow-lg space-y-4">
						<div className="flex items-center gap-2 pb-2 border-b border-border/50 text-sm font-bold text-foreground">
							<Sliders className="w-4 h-4 text-primary" />
							Query Generation Options
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
							{/* Table Name */}
							<div className="space-y-1.5">
								<label className="text-muted-foreground font-semibold">Table Name</label>
								<input
									type="text"
									value={options.tableName}
									onChange={(e) =>
										setOptions({ ...options, tableName: e.target.value.replace(/[^a-zA-Z0-9_]/g, '') })
									}
									className="w-full px-3 py-1.5 rounded-lg border border-border bg-background font-mono focus:ring-1 focus:ring-primary focus:outline-none"
									placeholder="users"
								/>
							</div>

							{/* Dialect */}
							<div className="space-y-1.5">
								<label className="text-muted-foreground font-semibold">SQL Dialect</label>
								<select
									aria-label="Target SQL Dialect"
									value={options.dialect}
									onChange={(e) =>
										setOptions({ ...options, dialect: e.target.value as SqlInsertDialect })
									}
									className="w-full px-3 py-1.5 rounded-lg border border-border bg-background font-semibold focus:ring-1 focus:ring-primary focus:outline-none cursor-pointer"
								>
									<option value="postgresql">PostgreSQL</option>
									<option value="mysql">MySQL</option>
									<option value="sqlite">SQLite</option>
									<option value="mssql">SQL Server (MSSQL)</option>
								</select>
							</div>

							{/* Upsert Mode */}
							<div className="space-y-1.5">
								<label className="text-muted-foreground font-semibold">Duplicate Handling</label>
								<select
									aria-label="Duplicate row handling strategy"
									value={options.upsertMode}
									onChange={(e) =>
										setOptions({ ...options, upsertMode: e.target.value as any })
									}
									className="w-full px-3 py-1.5 rounded-lg border border-border bg-background font-semibold focus:ring-1 focus:ring-primary focus:outline-none cursor-pointer"
								>
									<option value="none">Standard INSERT</option>
									<option value="ignore">Ignore on conflict</option>
									<option value="update">Update on conflict (Upsert)</option>
								</select>
							</div>

							{/* Batch Size */}
							<div className="space-y-1.5">
								<label className="text-muted-foreground font-semibold">Batch Chunk Size</label>
								<select
									aria-label="Rows per SQL insert statement"
									value={options.batchSize}
									onChange={(e) =>
										setOptions({ ...options, batchSize: parseInt(e.target.value, 10) })
									}
									className="w-full px-3 py-1.5 rounded-lg border border-border bg-background font-semibold focus:ring-1 focus:ring-primary focus:outline-none cursor-pointer"
								>
									<option value={10}>10 rows / statement</option>
									<option value={50}>50 rows / statement</option>
									<option value={100}>100 rows / statement</option>
									<option value={500}>500 rows / statement</option>
								</select>
							</div>
						</div>

						{/* Secondary options row */}
						<div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-border/40 text-xs">
							<label className="flex items-center gap-2 cursor-pointer">
								<input
									type="checkbox"
									checked={options.includeCreateTable}
									onChange={(e) =>
										setOptions({ ...options, includeCreateTable: e.target.checked })
									}
									className="rounded border-border text-primary focus:ring-primary"
								/>
								<span className="font-medium text-foreground">
									Include inferred CREATE TABLE statement
								</span>
							</label>

							{options.upsertMode !== 'none' && (
								<div className="flex items-center gap-2">
									<span className="text-muted-foreground font-medium">Conflict Key:</span>
									<input
										type="text"
										value={options.conflictKey || 'id'}
										onChange={(e) =>
											setOptions({ ...options, conflictKey: e.target.value.trim() })
										}
										className="w-24 px-2 py-1 rounded border border-border bg-background font-mono text-xs focus:ring-1 focus:ring-primary focus:outline-none"
									/>
								</div>
							)}
						</div>
					</div>

					{/* Workbench Grid */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
						{/* Left: JSON Input */}
						<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
							<div className="space-y-3 flex-1 flex flex-col">
								<div className="flex justify-between items-center pb-2 border-b border-border/50">
									<h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
										JSON Object / Array Input
									</h2>
									<button
										onClick={() => setJsonInput('')}
										className="text-xs text-muted-foreground hover:text-foreground cursor-pointer"
									>
										Clear
									</button>
								</div>
								<textarea
									rows={16}
									className="w-full flex-1 p-4 rounded-xl border border-border bg-background font-mono text-xs focus:outline-none focus:ring-2 focus:ring-primary shadow-inner resize-none min-h-80"
									value={jsonInput}
									onChange={(e) => setJsonInput(e.target.value)}
									placeholder='[{"id": 1, "name": "Alice"}]'
								/>
							</div>
						</div>

						{/* Right: SQL Output */}
						<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
							<div className="space-y-3 flex-1 flex flex-col">
								<div className="flex justify-between items-center pb-2 border-b border-border/50">
									<h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
										<Database className="w-3.5 h-3.5 text-primary" />
										Generated SQL Queries
									</h2>

									<div className="flex items-center gap-2">
										<button
											onClick={handleCopy}
											disabled={!sqlOutput || sqlOutput.startsWith('--')}
											className="p-1.5 rounded-lg bg-background border border-border hover:bg-secondary text-foreground text-xs flex items-center gap-1 font-medium transition disabled:opacity-50 cursor-pointer"
										>
											{copied ? (
												<>
													<Check className="w-3.5 h-3.5 text-emerald-500" />
													<span>Copied</span>
												</>
											) : (
												<>
													<Copy className="w-3.5 h-3.5" />
													<span>Copy</span>
												</>
											)}
										</button>

										<button
											onClick={handleDownload}
											disabled={!sqlOutput || sqlOutput.startsWith('--')}
											className="p-1.5 rounded-lg bg-background border border-border hover:bg-secondary text-foreground text-xs flex items-center gap-1 font-medium transition disabled:opacity-50 cursor-pointer"
										>
											<Download className="w-3.5 h-3.5" />
											<span>Download .sql</span>
										</button>
									</div>
								</div>

								<textarea
									rows={16}
									readOnly
									className="w-full flex-1 p-4 rounded-xl border border-border bg-background/60 font-mono text-xs focus:outline-none shadow-inner resize-none min-h-80"
									value={sqlOutput || '-- SQL output appears here...'}
								/>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
