import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import {
	ArrowRight,
	Code2,
	Camera,
	MapPin,
	GraduationCap,
	Mail,
} from 'lucide-react';

/* ─── journey timeline data ─── */

const journeyItems = [
	{
		year: '2018',
		title: 'Started Coding',
		description:
			'It was the sixth grade when my buddy showed me how to send an alert box through the console. This along with watching the whip-and-naenae was the most exciting thing that had happened.',
		emoji: '🖥️',
	},
	{
		year: '2019',
		title: 'Built My First Webpage',
		description:
			'I created my first webpage using HTML and CSS. These were the days where my older brother Kevin and I would go to the library and code together. Those experiences shaped me into the programmer I am today.',
		emoji: '📱',
	},
	{
		year: '2020',
		title: 'Figured Out Python',
		description:
			'It was a long time coming but I finally decided to take on learning Python! I started by making some simple scripts, but instantly improved. I ended up making a script to automatically type coding time-trials for the school — some of the times reaching 260+ wpm!',
		emoji: '🐍',
	},
	{
		year: '2021',
		title: 'Created My First Web App',
		description:
			'After coding for a few years now, I really got the hang of JavaScript and it seemed like I mastered it. After looking at some tutorials on YouTube, I made a fully functional webpage and hosted it via Firebase.',
		emoji: '🎉',
	},
	{
		year: '2022',
		title: 'Sharing My Journey',
		description:
			'Now that I had practically mastered JavaScript, I wanted to teach others so I can share my wisdom and hopefully gain a coding buddy.',
		emoji: '🚀',
	},
	{
		year: '2023',
		title: 'Continuing to Learn and Grow',
		description:
			'Over the next year I got caught up with life and started to drift away from my passion. But soon enough I realized my mistake and came crawling back to improve even more.',
		emoji: '🌱',
	},
	{
		year: '2024',
		title: "Excited for What's Next!",
		description:
			"Heading into Senior year of high school with so much coding experience. Now that I'm graduating and going to Adelphi, I plan on making a difference on the world by creating unique projects that inspire others.",
		emoji: '🎊',
	},
];

/* ─── skills / tools ─── */

const skills = [
	{ name: 'React / Next.js', level: 95 },
	{ name: 'TypeScript', level: 90 },
	{ name: 'Node.js', level: 85 },
	{ name: 'Python', level: 80 },
	{ name: 'TailwindCSS', level: 95 },
	{ name: 'Photography / Lightroom', level: 75 },
];

/* ─── component ─── */

const AboutPage: React.FC = () => {
	return (
		<>
			<NextSeo
				title="About Me | Joey Jazwinski"
				description="Learn more about Joey Jazwinski — a software engineer, photographer, and builder studying at Adelphi University."
				canonical="https://joeyjazwinski.com/about"
			/>
			<main className="bg-zinc-950 text-white">
				{/* ═══════════════════════════════════════
				     HERO — about intro
				   ═══════════════════════════════════════ */}
				<section className="relative overflow-hidden">
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(59,130,246,0.10),transparent_50%)]" />
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(251,191,36,0.06),transparent_50%)]" />

					<div className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-28 sm:px-8 md:px-10 lg:grid-cols-[1fr_auto] lg:items-center lg:px-14">
						{/* Text */}
						<motion.div
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.65, ease: 'easeOut' }}
							className="max-w-xl"
						>
							<p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-primary/80 backdrop-blur-sm">
								About me
							</p>
							<h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
								Hey, I&apos;m Joey.
							</h1>
							<p className="mt-6 text-base leading-7 text-white/60 sm:text-lg">
								I&apos;m a dedicated developer with a passion
								for building clean, efficient, and user-friendly
								applications. My journey started with simple
								scripts and has evolved into full-stack
								development using modern technologies.
							</p>
							<p className="mt-4 text-base leading-7 text-white/60 sm:text-lg">
								When I&apos;m not coding, I&apos;m behind a
								camera — capturing everyday moments with the
								same intentionality I bring to my engineering
								work.
							</p>

							<div className="mt-8 flex flex-wrap gap-5 text-sm text-white/50">
								<div className="flex items-center gap-2">
									<Code2 className="h-4 w-4" />
									<span>Full-stack engineer</span>
								</div>
								<div className="flex items-center gap-2">
									<Camera className="h-4 w-4" />
									<span>Photographer</span>
								</div>
								<div className="flex items-center gap-2">
									<GraduationCap className="h-4 w-4" />
									<span>Adelphi University</span>
								</div>
								<div className="flex items-center gap-2">
									<MapPin className="h-4 w-4" />
									<span>New York</span>
								</div>
							</div>
						</motion.div>

						{/* Portrait */}
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{
								duration: 0.75,
								ease: 'easeOut',
								delay: 0.15,
							}}
							className="mx-auto w-full max-w-[280px] sm:max-w-[320px] lg:w-[380px] lg:max-w-none"
						>
							<div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-2 backdrop-blur-md transition-all duration-500 hover:border-white/20">
								<div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
									<Image
										src="/me.jpg"
										alt="Joey Jazwinski"
										fill
										priority
										className="object-cover object-[center_15%] transition-transform duration-700 group-hover:scale-105"
										sizes="(max-width: 1024px) 320px, 380px"
										quality={90}
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
									<div className="absolute inset-x-0 bottom-0 p-5">
										<p className="text-lg font-semibold text-white">
											Joey Jazwinski
										</p>
										<p className="mt-0.5 text-sm text-white/60">
											Developer &amp; Photographer
										</p>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</section>

				{/* ═══════════════════════════════════════
				     SKILLS — progress bars
				   ═══════════════════════════════════════ */}
				<section className="border-b border-white/5">
					<div className="mx-auto max-w-5xl px-6 py-20 sm:px-8 md:px-10 lg:px-14">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.55 }}
							className="mb-12"
						>
							<p className="text-sm font-medium uppercase tracking-[0.28em] text-primary/70">
								Toolkit
							</p>
							<h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
								What I work with
							</h2>
						</motion.div>

						<div className="grid gap-6 sm:grid-cols-2">
							{skills.map((skill, index) => (
								<motion.div
									key={skill.name}
									initial={{ opacity: 0, x: -16 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true, amount: 0.4 }}
									transition={{
										duration: 0.4,
										delay: index * 0.08,
									}}
								>
									<div className="flex items-center justify-between mb-2">
										<span className="text-sm font-medium text-white/80">
											{skill.name}
										</span>
										<span className="text-xs text-white/40">
											{skill.level}%
										</span>
									</div>
									<div className="h-2 overflow-hidden rounded-full bg-white/5">
										<motion.div
											className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60"
											initial={{ width: 0 }}
											whileInView={{
												width: `${skill.level}%`,
											}}
											viewport={{ once: true }}
											transition={{
												duration: 1,
												delay: 0.3 + index * 0.08,
												ease: 'easeOut',
											}}
										/>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* ═══════════════════════════════════════
				     TIMELINE — coding journey
				   ═══════════════════════════════════════ */}
				<section className="border-b border-white/5">
					<div className="mx-auto max-w-5xl px-6 py-20 sm:px-8 md:px-10 lg:px-14">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.55 }}
							className="mb-14"
						>
							<p className="text-sm font-medium uppercase tracking-[0.28em] text-primary/70">
								Timeline
							</p>
							<h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
								My journey so far
							</h2>
						</motion.div>

						<div className="relative">
							{/* Vertical line */}
							<div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-white/10 to-transparent" />

							<div className="flex flex-col gap-10">
								{journeyItems.map((item, index) => (
									<motion.div
										key={item.year}
										initial={{ opacity: 0, y: 24 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{
											once: true,
											amount: 0.3,
										}}
										transition={{
											duration: 0.5,
											delay: index * 0.06,
										}}
										className="relative flex gap-6 pl-2"
									>
										{/* Dot */}
										<div className="relative z-10 mt-1.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-zinc-900 text-lg">
											{item.emoji}
										</div>

										{/* Card */}
										<div className="group flex-1 rounded-2xl border border-white/8 bg-white/3 p-6 transition-all duration-300 hover:border-white/15 hover:bg-white/5">
											<div className="mb-2 flex items-center gap-3">
												<span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
													{item.year}
												</span>
												<h3 className="text-lg font-semibold text-white">
													{item.title}
												</h3>
											</div>
											<p className="text-sm leading-6 text-white/50">
												{item.description}
											</p>
										</div>
									</motion.div>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* ═══════════════════════════════════════
				     CTA — let's connect
				   ═══════════════════════════════════════ */}
				<section>
					<div className="mx-auto max-w-5xl px-6 py-20 sm:px-8 md:px-10 lg:px-14">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.4 }}
							transition={{ duration: 0.55 }}
							className="relative overflow-hidden rounded-[2rem] border border-white/8 px-6 py-10 sm:px-10"
						>
							<div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800/95 to-zinc-900" />
							<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.10),transparent_50%)]" />

							<div className="relative z-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
								<div className="max-w-xl">
									<p className="text-sm font-medium uppercase tracking-[0.28em] text-white/40">
										Let&apos;s connect
									</p>
									<h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
										Interested in working together or just
										want to chat?
									</h2>
									<p className="mt-4 text-base leading-7 text-white/50">
										Whether it&apos;s a project idea, a
										photography question, or just a
										conversation about code — I&apos;d love
										to hear from you.
									</p>
								</div>
								<div className="flex flex-col gap-3 sm:flex-row">
									<Link
										href="/contact"
										className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
									>
										Get in touch
										<Mail className="h-4 w-4" />
									</Link>
									<Link
										href="/projects"
										className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/8 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/14"
									>
										View projects
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

export default AboutPage;
