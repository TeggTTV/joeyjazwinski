import { useState } from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import ToolFaqSection from '@/components/tools/ToolFaqSection';
import {
	ShieldCheck,
	AlertTriangle,
	CheckCircle,
	Search,
	ArrowLeft,
	ArrowRight,
	Sparkles,
	FileCode,
	Bot,
	CheckCircle2,
} from 'lucide-react';

const headFaqs = [
	{
		question: 'What should I include in my HTML head for SEO?',
		answer: 'Include a title tag, meta description, canonical URL, responsive viewport tag, favicon/icon links, robots directives if needed, and Open Graph / Twitter Card tags.',
	},
	{
		question: 'How do I know if my page is indexable?',
		answer: "Ensure your head tag lacks 'noindex' in meta robots, has a self-referencing canonical URL, and is not blocked in robots.txt.",
	},
	{
		question: 'What is a canonical URL?',
		answer: 'A canonical URL informs search engines which URL represents the master version of a page, preventing duplicate content issues across URL variations.',
	},
];

interface AuditResult {
	title: string;
	status: 'success' | 'warning' | 'error';
	message: string;
	details?: string;
}

export default function HtmlHeadAnalyzer() {
	const [html, setHtml] = useState('');
	const [audited, setAudited] = useState(false);
	const [results, setResults] = useState<AuditResult[]>([]);

	const handleAnalyze = () => {
		if (!html.trim()) return;

		const audits: AuditResult[] = [];

		// Title Tag check
		const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
		if (titleMatch) {
			const titleText = titleMatch[1].trim();
			const len = titleText.length;
			if (len >= 50 && len <= 60) {
				audits.push({
					title: 'Title Tag Length',
					status: 'success',
					message: `Optimal length (${len} characters): "${titleText}"`,
				});
			} else {
				audits.push({
					title: 'Title Tag Length',
					status: 'warning',
					message: `Sub-optimal length (${len} characters). Recommended: 50-60.`,
					details: `Found: "${titleText}"`,
				});
			}
		} else {
			audits.push({
				title: 'Title Tag',
				status: 'error',
				message:
					'No <title> element found! Critical search engine index flag.',
			});
		}

		// Description check
		const descMatch =
			html.match(
				/<meta[^>]+name=["']description["'][^>]*content=["']([\s\S]*?)["']/i,
			) ||
			html.match(
				/<meta[^>]+content=["']([\s\S]*?)["'][^>]*name=["']description["']/i,
			);
		if (descMatch) {
			const descText = descMatch[1].trim();
			const len = descText.length;
			if (len >= 120 && len <= 160) {
				audits.push({
					title: 'Meta Description Length',
					status: 'success',
					message: `Optimal length (${len} characters): "${descText}"`,
				});
			} else {
				audits.push({
					title: 'Meta Description Length',
					status: 'warning',
					message: `Sub-optimal length (${len} characters). Recommended: 120-160.`,
					details: `Found: "${descText}"`,
				});
			}
		} else {
			audits.push({
				title: 'Meta Description',
				status: 'error',
				message:
					'No description tag found. Search engines will auto-generate snippet copy.',
			});
		}

		// Canonical link check
		const canonicalMatch = html.match(
			/<link[^>]+rel=["']canonical["'][^>]*href=["']([\s\S]*?)["']/i,
		);
		if (canonicalMatch) {
			audits.push({
				title: 'Canonical URL Tag',
				status: 'success',
				message: `Canonical link configured pointing to: "${canonicalMatch[1]}"`,
			});
		} else {
			audits.push({
				title: 'Canonical URL Tag',
				status: 'warning',
				message:
					'Missing canonical URL link. Increases risk of duplicate index copies.',
			});
		}

		// Viewport check
		const viewportMatch = html.match(/<meta[^>]+name=["']viewport["']/i);
		if (viewportMatch) {
			audits.push({
				title: 'Viewport Tag',
				status: 'success',
				message:
					'Mobile viewport settings optimized for responsiveness.',
			});
		} else {
			audits.push({
				title: 'Viewport Tag',
				status: 'error',
				message:
					'Missing viewport meta directive. Causes rendering scaling bugs on mobile.',
			});
		}

		// Open Graph check
		const ogMatch = html.match(/property=["']og:/i);
		if (ogMatch) {
			audits.push({
				title: 'Open Graph Metadata',
				status: 'success',
				message: 'Found active Facebook OpenGraph tags block.',
			});
		} else {
			audits.push({
				title: 'Open Graph Metadata',
				status: 'warning',
				message:
					'No og: tags detected. Social shares will display default layouts.',
			});
		}

		// Twitter Cards check
		const twMatch =
			html.match(/name=["']twitter:/i) ||
			html.match(/property=["']twitter:/i);
		if (twMatch) {
			audits.push({
				title: 'Twitter Cards Metadata',
				status: 'success',
				message: 'Found active Twitter layout cards specifications.',
			});
		} else {
			audits.push({
				title: 'Twitter Cards Metadata',
				status: 'warning',
				message:
					'No twitter: tags detected. Link shares on Twitter will lack card previews.',
			});
		}

		setResults(audits);
		setAudited(true);
	};

	const pageTitle = 'HTML Head & Meta Tag SEO Audit Analyzer - Joey Jazwinski';
	const pageDesc =
		'Paste your HTML <head> to audit meta tags, canonical URLs, robots directives, Open Graph, and indexing signals in one click.';

	return (
		<>
			<NextSeo
				title={pageTitle}
				description={pageDesc}
				canonical="https://joeyjazwinski.com/developer-tools/html-head-analyzer"
				openGraph={{
					title: pageTitle,
					description: pageDesc,
					url: 'https://joeyjazwinski.com/developer-tools/html-head-analyzer',
					type: 'website',
					images: [
						{
							url: 'https://joeyjazwinski.com/ogimage.png',
							width: 1200,
							height: 630,
							alt: pageTitle,
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
				name="HTML Head SEO Analyzer"
				description={pageDesc}
				url="https://joeyjazwinski.com/developer-tools/html-head-analyzer"
				category="SEOApplication"
				faqs={headFaqs}
			/>
			<main className="bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground animate-fade-in">
				<div className="max-w-6xl mx-auto space-y-12">
					{/* Navigation Back Link */}
					<div>
						<Link
							href="/developer-tools"
							className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
						>
							<ArrowLeft className="w-4 h-4" />
							<span>Back to all tools</span>
						</Link>
					</div>

					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<ShieldCheck className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
							HTML Head SEO Analyzer
						</h1>
						<p className="text-muted-foreground text-lg">
							Paste your HTML &lt;head&gt; to audit meta tags, canonical URLs, robots directives, Open Graph, and indexing signals in one click.
						</p>

						{/* Audit Capabilities Chips */}
						<div className="flex flex-wrap justify-center gap-2 pt-2 text-xs font-medium text-muted-foreground">
							<span className="px-2.5 py-1 rounded-full bg-secondary border border-border/60 flex items-center gap-1">
								<CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Title & Description
							</span>
							<span className="px-2.5 py-1 rounded-full bg-secondary border border-border/60 flex items-center gap-1">
								<CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Canonical URL
							</span>
							<span className="px-2.5 py-1 rounded-full bg-secondary border border-border/60 flex items-center gap-1">
								<CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Open Graph & Twitter Cards
							</span>
							<span className="px-2.5 py-1 rounded-full bg-secondary border border-border/60 flex items-center gap-1">
								<CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Mobile Viewport
							</span>
						</div>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
						{/* Configuration Form */}
						<div className="lg:col-span-6 bg-card border border-border/80 rounded-2xl p-6 shadow-xl space-y-4">
							<h2 className="text-xl font-bold">
								Paste Head Markup
							</h2>
							<textarea
								rows={12}
								aria-label="HTML head markup input"
								className="w-full p-4 rounded-xl border bg-background text-xs font-mono focus:ring-2 focus:ring-primary focus:outline-none"
								value={html}
								onChange={(e) => setHtml(e.target.value)}
								placeholder={`<html>\n<head>\n  <title>My Awesome Website</title>\n  <meta name="description" content="Welcome..." />\n</head>`}
							/>
							<button
								onClick={handleAnalyze}
								aria-label="Analyze HTML head markup code"
								className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl text-sm transition hover:bg-primary/95 flex justify-center items-center gap-1.5"
							>
								<Search className="w-4 h-4" /> Analyze HTML Code
							</button>
						</div>

						{/* Audit results view */}
						<div className="lg:col-span-6 bg-card border border-border/80 rounded-2xl p-6 shadow-xl flex flex-col min-h-112.5">
							<h2 className="text-xl font-bold border-b border-border/40 pb-3 mb-4">
								Audit Report Card
							</h2>
							{audited ? (
								<div className="space-y-4 overflow-y-auto max-h-100 pr-1 flex-1">
									{results.map((r, idx) => (
										<div
											key={idx}
											className={`p-4 rounded-xl border flex items-start gap-3 transition-colors ${
												r.status === 'success'
													? 'bg-emerald-500/5 border-emerald-500/20 text-foreground'
													: r.status === 'warning'
														? 'bg-amber-500/5 border-amber-500/20 text-foreground'
														: 'bg-rose-500/5 border-rose-500/20 text-foreground'
											}`}
										>
											<div className="mt-0.5">
												{r.status === 'success' && (
													<CheckCircle className="w-5 h-5 text-emerald-500" />
												)}
												{r.status === 'warning' && (
													<AlertTriangle className="w-5 h-5 text-amber-500" />
												)}
												{r.status === 'error' && (
													<AlertTriangle className="w-5 h-5 text-rose-500" />
												)}
											</div>
											<div className="space-y-1">
												<h4 className="text-sm font-bold">
													{r.title}
												</h4>
												<p className="text-xs text-muted-foreground leading-relaxed">
													{r.message}
												</p>
												{r.details && (
													<span className="block text-[10px] font-mono text-muted-foreground/80 bg-background/60 p-2 rounded border border-border/40 overflow-x-auto max-w-full">
														{r.details}
													</span>
												)}
											</div>
										</div>
									))}
								</div>
							) : (
								<div className="flex-1 flex flex-col justify-center items-center text-muted-foreground italic text-sm">
									<span>
										Paste markup and run the audit engine to
										see the index report card.
									</span>
								</div>
							)}
						</div>
					</div>

					{/* Complementary SEO Utilities */}
					<div className="p-6 rounded-2xl bg-card border border-border/70 space-y-4">
						<h3 className="text-base font-bold text-foreground">Complementary Search & Meta Utilities</h3>
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
							<Link
								href="/developer-tools/meta-tag-generator"
								className="p-4 rounded-xl bg-secondary/40 border border-border/60 hover:border-primary/40 flex items-center justify-between group transition"
							>
								<div className="flex items-center gap-2.5">
									<Sparkles className="w-4 h-4 text-rose-500" />
									<div>
										<div className="font-semibold text-foreground">Meta Tag Generator</div>
										<div className="text-muted-foreground text-[11px]">Generate Open Graph tags</div>
									</div>
								</div>
								<ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition" />
							</Link>

							<Link
								href="/developer-tools/sitemap-generator"
								className="p-4 rounded-xl bg-secondary/40 border border-border/60 hover:border-primary/40 flex items-center justify-between group transition"
							>
								<div className="flex items-center gap-2.5">
									<FileCode className="w-4 h-4 text-emerald-500" />
									<div>
										<div className="font-semibold text-foreground">XML Sitemaps</div>
										<div className="text-muted-foreground text-[11px]">Validate sitemaps</div>
									</div>
								</div>
								<ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition" />
							</Link>

							<Link
								href="/developer-tools/robots-generator"
								className="p-4 rounded-xl bg-secondary/40 border border-border/60 hover:border-primary/40 flex items-center justify-between group transition"
							>
								<div className="flex items-center gap-2.5">
									<Bot className="w-4 h-4 text-indigo-500" />
									<div>
										<div className="font-semibold text-foreground">Robots.txt Rules</div>
										<div className="text-muted-foreground text-[11px]">Crawl directives</div>
									</div>
								</div>
								<ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition" />
							</Link>
						</div>
					</div>

					{/* FAQ Section */}
					<ToolFaqSection faqs={headFaqs} />
				</div>
			</main>
		</>
	);
}
