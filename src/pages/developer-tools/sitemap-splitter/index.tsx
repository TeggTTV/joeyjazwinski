import { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import {
	ShieldCheck,
	FileCode,
	Check,
	AlertCircle,
	AlertTriangle,
	CheckCircle2,
	ArrowRight,
	Search,
	Scissors,
	Upload,
	RefreshCw,
	Archive,
	Copy,
	Download,
	Layers,
	Sliders,
} from 'lucide-react';
import {
	validateSitemapXml,
	splitSitemapIntoChunks,
	createSitemapsZipBlob,
	SitemapValidationResult,
	SplitResult,
} from '@/utils/sitemap';

type SplitterMode = 'split' | 'validate';

export default function SitemapSplitterPage() {
	const [activeMode, setActiveMode] = useState<SplitterMode>('split');

	// --- Splitter State ---
	const [sitemapInput, setSitemapInput] = useState<string>(
		`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://example.com/page-1</loc><lastmod>${new Date().toISOString().split('T')[0]}</lastmod><priority>0.8</priority></url>
  <url><loc>https://example.com/page-2</loc><lastmod>${new Date().toISOString().split('T')[0]}</lastmod><priority>0.8</priority></url>
  <url><loc>https://example.com/page-3</loc><lastmod>${new Date().toISOString().split('T')[0]}</lastmod><priority>0.8</priority></url>
  <url><loc>https://example.com/page-4</loc><lastmod>${new Date().toISOString().split('T')[0]}</lastmod><priority>0.8</priority></url>
  <url><loc>https://example.com/page-5</loc><lastmod>${new Date().toISOString().split('T')[0]}</lastmod><priority>0.8</priority></url>
  <url><loc>https://example.com/page-6</loc><lastmod>${new Date().toISOString().split('T')[0]}</lastmod><priority>0.8</priority></url>
</urlset>`,
	);
	const [chunkSize, setChunkSize] = useState<number>(3);
	const [indexBaseUrl, setIndexBaseUrl] = useState<string>('https://example.com/sitemaps/');
	const [childPrefix, setChildPrefix] = useState<string>('sitemap');
	const [splitResult, setSplitResult] = useState<SplitResult | null>(null);
	const [selectedFileIndex, setSelectedFileIndex] = useState<number>(-1); // -1 = index, >=0 = child
	const [copied, setCopied] = useState(false);
	const [isZipping, setIsZipping] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// --- Validation State ---
	const [validationResult, setValidationResult] = useState<SitemapValidationResult | null>(null);

	const handleSplit = (customInput?: string) => {
		const text = customInput !== undefined ? customInput : sitemapInput;
		if (!text.trim()) return;

		const res = splitSitemapIntoChunks(text, {
			maxUrlsPerFile: chunkSize,
			indexBaseUrl,
			childPrefix,
			indexFilename: 'sitemap.xml',
		});
		setSplitResult(res);
		setSelectedFileIndex(-1);
	};

	const handleValidate = (customInput?: string) => {
		const text = customInput !== undefined ? customInput : sitemapInput;
		const result = validateSitemapXml(text);
		setValidationResult(result);
	};

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (event) => {
			const text = event.target?.result as string;
			if (text) {
				setSitemapInput(text);
				if (activeMode === 'split') {
					handleSplit(text);
				} else {
					handleValidate(text);
				}
			}
		};
		reader.readAsText(file);
	};

	const currentFile = useMemo(() => {
		if (!splitResult) return null;
		if (selectedFileIndex === -1) {
			return {
				filename: splitResult.indexFilename,
				xml: splitResult.indexXml,
				urlCount: splitResult.childFiles.length,
				isIndex: true,
			};
		}
		const child = splitResult.childFiles[selectedFileIndex];
		return child
			? {
					filename: child.filename,
					xml: child.xml,
					urlCount: child.urlCount,
					isIndex: false,
				}
			: null;
	}, [splitResult, selectedFileIndex]);

	const handleCopyFile = () => {
		if (!currentFile) return;
		navigator.clipboard.writeText(currentFile.xml);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleDownloadFile = () => {
		if (!currentFile) return;
		const element = document.createElement('a');
		const file = new Blob([currentFile.xml], { type: 'text/xml' });
		element.href = URL.createObjectURL(file);
		element.download = currentFile.filename;
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	};

	const handleDownloadZip = async () => {
		if (!splitResult) return;
		try {
			setIsZipping(true);
			const zipBlob = await createSitemapsZipBlob(splitResult);
			const element = document.createElement('a');
			element.href = URL.createObjectURL(zipBlob);
			element.download = 'sitemaps-bundle.zip';
			document.body.appendChild(element);
			element.click();
			document.body.removeChild(element);
		} catch (err) {
			console.error('Failed to create ZIP bundle', err);
		} finally {
			setIsZipping(false);
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
			<main className="bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground animate-fade-in">
				<div className="max-w-5xl mx-auto space-y-10">
					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<ShieldCheck className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary via-emerald-400 to-teal-500 bg-clip-text text-transparent">
							Sitemap Splitter & Validator
						</h1>
						<p className="text-muted-foreground text-base sm:text-lg">
							Inspect massive sitemaps, validate schema conformance, and format them into search-engine compliant indexes.
						</p>
					</div>

					{/* Mode Switcher */}
					<div className="flex justify-center">
						<div className="inline-flex p-1.5 rounded-2xl bg-secondary/60 border border-border/80 shadow-inner gap-2">
							<button
								type="button"
								onClick={() => {
									setActiveMode('split');
									if (!splitResult) handleSplit();
								}}
								className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
									activeMode === 'split'
										? 'bg-background text-foreground shadow-md border border-border/60'
										: 'text-muted-foreground hover:text-foreground'
								}`}
							>
								<Scissors className="w-4 h-4 text-amber-500" />
								<span>Split Large Sitemap</span>
							</button>

							<button
								type="button"
								onClick={() => {
									setActiveMode('validate');
									if (!validationResult) handleValidate();
								}}
								className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
									activeMode === 'validate'
										? 'bg-background text-foreground shadow-md border border-border/60'
										: 'text-muted-foreground hover:text-foreground'
								}`}
							>
								<ShieldCheck className="w-4 h-4 text-blue-500" />
								<span>Validate XML Markup</span>
							</button>
						</div>
					</div>

					{/* Main Workspace Card */}
					<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-6">
						<div className="flex flex-wrap justify-between items-center gap-3 border-b border-border/40 pb-4">
							<h2 className="text-lg font-bold flex items-center gap-2">
								<FileCode className="w-5 h-5 text-primary" />
								<span>Input Sitemap XML or URL List</span>
							</h2>
							<div className="flex items-center gap-2">
								<input
									type="file"
									ref={fileInputRef}
									onChange={handleFileUpload}
									accept=".xml,.txt"
									className="hidden"
								/>
								<button
									type="button"
									onClick={() => fileInputRef.current?.click()}
									className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-secondary/50 hover:bg-secondary text-xs font-semibold transition"
								>
									<Upload className="w-3.5 h-3.5 text-primary" /> Upload File
								</button>
								{activeMode === 'split' ? (
									<button
										type="button"
										onClick={() => handleSplit()}
										className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition shadow-xs"
									>
										<Scissors className="w-3.5 h-3.5" /> Partition Sitemap
									</button>
								) : (
									<button
										type="button"
										onClick={() => handleValidate()}
										className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition shadow-xs"
									>
										<RefreshCw className="w-3.5 h-3.5" /> Validate Markup
									</button>
								)}
							</div>
						</div>

						{/* Split Options if in Split mode */}
						{activeMode === 'split' && (
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-secondary/30 border border-border/60">
								<div>
									<label className="block text-xs font-semibold mb-1">
										Max URLs Per Child Sitemap
									</label>
									<input
										type="number"
										min={1}
										max={50000}
										className="w-full p-2 rounded-lg border bg-background text-xs focus:ring-1 focus:ring-primary focus:outline-none"
										value={chunkSize}
										onChange={(e) => setChunkSize(Math.max(1, parseInt(e.target.value) || 1))}
									/>
									<span className="text-[10px] text-muted-foreground mt-0.5 block">
										Search engine ceiling: 50,000 URLs
									</span>
								</div>

								<div>
									<label className="block text-xs font-semibold mb-1">
										Index Base Directory URL
									</label>
									<input
										type="url"
										className="w-full p-2 rounded-lg border bg-background text-xs focus:ring-1 focus:ring-primary focus:outline-none"
										value={indexBaseUrl}
										onChange={(e) => setIndexBaseUrl(e.target.value)}
										placeholder="https://example.com/sitemaps/"
									/>
									<span className="text-[10px] text-muted-foreground mt-0.5 block">
										Prefix for child links in index file
									</span>
								</div>

								<div>
									<label className="block text-xs font-semibold mb-1">
										Child File Prefix
									</label>
									<input
										type="text"
										className="w-full p-2 rounded-lg border bg-background text-xs focus:ring-1 focus:ring-primary focus:outline-none"
										value={childPrefix}
										onChange={(e) => setChildPrefix(e.target.value)}
										placeholder="sitemap"
									/>
									<span className="text-[10px] text-muted-foreground mt-0.5 block">
										e.g. sitemap-1.xml, sitemap-2.xml
									</span>
								</div>
							</div>
						)}

						<textarea
							rows={7}
							className="w-full p-4 rounded-xl border border-border bg-background text-xs font-mono focus:ring-2 focus:ring-primary focus:outline-none"
							value={sitemapInput}
							onChange={(e) => setSitemapInput(e.target.value)}
							placeholder="Paste raw XML sitemap text or list of URLs here..."
						/>

						{/* Split Results View */}
						{activeMode === 'split' && splitResult && (
							<div className="space-y-4 pt-2 border-t border-border/40">
								<div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
									<div className="flex items-center gap-2">
										<CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
										<div>
											<span className="font-bold text-emerald-600 dark:text-emerald-400">
												Partitioned into {splitResult.totalFiles} Child Sitemap Files
											</span>
											<p className="text-muted-foreground mt-0.5">
												Total URLs: {splitResult.totalUrls.toLocaleString()} • Index:{' '}
												<code className="font-bold">{splitResult.indexFilename}</code>
											</p>
										</div>
									</div>

									<button
										type="button"
										onClick={handleDownloadZip}
										disabled={isZipping}
										className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center gap-1.5 hover:opacity-90 transition shadow-xs"
									>
										<Archive className="w-4 h-4" />
										<span>{isZipping ? 'Creating ZIP...' : 'Download All as ZIP'}</span>
									</button>
								</div>

								{/* Tabs for files */}
								<div className="flex flex-wrap gap-1.5 border-b border-border/40 pb-2">
									<button
										type="button"
										onClick={() => setSelectedFileIndex(-1)}
										className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1 ${
											selectedFileIndex === -1
												? 'bg-primary text-primary-foreground shadow-xs'
												: 'bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground'
										}`}
									>
										<FileCode className="w-3.5 h-3.5" />
										<span>{splitResult.indexFilename} (Index)</span>
									</button>

									{splitResult.childFiles.map((f, idx) => (
										<button
											key={f.filename}
											type="button"
											onClick={() => setSelectedFileIndex(idx)}
											className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1 ${
												selectedFileIndex === idx
													? 'bg-primary text-primary-foreground shadow-xs'
													: 'bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground'
											}`}
										>
											<span>{f.filename}</span>
											<span className="text-[10px] opacity-75">({f.urlCount})</span>
										</button>
									))}
								</div>

								{/* File Preview */}
								{currentFile && (
									<div className="bg-background border border-border rounded-xl p-4 space-y-3">
										<div className="flex justify-between items-center border-b border-border/40 pb-2">
											<div className="flex items-center gap-2">
												<span className="text-xs font-mono font-bold text-foreground">
													{currentFile.filename}
												</span>
												<span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
													{currentFile.urlCount} {currentFile.isIndex ? 'child sitemaps' : 'URLs'}
												</span>
											</div>
											<div className="flex gap-2">
												<button
													type="button"
													onClick={handleCopyFile}
													className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border bg-card hover:bg-secondary text-xs font-semibold transition"
												>
													{copied ? (
														<>
															<Check className="w-3 h-3 text-emerald-500" /> Copied
														</>
													) : (
														<>
															<Copy className="w-3 h-3" /> Copy
														</>
													)}
												</button>
												<button
													type="button"
													onClick={handleDownloadFile}
													className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border bg-card hover:bg-secondary text-xs font-semibold transition"
												>
													<Download className="w-3 h-3" /> Download
												</button>
											</div>
										</div>

										<div className="max-h-85 min-h-60 overflow-auto font-mono text-[11px] whitespace-pre text-emerald-400 p-2">
											{currentFile.xml}
										</div>
									</div>
								)}
							</div>
						)}

						{/* Validation Results View */}
						{activeMode === 'validate' && validationResult && (
							<div className="space-y-6 pt-2 border-t border-border/40">
								<div
									className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-medium ${
										validationResult.isValid
											? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
											: 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400'
									}`}
								>
									<div className="flex items-center gap-3">
										{validationResult.isValid ? (
											<CheckCircle2 className="w-5 h-5 shrink-0" />
										) : (
											<AlertCircle className="w-5 h-5 shrink-0" />
										)}
										<div>
											<span className="font-bold text-sm">
												{validationResult.isValid
													? 'Valid Sitemap Protocol Structure'
													: 'Protocol Validation Issues Detected'}
											</span>
											<p className="text-xs opacity-90 mt-0.5">
												Format: <span className="font-mono">{validationResult.format}</span> • Found{' '}
												{validationResult.totalUrls.toLocaleString()}{' '}
												{validationResult.isIndex ? 'child sitemaps' : 'URL entries'} • Size:{' '}
												{(validationResult.fileSizeBytes / 1024).toFixed(1)} KB
											</p>
										</div>
									</div>
								</div>

								{/* Stat Cards */}
								<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
									<div className="p-3.5 rounded-xl bg-background border border-border/80 space-y-1">
										<span className="text-[11px] text-muted-foreground font-semibold">Total URLs</span>
										<div className="text-lg font-bold">{validationResult.totalUrls.toLocaleString()}</div>
										<span className="text-[10px] text-muted-foreground">Max: 50,000</span>
									</div>

									<div className="p-3.5 rounded-xl bg-background border border-border/80 space-y-1">
										<span className="text-[11px] text-muted-foreground font-semibold">Size</span>
										<div className="text-lg font-bold">
											{(validationResult.fileSizeBytes / 1024).toFixed(1)} KB
										</div>
										<span className="text-[10px] text-muted-foreground">Max: 50 MB</span>
									</div>

									<div className="p-3.5 rounded-xl bg-background border border-border/80 space-y-1">
										<span className="text-[11px] text-muted-foreground font-semibold">Unique Domains</span>
										<div className="text-lg font-bold">{validationResult.stats.uniqueDomains.length}</div>
										<span className="text-[10px] text-muted-foreground truncate block">
											{validationResult.stats.uniqueDomains[0] || 'None'}
										</span>
									</div>

									<div className="p-3.5 rounded-xl bg-background border border-border/80 space-y-1">
										<span className="text-[11px] text-muted-foreground font-semibold">Duplicates</span>
										<div className="text-lg font-bold text-amber-500">
											{validationResult.stats.duplicateCount}
										</div>
										<span className="text-[10px] text-muted-foreground">Redundant entries</span>
									</div>
								</div>

								{/* Issues list */}
								<div className="space-y-2">
									{validationResult.errors.map((err, i) => (
										<div
											key={`err-${i}`}
											className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-start gap-2.5"
										>
											<AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
											<div>
												<span className="font-bold">Error [{err.code}]:</span> {err.message}
											</div>
										</div>
									))}

									{validationResult.warnings.map((warn, i) => (
										<div
											key={`warn-${i}`}
											className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs flex items-start gap-2.5"
										>
											<AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
											<div>
												<span className="font-bold">Warning [{warn.code}]:</span> {warn.message}
											</div>
										</div>
									))}

									{validationResult.passes.map((passText, i) => (
										<div
											key={`pass-${i}`}
											className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2.5"
										>
											<CheckCircle2 className="w-4 h-4 shrink-0" />
											<span>{passText}</span>
										</div>
									))}
								</div>
							</div>
						)}
					</div>

					{/* Informational & FAQ Section */}
					<div className="pt-10 border-t border-border/40 space-y-6">
						<div className="text-center space-y-2 max-w-2xl mx-auto">
							<h2 className="text-2xl font-black tracking-tight">
								XML Sitemap Best Practices & Guidelines
							</h2>
							<p className="text-sm text-muted-foreground">
								Google Search Console limits, index file requirements, and compression guidelines.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground">
									What are the maximum limits for an XML sitemap?
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Search engines like Google and Bing limit a single sitemap file to 50,000 URLs and an uncompressed file size of 50 MB. Sitemaps exceeding these boundaries must be partitioned into multiple files.
								</p>
							</div>
							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground">
									What is a Sitemap Index file?
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									A sitemap index file acts as a directory listing multiple sub-sitemaps using &lt;sitemapindex&gt; and &lt;sitemap&gt; tags. Submitting a single sitemap index to Google Search Console indexes all child files.
								</p>
							</div>
							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground">
									Should XML Sitemaps be Gzip Compressed?
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Yes. Compressing sitemap files with gzip (.xml.gz) substantially reduces bandwidth requirements and server overhead during search crawler indexing visits.
								</p>
							</div>
							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground">
									Which URLs should be excluded from sitemaps?
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Exclude noindex pages, canonicalized duplicate URLs, password-protected admin dashboards, redirecting URLs (301/302), and broken pages (404/500).
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
										Need to create a brand new custom sitemap?
									</div>
									<div className="text-xs text-muted-foreground">
										Visually construct URLs, set priorities, and export valid XML with the XML Sitemap Generator.
									</div>
								</div>
							</div>
							<Link
								href="/developer-tools/sitemap-generator"
								className="px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold flex items-center gap-1.5 transition shrink-0"
							>
								<span>Try Sitemap Generator</span>
								<ArrowRight className="w-3.5 h-3.5" />
							</Link>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
