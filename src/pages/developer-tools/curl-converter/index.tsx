import { useState, useMemo } from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import {
	Terminal,
	Copy,
	Check,
	Sparkles,
	Code2,
	RefreshCw,
	ArrowRight,
	ExternalLink,
	ShieldCheck,
	Zap,
} from 'lucide-react';
import {
	convertCurl,
	parseCurl,
	TARGET_OPTIONS,
	TargetLanguage,
	CURL_TEMPLATES,
} from '@/utils/curlParser';
import CodeEditor from '@/components/ui/CodeEditor';

export default function CurlConverter() {
	const [curlInput, setCurlInput] = useState(
		'curl -X POST "https://api.example.com/v1/users" \\\n  -H "Authorization: Bearer sec_tok_99182a" \\\n  -H "Content-Type: application/json" \\\n  -d \'{"name": "Joey Jazwinski", "role": "engineer", "active": true}\'',
	);
	const [targetLang, setTargetLang] = useState<TargetLanguage>('powershell_rest');
	const [copied, setCopied] = useState(false);

	// Parse info for inspector badges
	const parsedMeta = useMemo(() => {
		try {
			if (!curlInput.trim()) return null;
			return parseCurl(curlInput);
		} catch {
			return null;
		}
	}, [curlInput]);

	// Convert code based on input and target
	const codeOutput = useMemo(() => {
		return convertCurl(curlInput, targetLang);
	}, [curlInput, targetLang]);

	const handleCopy = () => {
		navigator.clipboard.writeText(codeOutput);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleTemplateSelect = (templateCurl: string) => {
		setCurlInput(templateCurl);
	};

	const currentTarget = TARGET_OPTIONS.find((t) => t.id === targetLang);

	// Group targets by category
	const categories = ['JavaScript', 'Shell', 'Python', 'Backend', 'Compiled'] as const;

	return (
		<>
			<NextSeo
				title="cURL to PowerShell, Axios & Multi-Language Code Converter"
				description="Convert terminal cURL commands into clean PowerShell (Invoke-RestMethod), Axios, Fetch API, Python, Go, Rust, and Node.js requests instantly in your browser."
				canonical="https://joeyjazwinski.com/developer-tools/curl-converter"
				openGraph={{
					title: 'cURL to PowerShell, Axios & Multi-Language Code Converter',
					description:
						'Convert terminal cURL commands into clean PowerShell (Invoke-RestMethod), Axios, Fetch API, Python, Go, Rust, and Node.js requests instantly in your browser.',
					url: 'https://joeyjazwinski.com/developer-tools/curl-converter',
					type: 'website',
					images: [
						{
							url: 'https://joeyjazwinski.com/ogimage.png',
							width: 1200,
							height: 630,
							alt: 'cURL to Multi-Target Code Converter',
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
				name="cURL to Multi-Target Code Converter"
				description="Convert terminal cURL commands into clean PowerShell, Axios, Fetch API, Python requests, Go, Rust, and Node.js code client-side."
				url="https://joeyjazwinski.com/developer-tools/curl-converter"
				category="DeveloperApplication"
			/>
			<main className="bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-6xl mx-auto space-y-8">
					{/* Header */}
					<div className="text-center space-y-4 max-w-3xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Terminal className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary via-blue-500 to-indigo-500 bg-clip-text text-transparent">
							cURL Multi-Language Converter
						</h1>
						<p className="text-muted-foreground text-lg">
							Translate raw cURL commands into production-ready PowerShell,
							Axios, Fetch API, Python, Go, Rust, and Node.js code snippets.
						</p>
					</div>

					{/* Quick Templates Bar */}
					<div className="flex flex-wrap items-center gap-2 pt-2 pb-1">
						<span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 mr-1">
							<Zap className="w-3.5 h-3.5 text-primary" />
							Presets:
						</span>
						{CURL_TEMPLATES.map((tmpl, idx) => (
							<button
								key={idx}
								type="button"
								onClick={() => handleTemplateSelect(tmpl.curl)}
								className="text-xs px-3 py-1.5 rounded-lg bg-secondary/60 hover:bg-secondary border border-border/80 text-secondary-foreground hover:text-primary transition font-medium cursor-pointer"
							>
								{tmpl.label}
							</button>
						))}
					</div>

					{/* Metadata Breakdown Badge Strip */}
					{parsedMeta && (
						<div className="flex flex-wrap items-center gap-3 p-3.5 rounded-xl bg-card border border-border/70 text-xs text-muted-foreground shadow-xs">
							<div className="flex items-center gap-1.5">
								<span className="font-semibold text-foreground">Method:</span>
								<span className="px-2 py-0.5 rounded font-mono font-bold bg-primary/15 text-primary">
									{parsedMeta.method}
								</span>
							</div>
							<div className="flex items-center gap-1.5 max-w-xs truncate">
								<span className="font-semibold text-foreground">Endpoint:</span>
								<span className="font-mono text-foreground truncate" title={parsedMeta.url}>
									{parsedMeta.url}
								</span>
							</div>
							<div className="flex items-center gap-1.5">
								<span className="font-semibold text-foreground">Headers:</span>
								<span className="font-mono text-foreground">
									{Object.keys(parsedMeta.headers).length}
								</span>
							</div>
							{parsedMeta.auth && (
								<div className="flex items-center gap-1.5">
									<span className="font-semibold text-foreground">Auth:</span>
									<span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono text-[11px]">
										{parsedMeta.auth.bearer ? 'Bearer Token' : 'Basic Auth'}
									</span>
								</div>
							)}
							{parsedMeta.data && (
								<div className="flex items-center gap-1.5">
									<span className="font-semibold text-foreground">Payload:</span>
									<span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">
										{parsedMeta.isJson ? 'JSON Body' : 'Raw Data'}
									</span>
								</div>
							)}
							{parsedMeta.insecure && (
								<span className="px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 font-mono text-[11px]">
									Insecure SSL
								</span>
							)}
						</div>
					)}

					{/* Workspace Grid */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
						{/* Left: Input cURL */}
						<div className="lg:col-span-5 bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
							<div className="space-y-3 flex-1 flex flex-col">
								<div className="flex justify-between items-center">
									<h2 className="text-base font-bold flex items-center gap-2">
										<Terminal className="w-4 h-4 text-primary" />
										Input cURL Command
									</h2>
									<button
										type="button"
										onClick={() => setCurlInput('')}
										className="text-xs text-muted-foreground hover:text-foreground transition cursor-pointer"
									>
										Clear
									</button>
								</div>
								<div className="flex-1 min-h-[360px]">
									<CodeEditor
										language="shell"
										value={curlInput}
										onChange={setCurlInput}
										ariaLabel="cURL command input editor"
										height="360px"
										minHeight="360px"
									/>
								</div>
							</div>

							<div className="pt-2">
								<div className="p-3 rounded-xl bg-secondary/40 border border-border/60 text-xs text-muted-foreground flex items-center gap-2">
									<ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
									<span>
										Runs 100% locally in your browser. Sensitive API tokens and headers never leave your machine.
									</span>
								</div>
							</div>
						</div>

						{/* Right: Target Selection & Code Output */}
						<div className="lg:col-span-7 bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
							{/* Target language selector header */}
							<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-border/60">
								<div className="space-y-1">
									<label
										htmlFor="target-select"
										className="text-xs font-bold uppercase tracking-wider text-muted-foreground block"
									>
										Target Format
									</label>
									<select
										id="target-select"
										aria-label="Target language output format"
										className="px-3 py-1.5 rounded-lg border border-border bg-background text-sm font-semibold text-foreground focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer"
										value={targetLang}
										onChange={(e) =>
											setTargetLang(e.target.value as TargetLanguage)
										}
									>
										{categories.map((cat) => (
											<optgroup key={cat} label={cat}>
												{TARGET_OPTIONS.filter((t) => t.category === cat).map((opt) => (
													<option key={opt.id} value={opt.id}>
														{opt.label}
													</option>
												))}
											</optgroup>
										))}
									</select>
								</div>

								{/* Copy Button */}
								<div className="flex items-center gap-2 self-end sm:self-center">
									<button
										onClick={handleCopy}
										aria-label="Copy generated request code to clipboard"
										className="px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold text-xs flex items-center gap-1.5 hover:opacity-95 transition shadow-xs cursor-pointer"
									>
										{copied ? (
											<>
												<Check className="w-3.5 h-3.5" />
												<span>Copied</span>
											</>
										) : (
											<>
												<Copy className="w-3.5 h-3.5" />
												<span>Copy Snippet</span>
											</>
										)}
									</button>
								</div>
							</div>

							{/* Output Code Area with Monaco Editor */}
							<div className="flex-1 min-h-[360px]">
								<CodeEditor
									language={currentTarget?.highlighterLang || 'javascript'}
									value={codeOutput}
									readOnly={true}
									ariaLabel="Generated code snippet editor"
									height="360px"
									minHeight="360px"
								/>
							</div>

							<div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
								<span>
									Syntax:{' '}
									<strong className="text-foreground">
										{currentTarget?.label}
									</strong>
								</span>
								<span>
									{codeOutput.split('\n').length} lines of code
								</span>
							</div>
						</div>
					</div>

					{/* Informational & FAQ Section */}
					<div className="pt-10 border-t border-border/40 space-y-6">
						<div className="text-center space-y-2 max-w-2xl mx-auto">
							<h2 className="text-2xl font-black tracking-tight">
								cURL Conversion Guide & Tips
							</h2>
							<p className="text-sm text-muted-foreground">
								Understanding how cURL flags map to PowerShell, Axios, and backend clients.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground">
									How does cURL map to PowerShell?
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									PowerShell offers <code>Invoke-RestMethod</code> for REST APIs (which automatically parses JSON responses) and <code>Invoke-WebRequest</code> for raw HTTP payloads. The converter maps headers into a PowerShell hash table <code>@&#123; &quot;Header&quot; = &#39;Value&#39; &#125;</code> and payload data into string literals.
								</p>
							</div>

							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground">
									What is the difference between Axios and Fetch?
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Fetch is native to modern browsers and Node 18+, requiring manual <code>JSON.stringify()</code> for payloads and an extra <code>res.json()</code> step. Axios handles automatic JSON serialization, rejects promises on 4xx/5xx status codes, and supports interceptors.
								</p>
							</div>

							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground">
									How are Bearer tokens and Basic Auth converted?
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Bearer tokens passed via <code>-H &quot;Authorization: Bearer ...&quot;</code> are preserved across all language headers. Basic Auth passed via <code>-u &quot;user:pass&quot;</code> is mapped into dedicated auth objects in Axios/Python requests, or Base64 encoded for Fetch.
								</p>
							</div>

							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground">
									Are my API tokens and cURL commands saved?
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									No. Parsing and token translation execute 100% inside your browser&apos;s JavaScript engine. No cURL strings, endpoints, or authorization secrets are ever transmitted to any external server.
								</p>
							</div>
						</div>

						{/* Related Tool Links */}
						<div className="p-5 rounded-2xl bg-secondary/30 border border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
							<div className="flex items-center gap-3">
								<div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
									<Sparkles className="w-5 h-5" />
								</div>
								<div>
									<div className="text-sm font-bold text-foreground">
										Need to format or validate raw JSON payloads?
									</div>
									<div className="text-xs text-muted-foreground">
										Inspect, prettify, lint, and minify JSON data before passing it into API calls.
									</div>
								</div>
							</div>
							<Link
								href="/developer-tools/json-formatter"
								className="px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold flex items-center gap-1.5 transition shrink-0"
							>
								<span>JSON Formatter</span>
								<ArrowRight className="w-3.5 h-3.5" />
							</Link>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

