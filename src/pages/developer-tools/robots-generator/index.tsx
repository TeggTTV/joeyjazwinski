import { useState } from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import ToolFaqSection from '@/components/tools/ToolFaqSection';
import { Bot, Plus, Trash, Copy, Download, Check, Sparkles } from 'lucide-react';

interface Rule {
	id: string;
	type: 'Allow' | 'Disallow';
	path: string;
}

const ROBOTS_FAQS = [
	{
		question: 'What is robots.txt?',
		answer:
			'robots.txt is a plain text file placed in your website root directory that instructs search engine web crawlers which URLs they can or cannot request from your site.',
	},
	{
		question: 'Can robots.txt block pages from being indexed?',
		answer:
			'Robots.txt prevents crawling, but if other sites link to the URL, Google may still index it without fetching page content. To prevent indexing entirely, use the noindex meta tag instead.',
	},
	{
		question: 'Should I disallow JavaScript or CSS?',
		answer:
			'No. Googlebot and modern search crawlers need access to CSS and JavaScript to render and understand page layouts, mobile responsiveness, and dynamic content.',
	},
];

export default function RobotsGenerator() {
	const [userAgent, setUserAgent] = useState('*');
	const [crawlDelay, setCrawlDelay] = useState('');
	const [sitemapUrl, setSitemapUrl] = useState('https://joeyjazwinski.com/sitemap.xml');
	const [rules, setRules] = useState<Rule[]>([
		{ id: '1', type: 'Disallow', path: '/api/' },
		{ id: '2', type: 'Disallow', path: '/admin/' },
	]);
	const [copied, setCopied] = useState(false);

	const applyPreset = (preset: 'allow-all' | 'block-admin' | 'block-ai-bots') => {
		if (preset === 'allow-all') {
			setUserAgent('*');
			setRules([{ id: '1', type: 'Allow', path: '/' }]);
		} else if (preset === 'block-admin') {
			setUserAgent('*');
			setRules([
				{ id: '1', type: 'Disallow', path: '/admin/' },
				{ id: '2', type: 'Disallow', path: '/api/' },
				{ id: '3', type: 'Disallow', path: '/dashboard/' },
			]);
		} else if (preset === 'block-ai-bots') {
			setUserAgent('GPTBot');
			setRules([{ id: '1', type: 'Disallow', path: '/' }]);
		}
	};

	const addRule = () => {
		const newId = Math.random().toString(36).substring(2, 9);
		setRules([...rules, { id: newId, type: 'Disallow', path: '' }]);
	};

	const removeRule = (id: string) => {
		setRules(rules.filter((r) => r.id !== id));
	};

	const updateRule = (id: string, field: 'type' | 'path', value: string) => {
		setRules(
			rules.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
		);
	};

	const generateRobotsTxt = () => {
		let lines = [`User-agent: ${userAgent}`];

		if (crawlDelay) {
			lines.push(`Crawl-delay: ${crawlDelay}`);
		}

		rules.forEach((rule) => {
			if (rule.path.trim()) {
				lines.push(`${rule.type}: ${rule.path.trim()}`);
			}
		});

		if (sitemapUrl.trim()) {
			lines.push(`Sitemap: ${sitemapUrl.trim()}`);
		}

		return lines.join('\n');
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(generateRobotsTxt());
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleDownload = () => {
		const element = document.createElement('a');
		const file = new Blob([generateRobotsTxt()], { type: 'text/plain' });
		element.href = URL.createObjectURL(file);
		element.download = 'robots.txt';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	};

	return (
		<>
			<NextSeo
				title="Robots.txt Generator | Crawl Rules & Sitemaps - Joey Jazwinski"
				description="Generate robots.txt files with user-agent rules, disallow/allow paths, and sitemap locations for your site."
				canonical="https://joeyjazwinski.com/developer-tools/robots-generator"
				openGraph={{
					title: 'Robots.txt Generator | Crawl Rules & Sitemaps - Joey Jazwinski',
					description:
						'Generate robots.txt files with user-agent rules, disallow/allow paths, and sitemap locations for your site.',
					url: 'https://joeyjazwinski.com/developer-tools/robots-generator',
					type: 'website',
					images: [
						{
							url: 'https://joeyjazwinski.com/ogimage.png',
							width: 1200,
							height: 630,
							alt: 'robots.txt Generator',
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
				name="robots.txt Generator"
				description="Generate robots.txt files with user-agent rules, disallow/allow paths, and sitemap locations for your site."
				url="https://joeyjazwinski.com/developer-tools/robots-generator"
				category="DeveloperApplication"
				faqs={ROBOTS_FAQS}
			/>
			<main className="bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground animate-fade-in">
				<div className="max-w-6xl mx-auto space-y-12">
					<div className="mb-2">
						<Link
							href="/developer-tools"
							className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-primary transition"
						>
							← Back to all developer tools
						</Link>
					</div>

					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Bot className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
							robots.txt Generator
						</h1>
						<p className="text-muted-foreground text-lg">
							Generate robots.txt files with user-agent rules, disallow/allow paths, and sitemap locations for your site.
						</p>
					</div>

					{/* Presets */}
					<div className="flex flex-wrap items-center justify-center gap-2">
						<span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-1 flex items-center gap-1">
							<Sparkles className="w-3.5 h-3.5 text-primary" /> Quick Presets:
						</span>
						<button
							type="button"
							onClick={() => applyPreset('allow-all')}
							className="px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-secondary text-xs font-medium transition cursor-pointer"
						>
							Allow Everything
						</button>
						<button
							type="button"
							onClick={() => applyPreset('block-admin')}
							className="px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-secondary text-xs font-medium transition cursor-pointer"
						>
							Block /admin & /api
						</button>
						<button
							type="button"
							onClick={() => applyPreset('block-ai-bots')}
							className="px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-secondary text-xs font-medium transition cursor-pointer"
						>
							Block Specific Bot (GPTBot)
						</button>
					</div>

					{/* Workspace */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
						{/* Configuration Form */}
						<div className="lg:col-span-6 bg-card border border-border/80 rounded-2xl p-6 shadow-xl space-y-6">
							<h2 className="text-xl font-bold border-b border-border/40 pb-3">
								Directives Config
							</h2>

							<div className="space-y-4">
								<div>
									<label className="block text-sm font-semibold mb-2">
										User-Agent
									</label>
									<input
										type="text"
										className="w-full p-3 rounded-xl border bg-background text-sm focus:ring-2 focus:ring-primary focus:outline-none transition"
										value={userAgent}
										onChange={(e) =>
											setUserAgent(e.target.value)
										}
										placeholder="e.g. * or Googlebot"
									/>
									<p className="text-xs text-muted-foreground mt-1">
										Asterisk (*) represents all search
										crawlers.
									</p>
								</div>

								<div>
									<label className="block text-sm font-semibold mb-2">
										Crawl-Delay (Seconds)
									</label>
									<select
										className="w-full p-3 rounded-xl border bg-background text-sm focus:ring-2 focus:ring-primary focus:outline-none transition"
										value={crawlDelay}
										onChange={(e) =>
											setCrawlDelay(e.target.value)
										}
									>
										<option value="">
											No Delay (Default)
										</option>
										<option value="5">5 seconds</option>
										<option value="10">10 seconds</option>
										<option value="20">20 seconds</option>
									</select>
								</div>

								<div>
									<label className="block text-sm font-semibold mb-2">
										Sitemap URL
									</label>
									<input
										type="url"
										className="w-full p-3 rounded-xl border bg-background text-sm focus:ring-2 focus:ring-primary focus:outline-none transition"
										value={sitemapUrl}
										onChange={(e) =>
											setSitemapUrl(e.target.value)
										}
										placeholder="e.g. https://yourdomain.com/sitemap.xml"
									/>
								</div>

								<div>
									<div className="flex justify-between items-center mb-2">
										<label className="text-sm font-semibold">
											Crawl Rules
										</label>
										<button
											type="button"
											onClick={addRule}
											className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition"
										>
											<Plus className="w-3.5 h-3.5" /> Add
											Rule
										</button>
									</div>

									<div className="space-y-3 max-h-60 overflow-y-auto pr-1">
										{rules.map((rule) => (
											<div
												key={rule.id}
												className="flex gap-2 items-center"
											>
												<select
													className="p-3 rounded-xl border bg-background text-sm focus:ring-2 focus:ring-primary focus:outline-none transition w-1/3"
													value={rule.type}
													onChange={(e) =>
														updateRule(
															rule.id,
															'type',
															e.target
																.value as any,
														)
													}
												>
													<option value="Disallow">
														Disallow
													</option>
													<option value="Allow">
														Allow
													</option>
												</select>
												<input
													type="text"
													className="p-3 rounded-xl border bg-background text-sm focus:ring-2 focus:ring-primary focus:outline-none transition flex-1 font-mono"
													value={rule.path}
													onChange={(e) =>
														updateRule(
															rule.id,
															'path',
															e.target.value,
														)
													}
													placeholder="e.g. /private-folder/"
												/>
												<button
													type="button"
													onClick={() =>
														removeRule(rule.id)
													}
													className="p-3 text-rose-500 hover:bg-rose-500/10 rounded-xl transition border border-transparent hover:border-rose-500/20"
												>
													<Trash className="w-4 h-4" />
												</button>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>

						{/* Output Workspace */}
						<div className="lg:col-span-6 bg-card border border-border/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between h-full min-h-112.5">
							<div className="space-y-4 flex-1 flex flex-col">
								<div className="flex justify-between items-center border-b border-border/40 pb-3">
									<h2 className="text-xl font-bold">
										Generated Output
									</h2>
									<div className="flex gap-2">
										<button
											onClick={handleCopy}
											className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-background hover:bg-secondary text-xs font-semibold transition"
										>
											{copied ? (
												<>
													<Check className="w-3.5 h-3.5 text-emerald-500" />{' '}
													Copied
												</>
											) : (
												<>
													<Copy className="w-3.5 h-3.5" />{' '}
													Copy
												</>
											)}
										</button>
										<button
											onClick={handleDownload}
											className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-background hover:bg-secondary text-xs font-semibold transition"
										>
											<Download className="w-3.5 h-3.5" />{' '}
											Download
										</button>
									</div>
								</div>

								<div className="flex-1 min-h-75 bg-background border border-border rounded-xl p-4 font-mono text-sm overflow-auto select-all whitespace-pre-wrap">
									{generateRobotsTxt()}
								</div>
							</div>
						</div>
					</div>

					<ToolFaqSection faqs={ROBOTS_FAQS} />
				</div>
			</main>
		</>
	);
}
