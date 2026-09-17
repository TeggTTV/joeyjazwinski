import React, { useState, useEffect, useMemo } from 'react';
import { trackToolsDirectoryView } from '@/lib/analytics';
import Link from 'next/link';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import ToolFaqSection from '@/components/tools/ToolFaqSection';
import { ALL_TOOLS } from '@/config/tools';
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
	Sliders,
	Bot,
	Link2,
	ShieldCheck,
	RefreshCw,
	Flame,
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
	const [toolUsage, setToolUsage] = useState<Record<string, number>>({});

	useEffect(() => {
		let isMounted = true;
		fetch('/api/tools/usage')
			.then((res) => (res.ok ? res.json() : Promise.reject(res)))
			.then((data) => {
				if (isMounted && data && data.usage) {
					setToolUsage(data.usage);
				}
			})
			.catch(() => {
				// Silently fail if usage stats are unavailable
			});
		return () => {
			isMounted = false;
		};
	}, []);

	useEffect(() => {
		if (router.isReady) {
			const categoryParam = router.query.category;
			if (categoryParam && typeof categoryParam === 'string') {
				setActiveCategory(categoryParam);
				trackToolsDirectoryView(categoryParam);
			} else {
				trackToolsDirectoryView('All');
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
			{ shallow: true },
		);
	};

	const TOOL_ICONS: Record<string, React.ReactNode> = {
		'/developer-tools/qrcode-generator': <QrCode className="w-6 h-6 text-indigo-500" />,
		'/developer-tools/password-generator': <Shield className="w-6 h-6 text-emerald-500" />,
		'/developer-tools/word-counter': <FileText className="w-6 h-6 text-indigo-500" />,
		'/developer-tools/json-formatter': <Braces className="w-6 h-6 text-purple-500" />,
		'/developer-tools/encoder-decoder': <ArrowLeftRight className="w-6 h-6 text-blue-500" />,
		'/developer-tools/diff-checker': <GitCompare className="w-6 h-6 text-rose-500" />,
		'/developer-tools/contrast-checker': <Palette className="w-6 h-6 text-cyan-500" />,
		'/developer-tools/regex-tester': <Terminal className="w-6 h-6 text-amber-500" />,
		'/developer-tools/jwt-debugger': <Key className="w-6 h-6 text-sky-500" />,
		'/developer-tools/code-sandbox': <Terminal className="w-6 h-6 text-indigo-500" />,
		'/developer-tools/hash-generator': <Lock className="w-6 h-6 text-rose-500" />,
		'/developer-tools/svg-optimizer': <FileCode className="w-6 h-6 text-teal-500" />,
		'/developer-tools/image-compressor': <ImageIcon className="w-6 h-6 text-emerald-500" />,
		'/developer-tools/gif-generator': <Video className="w-6 h-6 text-indigo-500" />,
		'/developer-tools/json-to-zod-ts': <Braces className="w-6 h-6 text-purple-400" />,
		'/developer-tools/git-command-builder': <GitBranch className="w-6 h-6 text-emerald-400" />,
		'/developer-tools/pem-jwk-converter': <Key className="w-6 h-6 text-amber-400" />,
		'/developer-tools/curl-converter': <Terminal className="w-6 h-6 text-blue-400" />,
		'/developer-tools/mongodb-uri-builder': <Database className="w-6 h-6 text-teal-400" />,
		'/developer-tools/user-agent-inspector': <Search className="w-6 h-6 text-orange-400" />,
		'/developer-tools/cron-visualizer': <Sliders className="w-6 h-6 text-pink-400" />,
		'/developer-tools/sql-to-prisma': <Database className="w-6 h-6 text-indigo-400" />,
		'/developer-tools/json-to-sql-insert': <Code className="w-6 h-6 text-cyan-400" />,
		'/developer-tools/csv-to-markdown': <FileText className="w-6 h-6 text-rose-400" />,
		'/developer-tools/tailwind-config-generator': <Palette className="w-6 h-6 text-violet-400" />,
		'/developer-tools/robots-generator': <Bot className="w-6 h-6 text-indigo-500" />,
		'/developer-tools/sitemap-generator': <FileCode className="w-6 h-6 text-emerald-500" />,
		'/developer-tools/meta-tag-generator': <Sparkles className="w-6 h-6 text-rose-500" />,
		'/developer-tools/schema-generator': <Database className="w-6 h-6 text-violet-500" />,
		'/developer-tools/url-slug-generator': <Link2 className="w-6 h-6 text-cyan-500" />,
		'/developer-tools/redirect-rules': <RefreshCw className="w-6 h-6 text-orange-500" />,
		'/developer-tools/html-head-analyzer': <ShieldCheck className="w-6 h-6 text-teal-500" />,
		'/developer-tools/keyword-density': <Sparkles className="w-6 h-6 text-amber-500" />,
		'/developer-tools/serp-preview': <Search className="w-6 h-6 text-blue-500" />,
	};

	const tools: ToolItem[] = useMemo(() => {
		return ALL_TOOLS.map((t) => ({
			...t,
			icon: TOOL_ICONS[t.href] || <Code className="w-6 h-6 text-primary" />,
		}));
	}, []);

	const categories = [
		'All',
		'Formatting',
		'Security',
		'Developer',
		'Design',
		'SEO',
	];

	const getToolSlug = (href: string) =>
		href.replace('/developer-tools/', '').replace(/\/$/, '');

	const sortedTools = useMemo(() => {
		return [...tools].sort((a, b) => {
			const aUses = toolUsage[getToolSlug(a.href)] || 0;
			const bUses = toolUsage[getToolSlug(b.href)] || 0;
			if (bUses !== aUses) {
				return bUses - aUses;
			}
			return a.title.localeCompare(b.title);
		});
	}, [toolUsage]);

	const filteredTools = useMemo(() => {
		const query = searchQuery.toLowerCase().trim();
		return sortedTools.filter((tool) => {
			const matchesSearch =
				!query ||
				tool.title.toLowerCase().includes(query) ||
				tool.description.toLowerCase().includes(query);
			const matchesCategory =
				activeCategory === 'All' || tool.category === activeCategory;
			return matchesSearch && matchesCategory;
		});
	}, [sortedTools, searchQuery, activeCategory]);

	const directoryTitle =
		'Free Developer & Designer Tools | 35+ Web Utilities - Joey Jazwinski';
	const directoryDesc =
		'A free client-side toolbox of 35+ developer and designer utilities for formatting, SEO, security, accessibility, and everyday workflows.';
	const directoryUrl = 'https://joeyjazwinski.com/developer-tools';

	const directoryFaqs = [
		{
			question: 'Are these developer tools free to use?',
			answer: 'Yes. Every tool in this directory is 100% free with no sign-up or subscription required.',
		},
		{
			question: 'Do the tools run client-side or send data to a server?',
			answer: 'All tools run directly in your browser using client-side JavaScript. Your text, payloads, keys, and files are never sent to a remote server.',
		},
		{
			question: 'Can I use these tools for commercial projects?',
			answer: 'Yes. You can use generated code, schemas, formatted files, and config files across personal and commercial applications.',
		},
		{
			question: 'Do you plan to add more tools over time?',
			answer: 'Yes. New developer utilities and SEO tools are added regularly based on community feedback and modern web engineering needs.',
		},
	];

	const directorySchema = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'CollectionPage',
				name: 'Developer & Designer Tools Directory',
				description: directoryDesc,
				url: directoryUrl,
				author: {
					'@type': 'Person',
					name: 'Joey Jazwinski',
					url: 'https://joeyjazwinski.com/about',
				},
				mainEntity: {
					'@type': 'ItemList',
					itemListElement: tools.map((t, index) => ({
						'@type': 'ListItem',
						position: index + 1,
						name: t.title,
						description: t.description,
						url: `https://joeyjazwinski.com${t.href}`,
					})),
				},
			},
			{
				'@type': 'BreadcrumbList',
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						name: 'Home',
						item: 'https://joeyjazwinski.com',
					},
					{
						'@type': 'ListItem',
						position: 2,
						name: 'Developer Tools',
						item: directoryUrl,
					},
				],
			},
			{
				'@type': 'FAQPage',
				mainEntity: directoryFaqs.map((faq) => ({
					'@type': 'Question',
					name: faq.question,
					acceptedAnswer: {
						'@type': 'Answer',
						text: faq.answer,
					},
				})),
			},
		],
	};

	return (
		<>
			<NextSeo
				title={directoryTitle}
				description={directoryDesc}
				canonical={directoryUrl}
				openGraph={{
					title: directoryTitle,
					description: directoryDesc,
					url: directoryUrl,
					type: 'website',
					images: [
						{
							url: 'https://joeyjazwinski.com/ogimage.png',
							width: 1200,
							height: 630,
							alt: 'Joey Jazwinski Developer & Designer Tools',
						},
					],
				}}
				twitter={{
					handle: '@JoeyJazwinski',
					site: '@JoeyJazwinski',
					cardType: 'summary_large_image',
				}}
			/>
			<Head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(directorySchema),
					}}
				/>
			</Head>
			<main className="bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
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
							A free client-side toolbox of 35+ developer and designer utilities for formatting, SEO, security, accessibility, and everyday workflows.
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
										onClick={() =>
											handleCategoryChange(cat)
										}
										className={`group relative flex flex-col items-start px-5 py-2.5 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl transition-all duration-350 min-w-31.25 ${
											isActive
												? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 translate-y--0.5'
												: 'bg-card text-muted-foreground hover:text-foreground hover:bg-muted/60 border border-border/50'
										}`}
									>
										<span className="text-xs font-bold uppercase tracking-wider">
											{cat}
										</span>
										<span className="text-[10px] opacity-75">
											{cat === 'All'
												? `${tools.length} utilities`
												: `${
														tools.filter(
															(t) =>
																t.category ===
																cat,
														).length
												  } tools`}
										</span>
									</button>
								);
							})}
						</div>

						{/* Search input */}
						<div className="relative w-full sm:w-72">
							<Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
							<input
								type="text"
								placeholder="Search tools..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full pl-9 pr-4 py-2 rounded-xl bg-card border border-border/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
							/>
						</div>
					</div>

					{/* Tool Grid */}
					{filteredTools.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{filteredTools.map((tool) => (
								<Link
									key={tool.href}
									href={tool.href}
									className="group flex flex-col justify-between p-6 bg-card/60 hover:bg-card border border-border/60 hover:border-primary/50 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
								>
									<div className="space-y-4">
										<div className="flex items-start justify-between">
											<div className="p-3 rounded-xl bg-secondary/80 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
												{tool.icon}
											</div>
											{tool.badge && (
												<span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
													{tool.badge}
												</span>
											)}
										</div>
										<div>
											<h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
												<span>{tool.title}</span>
												<ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
											</h3>
											<p className="text-sm text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
												{tool.description}
											</p>
										</div>
									</div>

									<div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground font-medium">
										<span className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground text-[11px]">
											{tool.category}
										</span>
										{toolUsage[getToolSlug(tool.href)] ? (
											<span className="flex items-center gap-1 text-muted-foreground font-mono text-[11px]">
												<Flame className="w-3.5 h-3.5 text-amber-500" />
												<span>
													{toolUsage[
														getToolSlug(tool.href)
													].toLocaleString()}{' '}
													runs
												</span>
											</span>
										) : (
											<span className="text-[11px] text-muted-foreground/60 font-mono">
												Client-Side
											</span>
										)}
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
							When building modern websites and web applications, developers and designers need quick utilities. Instead of using third-party sites that collect your data, this toolbox runs completely client-side. Every calculation, conversion, and validation happens in your browser for privacy and speed.
						</p>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
							<div className="space-y-2">
								<h3 className="text-base font-semibold text-foreground">
									Formatters, Validators & RegEx
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Catch syntax errors quickly with our <Link href="/developer-tools/json-formatter" className="text-primary hover:underline">JSON formatter</Link> and test patterns with our <Link href="/developer-tools/regex-tester" className="text-primary hover:underline">regex tester</Link>. You can inspect, validate, and minify nested structures right in your browser.
								</p>
							</div>
							<div className="space-y-2">
								<h3 className="text-base font-semibold text-foreground">
									WCAG Accessibility & Design
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Check color compliance with our <Link href="/developer-tools/contrast-checker" className="text-primary hover:underline">WCAG contrast checker</Link>. It calculates AA and AAA contrast ratios in real time to keep your interface readable for all users.
								</p>
							</div>
							<div className="space-y-2">
								<h3 className="text-base font-semibold text-foreground">
									SEO & Indexing Automation
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Prepare your site for search crawlers with our <Link href="/developer-tools/sitemap-generator" className="text-primary hover:underline">XML sitemap generator</Link>, create header tags with the <Link href="/developer-tools/meta-tag-generator" className="text-primary hover:underline">meta tag generator</Link>, and configure crawl rules with the <Link href="/developer-tools/robots-generator" className="text-primary hover:underline">robots.txt generator</Link>.
								</p>
							</div>
							<div className="space-y-2">
								<h3 className="text-base font-semibold text-foreground">
									Private Tokens & Security
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Generate secure credentials and inspect tokens locally. Your inputs never touch a server, so your tokens and secrets remain private to your active browser session.
								</p>
							</div>
						</div>

						{/* Internal Link to Blog */}
						<div className="pt-6 border-t border-border/50 text-center sm:text-left">
							<p className="text-sm text-muted-foreground">
								Looking for hands-on tutorials?{' '}
								<Link
									href="/developer-blog"
									className="text-primary font-semibold hover:underline inline-flex items-center gap-1.5"
								>
									<span>Read deep-dive engineering articles that show these tools in real workflows</span>
									<ChevronRight className="w-4 h-4" />
								</Link>
							</p>
						</div>
					</div>

					{/* FAQ Section */}
					<ToolFaqSection faqs={directoryFaqs} title="Frequently Asked Questions" />
				</div>
			</main>
		</>
	);
}
