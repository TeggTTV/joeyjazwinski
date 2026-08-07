import React, { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, Camera, MapPin, GraduationCap, Sparkles } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';

/* ─── journey timeline data ─── */

interface Certification {
	name: string;
	link: string;
	issuer: string;
	date: string;
}

const CertificationIssuerLogo: React.FC<{ issuer: string }> = ({ issuer }) => {
	const normalizedIssuer = issuer.toLowerCase();

	if (normalizedIssuer === 'google') {
		return <FaGoogle className="h-8 w-8"></FaGoogle>;
	}

	if (normalizedIssuer === 'coursera') {
		return (
			<svg
				viewBox="0 0 24 24"
				className="h-8 w-8 shrink-0"
				aria-hidden="true"
			>
				<circle cx="12" cy="12" r="10" fill="#ffffff" opacity="0.08" />
				<path
					d="M15.8 8.2a4.9 4.9 0 0 0-3.8-1.8C8.7 6.4 6.4 8.7 6.4 12s2.3 5.6 5.6 5.6c1.5 0 2.9-.6 3.8-1.8l-1.7-1.7a3.1 3.1 0 0 1-2.1.9A3 3 0 1 1 12 9.1c.8 0 1.5.3 2.1.9z"
					fill="#0056D2"
				/>
				<circle cx="16.5" cy="16.5" r="1.2" fill="#0056D2" />
			</svg>
		);
	}

	return null;
};

const certifications: Certification[] = [
	{
		name: 'Foundations of User Experience (UX)',
		date: 'January 17, 2026',
		issuer: 'Google',
		link: 'https://coursera.org/share/306ca32eb9bf33c5c3f7e059bdcc5980',
	},
	{
		name: 'Foundations of Cyber Security',
		date: 'August 4, 2026',
		issuer: 'Google',
		link: 'https://coursera.org/share/023d2adbbb0bca7a9252f706645fd80c',
	},
];

/* ─── component ─── */

const AboutPage: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [] = useState(0);
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

	// Parallax for hero
	const heroRef = useRef<HTMLElement>(null);
	const { scrollYProgress: heroScroll } = useScroll({
		target: heroRef,
		offset: ['start start', 'end start'],
	});
	const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

	// Mouse tracking for gradient spotlight
	const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		setMousePos({
			x: ((e.clientX - rect.left) / rect.width) * 100,
			y: ((e.clientY - rect.top) / rect.height) * 100,
		});
	}, []);

	return (
		<>
			<NextSeo
				title="Joey Jazwinski - Software Developer & Creator"
				description="Learn more about Joey Jazwinski — a software engineer and builder studying at Adelphi University."
				canonical="https://joeyjazwinski.com/about"
			/>
			<main
				className="dark:bg-zinc-950 dark:text-white"
				ref={containerRef}
			>
				{/* ═══════════════════════════════════════
				     HERO — cinematic intro with floating elements
				   ═══════════════════════════════════════ */}
				<section
					ref={heroRef}
					className="relative min-h-svh overflow-hidden"
					onMouseMove={handleMouseMove}
				>
					{/* Animated background gradients */}
					<div className="absolute inset-0">
						<div
							className="absolute inset-0 transition-all duration-1000"
							style={{
								background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(59,130,246,0.08) 0%, transparent 50%)`,
							}}
						/>
						<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(139,92,246,0.08),transparent_50%)]" />
						<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(251,191,36,0.05),transparent_50%)]" />
						{/* Grid pattern */}
						<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-size-[72px_72px]" />
					</div>

					{/* Floating decorative elements */}
					<div className="absolute inset-0 overflow-hidden pointer-events-none">
						<motion.div
							className="absolute top-[15%] left-[8%] h-2 w-2 rounded-full bg-blue-400/40"
							animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
							transition={{
								duration: 6,
								repeat: Infinity,
								ease: 'easeInOut',
							}}
						/>
						<motion.div
							className="absolute top-[25%] right-[12%] h-1.5 w-1.5 rounded-full bg-violet-400/40"
							animate={{
								y: [15, -25, 15],
								x: [10, -10, 10],
							}}
							transition={{
								duration: 8,
								repeat: Infinity,
								ease: 'easeInOut',
							}}
						/>
						<motion.div
							className="absolute bottom-[30%] left-[15%] h-1 w-1 rounded-full bg-amber-400/50"
							animate={{ y: [-15, 15, -15] }}
							transition={{
								duration: 5,
								repeat: Infinity,
								ease: 'easeInOut',
							}}
						/>
						<motion.div
							className="absolute top-[60%] right-[20%] h-3 w-3 rounded-full bg-emerald-400/20"
							animate={{
								y: [10, -30, 10],
								scale: [1, 1.2, 1],
							}}
							transition={{
								duration: 7,
								repeat: Infinity,
								ease: 'easeInOut',
							}}
						/>
					</div>

					{/* Hero content */}
					<motion.div
						// style={{ opacity: heroOpacity }}
						className="relative z-10 flex min-h-svh items-center"
					>
						<div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 md:px-10 lg:px-14">
							<div className="grid items-center gap-16 lg:grid-cols-[1fr_380px]">
								{/* Text */}
								<motion.div
									initial={{ opacity: 0, y: 40 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 1,
										ease: [0.22, 1, 0.36, 1],
									}}
									className="max-w-xl"
								>
									{/* Status badge */}
									<motion.div
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{
											delay: 0.2,
											duration: 0.5,
										}}
									>
										<p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 dark:border-white/10 dark:bg-white/3 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] dark:text-white/60 backdrop-blur-md">
											<Sparkles className="h-3.5 w-3.5 text-amber-400/80" />
											About me
										</p>
									</motion.div>

									<h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
										<span className="block dark:text-white/90">
											The story
										</span>
										<span className="block mt-1">
											<span className="bg-linear-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
												behind the code.
											</span>
										</span>
									</h1>

									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{
											delay: 0.4,
											duration: 0.8,
										}}
										className="mt-7 text-base md:text-lg leading-8 dark:text-white/60 space-y-6"
									>
										I&apos;m a dedicated developer with a
										passion for building clean, efficient,
										and user-friendly applications. My
										journey started with simple scripts and
										has evolved into full-stack development
										using modern technologies.
									</motion.div>

									<motion.p
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{
											delay: 0.5,
											duration: 0.8,
										}}
										className="mt-4 text-lg leading-8 dark:text-white/50"
									>
										I focus on creating high-performance
										developer utilities, analyzing code
										optimizations, and refining user
										interfaces. I believe in software that
										is accessible, responsive, and
										completely secure, ensuring a premium
										experience for every user.
									</motion.p>

									{/* Quick facts — stacked chips */}
									<motion.div
										initial={{ opacity: 0, y: 16 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											delay: 0.6,
											duration: 0.6,
										}}
										className="mt-8 flex flex-wrap gap-3"
									>
										{[
											{
												icon: Code2,
												text: 'Full-stack engineer',
											},
											{
												icon: GraduationCap,
												text: 'Adelphi University',
											},
											{
												icon: MapPin,
												text: 'New York',
											},
										].map((fact) => {
											const Icon = fact.icon;
											return (
												<div
													key={fact.text}
													className="flex items-center gap-2 rounded-full border border-white/8 bg-white/3 px-3.5 py-2 text-sm dark:text-white/50 backdrop-blur-sm transition-all duration-300 hover:border-white/15 hover:text-white/70"
												>
													<Icon className="h-3.5 w-3.5 dark:text-white/30" />
													<span>{fact.text}</span>
												</div>
											);
										})}
									</motion.div>
								</motion.div>

								{/* Portrait Card — KEPT */}
								<motion.div
									initial={{ opacity: 0, scale: 0.92 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{
										duration: 1,
										delay: 0.3,
										ease: [0.22, 1, 0.36, 1],
									}}
									className="mx-auto w-full max-w-70 sm:max-w-[320px] lg:w-95 lg:max-w-none"
								>
									<div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-2 backdrop-blur-md transition-all duration-500 hover:border-white/20">
										{/* Rotating gradient border on hover */}
										<div className="absolute -inset-px rounded-3xl bg-linear-to-r from-blue-500/0 via-violet-500/0 to-fuchsia-500/0 opacity-0 transition-opacity duration-700 group-hover:from-blue-500/20 group-hover:via-violet-500/20 group-hover:to-fuchsia-500/20 group-hover:opacity-100" />
										<div className="relative overflow-hidden rounded-2xl">
											<div className="relative aspect-3/4 overflow-hidden rounded-2xl">
												<Image
													src="/me.jpg"
													alt="Joey Jazwinski"
													fill
													priority
													className="object-cover object-[center_15%] transition-transform duration-700 group-hover:scale-105"
													sizes="(max-width: 1024px) 320px, 380px"
													quality={90}
												/>
												<div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
												<div className="absolute inset-x-0 bottom-0 p-5">
													<p className="text-lg font-semibold text-white">
														Joey Jazwinski
													</p>
													<p className="mt-0.5 text-sm text-white/60">
														Developer &amp; Creator
													</p>
												</div>
											</div>
										</div>
									</div>
								</motion.div>
							</div>
						</div>
					</motion.div>

					{/* Scroll indicator */}
					<motion.div
						className="absolute inset-x-0 bottom-8 z-10 flex justify-center"
						animate={{ y: [0, 8, 0] }}
						transition={{
							duration: 2.5,
							repeat: Infinity,
							ease: 'easeInOut',
						}}
					>
						<div className="flex flex-col items-center gap-2">
							<div className="h-8 w-5 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
								<motion.div
									className="h-1.5 w-1.5 rounded-full bg-white/50"
									animate={{ y: [0, 8, 0] }}
									transition={{
										duration: 1.5,
										repeat: Infinity,
										ease: 'easeInOut',
									}}
								/>
							</div>
						</div>
					</motion.div>
				</section>

				{/* ═══════════════════════════════════════
				     Certifications — showcase of achievements and skills
				   ═══════════════════════════════════════ */}

				<section className="relative overflow-hidden">
					<div className="container mx-auto px-4 py-16">
						<h2 className="text-3xl font-bold dark:text-white mb-8">
							Certifications
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{certifications.map((cert, index) => (
								<div
									key={index}
									className="dark:bg-white/5 border dark:border-white/10 rounded-xl p-4 backdrop-blur-md"
								>
									<div className="mb-3 flex items-center gap-3">
										<CertificationIssuerLogo
											issuer={cert.issuer}
										/>
										<div>
											<h3 className="text-lg font-semibold dark:text-white">
												{cert.name}
											</h3>
											<p className="text-sm dark:text-white/60">
												{cert.issuer}
											</p>
										</div>
									</div>
									<div className="flex justify-between items-center w-full mt-2">
										<p className="text-sm dark:text-white/40">
											{cert.date}
										</p>
										<a
											href={cert.link}
											target="_blank"
											rel="noopener noreferrer"
											className="text-blue-400 hover:text-blue-300 text-sm inline-block"
										>
											View Certificate
										</a>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Professional Biography / Background section for SEO expansion */}
				<section className="relative overflow-hidden border-t border-white/5 bg-white/2">
					<div className="container mx-auto px-4 py-20 max-w-5xl space-y-12">
						<div className="space-y-4 text-center max-w-2xl mx-auto">
							<h2 className="text-3xl font-bold dark:text-white">
								Academic Focus & Technical Philosophy
							</h2>
							<p className="text-sm dark:text-white/60 leading-relaxed">
								As a student at Adelphi University, I combine
								academic computer science principles with
								practical software implementation. My goals
								center around developing tools that solve real
								problems, prioritizing performance, code
								cleanliness, and security.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
							<div className="space-y-3">
								<h3 className="text-lg font-semibold dark:text-white/90">
									Curriculum & Technical Foundations
								</h3>
								<p className="text-sm dark:text-white/50 leading-relaxed">
									My academic curriculum focuses on analysis
									of algorithms, data structures, and database
									optimization. Applying these topics to
									actual applications has allowed me to design
									backend APIs, structure database tables, and
									evaluate algorithmic execution speeds.
								</p>
							</div>

							<div className="space-y-3">
								<h3 className="text-lg font-semibold dark:text-white/90">
									Development Philosophy
								</h3>
								<p className="text-sm dark:text-white/50 leading-relaxed">
									I focus on writing accessible and clean
									code. Modern web applications require rapid
									render speeds and strict SEO standards. By
									leveraging frameworks like React and Next.js
									and styling with clean CSS layouts, I make
									sure platforms are responsive, search-engine
									crawlable, and lightweight.
								</p>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
};

export default AboutPage;
