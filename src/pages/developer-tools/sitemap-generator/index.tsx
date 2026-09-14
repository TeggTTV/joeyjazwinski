import { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import {
	FileCode,
	Plus,
	Trash,
	Copy,
	Download,
	Check,
	ShieldCheck,
	AlertCircle,
	AlertTriangle,
	CheckCircle2,
	Scissors,
	Upload,
	RefreshCw,
	Archive,
	Layers,
	ExternalLink,
	Search,
	Sparkles,
	Sliders,
	ArrowRight,
} from 'lucide-react';
import {
	SitemapUrl,
	SitemapValidationResult,
	SplitResult,
	validateSitemapXml,
	splitSitemapIntoChunks,
	generateSitemapXml,
	parseBulkUrls,
	createSitemapsZipBlob,
} from '@/utils/sitemap';

type TabMode = 'generator' | 'validator' | 'splitter';

export default function SitemapGeneratorPage() {
	const [activeTab, setActiveTab] = useState<TabMode>('generator');

	// --- Generator State ---
	const [generatorUrls, setGeneratorUrls] = useState<SitemapUrl[]>([
		{
			id: '1',
			loc: 'https://example.com/',
			lastmod: new Date().toISOString().split('T')[0],
			changefreq: 'daily',
			priority: '1.0',
		},
		{
			id: '2',
			loc: 'https://example.com/about',
			lastmod: new Date().toISOString().split('T')[0],
			changefreq: 'monthly',
			priority: '0.8',
		},
		{
			id: '3',
			loc: 'https://example.com/blog',
			lastmod: new Date().toISOString().split('T')[0],
			changefreq: 'weekly',
			priority: '0.9',
		},
	]);
	const [bulkInputText, setBulkInputText] = useState('');
	const [showBulkModal, setShowBulkModal] = useState(false);
	const [generatorCopied, setGeneratorCopied] = useState(false);

	// --- Validator State ---
	const [validatorInput, setValidatorInput] = useState<string>(
		`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://example.com/about</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`,
	);
	const [validationResult, setValidationResult] = useState<SitemapValidationResult | null>(null);
	const validatorFileInputRef = useRef<HTMLInputElement>(null);

	// --- Splitter State ---
	const [splitterInput, setSplitterInput] = useState<string>(
		`https://example.com/page-1\nhttps://example.com/page-2\nhttps://example.com/page-3\nhttps://example.com/page-4\nhttps://example.com/page-5\nhttps://example.com/page-6\nhttps://example.com/page-7\nhttps://example.com/page-8`,
	);
	const [chunkSize, setChunkSize] = useState<number>(4);
	const [indexBaseUrl, setIndexBaseUrl] = useState<string>('https://example.com/sitemaps/');
	const [childPrefix, setChildPrefix] = useState<string>('sitemap');
	const [splitResult, setSplitResult] = useState<SplitResult | null>(null);
	const [selectedSplitFileIndex, setSelectedSplitFileIndex] = useState<number>(-1); // -1 = index, 0..N = child
	const [splitterCopied, setSplitterCopied] = useState(false);
	const [isZipping, setIsZipping] = useState(false);
	const splitterFileInputRef = useRef<HTMLInputElement>(null);

	// --- Generator Methods ---
	const addUrl = () => {
		const newId = Math.random().toString(36).substring(2, 9);
		setGeneratorUrls((prev) => [
			...prev,
			{
				id: newId,
				loc: '',
				lastmod: new Date().toISOString().split('T')[0],
				changefreq: 'weekly',
				priority: '0.5',
			},
		]);
	};

	const removeUrl = (id: string) => {
		setGeneratorUrls((prev) => prev.filter((u) => u.id !== id));
	};

	const updateUrl = (id: string, field: keyof SitemapUrl, value: string) => {
		setGeneratorUrls((prev) =>
			prev.map((u) => (u.id === id ? { ...u, [field]: value } : u)),
		);
	};

	const handleBulkImport = () => {
		if (!bulkInputText.trim()) return;
		const parsed = parseBulkUrls(bulkInputText);
		if (parsed.length > 0) {
			setGeneratorUrls((prev) => [...prev, ...parsed]);
			setBulkInputText('');
			setShowBulkModal(false);
		}
	};

	const generatedXml = useMemo(() => {
		return generateSitemapXml(generatorUrls);
	}, [generatorUrls]);

	const handleCopyGenerator = () => {
		navigator.clipboard.writeText(generatedXml);
		setGeneratorCopied(true);
		setTimeout(() => setGeneratorCopied(false), 2000);
	};

	const handleDownloadGenerator = () => {
		const element = document.createElement('a');
		const file = new Blob([generatedXml], { type: 'text/xml' });
		element.href = URL.createObjectURL(file);
		element.download = 'sitemap.xml';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	};

	// --- Validator Methods ---
	const handleRunValidation = (textToValidate?: string) => {
		const content = textToValidate !== undefined ? textToValidate : validatorInput;
		const result = validateSitemapXml(content);
		setValidationResult(result);
	};

	const handleValidatorFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (event) => {
			const text = event.target?.result as string;
			if (text) {
				setValidatorInput(text);
				handleRunValidation(text);
			}
		};
		reader.readAsText(file);
	};

	const handleSendToSplitter = (xmlText: string) => {
		setSplitterInput(xmlText);
		setActiveTab('splitter');
		setTimeout(() => {
			executeSplit(xmlText);
		}, 50);
	};

	// --- Splitter Methods ---
	const executeSplit = (customInput?: string) => {
		const input = customInput !== undefined ? customInput : splitterInput;
		if (!input.trim()) return;

		const res = splitSitemapIntoChunks(input, {
			maxUrlsPerFile: chunkSize,
			indexBaseUrl,
			childPrefix,
			indexFilename: 'sitemap.xml',
		});
		setSplitResult(res);
		setSelectedSplitFileIndex(-1); // default to sitemap index
	};

	const handleSplitterFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (event) => {
			const text = event.target?.result as string;
			if (text) {
				setSplitterInput(text);
				executeSplit(text);
			}
		};
		reader.readAsText(file);
	};

	const currentSplitFile = useMemo(() => {
		if (!splitResult) return null;
		if (selectedSplitFileIndex === -1) {
			return {
				filename: splitResult.indexFilename,
				xml: splitResult.indexXml,
				urlCount: splitResult.childFiles.length,
				isIndex: true,
			};
		}
		const child = splitResult.childFiles[selectedSplitFileIndex];
		return child
			? {
					filename: child.filename,
					xml: child.xml,
					urlCount: child.urlCount,
					isIndex: false,
				}
			: null;
	}, [splitResult, selectedSplitFileIndex]);

	const handleCopySplitFile = () => {
		if (!currentSplitFile) return;
		navigator.clipboard.writeText(currentSplitFile.xml);
		setSplitterCopied(true);
		setTimeout(() => setSplitterCopied(false), 2000);
	};

	const handleDownloadSplitFile = () => {
		if (!currentSplitFile) return;
		const element = document.createElement('a');
		const file = new Blob([currentSplitFile.xml], { type: 'text/xml' });
		element.href = URL.createObjectURL(file);
		element.download = currentSplitFile.filename;
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	};

	const handleDownloadAllZip = async () => {
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
				title="XML Sitemap Generator, Validator & Splitter | SEO Tool"
				description="Generate standard-compliant XML sitemaps, validate schema rules and 50k limits, or split large sitemaps into index files with ZIP downloads."
				canonical="https://joeyjazwinski.com/developer-tools/sitemap-generator"
				openGraph={{
					title: 'XML Sitemap Generator, Validator & Splitter | SEO Tool',
					description:
						'Generate standard-compliant XML sitemaps, validate schema rules and 50k limits, or split large sitemaps into index files with ZIP downloads.',
					url: 'https://joeyjazwinski.com/developer-tools/sitemap-generator',
					type: 'website',
					images: [
						{
							url: 'https://joeyjazwinski.com/ogimage.png',
							width: 1200,
							height: 630,
							alt: 'XML Sitemap Generator, Validator & Splitter',
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
				name="XML Sitemap Generator, Validator & Splitter"
				description="Generate standard-compliant XML sitemaps, validate schema rules and 50k limits, or split large sitemaps into index files with ZIP downloads."
				url="https://joeyjazwinski.com/developer-tools/sitemap-generator"
				category="DeveloperApplication"
			/>
			<main className="bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground animate-fade-in">
				<div className="max-w-6xl mx-auto space-y-10">
					{/* Header */}
					<div className="text-center space-y-4 max-w-3xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<FileCode className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary via-emerald-400 to-teal-500 bg-clip-text text-transparent">
							XML Sitemap Suite
						</h1>
						<p className="text-muted-foreground text-base sm:text-lg">
							Create search-compliant XML sitemaps, validate schema rules and 50,000-URL limits, and partition massive catalogs into sitemap index files.
						</p>
					</div>

					{/* Navigation Tabs */}
					<div className="flex justify-center">
						<div className="inline-flex p-1.5 rounded-2xl bg-secondary/60 border border-border/80 shadow-inner gap-1 sm:gap-2">
							<button
								type="button"
								onClick={() => setActiveTab('generator')}
								className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
									activeTab === 'generator'
										? 'bg-background text-foreground shadow-md border border-border/60'
										: 'text-muted-foreground hover:text-foreground'
								}`}
							>
								<FileCode className="w-4 h-4 text-emerald-500" />
								<span>Generator</span>
							</button>

							<button
								type="button"
								onClick={() => {
									setActiveTab('validator');
									if (!validationResult) handleRunValidation();
								}}
								className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
									activeTab === 'validator'
										? 'bg-background text-foreground shadow-md border border-border/60'
										: 'text-muted-foreground hover:text-foreground'
								}`}
							>
								<ShieldCheck className="w-4 h-4 text-blue-500" />
								<span>Validator</span>
							</button>

							<button
								type="button"
								onClick={() => {
									setActiveTab('splitter');
									if (!splitResult) executeSplit();
								}}
								className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
									activeTab === 'splitter'
										? 'bg-background text-foreground shadow-md border border-border/60'
										: 'text-muted-foreground hover:text-foreground'
								}`}
							>
								<Scissors className="w-4 h-4 text-amber-500" />
								<span>Splitter & Index</span>
							</button>
						</div>
					</div>

					{/* TAB 1: GENERATOR */}
					{activeTab === 'generator' && (
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
							{/* Form & List */}
							<div className="lg:col-span-7 bg-card border border-border/80 rounded-2xl p-6 shadow-xl space-y-6">
								<div className="flex flex-wrap justify-between items-center gap-2 border-b border-border/40 pb-4">
									<div>
										<h2 className="text-lg font-bold">Map Directory Links</h2>
										<p className="text-xs text-muted-foreground">
											{generatorUrls.length} {generatorUrls.length === 1 ? 'URL entry' : 'URL entries'} configured
										</p>
									</div>
									<div className="flex items-center gap-2">
										<button
											type="button"
											onClick={() => setShowBulkModal(true)}
											className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border bg-secondary/50 hover:bg-secondary text-xs font-semibold text-foreground transition"
										>
											<Layers className="w-3.5 h-3.5 text-primary" /> Bulk Import
										</button>
										<button
											type="button"
											onClick={addUrl}
											className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition shadow-xs"
										>
											<Plus className="w-3.5 h-3.5" /> Add URL
										</button>
									</div>
								</div>

								{/* Bulk Import Inline Drawer */}
								{showBulkModal && (
									<div className="p-4 rounded-xl bg-secondary/40 border border-border space-y-3">
										<div className="flex justify-between items-center">
											<span className="text-xs font-bold text-foreground">
												Paste URLs (One per line or CSV)
											</span>
											<button
												type="button"
												onClick={() => setShowBulkModal(false)}
												className="text-xs text-muted-foreground hover:text-foreground"
											>
												Cancel
											</button>
										</div>
										<textarea
											rows={4}
											className="w-full p-2.5 rounded-lg border bg-background text-xs font-mono focus:ring-1 focus:ring-primary focus:outline-none"
											value={bulkInputText}
											onChange={(e) => setBulkInputText(e.target.value)}
											placeholder={`https://example.com/page-1\nhttps://example.com/page-2,2026-09-13,daily,0.9`}
										/>
										<div className="flex justify-end gap-2">
											<button
												type="button"
												onClick={handleBulkImport}
												className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition"
											>
												Import URLs
											</button>
										</div>
									</div>
								)}

								<div className="space-y-4 max-h-135 overflow-y-auto pr-1">
									{generatorUrls.map((url, idx) => (
										<div
											key={url.id || idx}
											className="p-4 rounded-xl border bg-background/60 space-y-3 relative group hover:border-border transition"
										>
											<div className="flex justify-between items-center">
												<span className="text-xs font-bold text-muted-foreground">
													URL #{idx + 1}
												</span>
												<button
													type="button"
													onClick={() => removeUrl(url.id || '')}
													className="text-rose-500 hover:bg-rose-500/10 p-1.5 rounded-lg transition"
													title="Delete URL entry"
												>
													<Trash className="w-3.5 h-3.5" />
												</button>
											</div>

											<div className="grid grid-cols-1 md:grid-cols-12 gap-3">
												<div className="md:col-span-6">
													<label className="block text-[11px] font-semibold mb-1">
														Canonical Location
													</label>
													<input
														type="url"
														className="w-full p-2.5 rounded-lg border bg-background text-xs focus:ring-1 focus:ring-primary focus:outline-none transition"
														value={url.loc}
														onChange={(e) =>
															updateUrl(url.id || '', 'loc', e.target.value)
														}
														placeholder="https://example.com/page"
													/>
												</div>

												<div className="md:col-span-2">
													<label className="block text-[11px] font-semibold mb-1">
														Priority
													</label>
													<select
														className="w-full p-2.5 rounded-lg border bg-background text-xs focus:ring-1 focus:ring-primary focus:outline-none transition"
														value={url.priority}
														onChange={(e) =>
															updateUrl(url.id || '', 'priority', e.target.value)
														}
													>
														<option value="1.0">1.0 (High)</option>
														<option value="0.9">0.9</option>
														<option value="0.8">0.8</option>
														<option value="0.7">0.7</option>
														<option value="0.5">0.5 (Mid)</option>
														<option value="0.3">0.3</option>
														<option value="0.1">0.1 (Low)</option>
													</select>
												</div>

												<div className="md:col-span-2">
													<label className="block text-[11px] font-semibold mb-1">
														Frequency
													</label>
													<select
														className="w-full p-2.5 rounded-lg border bg-background text-xs focus:ring-1 focus:ring-primary focus:outline-none transition"
														value={url.changefreq}
														onChange={(e) =>
															updateUrl(url.id || '', 'changefreq', e.target.value)
														}
													>
														<option value="always">always</option>
														<option value="hourly">hourly</option>
														<option value="daily">daily</option>
														<option value="weekly">weekly</option>
														<option value="monthly">monthly</option>
														<option value="yearly">yearly</option>
														<option value="never">never</option>
													</select>
												</div>

												<div className="md:col-span-2">
													<label className="block text-[11px] font-semibold mb-1">
														Last Mod
													</label>
													<input
														type="date"
														className="w-full p-2 rounded-lg border bg-background text-xs focus:ring-1 focus:ring-primary focus:outline-none transition"
														value={url.lastmod}
														onChange={(e) =>
															updateUrl(url.id || '', 'lastmod', e.target.value)
														}
													/>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>

							{/* Output & Preview */}
							<div className="lg:col-span-5 bg-card border border-border/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between h-full min-h-125">
								<div className="space-y-4 flex-1 flex flex-col">
									<div className="flex justify-between items-center border-b border-border/40 pb-3">
										<div>
											<h2 className="text-lg font-bold">XML Preview</h2>
											<span className="text-[11px] text-muted-foreground font-mono">
												{generatorUrls.filter((u) => u.loc.trim()).length} URLs • {(new Blob([generatedXml]).size / 1024).toFixed(2)} KB
											</span>
										</div>
										<div className="flex gap-2">
											<button
												onClick={handleCopyGenerator}
												className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-background hover:bg-secondary text-xs font-semibold transition"
											>
												{generatorCopied ? (
													<>
														<Check className="w-3.5 h-3.5 text-emerald-500" /> Copied
													</>
												) : (
													<>
														<Copy className="w-3.5 h-3.5" /> Copy
													</>
												)}
											</button>
											<button
												onClick={handleDownloadGenerator}
												className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-background hover:bg-secondary text-xs font-semibold transition"
											>
												<Download className="w-3.5 h-3.5" /> Download
											</button>
										</div>
									</div>

									<div className="flex-1 min-h-85 bg-background border border-border rounded-xl p-4 font-mono text-[11px] overflow-auto select-all whitespace-pre leading-relaxed text-emerald-400">
										{generatedXml}
									</div>

									<div className="pt-2 flex justify-between items-center text-xs text-muted-foreground">
										<span>Validate or split this sitemap?</span>
										<button
											type="button"
											onClick={() => {
												setValidatorInput(generatedXml);
												setActiveTab('validator');
												handleRunValidation(generatedXml);
											}}
											className="text-primary hover:underline font-semibold inline-flex items-center gap-1"
										>
											Inspect in Validator <ArrowRight className="w-3 h-3" />
										</button>
									</div>
								</div>
							</div>
						</div>
					)}

					{/* TAB 2: VALIDATOR */}
					{activeTab === 'validator' && (
						<div className="space-y-8">
							<div className="bg-card border border-border/80 rounded-2xl p-6 shadow-xl space-y-6">
								<div className="flex flex-wrap justify-between items-center gap-3 border-b border-border/40 pb-4">
									<div className="flex items-center gap-2">
										<ShieldCheck className="w-5 h-5 text-blue-500" />
										<h2 className="text-lg font-bold">Inspect & Validate XML Sitemap</h2>
									</div>
									<div className="flex items-center gap-2">
										<input
											type="file"
											ref={validatorFileInputRef}
											onChange={handleValidatorFileUpload}
											accept=".xml,.txt"
											className="hidden"
										/>
										<button
											type="button"
											onClick={() => validatorFileInputRef.current?.click()}
											className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-secondary/50 hover:bg-secondary text-xs font-semibold transition"
										>
											<Upload className="w-3.5 h-3.5 text-primary" /> Upload XML File
										</button>
										<button
											type="button"
											onClick={() => handleRunValidation()}
											className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition shadow-xs"
										>
											<RefreshCw className="w-3.5 h-3.5" /> Validate Now
										</button>
									</div>
								</div>

								<div className="space-y-2">
									<label className="block text-xs font-semibold text-muted-foreground">
										Paste Raw XML Sitemap Markup:
									</label>
									<textarea
										rows={7}
										className="w-full p-4 rounded-xl border border-border bg-background text-xs font-mono focus:ring-2 focus:ring-primary focus:outline-none"
										value={validatorInput}
										onChange={(e) => setValidatorInput(e.target.value)}
										placeholder="Paste raw XML sitemap text here..."
									/>
								</div>

								{/* Validation Diagnostics Output */}
								{validationResult && (
									<div className="space-y-6 pt-2">
										{/* High-level status bar */}
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

											{validationResult.totalUrls > 50000 && (
												<button
													type="button"
													onClick={() => handleSendToSplitter(validatorInput)}
													className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-1.5 transition shrink-0"
												>
													<Scissors className="w-3.5 h-3.5" /> Split into Indexes
												</button>
											)}
										</div>

										{/* Stat Metric Cards */}
										<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
											<div className="p-3.5 rounded-xl bg-background border border-border/80 space-y-1">
												<span className="text-[11px] text-muted-foreground font-semibold">Total URLs</span>
												<div className="text-lg font-bold">
													{validationResult.totalUrls.toLocaleString()}
												</div>
												<span className="text-[10px] text-muted-foreground">Max limit: 50,000</span>
											</div>

											<div className="p-3.5 rounded-xl bg-background border border-border/80 space-y-1">
												<span className="text-[11px] text-muted-foreground font-semibold">Uncompressed Size</span>
												<div className="text-lg font-bold">
													{(validationResult.fileSizeBytes / 1024).toFixed(1)} KB
												</div>
												<span className="text-[10px] text-muted-foreground">Max limit: 50 MB</span>
											</div>

											<div className="p-3.5 rounded-xl bg-background border border-border/80 space-y-1">
												<span className="text-[11px] text-muted-foreground font-semibold">Unique Domains</span>
												<div className="text-lg font-bold">
													{validationResult.stats.uniqueDomains.length}
												</div>
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

										{/* Issue breakdown */}
										<div className="space-y-3">
											<h3 className="text-sm font-bold text-foreground">Detailed Checklist</h3>
											<div className="space-y-2">
												{/* Errors */}
												{validationResult.errors.map((err, i) => (
													<div
														key={`err-${i}`}
														className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-start gap-2.5"
													>
														<AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
														<div className="space-y-0.5">
															<span className="font-bold">Error [{err.code}]:</span> {err.message}
															{err.url && <div className="font-mono text-[11px] opacity-80">{err.url}</div>}
														</div>
													</div>
												))}

												{/* Warnings */}
												{validationResult.warnings.map((warn, i) => (
													<div
														key={`warn-${i}`}
														className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs flex items-start gap-2.5"
													>
														<AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
														<div className="space-y-0.5">
															<span className="font-bold">Warning [{warn.code}]:</span> {warn.message}
															{warn.url && <div className="font-mono text-[11px] opacity-80">{warn.url}</div>}
														</div>
													</div>
												))}

												{/* Passes */}
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
									</div>
								)}
							</div>
						</div>
					)}

					{/* TAB 3: SPLITTER & INDEX CREATOR */}
					{activeTab === 'splitter' && (
						<div className="space-y-8">
							<div className="bg-card border border-border/80 rounded-2xl p-6 shadow-xl space-y-6">
								<div className="flex flex-wrap justify-between items-center gap-3 border-b border-border/40 pb-4">
									<div className="flex items-center gap-2">
										<Scissors className="w-5 h-5 text-amber-500" />
										<h2 className="text-lg font-bold">Split Large Sitemap & Build Index</h2>
									</div>
									<div className="flex items-center gap-2">
										<input
											type="file"
											ref={splitterFileInputRef}
											onChange={handleSplitterFileUpload}
											accept=".xml,.txt"
											className="hidden"
										/>
										<button
											type="button"
											onClick={() => splitterFileInputRef.current?.click()}
											className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-secondary/50 hover:bg-secondary text-xs font-semibold transition"
										>
											<Upload className="w-3.5 h-3.5 text-primary" /> Upload Large File
										</button>
										<button
											type="button"
											onClick={() => executeSplit()}
											className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition shadow-xs"
										>
											<Scissors className="w-3.5 h-3.5" /> Partition Sitemap
										</button>
									</div>
								</div>

								{/* Splitter Settings */}
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
											Google standard limit: 50,000 URLs
										</span>
									</div>

									<div>
										<label className="block text-xs font-semibold mb-1">
											Sitemap Index Base Directory URL
										</label>
										<input
											type="url"
											className="w-full p-2 rounded-lg border bg-background text-xs focus:ring-1 focus:ring-primary focus:outline-none"
											value={indexBaseUrl}
											onChange={(e) => setIndexBaseUrl(e.target.value)}
											placeholder="https://example.com/sitemaps/"
										/>
										<span className="text-[10px] text-muted-foreground mt-0.5 block">
											Base prefix for child URLs in index
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

								<div className="space-y-2">
									<label className="block text-xs font-semibold text-muted-foreground">
										Source Sitemap XML or List of URLs:
									</label>
									<textarea
										rows={6}
										className="w-full p-4 rounded-xl border border-border bg-background text-xs font-mono focus:ring-2 focus:ring-primary focus:outline-none"
										value={splitterInput}
										onChange={(e) => setSplitterInput(e.target.value)}
										placeholder="Paste large XML sitemap or URL lines here..."
									/>
								</div>

								{/* Split Output Results */}
								{splitResult && (
									<div className="space-y-4 pt-2">
										<div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
											<div className="flex items-center gap-2">
												<CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
												<div>
													<span className="font-bold text-emerald-600 dark:text-emerald-400">
														Successfully Partitioned into {splitResult.totalFiles} Child Sitemap Files
													</span>
													<p className="text-muted-foreground mt-0.5">
														Total URLs: {splitResult.totalUrls.toLocaleString()} • Root Index:{' '}
														<code className="font-bold">{splitResult.indexFilename}</code>
													</p>
												</div>
											</div>

											<button
												type="button"
												onClick={handleDownloadAllZip}
												disabled={isZipping}
												className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center gap-1.5 hover:opacity-90 transition shadow-xs"
											>
												<Archive className="w-4 h-4" />
												<span>{isZipping ? 'Generating ZIP...' : 'Download All as ZIP'}</span>
											</button>
										</div>

										{/* File Selector Tabs */}
										<div className="flex flex-wrap gap-1.5 border-b border-border/40 pb-2">
											<button
												type="button"
												onClick={() => setSelectedSplitFileIndex(-1)}
												className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1 ${
													selectedSplitFileIndex === -1
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
													onClick={() => setSelectedSplitFileIndex(idx)}
													className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1 ${
														selectedSplitFileIndex === idx
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
										{currentSplitFile && (
											<div className="bg-background border border-border rounded-xl p-4 space-y-3">
												<div className="flex justify-between items-center border-b border-border/40 pb-2">
													<div className="flex items-center gap-2">
														<span className="text-xs font-mono font-bold text-foreground">
															{currentSplitFile.filename}
														</span>
														<span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
															{currentSplitFile.urlCount}{' '}
															{currentSplitFile.isIndex ? 'child sitemaps' : 'URLs'}
														</span>
													</div>
													<div className="flex gap-2">
														<button
															type="button"
															onClick={handleCopySplitFile}
															className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border bg-card hover:bg-secondary text-xs font-semibold transition"
														>
															{splitterCopied ? (
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
															onClick={handleDownloadSplitFile}
															className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border bg-card hover:bg-secondary text-xs font-semibold transition"
														>
															<Download className="w-3 h-3" /> Download
														</button>
													</div>
												</div>

												<div className="max-h-85 min-h-60 overflow-auto font-mono text-[11px] whitespace-pre text-emerald-400 p-2">
													{currentSplitFile.xml}
												</div>
											</div>
										)}
									</div>
								)}
							</div>
						</div>
					)}

					{/* Educational & Protocol Standards Section */}
					<div className="pt-10 border-t border-border/40 space-y-6">
						<div className="text-center space-y-2 max-w-2xl mx-auto">
							<h2 className="text-2xl font-black tracking-tight">
								XML Sitemap Architecture & Standards
							</h2>
							<p className="text-sm text-muted-foreground">
								Google Search Console requirements, sitemap index protocols, and scaling limits.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground flex items-center gap-2">
									<Sliders className="w-4 h-4 text-primary" />
									Protocol Boundaries (50,000 URLs / 50 MB)
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									A single sitemap file must not exceed 50,000 URLs or 50 MB uncompressed. Websites with larger catalogs partition URLs into sub-sitemaps and bind them under a sitemap index file.
								</p>
							</div>

							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground flex items-center gap-2">
									<Layers className="w-4 h-4 text-emerald-500" />
									Sitemap Index Hierarchy
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Sitemap index documents utilize the &lt;sitemapindex&gt; root tag. Submitting the primary index file URL to Google Search Console registers all linked child sitemaps automatically.
								</p>
							</div>

							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground flex items-center gap-2">
									<ShieldCheck className="w-4 h-4 text-blue-500" />
									Canonical & Protocol Best Practices
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Always include full absolute URLs with exact protocols (HTTPS) and trailing slash consistency. Exclude redirected pages (301/302), canonicalized duplicates, and 404 error routes.
								</p>
							</div>

							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground flex items-center gap-2">
									<Sparkles className="w-4 h-4 text-amber-500" />
									W3C Datetime Lastmod Formatting
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Use standard W3C date formats (YYYY-MM-DD or YYYY-MM-DDThh:mm:ssTZD). Accurate lastmod tags allow crawlers to prioritize re-crawling updated pages efficiently.
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
										Looking to configure crawler rules for robots.txt?
									</div>
									<div className="text-xs text-muted-foreground">
										Pair your sitemaps with custom crawl delays, allow/disallow directives, and user-agent rules.
									</div>
								</div>
							</div>
							<Link
								href="/developer-tools/robots-generator"
								className="px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold flex items-center gap-1.5 transition shrink-0"
							>
								<span>Robots.txt Generator</span>
								<ArrowRight className="w-3.5 h-3.5" />
							</Link>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
