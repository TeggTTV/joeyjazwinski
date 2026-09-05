import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { motion, AnimatePresence } from 'framer-motion';
import {
	ExternalLink,
	Github,
	Code2,
	X,
	Layers,
	ArrowUpRight,
	Sparkles,
	Gamepad2,
	Globe,
	Terminal,
	CheckCircle2,
} from 'lucide-react';
import { seoProjects } from '@/lib/seoConfig';

interface Project {
	id: string;
	title: string;
	tagline: string;
	description: string;
	year: string;
	category: 'Web Applications' | 'Game Engineering' | 'Developer Ecosystem';
	thumbnail: string;
	link: string;
	github?: string;
	tags: string[];
	metrics?: { label: string; value: string }[];
	highlights: string[];
	gallery: {
		type?: 'image';
		src: string;
		alt?: string;
	}[];
}

const PROJECTS: Project[] = [
	{
		id: 'drag-racing',
		title: 'Drag',
		tagline: 'High-Performance 2D Canvas Drag Racing Game Engine',
		description:
			'A deterministic 2D top-down drag racing game built with custom physics calculations, sound wave synthesis via the Web Audio API, and persistent parts progression.',
		year: '2026',
		category: 'Game Engineering',
		thumbnail: '/images/drag/1.png',
		link: 'https://drag-racing.vercel.app',
		github: 'https://github.com/TeggTTV/drag-racing',
		tags: ['TypeScript', 'React', 'HTML5 Canvas', 'Web Audio API'],
		metrics: [
			{ label: 'Frame Rate', value: '60 FPS' },
			{ label: 'Audio Engine', value: 'Web Audio' },
			{ label: 'State Sync', value: 'Real-Time' },
		],
		highlights: [
			'Custom physics model simulating gear ratios, RPM curve, tire friction, and drag resistance.',
			'Dynamic junkyard marketplace with interactive vehicle tuning and persistent upgrade inventory.',
			'Zero external canvas dependencies for maximum bundle efficiency and instantaneous load times.',
		],
		gallery: [
			{
				src: '/images/drag/1.png',
				alt: 'Main Race Menu & Car Selection',
			},
			{
				src: '/images/drag/2.png',
				alt: 'Real-Time Shift HUD and Race Track',
			},
			{
				src: '/images/drag/3.png',
				alt: 'Junkyard Scraping & Parts Marketplace',
			},
			{
				src: '/images/drag/4.png',
				alt: 'Vehicle Inventory & Engine Tuner',
			},
		],
	},
	{
		id: 'adelphi-ai',
		title: 'Adelphi AI Society',
		tagline: 'Institutional Hub for AI Research & University Community',
		description:
			'Official web presence for the Adelphi AI Society, engineered with responsive components, accessible typography, project showreels, and event distribution systems.',
		year: '2026',
		category: 'Web Applications',
		thumbnail: '/images/adelphiaisociety/1.png',
		link: 'https://adelphiaisociety.vercel.app',
		github: 'https://github.com/TeggTTV/adelphiaiclub',
		tags: ['Next.js', 'React', 'TypeScript', 'TailwindCSS'],
		metrics: [
			{ label: 'Lighthouse Score', value: '98/100' },
			{ label: 'Target Audience', value: 'Collegiate AI' },
			{ label: 'Deploy Target', value: 'Vercel Edge' },
		],
		highlights: [
			'Engineered clean university-grade aesthetics prioritizing readability and accessible contrast ratios.',
			'Structured event schedule pipeline and member portfolio index with fluid micro-interactions.',
			'Optimized static generation for instant asset retrieval across desktop and mobile devices.',
		],
		gallery: [
			{
				src: '/images/adelphiaisociety/1.png',
				alt: 'Adelphi AI Society Landing Hero',
			},
			{ src: '/images/adelphiaisociety/2.png', alt: 'Member Showcase' },
			{
				src: '/images/adelphiaisociety/3.png',
				alt: 'AI Workshops & Events',
			},
			{
				src: '/images/adelphiaisociety/4.png',
				alt: 'Frequently Asked Questions',
			},
		],
	},
	{
		id: 'resellz-saas',
		title: 'Resellz',
		tagline: 'Arbitrage Data Modeling & Reseller Margin Analysis',
		description:
			'Analytics software platform designed to optimize inventory turnover and margins for secondary marketplace vendors using real-time market data evaluation.',
		year: '2025',
		category: 'Web Applications',
		thumbnail: '/images/resellz/1.png',
		link: 'https://resellz.vercel.app',
		github: 'https://github.com/TeggTTV/resellz',
		tags: ['React', 'TypeScript', 'TailwindCSS', 'REST APIs'],
		metrics: [
			{ label: 'Architecture', value: 'SaaS Platform' },
			{ label: 'Data Model', value: 'Market Analysis' },
			{ label: 'Client Stack', value: 'React + TS' },
		],
		highlights: [
			'Data visualization pipelines depicting profit margins, market liquidity, and inventory turn velocity.',
			'Modular dashboard layout engineered with double-bezel card enclosures and dark-mode contrast.',
			'Live search and filter metrics enabling rapid identification of high-spread merchandise.',
		],
		gallery: [
			{
				src: '/images/resellz/1.png',
				alt: 'Resellz Analytics Dashboard',
			},
			{ src: '/images/resellz/2.png', alt: 'Product Valuation Metrics' },
			{
				src: '/images/resellz/3.png',
				alt: 'Customer Proof & Case Studies',
			},
		],
	},
	{
		id: 'saas-system-landing',
		title: 'Enterprise SaaS Engine',
		tagline: 'Conversion-Engineered Design System & Marketing Architecture',
		description:
			'A high-conversion corporate software platform landing page featuring interactive pricing matrices, client testimonials, and product capability demonstrations.',
		year: '2025',
		category: 'Web Applications',
		thumbnail: '/images/saaslandingtd/1.png',
		link: 'https://saaslandingtd.vercel.app',
		github: 'https://github.com/TeggTTV/saas-landing',
		tags: ['React', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
		metrics: [
			{ label: 'Design System', value: 'Modular' },
			{ label: 'Components', value: '24+ UI Blocks' },
			{ label: 'Conversion', value: 'Optimized' },
		],
		highlights: [
			'Interactive pricing model with annual/monthly billing toggles and feature entitlement checklists.',
			'Fluid scroll choreography and feature bento grids highlighting core product capabilities.',
			'Fully responsive multi-breakpoint layout matching agency-grade design standards.',
		],
		gallery: [
			{ src: '/images/saaslandingtd/1.png', alt: 'Platform Hero Banner' },
			{
				src: '/images/saaslandingtd/2.png',
				alt: 'Feature Capabilities Grid',
			},
			{
				src: '/images/saaslandingtd/3.png',
				alt: 'Customer Reviews & Social Proof',
			},
			{
				src: '/images/saaslandingtd/4.png',
				alt: 'Tiered Pricing Matrix',
			},
		],
	},
	{
		id: 'commercial-sales-site',
		title: 'Commerce Platform Portal',
		tagline: 'Modular Business Presentation & Lead Generation Suite',
		description:
			'Modern business showcase architecture built to demonstrate high-end service portfolios, team bios, interactive contact gateways, and service tiers.',
		year: '2025',
		category: 'Web Applications',
		thumbnail: '/images/placeholdersite/1.png',
		link: 'https://placeholdersitetd.vercel.app',
		github: 'https://github.com/TeggTTV/saleswebsite',
		tags: ['React', 'TypeScript', 'TailwindCSS'],
		metrics: [
			{ label: 'Asset Weight', value: '< 180 KB' },
			{ label: 'Layout Grid', value: 'CSS Grid' },
			{ label: 'SEO Schema', value: 'Valid JSON-LD' },
		],
		highlights: [
			'Clean service catalog with interactive hover state elevation and subtle border glow effects.',
			'Integrated form validation workflows for rapid prospective client intake.',
			'Strictly typed TypeScript codebase ensuring predictable state management across views.',
		],
		gallery: [
			{
				src: '/images/placeholdersite/1.png',
				alt: 'Business Hero Landing',
			},
			{
				src: '/images/placeholdersite/2.png',
				alt: 'Service Capabilities',
			},
			{ src: '/images/placeholdersite/3.png', alt: 'Testimonial Slider' },
			{
				src: '/images/placeholdersite/4.png',
				alt: 'Client Contact Form',
			},
		],
	},
];

const CATEGORIES = ['All', 'Web Applications', 'Game Engineering'] as const;

export default function ProjectsPage() {
	const [activeCategory, setActiveCategory] = useState<string>('All');
	const [selectedProject, setSelectedProject] = useState<Project | null>(
		null,
	);
	const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);

	const filteredProjects = PROJECTS.filter((p) => {
		if (activeCategory === 'All') return true;
		return p.category === activeCategory;
	});

	const projectsSchema = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'CollectionPage',
				name: 'Joey Jazwinski Software Projects & Engineering Portfolio',
				description:
					'Discover custom software architectures, game engines, client-side tools, and web platforms engineered by Joey Jazwinski.',
				url: 'https://joeyjazwinski.com/projects',
				author: {
					'@type': 'Person',
					name: 'Joey Jazwinski',
					url: 'https://joeyjazwinski.com/about',
				},
				mainEntity: {
					'@type': 'ItemList',
					itemListElement: PROJECTS.map((project, idx) => ({
						'@type': 'ListItem',
						position: idx + 1,
						name: project.title,
						description: project.description,
						url: project.link,
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
						name: 'Projects',
						item: 'https://joeyjazwinski.com/projects',
					},
				],
			},
		],
	};

	return (
		<>
			<NextSeo {...seoProjects} />
			<Head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(projectsSchema),
					}}
				/>
			</Head>

			<main className="min-h-dvh bg-background text-foreground pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
				{/* Background Architectural Ambient Grid */}
				<div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
					<div className="absolute top-0 left-1/2 -translate-x-1/2 w-240 h-96 bg-primary/6 rounded-full blur-3xl" />
					<div className="absolute top-1/3 -right-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
					<div className="absolute bottom-10 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
				</div>

				<div className="max-w-6xl mx-auto relative z-10 space-y-16">
					{/* Editorial Header Section */}
					<header className="space-y-6 max-w-3xl">
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono uppercase tracking-widest text-primary">
							<Code2 className="w-3.5 h-3.5 text-primary" />
							<span>
								Engineering Archive &bull; {PROJECTS.length}{' '}
								Selected Works
							</span>
						</div>

						<h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.08] text-foreground">
							Crafted systems, canvas engines, and web
							architectures.
						</h1>

						<p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
							A curated chronicle of deployed software products.
							Built with focus on deterministic performance, clean
							API boundaries, and responsive interfaces.
						</p>

						{/* Segmented Filter Pills */}
						<div className="pt-2 flex flex-wrap items-center gap-2">
							{CATEGORIES.map((cat) => {
								const isActive = activeCategory === cat;
								return (
									<button
										key={cat}
										onClick={() => setActiveCategory(cat)}
										className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
											isActive
												? 'bg-primary text-primary-foreground shadow-sm shadow-primary/25 ring-1 ring-primary'
												: 'bg-card/70 hover:bg-card text-muted-foreground hover:text-foreground border border-border/70 hover:border-border'
										}`}
									>
										{cat}
									</button>
								);
							})}
						</div>
					</header>

					{/* Projects Showcase Grid */}
					<section className="space-y-10">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{filteredProjects.map((project, idx) => (
								<motion.article
									key={project.id}
									initial={{ opacity: 0, y: 24 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.5,
										delay: Math.min(idx * 0.08, 0.3),
										ease: [0.16, 1, 0.3, 1],
									}}
									onClick={() => {
										setSelectedProject(project);
										setSelectedGalleryIndex(0);
									}}
									className="group cursor-pointer p-1.5 rounded-3xl bg-black/3 dark:bg-white/3 border border-black/8 dark:border-white/10 hover:border-primary/40 dark:hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
								>
									<div className="rounded-[calc(1.5rem-0.375rem)] bg-card/90 overflow-hidden flex flex-col h-full border border-white/5">
										{/* Media Preview Container */}
										<div className="relative aspect-16/10 overflow-hidden bg-muted/40">
											<Image
												src={project.thumbnail}
												alt={project.title}
												fill
												sizes="(max-width: 768px) 100vw, 50vw"
												className="object-cover object-top group-hover:scale-103 transition-transform duration-500 ease-out"
											/>

											{/* Subtle Dark Gradient Scrim on Bottom */}
											<div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

											{/* Top Badges */}
											<div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
												<span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold bg-background/85 dark:bg-zinc-900/85 backdrop-blur-md text-foreground border border-white/15 shadow-xs">
													{project.year}
												</span>
												<span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold bg-primary/90 text-primary-foreground backdrop-blur-md shadow-xs flex items-center gap-1">
													<span>Inspect</span>
													<ArrowUpRight className="w-3.5 h-3.5" />
												</span>
											</div>
										</div>

										{/* Content Body */}
										<div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
											<div className="space-y-2.5">
												<div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-wider">
													{project.category ===
													'Game Engineering' ? (
														<Gamepad2 className="w-3.5 h-3.5 text-primary" />
													) : (
														<Globe className="w-3.5 h-3.5 text-primary" />
													)}
													<span>
														{project.category}
													</span>
												</div>

												<h2 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
													{project.title}
												</h2>

												<p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
													{project.tagline}
												</p>
											</div>

											{/* Tech Tag Pills */}
											<div className="pt-2 border-t border-border/50 flex flex-wrap items-center gap-1.5">
												{project.tags.map((tag) => (
													<span
														key={tag}
														className="px-2.5 py-1 rounded-md text-[11px] font-mono text-muted-foreground bg-muted/60 border border-border/40"
													>
														{tag}
													</span>
												))}
											</div>
										</div>
									</div>
								</motion.article>
							))}
						</div>
					</section>

					{/* Technical Engineering Paradigms (Content Architecture) */}
					<section className="p-8 sm:p-10 rounded-3xl bg-card/60 border border-border/70 backdrop-blur-md space-y-6">
						<div className="space-y-2 max-w-2xl">
							<h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
								Engineering Standards & System Tenets
							</h2>
							<p className="text-sm text-muted-foreground leading-relaxed">
								Every project in this repository is built around
								deterministic principles prioritizing user
								privacy, computational efficiency, and
								maintainable abstractions.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
							<div className="space-y-2 p-5 rounded-2xl bg-muted/30 border border-border/40">
								<h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
									<Terminal className="w-4 h-4 text-primary" />
									Client-First Computation
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Running data conversions, image
									transformations, and game loops locally
									inside browser memory with zero tracking and
									near-instant feedback.
								</p>
							</div>

							<div className="space-y-2 p-5 rounded-2xl bg-muted/30 border border-border/40">
								<h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
									<Layers className="w-4 h-4 text-primary" />
									Deterministic Architecture
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Strict TypeScript interfaces, Prisma ORM
									schemas, and reproducible state containers
									that reduce regression surface area.
								</p>
							</div>

							<div className="space-y-2 p-5 rounded-2xl bg-muted/30 border border-border/40">
								<h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
									<Sparkles className="w-4 h-4 text-primary" />
									Accessibility & Speed
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Strict semantic markup, WCAG contrast
									compliance, responsive mobile mechanics, and
									optimized asset delivery for sub-second
									renders.
								</p>
							</div>
						</div>
					</section>

					{/* Collaborative Inquiry Strip */}
					<section className="p-8 sm:p-12 rounded-3xl bg-linear-to-r from-card to-card/80 border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
						<div className="space-y-1.5 max-w-xl">
							<h2 className="text-2xl font-bold tracking-tight text-foreground">
								Have a project or architectural challenge in
								mind?
							</h2>
							<p className="text-sm text-muted-foreground leading-relaxed">
								Whether you need a custom web application,
								automated data pipelines, or a high-speed
								utility, let&apos;s build something exceptional.
							</p>
						</div>

						<Link
							href="/contact"
							className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md shadow-primary/25 hover:bg-primary/90 transition-all cursor-pointer shrink-0"
						>
							<span>Start a Conversation</span>
							<ArrowUpRight className="w-4 h-4" />
						</Link>
					</section>
				</div>

				{/* Detailed Project Inspection Drawer */}
				<AnimatePresence>
					{selectedProject && (
						<>
							{/* Backdrop Blur */}
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.2 }}
								className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
								onClick={() => setSelectedProject(null)}
							/>

							{/* Right-Hand Drawer */}
							<motion.aside
								initial={{ x: '100%' }}
								animate={{ x: 0 }}
								exit={{ x: '100%' }}
								transition={{
									type: 'spring',
									damping: 32,
									stiffness: 320,
								}}
								className="fixed right-0 top-0 h-full w-full max-w-2xl bg-card border-l border-border shadow-2xl z-50 overflow-y-auto flex flex-col justify-between"
							>
								<div className="p-6 sm:p-8 space-y-8">
									{/* Drawer Navigation Bar */}
									<div className="flex items-center justify-between pb-4 border-b border-border/50">
										<div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-wider">
											<span>
												{selectedProject.category}
											</span>
											<span>&bull;</span>
											<span>{selectedProject.year}</span>
										</div>

										<button
											onClick={() =>
												setSelectedProject(null)
											}
											aria-label="Close modal"
											className="p-2 rounded-xl bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer"
										>
											<X className="w-5 h-5" />
										</button>
									</div>

									{/* Project Header */}
									<div className="space-y-3">
										<h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
											{selectedProject.title}
										</h2>
										<p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
											{selectedProject.description}
										</p>
									</div>

									{/* Action Links */}
									<div className="flex flex-wrap items-center gap-3">
										<a
											href={selectedProject.link}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold shadow-sm hover:bg-primary/90 transition-all cursor-pointer"
										>
											<span>Visit Production</span>
											<ExternalLink className="w-3.5 h-3.5" />
										</a>

										{selectedProject.github && (
											<a
												href={selectedProject.github}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-muted/80 hover:bg-muted text-foreground border border-border/70 text-xs font-semibold transition-all cursor-pointer"
											>
												<Github className="w-3.5 h-3.5" />
												<span>Source Code</span>
											</a>
										)}
									</div>

									{/* Metrics Display */}
									{selectedProject.metrics && (
										<div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-muted/30 border border-border/40">
											{selectedProject.metrics.map(
												(m) => (
													<div
														key={m.label}
														className="space-y-0.5"
													>
														<div className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider">
															{m.label}
														</div>
														<div className="text-xs sm:text-sm font-bold text-foreground">
															{m.value}
														</div>
													</div>
												),
											)}
										</div>
									)}

									{/* Architectural Highlights */}
									<div className="space-y-3">
										<h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
											Key Highlights & Technical Scope
										</h3>
										<ul className="space-y-2.5">
											{selectedProject.highlights.map(
												(h, i) => (
													<li
														key={i}
														className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2.5 leading-relaxed"
													>
														<CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
														<span>{h}</span>
													</li>
												),
											)}
										</ul>
									</div>

									{/* Media Gallery */}
									<div className="space-y-3">
										<h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
											Interface Previews
										</h3>

										{/* Main Photo */}
										<div className="relative aspect-video rounded-2xl overflow-hidden bg-muted/50 border border-border/50">
											<Image
												src={
													selectedProject.gallery[
														selectedGalleryIndex
													].src
												}
												alt={
													selectedProject.gallery[
														selectedGalleryIndex
													].alt ||
													selectedProject.title
												}
												fill
												className="object-cover"
											/>
										</div>

										{/* Thumbnails */}
										<div className="grid grid-cols-4 gap-2 pt-1">
											{selectedProject.gallery.map(
												(g, idx) => (
													<button
														key={idx}
														onClick={() =>
															setSelectedGalleryIndex(
																idx,
															)
														}
														className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
															selectedGalleryIndex ===
															idx
																? 'border-primary ring-2 ring-primary/20'
																: 'border-border/60 opacity-60 hover:opacity-100'
														}`}
													>
														<Image
															src={g.src}
															alt={
																g.alt ||
																`Thumb ${idx + 1}`
															}
															fill
															className="object-cover"
														/>
													</button>
												),
											)}
										</div>
									</div>

									{/* Stack Tags */}
									<div className="space-y-2">
										<h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
											Technologies Used
										</h3>
										<div className="flex flex-wrap gap-1.5">
											{selectedProject.tags.map((tag) => (
												<span
													key={tag}
													className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-muted/70 border border-border/50 text-muted-foreground"
												>
													{tag}
												</span>
											))}
										</div>
									</div>
								</div>

								{/* Modal Footer */}
								<div className="p-6 bg-muted/20 border-t border-border/40 text-center">
									<button
										onClick={() => setSelectedProject(null)}
										className="w-full py-2.5 rounded-xl bg-card hover:bg-muted text-foreground border border-border/70 text-xs font-semibold transition-all cursor-pointer"
									>
										Done Viewing
									</button>
								</div>
							</motion.aside>
						</>
					)}
				</AnimatePresence>
			</main>
		</>
	);
}
