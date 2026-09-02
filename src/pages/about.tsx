import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { motion, useReducedMotion } from 'framer-motion';
import {
	Code2,
	MapPin,
	GraduationCap,
	Sparkles,
	Terminal,
	ShieldCheck,
	Cpu,
	Palette,
	ArrowUpRight,
	Calendar,
	Award,
	ExternalLink,
	CheckCircle2,
	Compass,
	Briefcase,
	Layers,
	FolderGit2,
	Send,
} from 'lucide-react';
import { FaGoogle, FaLinkedin } from 'react-icons/fa';
import { certifications, Certification } from '@/data/certifications';

const MOTION_EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Issuer Icon helper ─── */
const IssuerLogo: React.FC<{ issuer: string; className?: string }> = ({
	issuer,
	className = 'h-5 w-5',
}) => {
	const normalized = issuer.toLowerCase();
	if (normalized === 'google') {
		return <FaGoogle className={`${className} text-foreground/80 group-hover:text-primary transition-colors`} />;
	}
	if (normalized === 'linkedin') {
		return <FaLinkedin className={`${className} text-[#0A66C2]`} />;
	}
	return <Award className={`${className} text-primary`} />;
};

/* ─── Milestones data ─── */
interface Milestone {
	year: string;
	title: string;
	subtitle: string;
	description: string;
	tag: string;
	icon: React.ElementType;
}

const milestones: Milestone[] = [
	{
		year: '2018',
		title: 'First Lines of Code',
		subtitle: 'Console Scripts & Curiosity',
		description:
			'Discovered programming in middle school by experimenting with JavaScript alerts and DOM manipulation in the browser console.',
		tag: 'Discovery',
		icon: Terminal,
	},
	{
		year: '2019 – 2020',
		title: 'Python Automation & Web Basics',
		subtitle: 'Building the Foundation',
		description:
			'Taught myself Python and foundational HTML/CSS. Authored utility scripts and typing automation tools reaching speeds over 260 WPM.',
		tag: 'Exploration',
		icon: Code2,
	},
	{
		year: '2021 – 2022',
		title: 'Full-Stack Applications',
		subtitle: 'Modern JavaScript & Cloud Deployments',
		description:
			'Advanced into full-stack JavaScript architectures, cloud-hosted backends with Firebase, and interactive client-side platforms.',
		tag: 'Architecture',
		icon: Layers,
	},
	{
		year: '2023 – 2024',
		title: 'Systems & Independent Tools',
		subtitle: 'Developer Utilities & Deep Dives',
		description:
			'Focused on creating high-performance developer utilities, analyzing code optimizations, and refining user interface mechanics.',
		tag: 'Specialization',
		icon: Cpu,
	},
	{
		year: '2025 – Present',
		title: 'Adelphi University & AI Systems',
		subtitle: 'Computer Science & Modern AI Stacks',
		description:
			'Pursuing Computer Science at Adelphi University while engineering production-ready SaaS tools, generative AI pipelines, and accessible web apps.',
		tag: 'Academic & Production',
		icon: GraduationCap,
	},
];

/* ─── Philosophy Pillars ─── */
const pillars = [
	{
		icon: Cpu,
		title: 'Systems & Performance',
		badge: 'Architecture',
		description:
			'Engineering lean, zero-latency experiences with Next.js, TypeScript, and serverless backends optimized for sub-millisecond execution and minimal bundle overhead.',
		points: ['Sub-second cold starts', 'Type-safe contracts', 'Server-driven efficiency'],
	},
	{
		icon: ShieldCheck,
		title: 'Defensive Engineering',
		badge: 'Security',
		description:
			'Implementing Google-certified security principles: strict token authorization, sanitized input pipelines, zero-trust state boundaries, and robust error surfaces.',
		points: ['Threat modeling', 'Strict input validation', 'Least-privilege API design'],
	},
	{
		icon: Palette,
		title: 'Human-Centered UX',
		badge: 'Design',
		description:
			'Crafting user interfaces that adhere to Google UX foundation heuristics. Responsive design, accessible color contrast (WCAG AA), and tactile micro-motion.',
		points: ['Fluid responsive grids', 'High-contrast typography', 'Tactile interactive feedback'],
	},
	{
		icon: Sparkles,
		title: 'Intelligent AI Pipelines',
		badge: 'Automation',
		description:
			'Integrating modern generative models and structured prompt architectures into real-world developer workflows to eliminate repetitive toil.',
		points: ['Structured LLM schemas', 'Context window optimization', 'Practical workflow copilot'],
	},
];

const AboutPage: React.FC = () => {
	const shouldReduceMotion = useReducedMotion();
	const [activeCategory, setActiveCategory] = useState<string>('All');

	// Extract unique categories for filter tabs
	const categories = ['All', ...Array.from(new Set(certifications.map((c) => c.category)))];

	const filteredCertifications =
		activeCategory === 'All'
			? certifications
			: certifications.filter((cert) => cert.category === activeCategory);

	return (
		<>
			<NextSeo
				title="About Joey Jazwinski | Software Developer & Builder"
				description="Learn more about Joey Jazwinski — full-stack software engineer and creator studying Computer Science at Adelphi University."
				canonical="https://joeyjazwinski.com/about"
				openGraph={{
					url: 'https://joeyjazwinski.com/about',
					title: 'About Joey Jazwinski | Software Developer & Builder',
					description:
						'Full-stack engineer, creator, and Computer Science student at Adelphi University.',
				}}
			/>

			<main className="w-full bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
				{/* ═══════════════════════════════════════
				     HERO SECTION — Profile & Narrative
				   ═══════════════════════════════════════ */}
				<section className="relative min-h-[90dvh] flex items-center justify-center pt-24 pb-20 px-4 sm:px-6 md:px-8 overflow-hidden">
					{/* Ambient backdrop glows */}
					<div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />
					<div className="absolute top-1/3 -right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
					<div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

					{/* Subtle grid pattern */}
					<div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,120,120,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,120,120,0.04)_1px,transparent_1px)] bg-size-[64px_64px] pointer-events-none -z-10" />

					<div className="max-w-6xl mx-auto w-full">
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
							{/* Left Column: Bio & Value Proposition (7 cols) */}
							<motion.div
								initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.7, ease: MOTION_EASE }}
								className="lg:col-span-7 space-y-6 text-center lg:text-left"
							>
								{/* Eyebrow Badge (1 allowed in this section group) */}
								<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/60 border border-border/80 text-muted-foreground text-[11px] font-semibold tracking-[0.18em] uppercase backdrop-blur-md shadow-xs">
									<span className="relative flex h-2 w-2">
										<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
										<span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
									</span>
									<span>Developer &amp; Systems Creator</span>
								</div>

								<h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
									Crafting software with{' '}
									<span className="bg-linear-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
										intent, rigor, and speed.
									</span>
								</h1>

								<p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
									I&apos;m Joey Jazwinski — a full-stack engineer and Computer Science student at Adelphi University. I build robust web platforms, developer utilities, and modern interactive applications focused on clean architecture and high UX standards.
								</p>

								{/* Fact Pills */}
								<div className="flex flex-wrap justify-center lg:justify-start gap-2.5 pt-1">
									{[
										{ icon: Code2, text: 'Full-Stack Development' },
										{ icon: GraduationCap, text: 'Adelphi University (CS)' },
										{ icon: MapPin, text: 'New York' },
									].map((chip) => {
										const Icon = chip.icon;
										return (
											<div
												key={chip.text}
												className="flex items-center gap-2 rounded-full border border-border bg-card/40 px-3.5 py-1.5 text-xs text-muted-foreground backdrop-blur-xs transition-colors hover:border-primary/40 hover:text-foreground"
											>
												<Icon className="h-3.5 w-3.5 text-primary" />
												<span>{chip.text}</span>
											</div>
										);
									})}
								</div>

								{/* Quick CTA Actions */}
								<div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-4">
									<Link
										href="/projects"
										className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
									>
										<FolderGit2 className="w-4 h-4" />
										<span>Explore Featured Work</span>
									</Link>
									<Link
										href="/contact"
										className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-secondary/80 hover:bg-secondary text-secondary-foreground text-sm font-medium border border-border/80 active:scale-[0.98] transition-all"
									>
										<Send className="w-4 h-4" />
										<span>Get in Touch</span>
									</Link>
								</div>
							</motion.div>

							{/* Right Column: Profile Showcase Card (5 cols) */}
							<motion.div
								initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.7, delay: 0.15, ease: MOTION_EASE }}
								className="lg:col-span-5 flex justify-center"
							>
								<div className="relative group w-full max-w-[340px] sm:max-w-[380px]">
									{/* Subtle border glow on hover */}
									<div className="absolute -inset-1 rounded-3xl bg-linear-to-r from-primary/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 pointer-events-none" />

									<div className="relative rounded-3xl border border-border/80 bg-card/60 p-3.5 backdrop-blur-xl shadow-xl transition-all duration-500 group-hover:border-primary/30">
										<div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-muted">
											<Image
												src="/me.jpg"
												alt="Joey Jazwinski"
												fill
												priority
												className="object-cover object-[center_15%] transition-transform duration-700 group-hover:scale-105"
												sizes="(max-width: 768px) 340px, 380px"
												quality={92}
											/>
											{/* Scrim Overlay */}
											<div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

											{/* Inner Details */}
											<div className="absolute inset-x-0 bottom-0 p-5 text-white">
												<div className="flex items-center justify-between">
													<div>
														<h2 className="text-lg font-bold text-white tracking-tight">
															Joey Jazwinski
														</h2>
														<p className="text-xs text-white/70">
															Software Engineer &amp; CS Student
														</p>
													</div>
													<div className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
														<Code2 className="w-4 h-4 text-white" />
													</div>
												</div>
											</div>
										</div>

										{/* Status bar */}
										<div className="mt-3 flex items-center justify-between px-2 py-1 text-xs text-muted-foreground">
											<span className="flex items-center gap-1.5">
												<span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
												Open to technical projects
											</span>
											<span>Adelphi Univ. &apos;28</span>
										</div>
									</div>
								</div>
							</motion.div>
						</div>
					</div>
				</section>

				{/* ═══════════════════════════════════════
				     TECHNICAL PHILOSOPHY & PILLARS (BENTO)
				   ═══════════════════════════════════════ */}
				<section className="py-24 px-4 sm:px-6 md:px-8 border-t border-border/60 bg-muted/20 relative">
					<div className="max-w-6xl mx-auto">
						<div className="max-w-2xl mx-auto text-center mb-16">
							<h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
								Technical Philosophy &amp; Standards
							</h2>
							<p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
								Bridging algorithmic foundations with practical modern web development. Every system is built around performance, security, and human ergonomics.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{pillars.map((pillar, i) => {
								const Icon = pillar.icon;
								return (
									<motion.div
										key={pillar.title}
										initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true, amount: 0.2 }}
										transition={{ duration: 0.5, delay: i * 0.08, ease: MOTION_EASE }}
										className="group relative rounded-2xl border border-border/80 bg-card p-6 sm:p-8 backdrop-blur-md shadow-xs transition-all duration-300 hover:border-primary/40 hover:shadow-md"
									>
										<div className="flex items-center justify-between mb-4">
											<div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary transition-transform duration-300 group-hover:scale-105">
												<Icon className="w-5 h-5" />
											</div>
											<span className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground px-2.5 py-1 rounded-full bg-muted border border-border">
												{pillar.badge}
											</span>
										</div>

										<h3 className="text-xl font-bold tracking-tight mb-2">
											{pillar.title}
										</h3>

										<p className="text-sm text-muted-foreground leading-relaxed mb-6">
											{pillar.description}
										</p>

										<div className="space-y-2 pt-4 border-t border-border/60">
											{pillar.points.map((pt) => (
												<div
													key={pt}
													className="flex items-center gap-2 text-xs font-medium text-foreground/80"
												>
													<CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
													<span>{pt}</span>
												</div>
											))}
										</div>
									</motion.div>
								);
							})}
						</div>
					</div>
				</section>

				{/* ═══════════════════════════════════════
				     ENGINEERING JOURNEY & MILESTONES
				   ═══════════════════════════════════════ */}
				<section className="py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden">
					<div className="max-w-5xl mx-auto">
						<div className="max-w-2xl mx-auto text-center mb-16">
							<h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
								The Journey &amp; Milestones
							</h2>
							<p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
								From tinkering with console commands to designing robust full-stack software.
							</p>
						</div>

						{/* Interactive Timeline Layout */}
						<div className="relative border-l border-border/80 ml-4 sm:ml-32 space-y-10">
							{milestones.map((m, idx) => {
								const Icon = m.icon;
								return (
									<motion.div
										key={m.year}
										initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true, amount: 0.3 }}
										transition={{ duration: 0.5, delay: idx * 0.08, ease: MOTION_EASE }}
										className="relative pl-6 sm:pl-8 group"
									>
										{/* Year label pinned left on desktop */}
										<div className="hidden sm:block absolute -left-32 top-1 text-right w-24">
											<span className="font-mono text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors">
												{m.year}
											</span>
										</div>

										{/* Timeline indicator node */}
										<div className="absolute -left-2.5 top-1.5 h-5 w-5 rounded-full border-2 border-background bg-border group-hover:bg-primary transition-colors flex items-center justify-center">
											<div className="h-1.5 w-1.5 rounded-full bg-background" />
										</div>

										{/* Content Card */}
										<div className="rounded-2xl border border-border/70 bg-card/60 p-5 sm:p-6 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/30 group-hover:bg-card">
											<div className="flex flex-wrap items-center justify-between gap-2 mb-2">
												<div className="flex items-center gap-2">
													<div className="sm:hidden font-mono text-xs font-bold text-primary">
														{m.year}
													</div>
													<h3 className="text-lg font-bold tracking-tight text-foreground">
														{m.title}
													</h3>
												</div>
												<span className="text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground border border-border">
													{m.tag}
												</span>
											</div>

											<p className="text-xs font-medium text-primary/80 mb-2">
												{m.subtitle}
											</p>

											<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
												{m.description}
											</p>
										</div>
									</motion.div>
								);
							})}
						</div>
					</div>
				</section>

				{/* ═══════════════════════════════════════
				     VERIFIED CREDENTIALS & CERTIFICATIONS
				   ═══════════════════════════════════════ */}
				<section
					id="certifications"
					className="py-24 px-4 sm:px-6 md:px-8 border-t border-border/60 bg-muted/20 relative"
				>
					<div className="max-w-6xl mx-auto">
						<div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
							<div>
								<h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
									Verified Certifications
								</h2>
								<p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-xl">
									Accredited certifications across Artificial Intelligence, Cybersecurity, UX Design, and Full-Stack Engineering.
								</p>
							</div>

							{/* Category Filter Pills */}
							<div className="flex flex-wrap gap-1.5">
								{categories.map((cat) => (
									<button
										key={cat}
										onClick={() => setActiveCategory(cat)}
										className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
											activeCategory === cat
												? 'bg-primary text-primary-foreground shadow-xs'
												: 'bg-card text-muted-foreground hover:text-foreground border border-border hover:border-primary/30'
										}`}
									>
										{cat}
									</button>
								))}
							</div>
						</div>

						{/* Certification Cards Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
							{filteredCertifications.map((cert) => (
								<motion.div
									key={cert.id}
									layout
									initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.3 }}
									className="group rounded-2xl border border-border/80 bg-card p-5 flex flex-col justify-between transition-all duration-300 hover:border-primary/40 hover:shadow-md"
								>
									<div>
										<div className="flex items-start justify-between gap-3 mb-3">
											<div className="p-2 rounded-xl bg-muted border border-border">
												<IssuerLogo issuer={cert.issuer} />
											</div>
											<span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-2 py-0.5 rounded-full bg-secondary border border-border">
												{cert.badgeText || cert.category}
											</span>
										</div>

										<h3 className="text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
											{cert.name}
										</h3>

										{cert.description && (
											<p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2">
												{cert.description}
											</p>
										)}
									</div>

									<div className="mt-5 pt-3 border-t border-border/60 flex items-center justify-between text-xs">
										<span className="text-muted-foreground text-[11px]">
											{cert.date}
										</span>
										<a
											href={cert.link}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
											aria-label={`Verify ${cert.name} certificate`}
										>
											<span>Verify</span>
											<ExternalLink className="w-3 h-3" />
										</a>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* ═══════════════════════════════════════
				     COLLABORATION / NEXT STEPS CTA
				   ═══════════════════════════════════════ */}
				<section className="py-20 px-4 sm:px-6 md:px-8 border-t border-border/60 bg-background relative overflow-hidden text-center">
					<div className="max-w-3xl mx-auto space-y-6">
						<h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
							Interested in collaborating or discussing an idea?
						</h2>
						<p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
							I am always open to exploring software engineering opportunities, architectural discussions, or building useful utilities.
						</p>
						<div className="flex flex-wrap items-center justify-center gap-4 pt-2">
							<Link
								href="/contact"
								className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
							>
								<Send className="w-4 h-4" />
								<span>Send a Message</span>
							</Link>
							<Link
								href="/projects"
								className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-border hover:bg-secondary/80 active:scale-[0.98] transition-all"
							>
								<Briefcase className="w-4 h-4" />
								<span>View Portfolio</span>
							</Link>
						</div>
					</div>
				</section>
			</main>
		</>
	);
};

export default AboutPage;
