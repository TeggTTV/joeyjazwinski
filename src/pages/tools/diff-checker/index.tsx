import React, { useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { Eye, Code, ArrowLeftRight, Check, Copy } from 'lucide-react';

interface DiffLine {
	type: 'added' | 'removed' | 'unchanged';
	text: string;
}

export default function DiffChecker() {
	const [textOriginal, setTextOriginal] = useState('const config = {\n  host: "localhost",\n  port: 8080,\n  secure: false\n};');
	const [textModified, setTextModified] = useState('const config = {\n  host: "127.0.0.1",\n  port: 9000,\n  secure: true,\n  debug: true\n};');
	const [diffResult, setDiffResult] = useState<DiffLine[]>([]);

	const computeDiff = (original: string, modified: string) => {
		const origLines = original.split('\n');
		const modLines = modified.split('\n');
		
		const dp: number[][] = Array(origLines.length + 1)
			.fill(null)
			.map(() => Array(modLines.length + 1).fill(0));
		
		for (let i = 1; i <= origLines.length; i++) {
			for (let j = 1; j <= modLines.length; j++) {
				if (origLines[i - 1] === modLines[j - 1]) {
					dp[i][j] = dp[i - 1][j - 1] + 1;
				} else {
					dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
				}
			}
		}
		
		let i = origLines.length;
		let j = modLines.length;
		const diff: DiffLine[] = [];
		
		while (i > 0 || j > 0) {
			if (i > 0 && j > 0 && origLines[i - 1] === modLines[j - 1]) {
				diff.unshift({ type: 'unchanged', text: origLines[i - 1] });
				i--;
				j--;
			} else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
				diff.unshift({ type: 'added', text: modLines[j - 1] });
				j--;
			} else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
				diff.unshift({ type: 'removed', text: origLines[i - 1] });
				i--;
			}
		}
		setDiffResult(diff);
	};

	useEffect(() => {
		computeDiff(textOriginal, textModified);
	}, [textOriginal, textModified]);

	const clearAll = () => {
		setTextOriginal('');
		setTextModified('');
		setDiffResult([]);
	};

	return (
		<>
			<NextSeo
				title="Text Diff Checker | Joey Jazwinski"
				description="Compare two text files or snippets side-by-side. Spot differences, updates, additions, and deletions in real-time."
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-6xl mx-auto space-y-12">
					
					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<ArrowLeftRight className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-primary to-rose-500 bg-clip-text text-transparent">
							Text Diff Checker
						</h1>
						<p className="text-muted-foreground text-lg">
							Compare two text snippets instantly. Highlighting modifications, deletions, and inserts using a robust LCS difference engine.
						</p>
					</div>

					{/* Work Panels */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
						{/* Original Input */}
						<div className="bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
							<div className="flex justify-between items-center pb-2 border-b border-border/50">
								<h2 className="text-lg font-bold text-muted-foreground">Original Text (A)</h2>
								<button onClick={clearAll} className="text-xs text-muted-foreground hover:text-foreground">Clear</button>
							</div>
							<textarea
								value={textOriginal}
								onChange={(e) => setTextOriginal(e.target.value)}
								className="w-full h-80 p-4 rounded-xl border border-border bg-background/90 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none shadow-inner"
								placeholder="Paste your original code or text here..."
							/>
						</div>

						{/* Modified Input */}
						<div className="bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
							<div className="flex justify-between items-center pb-2 border-b border-border/50">
								<h2 className="text-lg font-bold text-muted-foreground">Modified Text (B)</h2>
							</div>
							<textarea
								value={textModified}
								onChange={(e) => setTextModified(e.target.value)}
								className="w-full h-80 p-4 rounded-xl border border-border bg-background/90 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none shadow-inner"
								placeholder="Paste your modified code or text here..."
							/>
						</div>
					</div>

					{/* Diff Output Panel */}
					<div className="bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
						<h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b border-border/50">
							<Eye className="w-5 h-5 text-emerald-500" />
							Difference Results
						</h2>
						
						<div className="w-full max-h-[500px] overflow-y-auto rounded-xl border border-border bg-background/40 font-mono text-sm shadow-inner overflow-x-auto">
							{diffResult.length > 0 ? (
								<table className="w-full border-collapse">
									<tbody>
										{diffResult.map((line, index) => {
											const isAdded = line.type === 'added';
											const isRemoved = line.type === 'removed';
											return (
												<tr 
													key={index}
													className={`hover:bg-muted/10 transition-colors ${
														isAdded ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
														isRemoved ? 'bg-red-500/10 text-red-600 dark:text-red-400' :
														'text-foreground'
													}`}
												>
													<td className="w-12 text-center text-xs border-r border-border/30 select-none py-1 text-muted-foreground font-semibold">
														{isAdded ? '+' : isRemoved ? '-' : ' '}
													</td>
													<td className="px-4 py-1 whitespace-pre-wrap break-all">
														{line.text || '\u00A0'}
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							) : (
								<div className="p-8 text-center text-muted-foreground italic">
									No differences to display. Add text above to run comparison...
								</div>
							)}
						</div>
					</div>

				</div>
			</main>
		</>
	);
}
