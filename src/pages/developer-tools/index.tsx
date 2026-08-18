import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import {
	QrCode,
	Shield,
	Braces,
	ArrowLeftRight,
	GitCompare,
	Palette,
	Terminal,
	Search,
	ChevronRight,
	Sparkles,
	Lock,
	FileCode,
	Image as ImageIcon,
	Key,
	Video,
	GitBranch,
	Database,
	Code,
	FileText,
	LayoutGrid,
	Layers,
	Sliders,
	Network,
	Folder,
	FolderOpen,
	Bot,
	Link2,
	ShieldCheck,
	ShieldAlert,
	RefreshCw,
} from 'lucide-react';

interface ToolItem {
	title: string;
	description: string;
	href: string;
	category: 'Security' | 'Formatting' | 'Developer' | 'Design' | 'SEO';
	icon: React.ReactNode;
	badge?: string;
}

export default function ToolsDirectory() {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState('');
	const [activeCategory, setActiveCategory] = useState<string>('All');

	useEffect(() => {
		if (router.isReady) {
			const categoryParam = router.query.category;
			if (categoryParam && typeof categoryParam === 'string') {
				setActiveCategory(categoryParam);
			}
		}
	}, [router.isReady, router.query.category]);

	const handleCategoryChange = (category: string) => {
		setActiveCategory(category);
		router.push(
			{
				pathname: router.pathname,
				query: { ...router.query, category },
			},
			undefined,
			{ shallow: true }
		);
	};

	const tools: ToolItem[] = [
		{
			title: 'QR Code Generator',
			description:
				'Create high-resolution QR codes dynamically. Supports size parameters and foreground/background colors.',
			href: '/developer-tools/qrcode-generator',
			category: 'Design',
			icon: <QrCode className="w-6 h-6 text-indigo-500" />,
		},
		{
			title: 'Password Generator',
			description:
				'Generate secure passwords matching character rules, symbol pools, length metrics, and crack time estimates.',
			href: '/developer-tools/password-generator',
			category: 'Security',
			icon: <Shield className="w-6 h-6 text-emerald-500" />,
			badge: 'Popular',
		},
		{
			title: 'JSON Formatter & Validator',
			description:
				'Beautify, inspect, validate syntax errors, and minify raw JSON payloads with formatting settings.',
			href: '/developer-tools/json-formatter',
			category: 'Formatting',
			icon: <Braces className="w-6 h-6 text-purple-500" />,
		},
		{
			title: 'Base64 & URL Encoder',
			description:
				'Convert text strings to Base64 or URL-encoded formats, and decode them back client-side.',
			href: '/developer-tools/encoder-decoder',
			category: 'Developer',
			icon: <ArrowLeftRight className="w-6 h-6 text-blue-500" />,
		},
		{
			title: 'Text Diff Checker',
			description:
				'Compare two blocks of code or text side-by-side to highlight line additions, updates, and removals.',
			href: '/developer-tools/diff-checker',
			category: 'Developer',
			icon: <GitCompare className="w-6 h-6 text-rose-500" />,
		},
		{
			title: 'WCAG Contrast Checker',
			description:
				'Input foreground and background colors to verify contrast ratio compliance with AA and AAA standards.',
			href: '/developer-tools/contrast-checker',
			category: 'Design',
			icon: <Palette className="w-6 h-6 text-cyan-500" />,
		},
		{
			title: 'RegEx Tester',
			description:
				'Test regular expressions against strings with match visualizations, flag switches, and group listings.',
			href: '/developer-tools/regex-tester',
			category: 'Developer',
			icon: <Terminal className="w-6 h-6 text-amber-500" />,
		},
		{
			title: 'JWT Debugger',
			description:
				'Decode and inspect JSON Web Tokens locally. Review payload data, algorithms, and key expiration dates.',
			href: '/developer-tools/jwt-debugger',
			category: 'Developer',
			icon: <Key className="w-6 h-6 text-sky-500" />,
		},
		{
			title: 'Code Sandbox',
			description:
				'Write HTML and CSS in real-time to inspect live rendering and edit styles on the fly.',
			href: '/developer-tools/code-sandbox',
			category: 'Developer',
			icon: <Terminal className="w-6 h-6 text-indigo-500" />,
		},
		{
			title: 'Hash & HMAC Generator',
			description:
				'Generate SHA-1, SHA-256, and SHA-512 hashes or HMAC signatures with custom keys locally.',
			href: '/developer-tools/hash-generator',
			category: 'Security',
			icon: <Lock className="w-6 h-6 text-rose-500" />,
		},
		{
			title: 'SVG Optimizer & Exporter',
			description:
				'Clean up vector XML data by dropping useless metadata, view rendering preview, and export to PNG.',
			href: '/developer-tools/svg-optimizer',
			category: 'Design',
			icon: <FileCode className="w-6 h-6 text-teal-500" />,
		},
		{
			title: 'Image Compressor',
			description:
				'Resize and optimize images completely client-side using adjustable quality sliders and width bounds.',
			href: '/developer-tools/image-compressor',
			category: 'Design',
			icon: <ImageIcon className="w-6 h-6 text-emerald-500" />,
		},
		{
			title: 'GIF Generator',
			description:
				'Convert local MP4, WebM, or OGG videos into animated GIFs entirely in your browser with size and frame rate customization.',
			href: '/developer-tools/gif-generator',
			category: 'Design',
			icon: <Video className="w-6 h-6 text-indigo-500" />,
			badge: 'New',
		},
		{
			title: 'JSON to Zod & TS',
			description:
				'Paste raw JSON to generate TypeScript interfaces and Zod validation schemas client-side.',
			href: '/developer-tools/json-to-zod-ts',
			category: 'Developer',
			icon: <Braces className="w-6 h-6 text-purple-400" />,
		},
		{
			title: 'Git Scenario Builder',
			description:
				'Select Git workflows and customize branch/commit settings to output ready-to-use terminal commands.',
			href: '/developer-tools/git-command-builder',
			category: 'Developer',
			icon: <GitBranch className="w-6 h-6 text-emerald-400" />,
		},
		{
			title: 'PEM to JWK Converter',
			description:
				'Convert PEM public/private keys to JSON Web Key (JWK) configurations fully client-side.',
			href: '/developer-tools/pem-jwk-converter',
			category: 'Developer',
			icon: <Key className="w-6 h-6 text-amber-400" />,
		},
		{
			title: 'cURL Command Converter',
			description:
				'Convert raw CLI cURL request syntaxes into JavaScript Fetch or Axios functions.',
			href: '/developer-tools/curl-converter',
			category: 'Developer',
			icon: <Terminal className="w-6 h-6 text-blue-400" />,
		},
		{
			title: 'MongoDB URI Builder',
			description:
				'Visually construct database connection strings by entering hosts, credentials, and parameters.',
			href: '/developer-tools/mongodb-uri-builder',
			category: 'Developer',
			icon: <Database className="w-6 h-6 text-teal-400" />,
		},
		{
			title: 'Client Header Inspector',
			description:
				'View User Agent strings, viewport measurements, screen resolution, and incoming request headers.',
			href: '/developer-tools/user-agent-inspector',
			category: 'Developer',
			icon: <Search className="w-6 h-6 text-orange-400" />,
		},
		{
			title: 'Cron Pattern Visualizer',
			description:
				'Translate cron expressions into human-readable descriptions and visualize scheduler runtimes.',
			href: '/developer-tools/cron-visualizer',
			category: 'Developer',
			icon: <Sliders className="w-6 h-6 text-pink-400" />,
		},
		{
			title: 'SQL to Prisma schema',
			description:
				'Convert raw SQL CREATE TABLE statements into Prisma schema model declarations.',
			href: '/developer-tools/sql-to-prisma',
			category: 'Formatting',
			icon: <Database className="w-6 h-6 text-indigo-400" />,
		},
		{
			title: 'JSON to SQL inserts',
			description:
				'Instantly format raw JSON arrays or tables into SQL INSERT statements.',
			href: '/developer-tools/json-to-sql-insert',
			category: 'Formatting',
			icon: <Code className="w-6 h-6 text-cyan-400" />,
		},
		{
			title: 'CSV to Markdown table',
			description:
				'Convert Excel or comma-separated lists into clean, readable Markdown layout tables.',
			href: '/developer-tools/csv-to-markdown',
			category: 'Formatting',
			icon: <FileText className="w-6 h-6 text-rose-400" />,
		},
		{
			title: 'Tailwind Config Maker',
			description:
				'Generate custom tailwind.config.js theme extension blocks by selecting primary colors, fonts, and breakpoints.',
			href: '/developer-tools/tailwind-config-generator',
			category: 'Design',
			icon: <Palette className="w-6 h-6 text-violet-400" />,
		},
		{
			title: 'SVG to React Component',
			description:
				'Paste vector SVG markup to generate ready-to-use React functional component code.',
			href: '/developer-tools/svg-to-react-icon',
			category: 'Design',
			icon: <FileCode className="w-6 h-6 text-emerald-400" />,
		},
		{
			title: 'Glassmorphism Style CSS',
			description:
				'Design glassmorphic elements by adjusting opacity, backdrop-blur, and borders to export custom CSS.',
			href: '/developer-tools/glassmorphism-generator',
			category: 'Design',
			icon: <Layers className="w-6 h-6 text-rose-400" />,
		},
		{
			title: 'CSS Grid Layouts',
			description:
				'Define grid rows, columns, and gaps visually to generate and copy layout CSS rules.',
			href: '/developer-tools/css-grid-generator',
			category: 'Design',
			icon: <LayoutGrid className="w-6 h-6 text-sky-400" />,
		},
		{
			title: 'SVG Shape Path Morphing',
			description:
				'Animate and preview transitions between two sets of custom SVG path geometries.',
			href: '/developer-tools/svg-path-morph',
			category: 'Design',
			icon: <Sliders className="w-6 h-6 text-purple-400" />,
		},
		{
			title: 'Bezier Timing Curve',
			description:
				'Create and compare custom cubic-bezier curves for CSS transition-timing animations.',
			href: '/developer-tools/bezier-curve-visualizer',
			category: 'Design',
			icon: <Network className="w-6 h-6 text-amber-400" />,
		},
		{
			title: 'Text Effects & Shadow CSS',
			description:
				'Design custom text layouts with neon glows, text-shadow, and CSS gradients.',
			href: '/developer-tools/css-text-effects',
			category: 'Design',
			icon: <Palette className="w-6 h-6 text-emerald-400" />,
		},
		{
			title: 'Mock API Responses',
			description:
				'Configure mock HTTP responses with custom status codes, JSON body data, and simulated latency.',
			href: '/developer-tools/mock-api-generator',
			category: 'Security',
			icon: <Shield className="w-6 h-6 text-red-400" />,
		},
		{
			title: 'Content Security Policy (CSP)',
			description:
				'Build CSP headers by selecting allowed script, style, and media resource origins.',
			href: '/developer-tools/csp-generator',
			category: 'Security',
			icon: <Lock className="w-6 h-6 text-green-400" />,
		},
		{
			title: 'Sitemap Split & Check',
			description:
				'Parse, split, and validate large XML index sitemaps to optimize search crawls.',
			href: '/developer-tools/sitemap-splitter',
			category: 'Security',
			icon: <Search className="w-6 h-6 text-amber-500" />,
		},
		{
			title: 'Robots.txt Generator',
			description:
				'Generate robots.txt parameters by defining allow/disallow paths, crawlers, and sitemap locations.',
			href: '/developer-tools/robots-generator',
			category: 'SEO',
			icon: <Bot className="w-6 h-6 text-indigo-500" />,
		},
		{
			title: 'XML Sitemap Generator',
			description:
				'Add page URLs, last modified dates, crawl priorities, and frequencies to compile XML sitemaps.',
			href: '/developer-tools/sitemap-generator',
			category: 'SEO',
			icon: <FileCode className="w-6 h-6 text-emerald-500" />,
		},
		{
			title: 'Meta Tag Generator',
			description:
				'Build website header tags by filling in title, description, OpenGraph, and Twitter Card details.',
			href: '/developer-tools/meta-tag-generator',
			category: 'SEO',
			icon: <Sparkles className="w-6 h-6 text-rose-500" />,
		},
		{
			title: 'JSON-LD Schema Generator',
			description:
				'Generate FAQ, Local Business, or Article JSON-LD structured schemas by filling out form inputs.',
			href: '/developer-tools/schema-generator',
			category: 'SEO',
			icon: <Database className="w-6 h-6 text-violet-500" />,
		},
		{
			title: 'URL Slug Generator',
			description:
				'Convert text strings to clean URL slugs by removing stopwords, adjusting casing, and replacing spaces.',
			href: '/developer-tools/url-slug-generator',
			category: 'SEO',
			icon: <Link2 className="w-6 h-6 text-cyan-500" />,
		},
		{
			title: 'Redirect Rules Generator',
			description:
				'Create 301 and 302 redirect rules for Nginx, Apache (.htaccess), Next.js, and IIS.',
			href: '/developer-tools/redirect-rules',
			category: 'SEO',
			icon: <RefreshCw className="w-6 h-6 text-orange-500" />,
		},
		{
			title: 'HTML Head SEO Analyzer',
			description:
				'Paste page markup to audit indexing elements like title length warnings, meta tags, and OpenGraph parameters.',
			href: '/developer-tools/html-head-analyzer',
			category: 'SEO',
			icon: <ShieldCheck className="w-6 h-6 text-teal-500" />,
		},
		{
			title: 'Keyword Density Analyzer',
			description:
				'Paste copy to analyze word count, reading duration, and term densities with stopwords filter controls.',
			href: '/developer-tools/keyword-density',
			category: 'SEO',
			icon: <Sparkles className="w-6 h-6 text-amber-500" />,
		},
		{
			title: 'SERP Snippet Preview',
			description:
				'Preview how titles, meta descriptions, and URL structures render in Google desktop and mobile search views.',
			href: '/developer-tools/serp-preview',
			category: 'SEO',
			icon: <Search className="w-6 h-6 text-blue-500" />,
		},
		{
			title: 'Canonical Tag Generator',
			description:
				'Standardize routes by stripping search parameters and trailing slashes to generate canonical link tags.',
			href: '/developer-tools/canonical-generator',
			category: 'SEO',
			icon: <ShieldAlert className="w-6 h-6 text-rose-500" />,
		},
	];
	const categories = [
		'All',
		'Formatting',
		'Security',
		'Developer',
		'Design',
		'SEO',
	];

	const sortedTools = [...tools].sort((a, b) => a.title.localeCompare(b.title));

	const filteredTools = sortedTools.filter((tool) => {
		const matchesSearch =
			tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			tool.description.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesCategory =
			activeCategory === 'All' || tool.category === activeCategory;
		return matchesSearch && matchesCategory;
	});

	return (
		<>
			<NextSeo
				title="Developer & Designer Toolbox - Joey Jazwinski"
				description="Access useful utilities for developers and designers including formatters, contrast checkers, generators, and diff tools."
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-6xl mx-auto space-y-10">
					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Sparkles className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
							Developer & Designer Tools
						</h1>
						<p className="text-muted-foreground text-lg">
							A suite of simple, robust, and client-side utilities
							to accelerate your daily workflow.
						</p>
					</div>

					{/* Filters */}
					<div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-border/40 pb-6">
						{/* Category Tabs */}
						<div className="flex flex-wrap gap-4 justify-center sm:justify-start pt-4">
							{categories.map((cat) => {
								const isActive = activeCategory === cat;
								return (
									<button
										key={cat}
										onClick={() => handleCategoryChange(cat)}
										className={`group relative flex flex-col items-start px-5 py-2.5 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl transition-all duration-350 min-w-31.25 ${
											isActive
												? 'bg-primary/10 border border-primary/40 text-primary shadow-lg shadow-primary/5 translate-y-px'
												: 'bg-card/60 hover:bg-card border border-border/80 hover:border-border text-muted-foreground hover:text-foreground shadow-xs'
										}`}
									>
										{/* Folder top tab tab shape */}
										<div
											className={`absolute -top-2.5 left-0 h-2.5 w-13.75 rounded-t-lg border-t border-l border-r transition-all duration-350 ${
												isActive
													? 'bg-primary/10 border-primary/40'
													: 'bg-card/60 group-hover:bg-card border-border/80 group-hover:border-border'
											}`}
										/>
										<div className="flex items-center gap-2 mt-0.5 relative z-10">
											{isActive ? (
												<FolderOpen className="w-4 h-4 text-primary" />
											) : (
												<Folder className="w-4 h-4 text-muted-foreground/70 group-hover:text-foreground" />
											)}
											<span className="text-xs font-bold uppercase tracking-wider">
												{cat}
											</span>
										</div>
									</button>
								);
							})}
						</div>

						{/* Search Input */}
						<div className="relative w-full sm:w-72">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground/75">
								<Search className="h-4 w-4" />
							</div>
							<input
								type="text"
								placeholder="Search tools..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="block w-full pl-9 pr-4 py-2 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition text-sm"
							/>
						</div>
					</div>

					{/* Tools Grid */}
					{filteredTools.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{filteredTools.map((tool) => (
								<Link
									key={tool.href}
									href={tool.href}
									className="group flex flex-col justify-between p-6 bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 relative overflow-hidden"
								>
									{/* Hover glow background */}
									<div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

									<div className="space-y-4 relative z-10">
										<div className="flex justify-between items-start">
											<div className="p-3 rounded-xl bg-secondary/80 border border-border/50">
												{tool.icon}
											</div>
											<div className="flex gap-2">
												{tool.badge && (
													<span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
														{tool.badge}
													</span>
												)}
												<span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
													{tool.category}
												</span>
											</div>
										</div>

										<div className="space-y-2">
											<h3 className="text-xl font-bold group-hover:text-primary transition-colors">
												{tool.title}
											</h3>
											<p className="text-sm text-muted-foreground line-clamp-3">
												{tool.description}
											</p>
										</div>
									</div>

									<div className="flex items-center gap-1.5 text-xs font-semibold text-primary mt-6 group-hover:translate-x-1 transition-transform relative z-10">
										Open Tool{' '}
										<ChevronRight className="w-4 h-4" />
									</div>
								</Link>
							))}
						</div>
					) : (
						<div className="text-center py-12 text-muted-foreground italic">
							No tools match your active filter. Try resetting or
							searching something else.
						</div>
					)}
					{/* Informational Section for SEO & User Guidance */}
					<div className="bg-card/40 border border-border/60 rounded-2xl p-8 space-y-6 mt-12">
						<h2 className="text-2xl font-bold text-foreground">
							Why Use Our Developer & Designer Toolbox?
						</h2>
						<p className="text-sm text-muted-foreground leading-relaxed">
							When building modern websites and web applications,
							developers and designers often require quick access
							to utility tools. Instead of using untrusted
							third-party websites that collect user data, this
							toolbox operates completely client-side. All
							processing, calculations, and conversions happen
							directly within your web browser, ensuring maximum
							privacy and speed.
						</p>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
							<div className="space-y-2">
								<h3 className="text-base font-semibold text-foreground">
									100% Client-Side Privacy
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Whether you are generating secure passwords,
									optimizing SVG vector designs, encoding
									base64 strings, or debugging JSON Web
									Tokens, none of your sensitive inputs are
									ever transmitted to external servers. Your
									secure passwords and private data tokens
									remain local to your session.
								</p>
							</div>
							<div className="space-y-2">
								<h3 className="text-base font-semibold text-foreground">
									WCAG Accessibility Standards
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									We are committed to helping creators
									construct user-friendly web assets. Our
									accessibility color contrast checker
									calculates exact WCAG contrast ratios in
									real-time. Designing with AA and AAA
									accessibility targets ensures your site
									layout is comfortable for all visitors.
								</p>
							</div>
							<div className="space-y-2">
								<h3 className="text-base font-semibold text-foreground">
									Dynamic Formatters and RegEx
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Avoid syntax bugs with our live JSON
									formatter and RegEx parser. Validate nested
									JSON outputs instantly, or match expressions
									against test string blocks with visual
									highlight markers. Having a live validator
									directly in your navigation workflow
									streamlines development cycles.
								</p>
							</div>
							<div className="space-y-2">
								<h3 className="text-base font-semibold text-foreground">
									Optimized Vector & Raster Media
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Speed up website load times by compressing
									image files or optimizing SVG code layouts
									before exporting. Our tools strip bloated
									metadata generated by editing software like
									Figma or Sketch, compressing files without
									sacrificing visual details.
								</p>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
