import { useState } from 'react';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import { Terminal, Copy, Check } from 'lucide-react';

export default function JsonToSqlInsert() {
	const [jsonInput, setJsonInput] = useState('[\\n  {"id": 1, "name": "Alice", "role": "Admin"},\\n  {"id": 2, "name": "Bob", "role": "User"}\\n]');
	const [sqlOutput, setSqlOutput] = useState('');
	const [copied, setCopied] = useState(false);

	const handleConvert = () => {
		try {
			const parsed = JSON.parse(jsonInput);
			if (Array.isArray(parsed) && parsed.length > 0) {
				const keys = Object.keys(parsed[0]);
				const valuesList = parsed.map(row => {
					const vals = keys.map(k => typeof row[k] === 'string' ? `'${row[k]}'` : row[k]);
					return `(${vals.join(', ')})`;
				});
				setSqlOutput(`INSERT INTO my_table (${keys.join(', ')}) VALUES\\n  ${valuesList.join(',\\n  ')};`);
			}
		} catch (err: any) {
			setSqlOutput('Error: ' + err.message);
		}
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(sqlOutput);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<>
			<NextSeo
				title="JSON to SQL Insert Statement Generator | Query Builder - Joey Jazwinski"
				description="Convert arrays of JSON objects or CSV rows into clean SQL INSERT INTO statements for PostgreSQL, MySQL, and SQLite databases."
				canonical="https://joeyjazwinski.com/developer-tools/json-to-sql-insert"
				openGraph={{
					title: "JSON to SQL Insert Statement Generator | Query Builder - Joey Jazwinski",
					description: "Convert arrays of JSON objects or CSV rows into clean SQL INSERT INTO statements for PostgreSQL, MySQL, and SQLite databases.",
					url: "https://joeyjazwinski.com/developer-tools/json-to-sql-insert",
					type: "website",
					images: [
						{
							url: "https://joeyjazwinski.com/ogimage.png",
							width: 1200,
							height: 630,
							alt: "JSON to SQL Insert Script Generator",
						},
					],
				}}
				twitter={{
					handle: "@JoeyJazwinski",
					site: "@JoeyJazwinski",
					cardType: "summary_large_image",
				}}
			/>
			<ToolJsonLd
				name="JSON to SQL Insert Script Generator"
				description="Convert arrays of JSON objects or CSV rows into clean SQL INSERT INTO statements for PostgreSQL, MySQL, and SQLite databases."
				url="https://joeyjazwinski.com/developer-tools/json-to-sql-insert"
				category="DeveloperApplication"
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-4xl mx-auto space-y-8">
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Terminal className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-teal-500 bg-clip-text text-transparent">
							JSON to SQL Insert Script
						</h1>
						<p className="text-muted-foreground text-lg">
							Turn structured array entries instantly into raw database INSERT script columns.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
							<h2 className="text-lg font-bold">Input JSON Array</h2>
							<textarea
								rows={10}
								className="w-full p-4 rounded-xl border border-border bg-background text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary"
								value={jsonInput}
								onChange={(e) => setJsonInput(e.target.value)}
							/>
							<button
								onClick={handleConvert}
								className="w-full py-2.5 px-4 bg-primary text-primary-foreground font-semibold rounded-xl text-sm"
							>
								Generate SQL Script
							</button>
						</div>

						<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
							<div className="flex justify-between items-center">
								<h2 className="text-lg font-bold">Generated SQL</h2>
								{sqlOutput && (
									<button
										onClick={handleCopy}
										className="p-2 rounded-lg hover:bg-secondary border border-border transition text-muted-foreground"
									>
										{copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
									</button>
								)}
							</div>
							<textarea
								rows={11}
								readOnly
								className="w-full p-4 rounded-xl border border-border bg-background text-xs font-mono focus:outline-none"
								value={sqlOutput || '// Click generate to see the INSERT statements'}
							/>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}