import { useState } from 'react';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import { Terminal, Copy, Check } from 'lucide-react';

export default function CsvToMarkdown() {
	const [csv, setCsv] = useState('name,role,email\nAlice,Admin,alice@example.com\nBob,User,bob@example.com');
	const [markdown, setMarkdown] = useState('');
	const [copied, setCopied] = useState(false);

	const handleConvert = () => {
		const lines = csv.trim().split('\n').map(l => l.split(','));
		if (lines.length > 0) {
			const headers = lines[0].map(h => h.trim());
			const divider = headers.map(() => '---');
			const rows = lines.slice(1).map(row => `| ${row.map(c => c.trim()).join(' | ')} |`);
			setMarkdown(`| ${headers.join(' | ')} |\n| ${divider.join(' | ')} |\n${rows.join('\n')}`);
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
				title="CSV to Markdown Table Converter | Formatter"
				description="Convert raw comma-separated values (CSV) into clean, GitHub-flavored Markdown tables instantly in your browser with zero latency."
				canonical="https://joeyjazwinski.com/developer-tools/csv-to-markdown"
				openGraph={{
					title: "CSV to Markdown Table Converter | Formatter",
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
				<div className="max-w-4xl mx-auto space-y-12">
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Terminal className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-amber-500 bg-clip-text text-transparent">
							CSV to Markdown Table
						</h1>
						<p className="text-muted-foreground text-lg">
							Paste spreadsheet layouts or comma-separated values to generate clean Markdown tables.
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
								placeholder="Paste CSV rows here..."
							/>
							<button
								onClick={handleConvert}
								className="w-full py-2.5 px-4 bg-primary text-primary-foreground font-semibold rounded-xl text-sm hover:opacity-90 transition"
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
										title="Copy to Clipboard"
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

					{/* FAQ & Information Section */}
					<div className="pt-10 border-t border-border/40 space-y-6">
						<div className="text-center space-y-2 max-w-2xl mx-auto">
							<h2 className="text-2xl font-black tracking-tight">
								CSV to Markdown Guide
							</h2>
							<p className="text-sm text-muted-foreground">
								Quick reference for GitHub-flavored markdown table formatting.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground">
									What is GitHub Flavored Markdown (GFM)?
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									GFM standardizes tables using pipe characters (|) to separate columns and hyphens (---) to delineate headers from rows. This format renders cleanly in READMEs, pull requests, and documentation.
								</p>
							</div>
							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground">
									How Do I Convert Spreadsheets to Markdown?
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Export or copy cells from Excel or Google Sheets as CSV, paste them into the input box above, and click Convert Table. The converter generates pipe-aligned table markup instantly.
								</p>
							</div>
							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground">
									Is My Data Processed Online?
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									No. All parsing happens entirely on your local machine within your browser session. Your spreadsheet data is never uploaded to any remote server or stored in cookies.
								</p>
							</div>
							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground">
									Can I Align Columns in Markdown Tables?
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Markdown supports column alignment using colons in the header divider row: :--- for left alignment, :---: for center alignment, and ---: for right alignment.
								</p>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}