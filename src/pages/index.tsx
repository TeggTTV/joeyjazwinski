import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
	ArrowRight,
	Aperture,
	Camera,
	Code2,
	Mail,
	MapPin,
	ExternalLink,
	Terminal,
	Github,
	Layers,
	Focus,
} from 'lucide-react';
import { seoHome } from '@/lib/seoConfig';

/* ─── photography data ─── */

const photos = [
	{
		src: '/photography/DSC01845.JPG',
		alt: 'Walking under cherry blossom trees in spring',
		caption: 'Cherry Blossoms',
		detail: 'Spring bloom · natural framing',
	},
	{
		src: '/photography/Still 2026-04-16 211713_1.16.1.jpg',
		alt: 'Portrait at golden hour in front of geometric sculpture',
		caption: 'Golden Hour',
		detail: 'Campus sculpture · golden-hour light',
	},
	{
		src: '/photography/Still 2026-04-14 212114_1.1.1.jpg',
		alt: 'Yellow forsythia flowers behind a guardrail',
		caption: 'Forsythia Light',
		detail: 'Roadside bloom · warm contrast',
	},
];

/* ─── projects data (featured) ─── */

const featuredProjects = [
	{
		title: 'Resellz',
		description:
			'A SaaS providing expert data analysis and recommendations for resellers.',
		thumbnail: '/images/resellz/1.png',
		link: 'https://resellz.vercel.app',
		github: 'https://github.com/TeggTTV/resellz',
		tags: ['React', 'TypeScript', 'TailwindCSS'],
	},
	{
		title: 'Adelphi AI Society',
		description:
			"Website for the Adelphi AI Society — showcasing the org's mission, projects, and events.",
		thumbnail: '/images/adelphiaisociety/1.png',
		link: 'https://adelphiaisociety.vercel.app',
		github: 'https://github.com/TeggTTV/adelphiaiclub',
		tags: ['React', 'TypeScript', 'TailwindCSS'],
	},
	{
		title: 'Drag',
		description:
			'A 2D top-down drag racing game with strategic upgrades and gear-shifting mechanics.',
		thumbnail: '/images/drag/1.png',
		link: 'https://drag-racing.vercel.app',
		github: 'https://github.com/TeggTTV/drag-racing',
		tags: ['React', 'TypeScript', 'JSAudio'],
	},
];

/* ─── principles ─── */

const principles = [
	{
		icon: Terminal,
		label: 'Engineering',
		text: 'Build digital products with intention instead of noise.',
	},
	{
		icon: Focus,
		label: 'Photography',
		text: 'Shoot photographs that feel observed rather than staged.',
	},
	{
		icon: Layers,
		label: 'Overlap',
		text: 'Let engineering discipline and visual taste sharpen each other.',
	},
];

/* ─── component ─── */

const HomePage: React.FC = () => {
	const heroRef = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({
		target: heroRef,
		offset: ['start start', 'end start'],
	});
	const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
	const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

	/* cursor spotlight for gallery */
	const galleryRef = useRef<HTMLElement>(null);
	const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

	/* Typing effect */
	const roles = [
		'Full-stack developer',
		'Photographer',
		'Product builder',
		'Visual storyteller',
	];
	const [roleIndex, setRoleIndex] = useState(0);
	const [charIndex, setCharIndex] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		const currentWord = roles[roleIndex];
		const speed = isDeleting ? 40 : 70;

		if (!isDeleting && charIndex === currentWord.length) {
			// Pause at end of word
			const timeout = setTimeout(() => setIsDeleting(true), 2000);
			return () => clearTimeout(timeout);
		}

		if (isDeleting && charIndex === 0) {
			setIsDeleting(false);
			setRoleIndex((prev) => (prev + 1) % roles.length);
			return;
		}

		const timeout = setTimeout(() => {
			setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
		}, speed);
		return () => clearTimeout(timeout);
	}, [charIndex, isDeleting, roleIndex]);

	useEffect(() => {
		const el = galleryRef.current;
		if (!el) return;
		const onMove = (e: MouseEvent) => {
			const rect = el.getBoundingClientRect();
			setSpotlight({
				x: ((e.clientX - rect.left) / rect.width) * 100,
				y: ((e.clientY - rect.top) / rect.height) * 100,
			});
		};
		el.addEventListener('mousemove', onMove);
		return () => el.removeEventListener('mousemove', onMove);
	}, []);

	return (
		<>
			<NextSeo {...seoHome} />
			<main className="bg-background text-foreground">
				{/* ═══════════════════════════════════════
				     HERO — portrait card + centered text
				   ═══════════════════════════════════════ */}
				<section
					ref={heroRef}
					className="relative isolate min-h-[100svh] overflow-hidden bg-zinc-950"
				>
					{/* Background effects */}
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(59,130,246,0.12),transparent_50%)]" />
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_100%,rgba(251,191,36,0.08),transparent_50%)]" />
					<div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

					{/* Hero content — vertically centered */}
					<motion.div
						style={{ opacity: heroOpacity }}
						className="relative z-10 flex min-h-[100svh] items-center"
					>
						<div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 md:px-10 lg:px-14">
							<div className="grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
								{/* Text */}
								<motion.div
									initial={{ opacity: 0, y: 32 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.9,
										ease: [0.22, 1, 0.36, 1],
									}}
									className="max-w-2xl"
								>
									<p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-white/80 backdrop-blur-sm">
										<span className="relative flex h-2 w-2">
											<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
											<span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
										</span>
										Joey Jazwinski
									</p>

									<h1 className="text-5xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
										I write code.
										<br />
										<span className="hero-gradient-text">
											I frame stories.
										</span>
									</h1>

									{/* Typing effect */}
									<div className="mt-6 flex items-center gap-2 text-base text-white/50 sm:text-lg">
										<span className="text-white/30">
											{'>'}
										</span>
										<span className="font-mono">
											{roles[roleIndex].substring(
												0,
												charIndex,
											)}
										</span>
										<span className="inline-block w-0.5 h-5 bg-emerald-400 animate-pulse" />
									</div>

									<div className="mt-8 flex flex-col gap-3 sm:flex-row">
										<Link
											href="/projects"
											className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-zinc-950 shadow-lg shadow-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-white/20"
										>
											View projects
											<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
										</Link>
										<Link
											href="#gallery"
											className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/8 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/14"
										>
											See the gallery
											<Aperture className="h-4 w-4" />
										</Link>
									</div>

									{/* Stats bar */}
									<div className="mt-10 flex flex-wrap gap-8 text-sm">
										<div>
											<span className="text-2xl font-bold text-white">
												5+
											</span>
											<p className="mt-0.5 text-white/40">
												Projects shipped
											</p>
										</div>
										<div className="h-10 w-px bg-white/10" />
										<div>
											<span className="text-2xl font-bold text-white">
												3
											</span>
											<p className="mt-0.5 text-white/40">
												Photo studies
											</p>
										</div>
										<div className="h-10 w-px bg-white/10" />
										<div>
											<span className="text-2xl font-bold text-white">
												2+
											</span>
											<p className="mt-0.5 text-white/40">
												Years building
											</p>
										</div>
									</div>
								</motion.div>

								{/* Portrait card */}
								<motion.div
									initial={{ opacity: 0, scale: 0.92 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{
										duration: 1,
										delay: 0.3,
										ease: [0.22, 1, 0.36, 1],
									}}
									className="mx-auto w-80 sm:w-96 lg:w-[420px]"
								>
									<div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-2 shadow-2xl shadow-black/50 backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:shadow-primary/10">
										<div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
											<Image
												src="/me.jpg"
												alt="Joey Jazwinski"
												fill
												priority
												className="object-cover object-[center_15%] transition-transform duration-700 group-hover:scale-105"
												sizes="340px"
												quality={90}
											/>
											{/* Bottom fade */}
											<div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
										</div>
										{/* Card footer */}
										<div className="flex items-center justify-between px-3 py-3">
											<div>
												<p className="text-sm font-medium text-white/90">
													Joey Jazwinski
												</p>
												<p className="text-xs text-white/40">
													Developer & Photographer
												</p>
											</div>
											<div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/50">
												<Aperture className="h-4 w-4" />
											</div>
										</div>
									</div>
								</motion.div>
							</div>
						</div>
					</motion.div>

					{/* Scroll hint */}
					<motion.div
						className="absolute inset-x-0 bottom-6 z-10 flex justify-center"
						animate={{ y: [0, 8, 0] }}
						transition={{
							duration: 2.4,
							repeat: Infinity,
							ease: 'easeInOut',
						}}
					>
						<div className="flex flex-col items-center gap-1 text-white/40">
							<span className="text-[10px] uppercase tracking-[0.3em]">
								Scroll
							</span>
							<svg
								className="h-4 w-4"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M19 14l-7 7-7-7"
								/>
							</svg>
						</div>
					</motion.div>
				</section>

				{/* ═══════════════════════════════════════
				     PHOTOGRAPHY GALLERY — immersive showcase
				   ═══════════════════════════════════════ */}
				<section
					id="gallery"
					ref={galleryRef}
					className="relative overflow-hidden border-b border-border/50 bg-zinc-950"
					style={{
						background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(251,191,36,0.06) 0%, transparent 50%), rgb(9,9,11)`,
					}}
				>
					<div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 md:px-10 lg:px-14">
						{/* Section header */}
						<motion.div
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.6 }}
							className="mb-16 max-w-2xl"
						>
							<p className="text-sm font-medium uppercase tracking-[0.28em] text-amber-400/70">
								Selected frames
							</p>
							<h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
								Photography is how I slow down and see the world
								clearly.
							</h2>
							<p className="mt-5 text-base leading-7 text-white/55">
								Every image is an exercise in patience, light,
								and composition — the same skills that shape how
								I think about interfaces.
							</p>
						</motion.div>

						{/* Photo grid — masonry-style */}
						<div className="grid gap-4 md:grid-cols-12 md:gap-5">
							{/* Photo 1 — tall portrait, spans 5 cols */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.2 }}
								transition={{ duration: 0.7, delay: 0 }}
								className="group relative overflow-hidden rounded-2xl md:col-span-5 md:row-span-2"
							>
								<div className="relative aspect-[3/4] md:aspect-auto md:h-full">
									<Image
										src={photos[0].src}
										alt={photos[0].alt}
										fill
										className="object-cover transition-transform duration-700 group-hover:scale-105"
										sizes="(max-width: 768px) 100vw, 42vw"
										quality={85}
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-40" />
									<div className="absolute inset-x-0 bottom-0 translate-y-2 p-6 transition-all duration-500 group-hover:translate-y-0">
										<div className="mb-2 h-px w-12 bg-amber-400/60 transition-all duration-500 group-hover:w-20" />
										<p className="text-lg font-semibold text-white">
											{photos[0].caption}
										</p>
										<p className="mt-1 text-sm text-white/60">
											{photos[0].detail}
										</p>
									</div>
									<div className="absolute right-5 top-5 text-xs uppercase tracking-[0.28em] text-white/40">
										01
									</div>
								</div>
							</motion.div>

							{/* Photo 2 — landscape */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.2 }}
								transition={{ duration: 0.7, delay: 0.1 }}
								className="group relative overflow-hidden rounded-2xl md:col-span-7"
							>
								<div className="relative aspect-[4/3] md:aspect-[16/10]">
									<Image
										src={photos[1].src}
										alt={photos[1].alt}
										fill
										className="object-cover transition-transform duration-700 group-hover:scale-105"
										sizes="(max-width: 768px) 100vw, 58vw"
										quality={85}
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-40" />
									<div className="absolute inset-x-0 bottom-0 translate-y-2 p-6 transition-all duration-500 group-hover:translate-y-0">
										<div className="mb-2 h-px w-12 bg-pink-400/60 transition-all duration-500 group-hover:w-20" />
										<p className="text-lg font-semibold text-white">
											{photos[1].caption}
										</p>
										<p className="mt-1 text-sm text-white/60">
											{photos[1].detail}
										</p>
									</div>
									<div className="absolute right-5 top-5 text-xs uppercase tracking-[0.28em] text-white/40">
										02
									</div>
								</div>
							</motion.div>

							{/* Photo 3 — landscape */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.2 }}
								transition={{ duration: 0.7, delay: 0.2 }}
								className="group relative overflow-hidden rounded-2xl md:col-span-7"
							>
								<div className="relative aspect-[2/3] md:aspect-[16/10]">
									<Image
										src={photos[2].src}
										alt={photos[2].alt}
										fill
										className="object-cover transition-transform duration-700 group-hover:scale-105"
										sizes="(max-width: 768px) 100vw, 58vw"
										quality={85}
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-40" />
									<div className="absolute inset-x-0 bottom-0 translate-y-2 p-6 transition-all duration-500 group-hover:translate-y-0">
										<div className="mb-2 h-px w-12 bg-emerald-400/60 transition-all duration-500 group-hover:w-20" />
										<p className="text-lg font-semibold text-white">
											{photos[2].caption}
										</p>
										<p className="mt-1 text-sm text-white/60">
											{photos[2].detail}
										</p>
									</div>
									<div className="absolute right-5 top-5 text-xs uppercase tracking-[0.28em] text-white/40">
										03
									</div>
								</div>
							</motion.div>
						</div>

						{/* Gallery CTA */}
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ delay: 0.4, duration: 0.6 }}
							className="mt-10 flex justify-end"
						>
							<Link
								href="/photography"
								className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:text-white"
							>
								View all photography
								<ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
							</Link>
						</motion.div>
					</div>
				</section>

				{/* ═══════════════════════════════════════
				     FEATURED PROJECTS — code showcase
				     (mirrors the gallery in visual weight)
				   ═══════════════════════════════════════ */}
				<section className="relative overflow-hidden border-b border-border/50 bg-background">
					{/* Subtle code-themed background */}
					<div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.08),transparent_50%)]" />

					<div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 md:px-10 lg:px-14">
						{/* Section header */}
						<motion.div
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.6 }}
							className="mb-16 max-w-2xl"
						>
							<p className="text-sm font-medium uppercase tracking-[0.28em] text-primary/70">
								Featured builds
							</p>
							<h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
								Software is how I solve problems and bring ideas
								to life.
							</h2>
							<p className="mt-5 text-base leading-7 text-muted-foreground">
								Full-stack web apps, interactive games, and
								community tools — each project teaches me
								something new about craft and clarity.
							</p>
						</motion.div>

						{/* Projects grid — matches gallery visual weight */}
						<div className="grid gap-6 md:grid-cols-3">
							{featuredProjects.map((project, i) => (
								<motion.div
									key={project.title}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, amount: 0.2 }}
									transition={{
										duration: 0.7,
										delay: i * 0.1,
									}}
									className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
								>
									{/* Project thumbnail */}
									<div className="relative aspect-[16/10] overflow-hidden">
										<Image
											src={project.thumbnail}
											alt={project.title}
											fill
											className="object-cover transition-transform duration-700 group-hover:scale-105"
											sizes="(max-width: 768px) 100vw, 33vw"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

										{/* Hover overlay with links */}
										<div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
											<a
												href={project.link}
												target="_blank"
												rel="noopener noreferrer"
												className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow-lg backdrop-blur-sm transition-transform duration-200 hover:scale-110"
												aria-label={`Visit ${project.title}`}
											>
												<ExternalLink className="h-4 w-4" />
											</a>
											{project.github && (
												<a
													href={project.github}
													target="_blank"
													rel="noopener noreferrer"
													className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow-lg backdrop-blur-sm transition-transform duration-200 hover:scale-110"
													aria-label={`View ${project.title} source`}
												>
													<Github className="h-4 w-4" />
												</a>
											)}
										</div>
									</div>

									{/* Content */}
									<div className="flex flex-1 flex-col p-6">
										<h3 className="text-lg font-semibold transition-colors duration-300 group-hover:text-primary">
											{project.title}
										</h3>
										<p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
											{project.description}
										</p>
										<div className="mt-4 flex flex-wrap gap-1.5">
											{project.tags.map((tag) => (
												<span
													key={tag}
													className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-xs font-medium text-primary"
												>
													{tag}
												</span>
											))}
										</div>
									</div>
								</motion.div>
							))}
						</div>

						{/* Projects CTA */}
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ delay: 0.4, duration: 0.6 }}
							className="mt-10 flex justify-end"
						>
							<Link
								href="/projects"
								className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-2.5 text-sm font-medium text-foreground/70 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
							>
								View all projects
								<ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
							</Link>
						</motion.div>
					</div>
				</section>

				{/* ═══════════════════════════════════════
				     CREATIVE PHILOSOPHY — the overlap
				     (code terminal aesthetic + photography mood)
				   ═══════════════════════════════════════ */}
				<section className="relative overflow-hidden border-b border-border/50">
					{/* Split background — code left, photo right */}
					<div className="absolute inset-0 bg-background" />
					<div className="absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-l from-amber-50/50 to-transparent dark:from-amber-950/20 dark:to-transparent lg:block" />
					<div className="absolute inset-y-0 left-0 hidden w-1/2 bg-gradient-to-r from-sky-50/50 to-transparent dark:from-sky-950/20 dark:to-transparent lg:block" />

					<div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 md:px-10 lg:px-14">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.6 }}
							className="mb-14 text-center"
						>
							<p className="text-sm font-medium uppercase tracking-[0.28em] text-primary/70">
								Two disciplines, one taste
							</p>
							<h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
								The connection between code and photography is
								taste, patience, and framing.
							</h2>
						</motion.div>

						<div className="grid gap-6 lg:grid-cols-2">
							{/* Code discipline */}
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true, amount: 0.3 }}
								transition={{ duration: 0.6 }}
								className="group relative overflow-hidden rounded-2xl border border-border/60 bg-zinc-950 p-8 text-white"
							>
								{/* Terminal header bar */}
								<div className="mb-6 flex items-center gap-2">
									<div className="h-3 w-3 rounded-full bg-red-500/70" />
									<div className="h-3 w-3 rounded-full bg-yellow-500/70" />
									<div className="h-3 w-3 rounded-full bg-green-500/70" />
									<span className="ml-3 text-xs text-white/40 font-mono">
										~/joey/craft
									</span>
								</div>

								<div className="flex items-center gap-3 mb-4">
									<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/20">
										<Code2 className="h-5 w-5 text-sky-400" />
									</div>
									<h3 className="text-xl font-semibold">
										Software Engineering
									</h3>
								</div>
								<p className="mb-5 text-base leading-7 text-white/60">
									Full-stack products with clear systems, fast
									interfaces, and practical engineering
									underneath.
								</p>

								{/* Code-style list */}
								<div className="space-y-2 font-mono text-sm">
									{[
										'React & Next.js',
										'Product experiments',
										'Learning in public',
									].map((item, idx) => (
										<div
											key={item}
											className="flex items-center gap-3 text-white/50"
										>
											<span className="text-sky-400/60">
												{String(idx + 1).padStart(
													2,
													'0',
												)}
											</span>
											<span className="text-emerald-400/80">
												→
											</span>
											<span className="text-white/70">
												{item}
											</span>
										</div>
									))}
								</div>

								{/* Subtle glow */}
								<div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-sky-500/10 blur-3xl transition-all duration-500 group-hover:bg-sky-500/20" />
							</motion.div>

							{/* Photography discipline */}
							<motion.div
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true, amount: 0.3 }}
								transition={{ duration: 0.6, delay: 0.1 }}
								className="group relative overflow-hidden rounded-2xl border border-border/60 bg-zinc-950 p-8 text-white"
							>
								{/* Viewfinder / contact sheet aesthetic */}
								<div className="mb-6 flex items-center gap-2">
									<div className="h-px flex-1 bg-white/10" />
									<span className="text-xs uppercase tracking-[0.3em] text-white/30">
										contact sheet
									</span>
									<div className="h-px flex-1 bg-white/10" />
								</div>

								<div className="flex items-center gap-3 mb-4">
									<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20">
										<Camera className="h-5 w-5 text-amber-400" />
									</div>
									<h3 className="text-xl font-semibold">
										Photography
									</h3>
								</div>
								<p className="mb-5 text-base leading-7 text-white/60">
									Using the camera to slow down, frame moments
									deliberately, and study light the same way I
									study interfaces.
								</p>

								{/* Film-strip style list */}
								<div className="space-y-2 text-sm">
									{[
										'Street & travel frames',
										'Low-light detail',
										'Mood-led storytelling',
									].map((item, idx) => (
										<div
											key={item}
											className="flex items-center gap-3"
										>
											<span className="flex h-6 w-6 items-center justify-center rounded border border-amber-400/30 text-xs text-amber-400/60">
												{String(idx + 1)}
											</span>
											<span className="text-white/70">
												{item}
											</span>
										</div>
									))}
								</div>

								{/* Subtle glow */}
								<div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl transition-all duration-500 group-hover:bg-amber-500/20" />
							</motion.div>
						</div>
					</div>
				</section>

				{/* ═══════════════════════════════════════
				     PRINCIPLES — numbered, clean
				   ═══════════════════════════════════════ */}
				<section className="border-b border-border/50 bg-background">
					<div className="mx-auto max-w-5xl px-6 py-24 sm:px-8 md:px-10 lg:px-14">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.6 }}
							className="mb-12 text-center"
						>
							<p className="text-sm font-medium uppercase tracking-[0.28em] text-primary/70">
								Creative operating system
							</p>
							<h2 className="mx-auto mt-4 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
								How I think about the work.
							</h2>
						</motion.div>

						<div className="grid gap-6 md:grid-cols-3">
							{principles.map((p, i) => {
								const Icon = p.icon;
								return (
									<motion.div
										key={p.label}
										initial={{ opacity: 0, y: 18 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{
											once: true,
											amount: 0.4,
										}}
										transition={{
											duration: 0.5,
											delay: i * 0.1,
										}}
										className="group flex flex-col items-center rounded-2xl border border-border/60 bg-card/50 p-8 text-center transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-black/5"
									>
										<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
											<Icon className="h-6 w-6" />
										</div>
										<span className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
											{p.label}
										</span>
										<p className="text-base leading-7 text-foreground/80">
											{p.text}
										</p>
									</motion.div>
								);
							})}
						</div>
					</div>
				</section>

				{/* ═══════════════════════════════════════
				     CTA — closing
				   ═══════════════════════════════════════ */}
				<section className="bg-background">
					<div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 md:px-10 lg:px-14">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.45 }}
							transition={{ duration: 0.55 }}
							className="relative overflow-hidden rounded-[2rem] border border-border/70 px-6 py-12 sm:px-10 lg:px-14"
						>
							{/* Background */}
							<div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800/95 to-zinc-900" />
							{/* Dual accent glows — blue for code, amber for photography */}
							<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.12),transparent_50%)]" />
							<div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(251,191,36,0.10),transparent_50%)]" />

							<div className="relative z-10 grid gap-8 text-white lg:grid-cols-[1fr_auto] lg:items-end">
								<div className="max-w-2xl">
									<p className="text-sm font-medium uppercase tracking-[0.28em] text-white/50">
										Next step
									</p>
									<h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
										Whether you&apos;re here for software,
										photography, or both — let&apos;s
										connect.
									</h2>
									<p className="mt-5 text-base leading-7 text-white/60">
										Explore the projects, follow the visual
										work as it grows, or reach out if you
										want to build something together.
									</p>
								</div>
								<div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
									<Link
										href="/contact"
										className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-zinc-950 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
									>
										Get in touch
										<Mail className="h-4 w-4" />
									</Link>
									<Link
										href="/blogs"
										className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/8 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/14"
									>
										Read the journal
										<ArrowRight className="h-4 w-4" />
									</Link>
								</div>
							</div>
						</motion.div>
					</div>
				</section>
			</main>
		</>
	);
};

export default HomePage;
