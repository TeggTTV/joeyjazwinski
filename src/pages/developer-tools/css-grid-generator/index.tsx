import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { Palette, Copy, Check } from 'lucide-react';

export default function CssGridGenerator() {
	const [cols, setCols] = useState(3);
	const [rows, setRows] = useState(3);
	const [copied, setCopied] = useState(false);

	const getCss = () => {
		return `display: grid;\\ngrid-template-columns: repeat(${cols}, 1fr);\\ngrid-template-rows: repeat(${rows}, 1fr);\\ngap: 16px;`;
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(getCss());
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<>
			<NextSeo
				title="CSS Grid Layout Generator - Joey Jazwinski"
				description="Build robust CSS grid structures with visual row and column adjustments and export layout styles client-side."
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-4xl mx-auto space-y-8">
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Palette className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
							CSS Grid Layout Generator
						</h1>
						<p className="text-muted-foreground text-lg">
							Create customizable layout grids and extract layout parameters visually.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
							<h2 className="text-lg font-bold">Grid Dimensions</h2>
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-1">
									<label htmlFor="cols-select" className="text-xs font-semibold text-muted-foreground">Columns</label>
									<select
										id="cols-select"
										className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
										value={cols}
										onChange={(e) => setCols(Number(e.target.value))}
									>
										{[2,3,4,5,6].map(c => <option key={c} value={c}>{c} Columns</option>)}
									</select>
								</div>
								<div className="space-y-1">
									<label htmlFor="rows-select" className="text-xs font-semibold text-muted-foreground">Rows</label>
									<select
										id="rows-select"
										className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
										value={rows}
										onChange={(e) => setRows(Number(e.target.value))}
									>
										{[2,3,4,5,6].map(r => <option key={r} value={r}>{r} Rows</option>)}
									</select>
								</div>
							</div>
						</div>

						<div className="bg-card border border-border rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4">
							<div>
								<div className="flex justify-between items-center mb-4">
									<h2 className="text-lg font-bold">CSS Code Output</h2>
									<button
										onClick={handleCopy}
										className="p-2 rounded-lg hover:bg-secondary border border-border transition text-muted-foreground"
									>
										{copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
									</button>
								</div>
								<pre className="p-4 rounded-xl border border-border bg-background text-xs font-mono break-all text-primary">
									{getCss()}
								</pre>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}