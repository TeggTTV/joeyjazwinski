import React, { useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { Terminal, Code, ShieldAlert } from 'lucide-react';

interface MatchGroup {
	matchText: string;
	index: number;
	groups: string[];
}

export default function RegexTester() {
	const [pattern, setPattern] = useState(
		'([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6})',
	);
	const [flags, setFlags] = useState('g');
	const [testText, setTestText] = useState(
		'Contact support@company.com or hello_world123@sub.domain.co for more info.',
	);
	const [matches, setMatches] = useState<MatchGroup[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!pattern) {
			setMatches([]);
			setError(null);
			return;
		}

		try {
			const regex = new RegExp(
				pattern,
				flags.includes('g') ? flags : flags + 'g',
			); // Ensure 'g' to find all matches
			setError(null);

			const results: MatchGroup[] = [];
			let match;
			let safetyCounter = 0; // Safeguard against infinite loops with zero-length matches

			while ((match = regex.exec(testText)) !== null) {
				results.push({
					matchText: match[0],
					index: match.index,
					groups: match.slice(1),
				});

				// Prevent infinite loop if regex matches empty string
				if (match.index === regex.lastIndex) {
					regex.lastIndex++;
				}

				safetyCounter++;
				if (safetyCounter > 1000) break; // Hard threshold
			}
			setMatches(results);
		} catch (err: any) {
			setError(err.message || 'Invalid Regular Expression');
			setMatches([]);
		}
	}, [pattern, flags, testText]);

	const renderHighlightedText = () => {
		if (error || !pattern || matches.length === 0) {
			return <span>{testText}</span>;
		}

		const elements: React.ReactNode[] = [];
		let lastIndex = 0;

		// Sort matches by index to render sequentially
		const sortedMatches = [...matches].sort((a, b) => a.index - b.index);

		sortedMatches.forEach((match, idx) => {
			const matchLen = match.matchText.length;
			const startIndex = match.index;

			// Add preceding plain text
			if (startIndex > lastIndex) {
				elements.push(testText.substring(lastIndex, startIndex));
			}

			// Add highlighted match
			elements.push(
				<mark
					key={idx}
					className="bg-primary/20 text-primary border-b-2 border-primary/60 font-semibold px-0.5 rounded cursor-help"
					title={`Match #${idx + 1}: ${match.matchText}`}
				>
					{testText.substring(startIndex, startIndex + matchLen)}
				</mark>,
			);

			lastIndex = startIndex + matchLen;
		});

		// Add trailing plain text
		if (lastIndex < testText.length) {
			elements.push(testText.substring(lastIndex));
		}

		return elements;
	};

	return (
		<>
			<NextSeo
				title="RegEx Tester & Explainer - Joey Jazwinski"
				description="Test Regular Expressions in real-time with inline highlights, flag toggles, capture group analysis, and error checking."
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-6xl mx-auto space-y-12">
					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Terminal className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-rose-500 bg-clip-text text-transparent">
							RegEx Tester & Explainer
						</h1>
						<p className="text-muted-foreground text-lg">
							Create and test Regular Expressions in real-time.
							Highlights match patterns, captures match indexes,
							and exposes groupings.
						</p>
					</div>

					{/* Workspace */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
						{/* Configuration column */}
						<div className="lg:col-span-6 bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
							<h2 className="text-xl font-bold border-b border-border/50 pb-3 flex items-center gap-2">
								<Code className="w-5 h-5 text-primary" />
								RegEx Configuration
							</h2>

							{/* Expression editor */}
							<div className="space-y-1.5">
								<label
									htmlFor="pattern-input"
									className="block text-sm font-semibold text-muted-foreground"
								>
									Regular Expression
								</label>
								<div className="flex items-center rounded-xl border border-border bg-background px-3 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition">
									<span className="text-muted-foreground font-mono text-lg">
										/
									</span>
									<input
										id="pattern-input"
										type="text"
										value={pattern}
										onChange={(e) =>
											setPattern(e.target.value)
										}
										className="grow bg-transparent px-2 py-3 font-mono text-sm focus:outline-none"
										placeholder="[a-z]+"
									/>
									<span className="text-muted-foreground font-mono text-lg">
										/
									</span>
									<input
										type="text"
										value={flags}
										onChange={(e) =>
											setFlags(e.target.value)
										}
										className="w-12 bg-transparent text-center py-3 font-mono text-sm text-primary focus:outline-none font-bold"
										placeholder="gim"
										title="Regex flags (e.g. g, i, m)"
									/>
								</div>
							</div>

							{/* Test Text */}
							<div className="space-y-1.5">
								<label
									htmlFor="test-area"
									className="block text-sm font-semibold text-muted-foreground"
								>
									Test String
								</label>
								<textarea
									id="test-area"
									value={testText}
									onChange={(e) =>
										setTestText(e.target.value)
									}
									className="w-full h-48 p-4 rounded-xl border border-border bg-background/90 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none shadow-inner"
									placeholder="Paste string values to match here..."
								/>
							</div>

							{error && (
								<div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-500 font-medium">
									<ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
									<span className="font-mono">{error}</span>
								</div>
							)}
						</div>

						{/* Explainer / Highlights column */}
						<div className="lg:col-span-6 space-y-6">
							{/* Live highlight box */}
							<div className="bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
								<h2 className="text-lg font-bold border-b border-border/50 pb-2">
									Real-time Match Visualization
								</h2>
								<div className="w-full min-h-36 p-4 rounded-xl border border-border bg-background/50 font-mono text-sm whitespace-pre-wrap break-all shadow-inner leading-relaxed text-foreground">
									{renderHighlightedText()}
								</div>
							</div>

							{/* Match details table */}
							<div className="bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
								<div className="flex justify-between items-center border-b border-border/50 pb-2">
									<h2 className="text-lg font-bold">
										Matches Summary ({matches.length})
									</h2>
								</div>

								<div className="max-h-60 overflow-y-auto space-y-3.5 pr-1">
									{matches.length > 0 ? (
										matches.map((match, idx) => (
											<div
												key={idx}
												className="p-3 bg-secondary/40 border border-border/50 rounded-xl space-y-1.5 font-mono text-xs"
											>
												<div className="flex justify-between items-center text-xs font-semibold text-muted-foreground border-b border-border/30 pb-1">
													<span>
														Match #{idx + 1}
													</span>
													<span>
														Index: {match.index}
													</span>
												</div>
												<div className="text-sm font-bold text-primary break-all">
													{match.matchText}
												</div>
												{match.groups.length > 0 && (
													<div className="pt-1.5 space-y-1">
														<span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block">
															Captured Groups:
														</span>
														{match.groups.map(
															(group, gIdx) => (
																<div
																	key={gIdx}
																	className="pl-3 border-l-2 border-primary/40 text-muted-foreground text-xs break-all"
																>
																	Group{' '}
																	{gIdx + 1}:{' '}
																	<span className="text-foreground font-semibold">
																		{group ||
																			'null'}
																	</span>
																</div>
															),
														)}
													</div>
												)}
											</div>
										))
									) : (
										<div className="text-center text-muted-foreground italic text-sm py-4">
											No active matches found.
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
