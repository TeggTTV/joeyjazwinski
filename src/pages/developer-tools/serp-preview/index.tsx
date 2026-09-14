import { useState, useMemo, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import {
	Search,
	Monitor,
	Smartphone,
	Star,
	Calendar,
	Tag,
	Link2,
	Copy,
	Check,
	Sparkles,
	Sliders,
	AlertCircle,
	CheckCircle2,
} from 'lucide-react';
import {
	SerpConfig,
	DEFAULT_SERP_CONFIG,
	measureTextPx,
	GOOGLE_TITLE_FONT,
	GOOGLE_SNIPPET_FONT,
	GOOGLE_TITLE_MAX_PX,
	GOOGLE_DESC_MAX_PX,
	formatBreadcrumb,
	renderHighlightedKeyword,
} from '@/lib/serpHelper';

export default function SerpPreview() {
	const [config, setConfig] = useState<SerpConfig>(DEFAULT_SERP_CONFIG);
	const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
	const [copiedHtml, setCopiedHtml] = useState(false);

	// Client-side pixel measurements
	const [titlePx, setTitlePx] = useState(0);
	const [descPx, setDescPx] = useState(0);

	useEffect(() => {
		setTitlePx(measureTextPx(config.title, GOOGLE_TITLE_FONT));
		setDescPx(measureTextPx(config.description, GOOGLE_SNIPPET_FONT));
	}, [config.title, config.description]);

	const breadcrumbs = useMemo(() => formatBreadcrumb(config.url), [config.url]);

	// SEO Checklist calculations
	const checks = useMemo(() => {
		const titleLen = config.title.length;
		const descLen = config.description.length;
		const kw = config.targetKeyword.trim().toLowerCase();

		const titleInKeyword = kw ? config.title.toLowerCase().includes(kw) : false;
		const descInKeyword = kw ? config.description.toLowerCase().includes(kw) : false;

		return {
			titleOk: titleLen >= 30 && titleLen <= 60 && titlePx <= GOOGLE_TITLE_MAX_PX,
			titleWarning: titlePx > GOOGLE_TITLE_MAX_PX,
			descOk: descLen >= 110 && descLen <= 160 && descPx <= GOOGLE_DESC_MAX_PX,
			descWarning: descPx > GOOGLE_DESC_MAX_PX,
			kwInTitle: titleInKeyword,
			kwInDesc: descInKeyword,
		};
	}, [config.title, config.description, config.targetKeyword, titlePx, descPx]);

	// Export HTML head tags snippet
	const generatedHtml = useMemo(() => {
		return `<title>${config.title}</title>
<meta name="description" content="${config.description}" />
<link rel="canonical" href="${config.url}" />`;
	}, [config.title, config.description, config.url]);

	const handleCopyHtml = () => {
		navigator.clipboard.writeText(generatedHtml);
		setCopiedHtml(true);
		setTimeout(() => setCopiedHtml(false), 2000);
	};

	// Highlight renderer helper
	const highlight = (text: string) => {
		const parts = renderHighlightedKeyword(text, config.targetKeyword);
		if (typeof parts === 'string') return parts;
		return parts.map((part, idx) => {
			const isMatch =
				config.targetKeyword.trim() &&
				config.targetKeyword
					.toLowerCase()
					.split(/\s+/)
					.some((kw) => kw && part.toLowerCase() === kw);
			return isMatch ? (
				<strong key={idx} className="font-bold text-foreground">
					{part}
				</strong>
			) : (
				<span key={idx}>{part}</span>
			);
		});
	};

	return (
		<>
			<NextSeo
				title="Google SERP Snippet Preview & Pixel Width Boundary Checker"
				description="Simulate real-time Google search result snippets for desktop and mobile. Test 600px title and 960px description boundaries with Rich Snippet toggles."
				canonical="https://joeyjazwinski.com/developer-tools/serp-preview"
				openGraph={{
					title: 'Google SERP Snippet Preview & Pixel Width Boundary Checker',
					description:
						'Simulate real-time Google search result snippets for desktop and mobile. Test 600px title and 960px description boundaries with Rich Snippet toggles.',
					url: 'https://joeyjazwinski.com/developer-tools/serp-preview',
					type: 'website',
					images: [
						{
							url: 'https://joeyjazwinski.com/ogimage.png',
							width: 1200,
							height: 630,
							alt: 'Google SERP Snippet Preview Tool',
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
				name="Google SERP Snippet Preview Tool"
				description="Simulate real-time Google search result snippets for desktop and mobile. Test 600px title and 960px description boundaries with Rich Snippet toggles."
				url="https://joeyjazwinski.com/developer-tools/serp-preview"
				category="DeveloperApplication"
			/>
			<main className="bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-6xl mx-auto space-y-8">
					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Search className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary via-blue-500 to-indigo-500 bg-clip-text text-transparent">
							SERP Snippet Preview
						</h1>
						<p className="text-muted-foreground text-lg">
							Simulate desktop and mobile Google search cards. Check pixel
							boundary rulers and preview Rich Snippets in real time.
						</p>
					</div>

					{/* Pixel Metrics Strip */}
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
						{/* Title Px */}
						<div className="p-4 rounded-xl bg-card border border-border space-y-2">
							<div className="flex justify-between items-center text-xs">
								<span className="text-muted-foreground font-semibold">Title Width</span>
								<span
									className={`font-mono font-bold ${
										titlePx > GOOGLE_TITLE_MAX_PX ? 'text-rose-500' : 'text-emerald-500'
									}`}
								>
									{titlePx} / {GOOGLE_TITLE_MAX_PX}px
								</span>
							</div>
							<div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
								<div
									className={`h-full transition-all ${
										titlePx > GOOGLE_TITLE_MAX_PX ? 'bg-rose-500' : 'bg-emerald-500'
									}`}
									style={{
										width: `${Math.min(100, (titlePx / GOOGLE_TITLE_MAX_PX) * 100)}%`,
									}}
								/>
							</div>
							<div className="text-[11px] text-muted-foreground">
								{config.title.length} characters
							</div>
						</div>

						{/* Description Px */}
						<div className="p-4 rounded-xl bg-card border border-border space-y-2">
							<div className="flex justify-between items-center text-xs">
								<span className="text-muted-foreground font-semibold">Snippet Width</span>
								<span
									className={`font-mono font-bold ${
										descPx > GOOGLE_DESC_MAX_PX ? 'text-rose-500' : 'text-emerald-500'
									}`}
								>
									{descPx} / {GOOGLE_DESC_MAX_PX}px
								</span>
							</div>
							<div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
								<div
									className={`h-full transition-all ${
										descPx > GOOGLE_DESC_MAX_PX ? 'bg-rose-500' : 'bg-emerald-500'
									}`}
									style={{
										width: `${Math.min(100, (descPx / GOOGLE_DESC_MAX_PX) * 100)}%`,
									}}
								/>
							</div>
							<div className="text-[11px] text-muted-foreground">
								{config.description.length} characters
							</div>
						</div>

						{/* Keyword Density */}
						<div className="p-4 rounded-xl bg-card border border-border space-y-1">
							<span className="text-xs text-muted-foreground font-semibold">Focus Keyword</span>
							<div className="text-xs font-mono font-bold truncate">
								{config.targetKeyword || 'None set'}
							</div>
							<div className="flex items-center gap-2 pt-1">
								<span
									className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
										checks.kwInTitle ? 'bg-emerald-500/15 text-emerald-600' : 'bg-secondary text-muted-foreground'
									}`}
								>
									In Title: {checks.kwInTitle ? 'Yes' : 'No'}
								</span>
								<span
									className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
										checks.kwInDesc ? 'bg-emerald-500/15 text-emerald-600' : 'bg-secondary text-muted-foreground'
									}`}
								>
									In Desc: {checks.kwInDesc ? 'Yes' : 'No'}
								</span>
							</div>
						</div>

						{/* Copy HTML tags */}
						<div className="p-4 rounded-xl bg-card border border-border flex flex-col justify-between">
							<span className="text-xs text-muted-foreground font-semibold">Header Markup</span>
							<button
								onClick={handleCopyHtml}
								className="w-full py-2 px-3 rounded-lg bg-primary text-primary-foreground font-semibold text-xs flex items-center justify-center gap-1.5 hover:opacity-95 transition cursor-pointer"
							>
								{copiedHtml ? (
									<>
										<Check className="w-3.5 h-3.5 text-emerald-300" />
										<span>Copied Tags</span>
									</>
								) : (
									<>
										<Copy className="w-3.5 h-3.5" />
										<span>Copy HTML Tags</span>
									</>
								)}
							</button>
						</div>
					</div>

					{/* Workbench */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
						{/* Configuration Form */}
						<div className="lg:col-span-6 bg-card border border-border rounded-2xl p-6 shadow-xl space-y-5">
							<div className="flex items-center gap-2 pb-2 border-b border-border/50 text-sm font-bold text-foreground">
								<Sliders className="w-4 h-4 text-primary" />
								Metadata & Rich Snippet Inputs
							</div>

							<div className="space-y-4 text-xs">
								{/* Title */}
								<div>
									<div className="flex justify-between items-center mb-1">
										<label className="font-semibold text-foreground">Page Title</label>
										<span
											className={`font-mono text-[10px] font-bold ${
												config.title.length > 60 || titlePx > GOOGLE_TITLE_MAX_PX
													? 'text-rose-500'
													: 'text-emerald-500'
											}`}
										>
											{config.title.length} chars ({titlePx}px)
										</span>
									</div>
									<input
										type="text"
										value={config.title}
										onChange={(e) => setConfig({ ...config, title: e.target.value })}
										className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
									/>
								</div>

								{/* Description */}
								<div>
									<div className="flex justify-between items-center mb-1">
										<label className="font-semibold text-foreground">Meta Description</label>
										<span
											className={`font-mono text-[10px] font-bold ${
												config.description.length > 160 || descPx > GOOGLE_DESC_MAX_PX
													? 'text-rose-500'
													: 'text-emerald-500'
											}`}
										>
											{config.description.length} chars ({descPx}px)
										</span>
									</div>
									<textarea
										rows={3}
										value={config.description}
										onChange={(e) => setConfig({ ...config, description: e.target.value })}
										className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
									/>
								</div>

								{/* Target URL */}
								<div>
									<label className="block font-semibold text-foreground mb-1">Target URL</label>
									<input
										type="url"
										value={config.url}
										onChange={(e) => setConfig({ ...config, url: e.target.value })}
										className="w-full p-2.5 rounded-lg border border-border bg-background font-mono focus:ring-1 focus:ring-primary focus:outline-none"
									/>
								</div>

								{/* Target Keyword */}
								<div>
									<label className="block font-semibold text-foreground mb-1">Focus Keyword</label>
									<input
										type="text"
										value={config.targetKeyword}
										onChange={(e) => setConfig({ ...config, targetKeyword: e.target.value })}
										placeholder="e.g. developer tools"
										className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
									/>
								</div>

								{/* Rich Snippet Toggles */}
								<div className="pt-3 border-t border-border/50 space-y-3">
									<span className="font-bold text-foreground block">Rich Snippet Features</span>

									<div className="grid grid-cols-2 gap-2">
										<label className="flex items-center gap-2 p-2 rounded-lg border border-border bg-background/50 cursor-pointer">
											<input
												type="checkbox"
												checked={config.showRating}
												onChange={(e) => setConfig({ ...config, showRating: e.target.checked })}
												className="rounded border-border text-primary focus:ring-primary"
											/>
											<Star className="w-3.5 h-3.5 text-amber-500" />
											<span>Review Rating</span>
										</label>

										<label className="flex items-center gap-2 p-2 rounded-lg border border-border bg-background/50 cursor-pointer">
											<input
												type="checkbox"
												checked={config.showPrice}
												onChange={(e) => setConfig({ ...config, showPrice: e.target.checked })}
												className="rounded border-border text-primary focus:ring-primary"
											/>
											<Tag className="w-3.5 h-3.5 text-emerald-500" />
											<span>Price & Stock</span>
										</label>

										<label className="flex items-center gap-2 p-2 rounded-lg border border-border bg-background/50 cursor-pointer">
											<input
												type="checkbox"
												checked={config.showDate}
												onChange={(e) => setConfig({ ...config, showDate: e.target.checked })}
												className="rounded border-border text-primary focus:ring-primary"
											/>
											<Calendar className="w-3.5 h-3.5 text-blue-500" />
											<span>Publish Date</span>
										</label>

										<label className="flex items-center gap-2 p-2 rounded-lg border border-border bg-background/50 cursor-pointer">
											<input
												type="checkbox"
												checked={config.showSitelinks}
												onChange={(e) => setConfig({ ...config, showSitelinks: e.target.checked })}
												className="rounded border-border text-primary focus:ring-primary"
											/>
											<Link2 className="w-3.5 h-3.5 text-indigo-500" />
											<span>Sitelinks</span>
										</label>
									</div>
								</div>
							</div>
						</div>

						{/* Live Search Result Preview */}
						<div className="lg:col-span-6 bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
							<div className="flex justify-between items-center pb-2 border-b border-border/50">
								<h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
									<Search className="w-4 h-4 text-primary" />
									Live SERP Simulation
								</h2>

								{/* Viewport switch */}
								<div className="flex border border-border rounded-lg overflow-hidden bg-background">
									<button
										onClick={() => setDevice('desktop')}
										className={`p-2 transition cursor-pointer ${
											device === 'desktop'
												? 'bg-primary text-primary-foreground'
												: 'text-muted-foreground hover:bg-secondary'
										}`}
										title="Desktop Search Result"
									>
										<Monitor className="w-3.5 h-3.5" />
									</button>
									<button
										onClick={() => setDevice('mobile')}
										className={`p-2 transition cursor-pointer ${
											device === 'mobile'
												? 'bg-primary text-primary-foreground'
												: 'text-muted-foreground hover:bg-secondary'
										}`}
										title="Mobile Search Result"
									>
										<Smartphone className="w-3.5 h-3.5" />
									</button>
								</div>
							</div>

							{/* SERP Search Card Box */}
							<div
								className={`p-5 rounded-2xl border shadow-inner transition-all ${
									device === 'desktop' ? 'bg-white dark:bg-[#202124]' : 'bg-white dark:bg-[#202124] max-w-sm mx-auto'
								}`}
							>
								{/* Breadcrumbs & Favicon */}
								<div className="flex items-center gap-2 mb-1.5">
									<div className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-600 dark:text-zinc-300">
										JJ
									</div>
									<div className="truncate">
										<div className="text-[12px] text-[#202124] dark:text-[#dadce0] font-medium leading-none">
											{breadcrumbs[0]}
										</div>
										<div className="text-[10px] text-[#5f6368] dark:text-[#bdc1c6] font-mono leading-tight truncate">
											{config.url}
										</div>
									</div>
								</div>

								{/* Title */}
								<h3
									className={`text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer font-normal leading-snug mb-1 ${
										device === 'desktop' ? 'text-[20px]' : 'text-[16px]'
									}`}
									style={{
										maxWidth: device === 'desktop' ? '600px' : '100%',
									}}
								>
									{highlight(config.title || 'Page Title')}
									{titlePx > GOOGLE_TITLE_MAX_PX && (
										<span className="text-zinc-500 dark:text-zinc-400 font-normal"> ...</span>
									)}
								</h3>

								{/* Rich Snippet Details (Ratings / Price) */}
								{(config.showRating || config.showPrice) && (
									<div className="flex flex-wrap items-center gap-2 text-xs text-[#5f6368] dark:text-[#bdc1c6] mb-1">
										{config.showRating && (
											<div className="flex items-center gap-1">
												<span className="text-amber-500 font-bold">★</span>
												<span>
													Rating: {config.ratingValue} · {config.reviewCount} reviews
												</span>
											</div>
										)}
										{config.showPrice && (
											<div>
												<span className="font-semibold text-[#202124] dark:text-white">
													{config.price}
												</span>
												<span> · {config.inStock ? 'In stock' : 'Out of stock'}</span>
											</div>
										)}
									</div>
								)}

								{/* Description Snippet */}
								<p
									className="text-[14px] text-[#4d5156] dark:text-[#bdc1c6] leading-relaxed mb-3"
									style={{
										maxWidth: device === 'desktop' ? '960px' : '100%',
									}}
								>
									{config.showDate && (
										<span className="text-[#70757a] dark:text-[#9aa0a6] mr-1.5">
											{config.dateString} —
										</span>
									)}
									{highlight(config.description || 'Page description snippet...')}
									{descPx > GOOGLE_DESC_MAX_PX && (
										<span className="text-zinc-500 dark:text-zinc-400 font-normal"> ...</span>
									)}
								</p>

								{/* Sitelinks Simulation */}
								{config.showSitelinks && device === 'desktop' && (
									<div className="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-200 dark:border-zinc-800">
										{config.sitelinks.map((link, idx) => (
											<div key={idx} className="space-y-0.5">
												<span className="text-xs font-medium text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer">
													{link.title}
												</span>
												<p className="text-[11px] text-[#70757a] dark:text-[#9aa0a6] truncate">
													{link.desc}
												</p>
											</div>
										))}
									</div>
								)}
							</div>

							{/* Checklist Callout */}
							<div className="p-4 rounded-xl bg-secondary/40 border border-border/80 space-y-2 text-xs">
								<span className="font-bold text-foreground block">Audit Feedback:</span>
								<div className="space-y-1 text-muted-foreground">
									<div className="flex items-center gap-2">
										{checks.titleOk ? (
											<CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
										) : (
											<AlertCircle className="w-3.5 h-3.5 text-amber-500" />
										)}
										<span>
											Title: {titlePx <= GOOGLE_TITLE_MAX_PX ? 'Within 600px width limit' : 'Will be truncated by Google (exceeds 600px)'}
										</span>
									</div>
									<div className="flex items-center gap-2">
										{checks.descOk ? (
											<CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
										) : (
											<AlertCircle className="w-3.5 h-3.5 text-amber-500" />
										)}
										<span>
											Snippet: {descPx <= GOOGLE_DESC_MAX_PX ? 'Within 960px width limit' : 'Will be truncated by Google (exceeds 960px)'}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
