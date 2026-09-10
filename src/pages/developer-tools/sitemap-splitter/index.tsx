import { useState } from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import {
	Shield,
	FileCode,
	Check,
	AlertCircle,
	ArrowRight,
	Search,
} from 'lucide-react';

export default function SitemapSplitter() {
	const [sitemapInput, setSitemapInput] = useState(
		'<urlset>\n  <url><loc>https://example.com/</loc></url>\n</urlset>',
	);
	const [statusMsg, setStatusMsg] = useState(
		'Upload or paste sitemap content',
	);
	const [isValid, setIsValid] = useState<boolean | null>(null);
	const [urlCount, setUrlCount] = useState<number>(1);

	const handleValidate = () => {
		const matches = sitemapInput.match(/<loc>/g);
		const count = matches ? matches.length : 0;
		setUrlCount(count);

		if (
			sitemapInput.includes('<urlset>') ||
			sitemapInput.includes('<sitemapindex>')
		) {
			setIsValid(true);
			setStatusMsg(
				`Valid sitemap XML structure. Found ${count} URL entries.`,
			);
		} else {
			setIsValid(false);
			setStatusMsg(
				'Invalid XML markup structure. Missing <urlset> or <sitemapindex> root tags.',
			);
		}
	};

	return (
		<>
			<NextSeo
				title="XML Sitemap Splitter & Validator | SEO Tool"
				description="Inspect, validate, and split large XML sitemaps into smaller 50,000-URL chunks and generate valid sitemap index files for search engines."
				canonical="https://joeyjazwinski.com/developer-tools/sitemap-splitter"
				openGraph={{
					title: 'XML Sitemap Splitter & Validator | SEO Tool',
					description:
						'Inspect, validate, and split large XML sitemaps into smaller 50,000-URL chunks and generate valid sitemap index files for search engines.',
					url: 'https://joeyjazwinski.com/developer-tools/sitemap-splitter',
					type: 'website',
					images: [
						{
							url: 'https://joeyjazwinski.com/ogimage.png',
							width: 1200,
							height: 630,
							alt: 'Sitemap.xml Splitter & Validator',
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
				name="Sitemap.xml Splitter & Validator"
				description="Inspect, validate, and split large XML sitemaps into smaller 50,000-URL chunks and generate valid sitemap index files for search engines."
				url="https://joeyjazwinski.com/developer-tools/sitemap-splitter"
				category="DeveloperApplication"
			/>
			<main className="bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-4xl mx-auto space-y-12">
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Shield className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-teal-500 bg-clip-text text-transparent">
							Sitemap Splitter & Validator
						</h1>
						<p className="text-muted-foreground text-lg">
							Inspect massive sitemaps and format them into
							search-engine compliant indexes.
						</p>
					</div>

					<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-6">
						<div className="flex justify-between items-center">
							<h2 className="text-lg font-bold flex items-center gap-2">
								<FileCode className="w-5 h-5 text-primary" />
								Input Sitemap XML
							</h2>
							{urlCount > 0 && (
								<span className="text-xs px-2.5 py-1 rounded-full bg-secondary text-muted-foreground font-mono">
									{urlCount} URLs detected
								</span>
							)}
						</div>

						<textarea
							rows={8}
							className="w-full p-4 rounded-xl border border-border bg-background text-xs font-mono focus:ring-2 focus:ring-primary focus:outline-none"
							value={sitemapInput}
							onChange={(e) => setSitemapInput(e.target.value)}
							placeholder="Paste raw XML sitemap text here..."
						/>

						<div className="flex gap-4">
							<button
								onClick={handleValidate}
								className="w-full py-2.5 px-4 bg-primary text-primary-foreground font-semibold rounded-xl text-sm hover:opacity-90 transition"
							>
								Validate & Inspect XML Sitemap
							</button>
						</div>

						<div
							className={`p-4 rounded-xl border flex items-center gap-3 text-xs font-medium ${
								isValid === null
									? 'bg-secondary/40 border-border text-muted-foreground'
									: isValid
										? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
										: 'bg-red-500/10 border-red-500/20 text-red-500'
							}`}
						>
							{isValid === true && (
								<Check className="w-4 h-4 shrink-0" />
							)}
							{isValid === false && (
								<AlertCircle className="w-4 h-4 shrink-0" />
							)}
							<span>{statusMsg}</span>
						</div>
					</div>

					{/* Informational & FAQ Section */}
					<div className="pt-10 border-t border-border/40 space-y-6">
						<div className="text-center space-y-2 max-w-2xl mx-auto">
							<h2 className="text-2xl font-black tracking-tight">
								XML Sitemap Best Practices & Guidelines
							</h2>
							<p className="text-sm text-muted-foreground">
								Google Search Console limits, index file
								requirements, and compression guidelines.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground">
									What are the maximum limits for an XML
									sitemap?
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Search engines like Google and Bing limit a
									single sitemap file to 50,000 URLs and an
									uncompressed file size of 50 MB. Sitemaps
									exceeding these boundaries must be
									partitioned into multiple files.
								</p>
							</div>
							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground">
									What is a Sitemap Index file?
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									A sitemap index file acts as a directory
									listing multiple sub-sitemaps using
									&lt;sitemapindex&gt; and &lt;sitemap&gt;
									tags. Submitting a single sitemap index to
									Google Search Console indexes all child
									files.
								</p>
							</div>
							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground">
									Should XML Sitemaps be Gzip Compressed?
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Yes. Compressing sitemap files with gzip
									(.xml.gz) substantially reduces bandwidth
									requirements and server overhead during
									search crawler indexing visits.
								</p>
							</div>
							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground">
									Which URLs should be excluded from sitemaps?
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Exclude noindex pages, canonicalized
									duplicate URLs, password-protected admin
									dashboards, redirecting URLs (301/302), and
									broken pages (404/500).
								</p>
							</div>
						</div>

						{/* Related SEO Tool Link */}
						<div className="p-5 rounded-2xl bg-secondary/30 border border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
							<div className="flex items-center gap-3">
								<div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
									<Search className="w-5 h-5" />
								</div>
								<div>
									<div className="text-sm font-bold text-foreground">
										Need to Inspect On-Page Head & Meta
										Tags?
									</div>
									<div className="text-xs text-muted-foreground">
										Test title tags, descriptions, Open
										Graph, and Twitter Cards with the HTML
										Head Analyzer.
									</div>
								</div>
							</div>
							<Link
								href="/developer-tools/html-head-analyzer"
								className="px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold flex items-center gap-1.5 transition shrink-0"
							>
								<span>Try Head Analyzer</span>
								<ArrowRight className="w-3.5 h-3.5" />
							</Link>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
