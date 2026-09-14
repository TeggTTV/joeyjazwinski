import { useState, useEffect, useMemo, useCallback } from 'react';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import {
	Copy,
	Check,
	Braces,
	Code,
	AlertCircle,
	FileText,
	Wrench,
	Network,
	Sparkles,
	Layers,
	Binary,
} from 'lucide-react';
import CodeEditor from '@/components/ui/CodeEditor';
import JsonTreeView from '@/components/tools/JsonTreeView';
import { repairJsonString, calculateJsonStats, JsonStats } from '@/lib/jsonHelper';

const PRESETS: Record<string, string> = {
	userProfile: JSON.stringify(
		{
			id: 'usr_98421',
			name: 'Joey Jazwinski',
			role: 'Full-Stack Developer',
			verified: true,
			skills: ['React', 'TypeScript', 'Node.js', 'Next.js'],
			metrics: {
				projects: 34,
				experienceYears: 10,
				satisfaction: 99.4,
			},
			preferences: {
				theme: 'system',
				notifications: { email: true, push: false },
			},
		},
		null,
		2,
	),
	apiResponse: JSON.stringify(
		{
			status: 'success',
			statusCode: 200,
			timestamp: '2026-09-14T18:30:00Z',
			pagination: { page: 1, limit: 10, totalPages: 5, totalItems: 48 },
			data: [
				{ id: 1, title: 'Speed Optimization in React', views: 1420 },
				{ id: 2, title: 'Web Crypto API In-Depth', views: 3200 },
			],
		},
		null,
		2,
	),
	brokenSample: `{\n  name: 'Broken JSON Example',\n  description: "Single quotes and unquoted keys",\n  tags: ['fast', 'client-side', 'repair',],\n  isDraft: True,\n  comments: None,\n}`,
};

export default function JSONFormatter() {
	const [inputJSON, setInputJSON] = useState(PRESETS.userProfile);
	const [formattedJSON, setFormattedJSON] = useState('');
	const [parsedData, setParsedData] = useState<unknown | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [copied, setCopied] = useState(false);
	const [tabSize, setTabSize] = useState(2);
	const [isMinified, setIsMinified] = useState(false);
	const [activeView, setActiveView] = useState<'code' | 'tree'>('code');
	const [repairNotice, setRepairNotice] = useState<string | null>(null);

	const handleFormat = useCallback(
		(minify = false, sourceText = inputJSON) => {
			if (!sourceText.trim()) {
				setFormattedJSON('');
				setParsedData(null);
				setError(null);
				return;
			}

			try {
				const parsed = JSON.parse(sourceText);
				setParsedData(parsed);
				if (minify) {
					setFormattedJSON(JSON.stringify(parsed));
					setIsMinified(true);
				} else {
					setFormattedJSON(JSON.stringify(parsed, null, tabSize));
					setIsMinified(false);
				}
				setError(null);
			} catch (err: unknown) {
				const message = err instanceof Error ? err.message : 'Invalid JSON format';
				setError(message);
				setParsedData(null);
			}
		},
		[inputJSON, tabSize],
	);

	useEffect(() => {
		handleFormat(isMinified);
	}, [inputJSON, tabSize, isMinified, handleFormat]);

	const handleRepair = () => {
		const { repaired, fixesApplied } = repairJsonString(inputJSON);
		if (fixesApplied.length === 0) {
			setRepairNotice('No repairable syntax errors detected.');
			setTimeout(() => setRepairNotice(null), 2500);
			return;
		}

		try {
			const parsed = JSON.parse(repaired);
			const formatted = JSON.stringify(parsed, null, tabSize);
			setInputJSON(formatted);
			setFormattedJSON(formatted);
			setParsedData(parsed);
			setError(null);
			setRepairNotice(`Repaired: ${fixesApplied.join(', ')}`);
			setTimeout(() => setRepairNotice(null), 3500);
		} catch {
			setError('Automatic repair applied partial fixes, but syntax errors remain.');
		}
	};

	const stats: JsonStats | null = useMemo(() => {
		if (!parsedData) return null;
		return calculateJsonStats(parsedData);
	}, [parsedData]);

	const copyToClipboard = () => {
		if (!formattedJSON) return;
		navigator.clipboard.writeText(formattedJSON);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const clearAll = () => {
		setInputJSON('');
		setFormattedJSON('');
		setParsedData(null);
		setError(null);
		setRepairNotice(null);
	};

	const loadPreset = (key: keyof typeof PRESETS) => {
		const val = PRESETS[key];
		setInputJSON(val);
		setRepairNotice(null);
	};

	return (
		<>
			<NextSeo
				title="JSON Formatter, Validator & Tree Inspector"
				description="Validate, format, prettify, inspect, and auto-repair broken JSON data client-side with syntax highlighting, indentation selection, and detailed node analytics."
				canonical="https://joeyjazwinski.com/developer-tools/json-formatter"
				openGraph={{
					title: 'JSON Formatter, Validator & Tree Inspector',
					description:
						'Validate, format, prettify, inspect, and auto-repair broken JSON data client-side with syntax highlighting, indentation selection, and detailed node analytics.',
					url: 'https://joeyjazwinski.com/developer-tools/json-formatter',
					type: 'website',
					images: [
						{
							url: 'https://joeyjazwinski.com/ogimage.png',
							width: 1200,
							height: 630,
							alt: 'JSON Formatter & Validator',
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
				name="JSON Formatter & Validator"
				description="Validate, format, prettify, inspect, and auto-repair broken JSON data client-side with syntax highlighting, indentation selection, and detailed node analytics."
				url="https://joeyjazwinski.com/developer-tools/json-formatter"
				category="DeveloperApplication"
			/>
			<main className="bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-6xl mx-auto space-y-10">
					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Braces className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
							JSON Formatter & Validator
						</h1>
						<p className="text-muted-foreground text-lg">
							Validate JSON in real-time, auto-fix broken syntax, inspect
							nested tree nodes, and optimize payload sizes.
						</p>
					</div>

					{/* Metrics Bar */}
					{stats && (
						<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-card/70 border border-border/80 rounded-2xl backdrop-blur-md shadow-sm">
							<div className="flex items-center gap-2.5 px-3 py-1.5">
								<Layers className="w-4 h-4 text-primary shrink-0" />
								<div>
									<div className="text-[11px] uppercase tracking-wider text-muted-foreground font-mono">
										Total Nodes
									</div>
									<div className="text-sm font-bold text-foreground">
										{stats.nodeCount.toLocaleString()}
									</div>
								</div>
							</div>
							<div className="flex items-center gap-2.5 px-3 py-1.5">
								<Network className="w-4 h-4 text-purple-500 shrink-0" />
								<div>
									<div className="text-[11px] uppercase tracking-wider text-muted-foreground font-mono">
										Max Depth
									</div>
									<div className="text-sm font-bold text-foreground">
										{stats.maxDepth} levels
									</div>
								</div>
							</div>
							<div className="flex items-center gap-2.5 px-3 py-1.5">
								<Code className="w-4 h-4 text-emerald-500 shrink-0" />
								<div>
									<div className="text-[11px] uppercase tracking-wider text-muted-foreground font-mono">
										Keys / Arrays
									</div>
									<div className="text-sm font-bold text-foreground">
										{stats.keysCount} keys · {stats.arraysCount} arrays
									</div>
								</div>
							</div>
							<div className="flex items-center gap-2.5 px-3 py-1.5">
								<Binary className="w-4 h-4 text-amber-500 shrink-0" />
								<div>
									<div className="text-[11px] uppercase tracking-wider text-muted-foreground font-mono">
										Payload Size
									</div>
									<div className="text-sm font-bold text-foreground">
										{stats.byteSize > 1024
											? `${(stats.byteSize / 1024).toFixed(1)} KB`
											: `${stats.byteSize} B`}
									</div>
								</div>
							</div>
						</div>
					)}

					{/* Tool Workspace */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
						{/* Input Area */}
						<div className="bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-4 shadow-xl">
							<div className="space-y-4 grow flex flex-col">
								<div className="flex flex-wrap justify-between items-center gap-2 pb-2 border-b border-border/50">
									<h2 className="text-lg font-bold flex items-center gap-2">
										<Code className="w-5 h-5 text-primary" />
										Raw JSON
									</h2>
									<div className="flex flex-wrap items-center gap-1.5">
										<button
											onClick={handleRepair}
											className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 transition cursor-pointer font-medium"
											title="Auto-repair single quotes, trailing commas, and unquoted keys"
										>
											<Wrench className="w-3.5 h-3.5" />
											Auto-Fix
										</button>
										<button
											onClick={clearAll}
											className="text-xs px-2.5 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 border border-border transition text-muted-foreground hover:text-foreground cursor-pointer"
										>
											Clear
										</button>
									</div>
								</div>

								{/* Quick Presets */}
								<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
									<Sparkles className="w-3.5 h-3.5 text-primary" />
									<span className="font-medium">Presets:</span>
									<button
										onClick={() => loadPreset('userProfile')}
										className="px-2 py-0.5 rounded bg-secondary/70 hover:bg-secondary border border-border/60 text-xs transition cursor-pointer"
									>
										Profile
									</button>
									<button
										onClick={() => loadPreset('apiResponse')}
										className="px-2 py-0.5 rounded bg-secondary/70 hover:bg-secondary border border-border/60 text-xs transition cursor-pointer"
									>
										API Data
									</button>
									<button
										onClick={() => loadPreset('brokenSample')}
										className="px-2 py-0.5 rounded bg-secondary/70 hover:bg-secondary border border-border/60 text-xs transition cursor-pointer text-amber-500"
									>
										Broken JSON
									</button>
								</div>

								<div className="w-full h-100 min-h-95 flex-1">
									<CodeEditor
										language="json"
										value={inputJSON}
										onChange={setInputJSON}
										ariaLabel="Raw JSON input code editor"
										height="380px"
										minHeight="380px"
									/>
								</div>
							</div>

							{repairNotice && (
								<div className="flex items-center gap-2 p-3 rounded-xl bg-primary/10 border border-primary/20 text-xs text-primary font-medium animate-in fade-in duration-150">
									<Sparkles className="w-4 h-4 shrink-0" />
									<span>{repairNotice}</span>
								</div>
							)}

							{error && (
								<div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-500 font-medium">
									<AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
									<div className="flex-1 space-y-1">
										<span className="break-all font-mono block">
											{error}
										</span>
										<button
											onClick={handleRepair}
											className="underline font-semibold hover:opacity-80 cursor-pointer"
										>
											Click here to try Auto-Fix
										</button>
									</div>
								</div>
							)}
						</div>

						{/* Output Area */}
						<div className="bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-4 shadow-xl">
							<div className="space-y-4 grow flex flex-col">
								<div className="flex flex-wrap justify-between items-center gap-2 pb-2 border-b border-border/50">
									{/* View Toggle */}
									<div className="inline-flex p-0.5 rounded-lg bg-secondary/80 border border-border">
										<button
											onClick={() => setActiveView('code')}
											className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md transition cursor-pointer font-medium ${
												activeView === 'code'
													? 'bg-background text-foreground shadow-xs'
													: 'text-muted-foreground hover:text-foreground'
											}`}
										>
											<FileText className="w-3.5 h-3.5 text-emerald-500" />
											Formatted
										</button>
										<button
											onClick={() => setActiveView('tree')}
											disabled={!parsedData}
											className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md transition cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed ${
												activeView === 'tree'
													? 'bg-background text-foreground shadow-xs'
													: 'text-muted-foreground hover:text-foreground'
											}`}
										>
											<Network className="w-3.5 h-3.5 text-purple-500" />
											Tree View
										</button>
									</div>

									<div className="flex flex-wrap items-center gap-2">
										{activeView === 'code' && (
											<>
												<div className="flex items-center gap-1 text-xs text-muted-foreground">
													<label htmlFor="tab-select">
														Indent:
													</label>
													<select
														id="tab-select"
														value={tabSize}
														onChange={(e) =>
															setTabSize(
																Number(
																	e.target
																		.value,
																),
															)
														}
														className="bg-background border border-border rounded px-1.5 py-0.5 focus:ring-1 focus:ring-primary cursor-pointer text-xs"
													>
														<option value={2}>
															2 spaces
														</option>
														<option value={4}>
															4 spaces
														</option>
													</select>
												</div>

												<button
													onClick={() =>
														handleFormat(false)
													}
													className={`text-xs px-2.5 py-1.5 rounded-lg border transition cursor-pointer ${
														!isMinified
															? 'bg-primary text-primary-foreground border-primary font-medium'
															: 'bg-secondary hover:bg-secondary/80 border-border text-muted-foreground hover:text-foreground'
													}`}
												>
													Beautify
												</button>
												<button
													onClick={() =>
														handleFormat(true)
													}
													className={`text-xs px-2.5 py-1.5 rounded-lg border transition cursor-pointer ${
														isMinified
															? 'bg-primary text-primary-foreground border-primary font-medium'
															: 'bg-secondary hover:bg-secondary/80 border-border text-muted-foreground hover:text-foreground'
													}`}
												>
													Minify
												</button>
											</>
										)}

										{formattedJSON && (
											<button
												onClick={copyToClipboard}
												className="p-1.5 rounded-lg bg-secondary hover:bg-secondary/80 border border-border text-muted-foreground hover:text-foreground transition cursor-pointer"
												title="Copy to Clipboard"
											>
												{copied ? (
													<Check className="w-4 h-4 text-emerald-500" />
												) : (
													<Copy className="w-4 h-4" />
												)}
											</button>
										)}
									</div>
								</div>

								{/* Output Body */}
								<div className="w-full h-100 min-h-95 flex-1">
									{activeView === 'code' ? (
										<CodeEditor
											language="json"
											value={formattedJSON}
											readOnly={true}
											ariaLabel="Formatted JSON output editor"
											height="380px"
											minHeight="380px"
										/>
									) : parsedData ? (
										<JsonTreeView data={parsedData} />
									) : (
										<div className="h-full flex items-center justify-center text-muted-foreground text-sm border border-dashed border-border rounded-xl">
											Provide valid JSON to inspect tree nodes
										</div>
									)}
								</div>
							</div>

							<div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
								<span>
									Status:{' '}
									{error ? (
										<span className="text-red-500 font-bold">
											Invalid
										</span>
									) : (
										<span className="text-emerald-500 font-bold">
											Valid JSON{' '}
											{isMinified && '(Minified)'}
										</span>
									)}
								</span>
								<div className="flex items-center gap-2">
									{inputJSON &&
										formattedJSON &&
										isMinified &&
										inputJSON.length >
											formattedJSON.length && (
											<span className="text-emerald-500 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded text-[11px]">
												Saved{' '}
												{Math.round(
													((inputJSON.length -
														formattedJSON.length) /
														inputJSON.length) *
														100,
												)}
												%
											</span>
										)}
									<span>
										{formattedJSON
											? `${formattedJSON.length} chars`
											: '0 chars'}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
