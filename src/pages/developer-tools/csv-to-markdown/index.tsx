import { useState } from 'react';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import { Terminal, Copy, Check } from 'lucide-react';

export default function CsvToMarkdown() {
	const [csv, setCsv] = useState('name,role,email\\nAlice,Admin,alice@example.com\\nBob,User,bob@example.com');
	const [markdown, setMarkdown] = useState('');
	const [copied, setCopied] = useState(false);

	const handleConvert = () => {
		const lines = csv.split('\\n').map(l => l.split(','));
		if (lines.length > 0) {
			const headers = lines[0];
			const divider = headers.map(() => '---');
			const rows = lines.slice(1).map(row => `| ${row.join(' | ')} |`);
			setMarkdown(`| ${headers.join(' | ')} |\\n| ${divider.join(' | ')} |\\n${rows.join('\\n')}`);
		}
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(markdown);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<>
			<NextSeo
				title="Free CSV to Markdown Table Converter | Fast Table Formatter - Joey Jazwinski"
				description="Convert raw comma-separated values (CSV) into clean, GitHub-flavored Markdown tables instantly in your browser with zero latency."
				canonical="https://joeyjazwinski.com/developer-tools/csv-to-markdown"
				openGraph={{
					title: "Free CSV to Markdown Table Converter | Fast Table Formatter - Joey Jazwinski",
					description: "Convert raw comma-separated values (CSV) into clean, GitHub-flavored Markdown tables instantly in your browser with zero latency.",
					url: "https://joeyjazwinski.com/developer-tools/csv-to-markdown",
					type: "website",
					images: [
						{
							url: "https://joeyjazwinski.com/ogimage.png",
							width: 1200,
							height: 630,
							alt: "CSV to Markdown Table Converter",
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
				name="CSV to Markdown Table Converter"
				description="Convert raw comma-separated values (CSV) into clean, GitHub-flavored Markdown tables instantly in your browser with zero latency."
				url="https://joeyjazwinski.com/developer-tools/csv-to-markdown"
				category="DeveloperApplication"
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-4xl mx-auto space-y-8">
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Terminal className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-amber-500 bg-clip-text text-transparent">
							CSV to Markdown Table
						</h1>
						<p className="text-muted-foreground text-lg">
							Paste spreadsheet layouts or comma values to generate clean markup tables.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
							<h2 className="text-lg font-bold">Input CSV</h2>
							<textarea
								rows={10}
								className="w-full p-4 rounded-xl border border-border bg-background text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary"
								value={csv}
								onChange={(e) => setCsv(e.target.value)}
							/>
							<button
								onClick={handleConvert}
								className="w-full py-2.5 px-4 bg-primary text-primary-foreground font-semibold rounded-xl text-sm"
							>
								Convert Table
							</button>
						</div>

						<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
							<div className="flex justify-between items-center">
								<h2 className="text-lg font-bold">Markdown Format</h2>
								{markdown && (
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
								value={markdown || '// Click convert to see the markdown table'}
							/>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}