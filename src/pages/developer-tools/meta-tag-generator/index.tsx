import { useState, useMemo } from 'react';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import {
	Sparkles,
	Copy,
	Check,
	Download,
	Layers,
	Eye,
	Sliders,
} from 'lucide-react';

type PreviewPlatform = 'facebook' | 'twitter' | 'discord';

export default function MetaTagGenerator() {
	const [title, setTitle] = useState('Joey Jazwinski - Full-Stack Engineer & Designer');
	const [description, setDescription] = useState(
		'Explore instant client-side developer utilities, interactive code playgrounds, and engineering portfolios built with clean TypeScript and modern React.',
	);
	const [keywords, setKeywords] = useState('developer tools, react, typescript, web performance, ui design');
	const [author, setAuthor] = useState('Joey Jazwinski');
	const [canonical, setCanonical] = useState('https://joeyjazwinski.com');
	const [themeColor, setThemeColor] = useState('#3b82f6');
	const [faviconUrl, setFaviconUrl] = useState('https://joeyjazwinski.com/favicon.ico');
	const [appleTouchIcon, setAppleTouchIcon] = useState('https://joeyjazwinski.com/apple-touch-icon.png');

	// OpenGraph
	const [ogEnabled, setOgEnabled] = useState(true);
	const [ogTitle, setOgTitle] = useState('');
	const [ogDescription, setOgDescription] = useState('');
	const [ogImage, setOgImage] = useState('https://joeyjazwinski.com/ogimage.png');
	const [ogUrl, setOgUrl] = useState('');

	// Twitter
	const [twitterEnabled, setTwitterEnabled] = useState(true);
	const [twitterTitle, setTwitterTitle] = useState('');
	const [twitterDescription, setTwitterDescription] = useState('');
	const [twitterImage, setTwitterImage] = useState('');
	const [twitterCard, setTwitterCard] = useState('summary_large_image');
	const [twitterHandle, setTwitterHandle] = useState('@JoeyJazwinski');

	const [previewTab, setPreviewTab] = useState<PreviewPlatform>('facebook');
	const [copied, setCopied] = useState(false);

	const activeTitle = ogTitle || title || 'Page Title';
	const activeDesc = ogDescription || description || 'Page description preview...';
	const activeImage = ogImage || twitterImage || 'https://joeyjazwinski.com/ogimage.png';
	const activeUrl = ogUrl || canonical || 'https://joeyjazwinski.com';

	const domainName = useMemo(() => {
		try {
			const u = new URL(activeUrl);
			return u.hostname;
		} catch {
			return 'joeyjazwinski.com';
		}
	}, [activeUrl]);

	const generateMetaTags = () => {
		const tags: string[] = [];

		// Primary Meta
		tags.push('<!-- Primary Meta Tags -->');
		if (title) tags.push(`<title>${title}</title>`);
		tags.push(`<meta name="title" content="${title || 'Page Title'}" />`);
		if (description) tags.push(`<meta name="description" content="${description}" />`);
		if (keywords) tags.push(`<meta name="keywords" content="${keywords}" />`);
		if (author) tags.push(`<meta name="author" content="${author}" />`);
		if (canonical) tags.push(`<link rel="canonical" href="${canonical}" />`);
		if (themeColor) tags.push(`<meta name="theme-color" content="${themeColor}" />`);
		if (faviconUrl) tags.push(`<link rel="icon" href="${faviconUrl}" />`);
		if (appleTouchIcon) tags.push(`<link rel="apple-touch-icon" href="${appleTouchIcon}" />`);

		// Open Graph
		if (ogEnabled) {
			tags.push('');
			tags.push('<!-- Open Graph / Facebook / LinkedIn -->');
			tags.push(`<meta property="og:type" content="website" />`);
			tags.push(`<meta property="og:url" content="${ogUrl || canonical || ''}" />`);
			tags.push(`<meta property="og:title" content="${ogTitle || title || ''}" />`);
			tags.push(`<meta property="og:description" content="${ogDescription || description || ''}" />`);
			if (ogImage) tags.push(`<meta property="og:image" content="${ogImage}" />`);
		}

		// Twitter
		if (twitterEnabled) {
			tags.push('');
			tags.push('<!-- Twitter / X -->');
			tags.push(`<meta property="twitter:card" content="${twitterCard}" />`);
			tags.push(`<meta property="twitter:url" content="${ogUrl || canonical || ''}" />`);
			tags.push(`<meta property="twitter:title" content="${twitterTitle || title || ''}" />`);
			tags.push(`<meta property="twitter:description" content="${twitterDescription || description || ''}" />`);
			if (twitterHandle) tags.push(`<meta name="twitter:creator" content="${twitterHandle}" />`);
			if (twitterImage || ogImage) {
				tags.push(`<meta property="twitter:image" content="${twitterImage || ogImage}" />`);
			}
		}

		return tags.join('\n');
	};

	const fullMetaOutput = useMemo(() => generateMetaTags(), [
		title, description, keywords, author, canonical, themeColor, faviconUrl, appleTouchIcon,
		ogEnabled, ogTitle, ogDescription, ogImage, ogUrl,
		twitterEnabled, twitterTitle, twitterDescription, twitterImage, twitterCard, twitterHandle,
	]);

	const handleCopy = () => {
		navigator.clipboard.writeText(fullMetaOutput);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleDownload = () => {
		const blob = new Blob([fullMetaOutput], { type: 'text/html' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'meta-tags.html';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	return (
		<>
			<NextSeo
				title="SEO Meta Tag Generator & Social Card Preview | Open Graph & Twitter"
				description="Generate standard HTML meta tags, Apple touch icons, theme colors, Open Graph cards, and preview live social cards for Facebook, Twitter/X, and Discord."
				canonical="https://joeyjazwinski.com/developer-tools/meta-tag-generator"
				openGraph={{
					title: 'SEO Meta Tag Generator & Social Card Preview | Open Graph & Twitter',
					description:
						'Generate standard HTML meta tags, Apple touch icons, theme colors, Open Graph cards, and preview live social cards for Facebook, Twitter/X, and Discord.',
					url: 'https://joeyjazwinski.com/developer-tools/meta-tag-generator',
					type: 'website',
					images: [
						{
							url: 'https://joeyjazwinski.com/ogimage.png',
							width: 1200,
							height: 630,
							alt: 'SEO Meta Tag Generator',
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
				name="SEO Meta Tag Generator"
				description="Generate standard HTML meta tags, Apple touch icons, theme colors, Open Graph cards, and preview live social cards for Facebook, Twitter/X, and Discord."
				url="https://joeyjazwinski.com/developer-tools/meta-tag-generator"
				category="DeveloperApplication"
			/>
			<main className="bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-6xl mx-auto space-y-8">
					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Sparkles className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary via-rose-500 to-amber-500 bg-clip-text text-transparent">
							Meta Tag Generator
						</h1>
						<p className="text-muted-foreground text-lg">
							Create social previews and indexable search snippets.
							Generate head tags, theme colors, and icons.
						</p>
					</div>

					{/* Workspace */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
						{/* Configuration Form */}
						<div className="lg:col-span-6 space-y-6">
							{/* Basic Meta */}
							<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
								<h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2">
									Primary Meta Tags
								</h2>

								<div className="space-y-3 text-xs">
									<div>
										<label className="font-semibold text-foreground block mb-1">Page Title</label>
										<input
											type="text"
											className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
											value={title}
											onChange={(e) => setTitle(e.target.value)}
										/>
									</div>

									<div>
										<label className="font-semibold text-foreground block mb-1">Meta Description</label>
										<textarea
											rows={2}
											className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
											value={description}
											onChange={(e) => setDescription(e.target.value)}
										/>
									</div>

									<div className="grid grid-cols-2 gap-3">
										<div>
											<label className="font-semibold text-foreground block mb-1">Author</label>
											<input
												type="text"
												className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
												value={author}
												onChange={(e) => setAuthor(e.target.value)}
											/>
										</div>
										<div>
											<label className="font-semibold text-foreground block mb-1">Canonical URL</label>
											<input
												type="url"
												className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
												value={canonical}
												onChange={(e) => setCanonical(e.target.value)}
											/>
										</div>
									</div>

									<div className="grid grid-cols-3 gap-3 pt-1">
										<div>
											<label className="font-semibold text-foreground block mb-1">Theme Color</label>
											<div className="flex items-center gap-2">
												<input
													type="color"
													value={themeColor}
													onChange={(e) => setThemeColor(e.target.value)}
													className="w-8 h-8 rounded border border-border cursor-pointer"
												/>
												<span className="font-mono text-[10px] text-muted-foreground">{themeColor}</span>
											</div>
										</div>
										<div className="col-span-2">
											<label className="font-semibold text-foreground block mb-1">Favicon URL</label>
											<input
												type="url"
												className="w-full p-2 rounded-lg border border-border bg-background font-mono text-xs focus:ring-1 focus:ring-primary focus:outline-none"
												value={faviconUrl}
												onChange={(e) => setFaviconUrl(e.target.value)}
											/>
										</div>
									</div>

									<div>
										<label className="font-semibold text-foreground block mb-1">Apple Touch Icon URL</label>
										<input
											type="url"
											className="w-full p-2 rounded-lg border border-border bg-background font-mono text-xs focus:ring-1 focus:ring-primary focus:outline-none"
											value={appleTouchIcon}
											onChange={(e) => setAppleTouchIcon(e.target.value)}
										/>
									</div>
								</div>
							</div>

							{/* Social Media Toggles */}
							<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
								<h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2">
									Open Graph & Twitter Preview Card
								</h2>

								<div className="space-y-3 text-xs">
									<div>
										<label className="font-semibold text-foreground block mb-1">Social Banner Image URL</label>
										<input
											type="url"
											className="w-full p-2.5 rounded-lg border border-border bg-background font-mono focus:ring-1 focus:ring-primary focus:outline-none"
											value={ogImage}
											onChange={(e) => {
												setOgImage(e.target.value);
												setTwitterImage(e.target.value);
											}}
										/>
									</div>

									<div className="grid grid-cols-2 gap-3">
										<div>
											<label className="font-semibold text-foreground block mb-1">Twitter Creator Handle</label>
											<input
												type="text"
												className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
												value={twitterHandle}
												onChange={(e) => setTwitterHandle(e.target.value)}
												placeholder="@username"
											/>
										</div>
										<div>
											<label className="font-semibold text-foreground block mb-1">Twitter Card Style</label>
											<select
												aria-label="Twitter card layout"
												value={twitterCard}
												onChange={(e) => setTwitterCard(e.target.value)}
												className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none cursor-pointer"
											>
												<option value="summary_large_image">Summary with Large Image</option>
												<option value="summary">Small Square Summary</option>
											</select>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Right: Live Social Previews & Tag Output */}
						<div className="lg:col-span-6 space-y-6">
							{/* Social Card Preview */}
							<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
								<div className="flex justify-between items-center pb-2 border-b border-border/50">
									<h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
										<Eye className="w-4 h-4 text-primary" />
										Live Social Card
									</h2>

									{/* Platform switcher */}
									<div className="flex border border-border rounded-lg overflow-hidden bg-background text-xs">
										<button
											onClick={() => setPreviewTab('facebook')}
											className={`px-3 py-1 font-semibold transition cursor-pointer ${
												previewTab === 'facebook'
													? 'bg-primary text-primary-foreground'
													: 'text-muted-foreground hover:bg-secondary'
											}`}
										>
											Facebook
										</button>
										<button
											onClick={() => setPreviewTab('twitter')}
											className={`px-3 py-1 font-semibold transition cursor-pointer ${
												previewTab === 'twitter'
													? 'bg-primary text-primary-foreground'
													: 'text-muted-foreground hover:bg-secondary'
											}`}
										>
											Twitter / X
										</button>
										<button
											onClick={() => setPreviewTab('discord')}
											className={`px-3 py-1 font-semibold transition cursor-pointer ${
												previewTab === 'discord'
													? 'bg-primary text-primary-foreground'
													: 'text-muted-foreground hover:bg-secondary'
											}`}
										>
											Discord
										</button>
									</div>
								</div>

								{/* FACEBOOK CARD */}
								{previewTab === 'facebook' && (
									<div className="border border-border rounded-xl overflow-hidden bg-background shadow-xs">
										<div className="w-full aspect-1.91/1 bg-muted flex items-center justify-center overflow-hidden">
											<img
												src={activeImage}
												alt="OG Preview"
												className="w-full h-full object-cover"
											/>
										</div>
										<div className="p-3 bg-card/70 border-t border-border/50 space-y-1">
											<div className="text-[10px] uppercase font-mono text-muted-foreground tracking-wider">
												{domainName}
											</div>
											<div className="font-bold text-sm text-foreground leading-snug line-clamp-1">
												{activeTitle}
											</div>
											<div className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
												{activeDesc}
											</div>
										</div>
									</div>
								)}

								{/* TWITTER CARD */}
								{previewTab === 'twitter' && (
									<div className="border border-border rounded-2xl overflow-hidden bg-black text-white shadow-xs max-w-md mx-auto">
										<div className="w-full aspect-1.91/1 bg-zinc-900 relative overflow-hidden">
											<img
												src={activeImage}
												alt="Twitter Preview"
												className="w-full h-full object-cover"
											/>
											<div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs text-[10px] font-mono text-zinc-300">
												{domainName}
											</div>
										</div>
										<div className="p-3 space-y-1">
											<div className="font-semibold text-xs text-zinc-100 line-clamp-1">
												{activeTitle}
											</div>
											<div className="text-[11px] text-zinc-400 line-clamp-2">
												{activeDesc}
											</div>
										</div>
									</div>
								)}

								{/* DISCORD CARD */}
								{previewTab === 'discord' && (
									<div className="p-4 rounded-xl bg-[#2b2d31] text-zinc-200 text-xs shadow-md border-l-4" style={{ borderColor: themeColor }}>
										<div className="text-[11px] text-zinc-400 font-medium mb-1">{domainName}</div>
										<div className="font-bold text-sm text-[#00a8fc] hover:underline cursor-pointer mb-1">
											{activeTitle}
										</div>
										<div className="text-zinc-300 mb-3 leading-relaxed">
											{activeDesc}
										</div>
										<div className="rounded-lg overflow-hidden max-w-sm max-h-48 border border-white/5">
											<img src={activeImage} alt="Discord embed preview" className="w-full h-full object-cover" />
										</div>
									</div>
								)}
							</div>

							{/* Generated Code Output */}
							<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
								<div className="flex justify-between items-center pb-2 border-b border-border/50">
									<h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
										Generated HTML Tags
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
													<span>Copy Code</span>
												</>
											)}
										</button>

										<button
											onClick={handleDownload}
											className="p-1.5 rounded-lg bg-background border border-border hover:bg-secondary text-foreground text-xs flex items-center gap-1 font-medium transition cursor-pointer"
										>
											<Download className="w-3.5 h-3.5" />
											<span>Download</span>
										</button>
									</div>
								</div>

								<pre className="w-full h-48 p-4 rounded-xl border border-border bg-background/60 font-mono text-[11px] overflow-auto select-all whitespace-pre shadow-inner">
									{fullMetaOutput}
								</pre>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
