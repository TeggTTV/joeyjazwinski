import { useState, useMemo } from 'react';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import {
	RefreshCw,
	Copy,
	Check,
	Download,
	Sparkles,
	Sliders,
	CheckCircle2,
	XCircle,
	ArrowRight,
} from 'lucide-react';
import {
	RedirectPlatform,
	generateRedirectRule,
	testRegexMatch,
} from '@/lib/redirectHelper';

const PRESETS = [
	{
		label: 'Blog Category Rename',
		source: '/blog/(.*)',
		destination: '/articles/$1',
		test: '/blog/modern-web-development',
	},
	{
		label: 'Path with Slug Wildcard',
		source: '/legacy-products/:slug',
		destination: '/store/:slug',
		test: '/legacy-products/mechanical-keyboard',
	},
	{
		label: 'Exact Landing Page',
		source: '/black-friday',
		destination: '/promotions/seasonal-sale',
		test: '/black-friday',
	},
];

export default function RedirectRulesGenerator() {
	const [type, setType] = useState<'301' | '302'>('301');
	const [platform, setPlatform] = useState<RedirectPlatform>('nginx');
	const [source, setSource] = useState(PRESETS[0].source);
	const [destination, setDestination] = useState(PRESETS[0].destination);
	const [preserveQuery, setPreserveQuery] = useState(true);
	const [testPath, setTestPath] = useState(PRESETS[0].test);
	const [copied, setCopied] = useState(false);

	// Generate Rule
	const ruleOutput = useMemo(() => {
		return generateRedirectRule({
			type,
			platform,
			source,
			destination,
			preserveQuery,
		});
	}, [type, platform, source, destination, preserveQuery]);

	// Test Match
	const testResult = useMemo(() => {
		return testRegexMatch(source, destination, testPath);
	}, [source, destination, testPath]);

	const handleCopy = () => {
		navigator.clipboard.writeText(ruleOutput);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleDownload = () => {
		const filenameMap: Record<RedirectPlatform, string> = {
			nginx: 'nginx-redirects.conf',
			apache: '.htaccess',
			nextjs: 'next-redirects.js',
			cloudflare: 'cloudflare-redirects.json',
			caddy: 'Caddyfile',
			netlify: '_redirects',
			iis: 'web.config',
		};

		const blob = new Blob([ruleOutput], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = filenameMap[platform] || 'redirects.txt';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	return (
		<>
			<NextSeo
				title="301 & 302 Redirect Rule Generator | Nginx, Cloudflare & Caddy"
				description="Generate redirect rules for Nginx, Apache, Next.js, Cloudflare Bulk Redirects, Caddy, Netlify, and IIS with live regex wildcard testing."
				canonical="https://joeyjazwinski.com/developer-tools/redirect-rules"
				openGraph={{
					title: '301 & 302 Redirect Rule Generator | Nginx, Cloudflare & Caddy',
					description:
						'Generate redirect rules for Nginx, Apache, Next.js, Cloudflare Bulk Redirects, Caddy, Netlify, and IIS with live regex wildcard testing.',
					url: 'https://joeyjazwinski.com/developer-tools/redirect-rules',
					type: 'website',
					images: [
						{
							url: 'https://joeyjazwinski.com/ogimage.png',
							width: 1200,
							height: 630,
							alt: 'Server Redirect Rules Generator',
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
				name="Server Redirect Rules Generator"
				description="Generate redirect rules for Nginx, Apache, Next.js, Cloudflare Bulk Redirects, Caddy, Netlify, and IIS with live regex wildcard testing."
				url="https://joeyjazwinski.com/developer-tools/redirect-rules"
				category="DeveloperApplication"
			/>
			<main className="bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-6xl mx-auto space-y-8">
					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<RefreshCw className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary via-orange-500 to-amber-500 bg-clip-text text-transparent">
							Redirect Rules Generator
						</h1>
						<p className="text-muted-foreground text-lg">
							Formulate rewrite rules for Nginx, Cloudflare, Next.js,
							and Caddy. Test wildcards with real-time URL path matching.
						</p>
					</div>

					{/* Presets Bar */}
					<div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border/80 shadow-md">
						<div className="flex flex-wrap items-center gap-2">
							<span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 mr-1">
								<Sparkles className="w-3.5 h-3.5 text-primary" />
								Presets:
							</span>
							{PRESETS.map((p, idx) => (
								<button
									key={idx}
									onClick={() => {
										setSource(p.source);
										setDestination(p.destination);
										setTestPath(p.test);
									}}
									className="px-3 py-1.5 rounded-lg bg-secondary/80 hover:bg-secondary border border-border text-xs font-medium text-foreground transition cursor-pointer"
								>
									{p.label}
								</button>
							))}
						</div>

						{/* Type Switcher */}
						<div className="flex items-center gap-2">
							{(['301', '302'] as const).map((t) => (
								<button
									key={t}
									type="button"
									onClick={() => setType(t)}
									className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
										type === t
											? 'bg-primary text-primary-foreground border-transparent'
											: 'bg-background hover:bg-secondary text-muted-foreground border-border'
									}`}
								>
									{t} {t === '301' ? 'Permanent' : 'Temporary'}
								</button>
							))}
						</div>
					</div>

					{/* Workspace */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
						{/* Configuration Form */}
						<div className="lg:col-span-6 space-y-6">
							<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-5">
								<div className="flex items-center gap-2 pb-2 border-b border-border/50 text-sm font-bold text-foreground">
									<Sliders className="w-4 h-4 text-primary" />
									Platform & Rule Parameters
								</div>

								<div className="space-y-4 text-xs">
									{/* Server Platform */}
									<div>
										<label className="font-semibold text-foreground block mb-1">
											Target Server / Hosting Platform
										</label>
										<select
											aria-label="Server platform"
											value={platform}
											onChange={(e) => setPlatform(e.target.value as RedirectPlatform)}
											className="w-full p-2.5 rounded-lg border border-border bg-background font-semibold focus:ring-1 focus:ring-primary focus:outline-none cursor-pointer"
										>
											<option value="nginx">Nginx (nginx.conf)</option>
											<option value="cloudflare">Cloudflare (Bulk Redirects JSON)</option>
											<option value="nextjs">Next.js (next.config.js)</option>
											<option value="apache">Apache (.htaccess)</option>
											<option value="caddy">Caddy (Caddyfile)</option>
											<option value="netlify">Netlify (_redirects)</option>
											<option value="iis">IIS (web.config)</option>
										</select>
									</div>

									{/* Source */}
									<div>
										<label className="font-semibold text-foreground block mb-1">
											Source Path / Regex Pattern
										</label>
										<input
											type="text"
											value={source}
											onChange={(e) => setSource(e.target.value)}
											className="w-full p-2.5 rounded-lg border border-border bg-background font-mono focus:ring-1 focus:ring-primary focus:outline-none"
											placeholder="/old-path/(.*)"
										/>
									</div>

									{/* Destination */}
									<div>
										<label className="font-semibold text-foreground block mb-1">
											Destination Path or URL
										</label>
										<input
											type="text"
											value={destination}
											onChange={(e) => setDestination(e.target.value)}
											className="w-full p-2.5 rounded-lg border border-border bg-background font-mono focus:ring-1 focus:ring-primary focus:outline-none"
											placeholder="/new-path/$1"
										/>
									</div>

									{/* Query string toggle */}
									{platform === 'cloudflare' && (
										<label className="flex items-center gap-2 cursor-pointer pt-1">
											<input
												type="checkbox"
												checked={preserveQuery}
												onChange={(e) => setPreserveQuery(e.target.checked)}
												className="rounded border-border text-primary focus:ring-primary"
											/>
											<span className="font-medium text-foreground">
												Preserve incoming query strings (?utm_source=...)
											</span>
										</label>
									)}
								</div>
							</div>

							{/* Regex Wildcard Tester */}
							<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
								<h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2 flex items-center justify-between">
									<span>Regex Wildcard Live Tester</span>
									<span className="text-[10px] font-mono text-muted-foreground lowercase">
										test incoming URL
									</span>
								</h2>

								<div className="space-y-3 text-xs">
									<div>
										<label className="font-semibold text-foreground block mb-1">
											Sample Test URL Path
										</label>
										<input
											type="text"
											value={testPath}
											onChange={(e) => setTestPath(e.target.value)}
											placeholder="/blog/my-test-post"
											className="w-full p-2.5 rounded-lg border border-border bg-background font-mono focus:ring-1 focus:ring-primary focus:outline-none"
										/>
									</div>

									{/* Result Display */}
									<div className="p-3 rounded-xl border border-border bg-background/60 space-y-2">
										<div className="flex items-center justify-between">
											<span className="text-muted-foreground font-semibold">Match Status:</span>
											{testResult.matches ? (
												<span className="inline-flex items-center gap-1 text-emerald-500 font-bold font-mono">
													<CheckCircle2 className="w-3.5 h-3.5" />
													MATCHES
												</span>
											) : (
												<span className="inline-flex items-center gap-1 text-rose-500 font-bold font-mono">
													<XCircle className="w-3.5 h-3.5" />
													NO MATCH
												</span>
											)}
										</div>

										{testResult.matches && (
											<div className="pt-2 border-t border-border/40 space-y-1">
												<span className="text-muted-foreground block text-[11px]">
													Redirects to:
												</span>
												<div className="p-2 rounded-lg bg-card border border-border font-mono text-xs text-primary font-bold break-all flex items-center gap-1.5">
													<ArrowRight className="w-3.5 h-3.5 shrink-0" />
													<span>{testResult.resolvedUrl}</span>
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>

						{/* Right: Generated Output */}
						<div className="lg:col-span-6 bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between min-h-120">
							<div className="space-y-3 flex-1 flex flex-col">
								<div className="flex justify-between items-center pb-2 border-b border-border/50">
									<h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
										Generated {platform.toUpperCase()} Config
									</h2>

									<div className="flex items-center gap-2">
										<button
											onClick={handleCopy}
											className="p-1.5 rounded-lg bg-background border border-border hover:bg-secondary text-foreground text-xs flex items-center gap-1 font-medium transition cursor-pointer"
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
											className="p-1.5 rounded-lg bg-background border border-border hover:bg-secondary text-foreground text-xs flex items-center gap-1 font-medium transition cursor-pointer"
										>
											<Download className="w-3.5 h-3.5" />
											<span>Save File</span>
										</button>
									</div>
								</div>

								<pre className="w-full flex-1 p-4 rounded-xl border border-border bg-background/60 font-mono text-xs overflow-auto select-all whitespace-pre shadow-inner min-h-80">
									{ruleOutput}
								</pre>
							</div>

							<div className="pt-2 border-t border-border/40 text-xs text-muted-foreground">
								Target: <strong className="text-foreground">{platform}</strong> ({type} status)
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
