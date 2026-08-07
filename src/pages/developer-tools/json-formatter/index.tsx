import { useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { Copy, Check, Braces, Code, AlertCircle, FileText } from 'lucide-react';

export default function JSONFormatter() {
	const [inputJSON, setInputJSON] = useState(
		'{\n  "name": "Joey Jazwinski",\n  "role": "Full-Stack Developer",\n  "skills": ["React", "TypeScript", "Node.js"],\n  "active": true,\n  "stats": {\n    "projects": 20,\n    "experience_years": 10\n  }\n}',
	);
	const [formattedJSON, setFormattedJSON] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [copied, setCopied] = useState(false);
	const [tabSize, setTabSize] = useState(2);

	const handleFormat = (minify = false) => {
		if (!inputJSON.trim()) {
			setFormattedJSON('');
			setError(null);
			return;
		}

		try {
			const parsed = JSON.parse(inputJSON);
			if (minify) {
				setFormattedJSON(JSON.stringify(parsed));
			} else {
				setFormattedJSON(JSON.stringify(parsed, null, tabSize));
			}
			setError(null);
		} catch (err: any) {
			setError(err.message || 'Invalid JSON format');
		}
	};

	useEffect(() => {
		handleFormat(false);
	}, [inputJSON, tabSize]);

	const copyToClipboard = () => {
		if (!formattedJSON) return;
		navigator.clipboard.writeText(formattedJSON);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const clearAll = () => {
		setInputJSON('');
		setFormattedJSON('');
		setError(null);
	};

	return (
		<>
			<NextSeo
				title="JSON Formatter & Validator - Joey Jazwinski"
				description="Beautify, validate, format, and minify JSON strings with real-time error tracking and premium syntax layout."
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-6xl mx-auto space-y-12">
					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Braces className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
							JSON Formatter & Validator
						</h1>
						<p className="text-muted-foreground text-lg">
							Validate JSON in real-time, beautify structures,
							collapse lines, and optimize files with mini-size
							minification.
						</p>
					</div>

					{/* Tool Workspace */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
						{/* Input Area */}
						<div className="bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-4 shadow-xl">
							<div className="space-y-4 grow">
								<div className="flex justify-between items-center pb-2 border-b border-border/50">
									<h2 className="text-lg font-bold flex items-center gap-2">
										<Code className="w-5 h-5 text-primary" />
										Raw JSON
									</h2>
									<div className="flex gap-2">
										<button
											onClick={clearAll}
											className="text-xs px-2.5 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 border border-border transition text-muted-foreground hover:text-foreground"
										>
											Clear
										</button>
									</div>
								</div>

								<textarea
									value={inputJSON}
									onChange={(e) =>
										setInputJSON(e.target.value)
									}
									className="w-full h-100 p-4 rounded-xl border border-border bg-background/90 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none shadow-inner"
									placeholder="Paste your unformatted JSON here..."
								/>
							</div>

							{error && (
								<div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-500 font-medium">
									<AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
									<span className="break-all font-mono">
										{error}
									</span>
								</div>
							)}
						</div>

						{/* Output Area */}
						<div className="bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-4 shadow-xl">
							<div className="space-y-4 grow">
								<div className="flex justify-between items-center pb-2 border-b border-border/50">
									<h2 className="text-lg font-bold flex items-center gap-2">
										<FileText className="w-5 h-5 text-emerald-500" />
										Formatted Output
									</h2>

									<div className="flex items-center gap-3">
										<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
											<label htmlFor="tab-select">
												Spacing:
											</label>
											<select
												id="tab-select"
												value={tabSize}
												onChange={(e) =>
													setTabSize(
														Number(e.target.value),
													)
												}
												className="bg-background border border-border rounded px-1.5 py-0.5 focus:ring-1 focus:ring-primary"
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
											onClick={() => handleFormat(true)}
											className="text-xs px-2.5 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 border border-border transition text-muted-foreground hover:text-foreground"
										>
											Minify
										</button>
									</div>
								</div>

								<div className="relative group">
									<textarea
										readOnly
										value={formattedJSON}
										className="w-full h-100 p-4 rounded-xl border border-border bg-background/50 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-border resize-none shadow-inner"
										placeholder="Beautified JSON output..."
									/>
									{formattedJSON && (
										<button
											onClick={copyToClipboard}
											className="absolute right-3 top-3 p-2 rounded-lg bg-card border border-border hover:bg-secondary text-muted-foreground hover:text-foreground transition shadow"
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

							<div className="flex items-center justify-between text-xs text-muted-foreground">
								<span>
									Status:{' '}
									{error ? (
										<span className="text-red-500 font-bold">
											Invalid
										</span>
									) : (
										<span className="text-emerald-500 font-bold">
											Valid JSON
										</span>
									)}
								</span>
								<span>
									{formattedJSON
										? `${formattedJSON.length} chars`
										: '0 chars'}
								</span>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
