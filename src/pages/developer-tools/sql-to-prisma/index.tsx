import { useState, useMemo } from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import ToolFaqSection from '@/components/tools/ToolFaqSection';
import {
	Terminal,
	Copy,
	Check,
	ArrowLeftRight,
	Database,
	Download,
	Sparkles,
} from 'lucide-react';
import {
	generatePrismaFromSql,
	generateSqlFromPrisma,
	SQL_PRESETS,
	SqlDialect,
} from '@/lib/sqlPrismaHelper';

const SQL_TO_PRISMA_FAQS = [
	{
		question: 'Which SQL dialects are supported for Prisma schema generation?',
		answer: 'PostgreSQL, MySQL, SQLite, and Microsoft SQL Server (MSSQL) DDL CREATE TABLE statements are supported, including primary keys, foreign key constraints, default timestamps, and nullable fields.',
	},
	{
		question: 'Can this tool convert Prisma schemas back into raw SQL CREATE TABLE statements?',
		answer: 'Yes. Use the Swap toggle button or select Prisma-to-SQL mode to generate equivalent DDL SQL schemas from standard Prisma model definitions.',
	},
	{
		question: 'Are my database schemas stored or transmitted across the web?',
		answer: 'No. The entire AST generation and regex lexical tokenizer run directly inside your local browser runtime.',
	},
];

export default function SqlToPrisma() {
	const [dialect, setDialect] = useState<SqlDialect>('postgresql');
	const [mode, setMode] = useState<'sqlToPrisma' | 'prismaToSql'>('sqlToPrisma');
	const [inputCode, setInputCode] = useState(SQL_PRESETS[0].sql);
	const [copied, setCopied] = useState(false);

	const outputCode = useMemo(() => {
		if (!inputCode.trim()) return '';
		if (mode === 'sqlToPrisma') {
			return generatePrismaFromSql(inputCode, dialect);
		} else {
			return generateSqlFromPrisma(inputCode, dialect);
		}
	}, [inputCode, dialect, mode]);

	const handleCopy = () => {
		if (!outputCode) return;
		navigator.clipboard.writeText(outputCode);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleDownload = () => {
		if (!outputCode) return;
		const filename = mode === 'sqlToPrisma' ? 'schema.prisma' : `schema-${dialect}.sql`;
		const mime = mode === 'sqlToPrisma' ? 'text/plain' : 'application/sql';
		const blob = new Blob([outputCode], { type: mime });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const handleSwap = () => {
		if (!outputCode || outputCode.startsWith('//')) return;
		setInputCode(outputCode);
		setMode(mode === 'sqlToPrisma' ? 'prismaToSql' : 'sqlToPrisma');
	};

	return (
		<>
			<NextSeo
				title="SQL to Prisma Schema & Reverse SQL DDL Generator - Joey Jazwinski"
				description="Convert PostgreSQL, MySQL, SQLite, and MSSQL CREATE TABLE statements into Prisma schema models with mappings and reverse SQL generator."
				canonical="https://joeyjazwinski.com/developer-tools/sql-to-prisma"
				openGraph={{
					title: 'SQL to Prisma Schema & Reverse SQL DDL Generator - Joey Jazwinski',
					description:
						'Convert PostgreSQL, MySQL, SQLite, and MSSQL CREATE TABLE statements into Prisma schema models with mappings and reverse SQL generator.',
					url: 'https://joeyjazwinski.com/developer-tools/sql-to-prisma',
					type: 'website',
					images: [
						{
							url: 'https://joeyjazwinski.com/ogimage.png',
							width: 1200,
							height: 630,
							alt: 'SQL Schema to Prisma Converter',
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
				name="SQL Schema to Prisma Converter"
				description="Convert PostgreSQL, MySQL, SQLite, and MSSQL CREATE TABLE statements into Prisma schema models with mappings and reverse SQL generator."
				url="https://joeyjazwinski.com/developer-tools/sql-to-prisma"
				category="DeveloperApplication"
				faqs={SQL_TO_PRISMA_FAQS}
			/>
			<main className="bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-6xl mx-auto space-y-8">
					<div>
						<Link
							href="/developer-tools"
							className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-primary transition mb-4"
						>
							← Back to all developer tools
						</Link>
					</div>

					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Terminal className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
							SQL &harr; Prisma Converter
						</h1>
						<p className="text-muted-foreground text-lg">
							Translate database DDL statements into Prisma schema models
							or generate SQL CREATE TABLE tables from Prisma schemas.
						</p>
					</div>

					{/* Presets and Controls Bar */}
					<div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border/80 shadow-md">
						<div className="flex flex-wrap items-center gap-2">
							<span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 mr-1">
								<Sparkles className="w-3.5 h-3.5 text-primary" />
								Presets:
							</span>
							{SQL_PRESETS.map((p, idx) => (
								<button
									key={idx}
									onClick={() => {
										setDialect(p.dialect);
										setMode('sqlToPrisma');
										setInputCode(p.sql);
									}}
									className="px-3 py-1.5 rounded-lg bg-secondary/80 hover:bg-secondary border border-border text-xs font-medium text-foreground transition cursor-pointer"
								>
									{p.label}
								</button>
							))}
						</div>

						<div className="flex flex-wrap items-center gap-3">
							{/* Dialect selector */}
							<div className="flex items-center gap-2">
								<Database className="w-3.5 h-3.5 text-muted-foreground" />
								<select
									aria-label="Target SQL Dialect"
									value={dialect}
									onChange={(e) => setDialect(e.target.value as SqlDialect)}
									className="px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-semibold focus:ring-1 focus:ring-primary focus:outline-none cursor-pointer"
								>
									<option value="postgresql">PostgreSQL</option>
									<option value="mysql">MySQL</option>
									<option value="sqlite">SQLite</option>
									<option value="mssql">SQL Server (MSSQL)</option>
								</select>
							</div>

							{/* Direction toggle */}
							<button
								onClick={() => {
									setMode(mode === 'sqlToPrisma' ? 'prismaToSql' : 'sqlToPrisma');
								}}
								className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold border border-primary/20 transition cursor-pointer"
							>
								<ArrowLeftRight className="w-3.5 h-3.5" />
								<span>{mode === 'sqlToPrisma' ? 'SQL → Prisma' : 'Prisma → SQL'}</span>
							</button>
						</div>
					</div>

					{/* Workspace Grid */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
						{/* Left: Input */}
						<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
							<div className="space-y-3 flex-1 flex flex-col">
								<div className="flex justify-between items-center pb-2 border-b border-border/50">
									<h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
										{mode === 'sqlToPrisma' ? `SQL DDL Input (${dialect})` : 'Prisma Schema Input'}
									</h2>
									<button
										onClick={() => setInputCode('')}
										className="text-xs text-muted-foreground hover:text-foreground"
									>
										Clear
									</button>
								</div>
								<textarea
									rows={16}
									className="w-full flex-1 p-4 rounded-xl border border-border bg-background font-mono text-xs focus:outline-none focus:ring-2 focus:ring-primary shadow-inner resize-none min-h-80"
									value={inputCode}
									onChange={(e) => setInputCode(e.target.value)}
									placeholder={
										mode === 'sqlToPrisma'
											? 'CREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  email VARCHAR(255) NOT NULL\n);'
											: 'model User {\n  id Int @id @default(autoincrement())\n  email String @unique\n}'
									}
								/>
							</div>
						</div>

						{/* Right: Output */}
						<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
							<div className="space-y-3 flex-1 flex flex-col">
								<div className="flex justify-between items-center pb-2 border-b border-border/50">
									<h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
										{mode === 'sqlToPrisma' ? 'Prisma Schema Output' : `SQL DDL Output (${dialect})`}
									</h2>

									<div className="flex items-center gap-2">
										<button
											onClick={handleSwap}
											title="Use output as input"
											className="p-1.5 rounded-lg bg-background border border-border hover:bg-secondary text-foreground text-xs flex items-center gap-1 font-medium transition cursor-pointer"
										>
											<ArrowLeftRight className="w-3.5 h-3.5" />
											<span>Swap</span>
										</button>

										<button
											onClick={handleCopy}
											disabled={!outputCode}
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
											disabled={!outputCode}
											className="p-1.5 rounded-lg bg-background border border-border hover:bg-secondary text-foreground text-xs flex items-center gap-1 font-medium transition disabled:opacity-50 cursor-pointer"
										>
											<Download className="w-3.5 h-3.5" />
											<span>Save</span>
										</button>
									</div>
								</div>

								<textarea
									rows={16}
									readOnly
									className="w-full flex-1 p-4 rounded-xl border border-border bg-background/60 font-mono text-xs focus:outline-none shadow-inner resize-none min-h-80"
									value={outputCode || '// Output will appear here...'}
								/>
							</div>
						</div>
					</div>

					<ToolFaqSection faqs={SQL_TO_PRISMA_FAQS} />
				</div>
			</main>
		</>
	);
}
