import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Camera, MapPin, X, ChevronLeft, ChevronRight } from 'lucide-react';

/* ─── photo data ─── */

const photos = [
	{
		src: '/photography/DSC01845.JPG',
		alt: 'Walking under cherry blossom trees in spring',
		title: 'Cherry Blossoms',
		location: 'Spring campus walk',
		category: 'Nature',
		description:
			'Natural framing through spring bloom — movement caught mid-step beneath a canopy of pink.',
	},
	{
		src: '/photography/Still 2026-04-16 211713_1.16.1.jpg',
		alt: 'Portrait in front of geometric campus sculpture at golden hour',
		title: 'Golden Hour',
		location: 'Campus sculpture',
		category: 'Portrait',
		description:
			'Golden-hour light softening hard geometry. The contrast between warm skin tone and cool metal.',
	},
	{
		src: '/photography/Still 2026-04-14 212114_1.1.1.jpg',
		alt: 'Yellow forsythia flowers behind a metal guardrail',
		title: 'Forsythia Light',
		location: 'Roadside bloom',
		category: 'Nature',
		description:
			'Industrial guardrail meets spring color — the tension between structure and organic growth.',
	},
];

const studies = [
	{
		label: 'Street',
		description:
			'Observing passing moments, repeating shapes, and the tension between movement and stillness.',
	},
	{
		label: 'Nature',
		description:
			'Capturing the interplay of organic form, seasonal color, and the light that defines atmosphere.',
	},
	{
		label: 'Low light',
		description:
			'Working with contrast, reflections, and the color shifts that only happen after sunset.',
	},
];

const PhotographyPage: React.FC = () => {
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

	const openLightbox = (index: number) => setLightboxIndex(index);
	const closeLightbox = () => setLightboxIndex(null);
	const prevImage = () =>
		setLightboxIndex((i) =>
			i !== null ? (i - 1 + photos.length) % photos.length : null,
		);
	const nextImage = () =>
		setLightboxIndex((i) =>
			i !== null ? (i + 1) % photos.length : null,
		);

	return (
		<>
			<NextSeo
				title="Photography | Joey Jazwinski"
				description="A photography page for Joey Jazwinski, focused on atmosphere, light, and visual storytelling."
				canonical="https://joeyjazwinski.com/photography"
			/>
			<main className="bg-background text-foreground">
				{/* ═══════════════════════════════════════
				     HERO — photography landing
				   ═══════════════════════════════════════ */}
				<section className="relative overflow-hidden bg-zinc-950">
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(251,191,36,0.10),transparent_50%)]" />
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_100%,rgba(236,72,153,0.06),transparent_50%)]" />

					<div className="mx-auto grid min-h-[65svh] max-w-7xl gap-12 px-6 pb-16 pt-28 sm:px-8 md:px-10 lg:grid-cols-[1fr_auto] lg:items-center lg:px-14">
						<motion.div
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.65, ease: 'easeOut' }}
							className="max-w-xl text-white"
						>
							<p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-amber-300/80 backdrop-blur-sm">
								<Camera className="h-3.5 w-3.5" />
								Photography
							</p>
							<h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
								Images that come from paying closer attention.
							</h1>
							<p className="mt-6 text-base leading-7 text-white/60 sm:text-lg">
								This side of the site is where I make room for
								frames, atmosphere, and the slower visual
								practice that sits next to my software work.
							</p>
							<div className="mt-8 flex flex-wrap gap-5 text-sm text-white/50">
								<div className="flex items-center gap-2">
									<Camera className="h-4 w-4" />
									<span>Street, nature, and portraits</span>
								</div>
								<div className="flex items-center gap-2">
									<MapPin className="h-4 w-4" />
									<span>
										Growing collection of visual work
									</span>
								</div>
							</div>
						</motion.div>

						{/* Featured photo card */}
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{
								duration: 0.75,
								ease: 'easeOut',
								delay: 0.15,
							}}
							className="mx-auto w-full max-w-sm lg:max-w-md"
						>
							<div
								className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-2 backdrop-blur-md transition-all duration-500 hover:border-white/20"
								onClick={() => openLightbox(0)}
							>
								<div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
									<Image
										src={photos[0].src}
										alt={photos[0].alt}
										fill
										priority
										className="object-cover transition-transform duration-700 group-hover:scale-105"
										sizes="400px"
										quality={85}
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
									<div className="absolute inset-x-0 bottom-0 p-5">
										<p className="text-lg font-semibold text-white">
											{photos[0].title}
										</p>
										<p className="mt-1 text-sm text-white/60">
											{photos[0].location}
										</p>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</section>

				{/* ═══════════════════════════════════════
				     GALLERY — all photos
				   ═══════════════════════════════════════ */}
				<section className="border-b border-border/50 bg-zinc-950">
					<div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 md:px-10 lg:px-14">
						<motion.div
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.55 }}
							className="mb-12"
						>
							<p className="text-sm font-medium uppercase tracking-[0.28em] text-amber-400/70">
								Gallery
							</p>
							<h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
								Selected work
							</h2>
						</motion.div>

						{/* Photo grid */}
						<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
							{photos.map((photo, index) => (
								<motion.div
									key={photo.src}
									initial={{ opacity: 0, y: 24 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, amount: 0.2 }}
									transition={{
										duration: 0.6,
										delay: index * 0.1,
									}}
									className="group cursor-pointer"
									onClick={() => openLightbox(index)}
								>
									<div className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/3 transition-all duration-300 hover:border-white/15">
										<div className="relative aspect-[4/5] overflow-hidden">
											<Image
												src={photo.src}
												alt={photo.alt}
												fill
												className="object-cover transition-transform duration-700 group-hover:scale-105"
												sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
												quality={85}
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-40" />
										</div>

										{/* Photo info */}
										<div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 transition-all duration-500 group-hover:translate-y-0">
											<span className="mb-2 inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-white/60 backdrop-blur-sm">
												{photo.category}
											</span>
											<p className="text-lg font-semibold text-white">
												{photo.title}
											</p>
											<p className="mt-1 text-sm text-white/55">
												{photo.location}
											</p>
										</div>

										{/* Frame number */}
										<div className="absolute right-4 top-4 text-xs uppercase tracking-[0.28em] text-white/30">
											{String(index + 1).padStart(
												2,
												'0',
											)}
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* ═══════════════════════════════════════
				     STUDIES — what I work on
				   ═══════════════════════════════════════ */}
				<section className="border-b border-border/50 bg-background">
					<div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 md:px-10 lg:px-14">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.55 }}
							className="mb-12"
						>
							<p className="text-sm font-medium uppercase tracking-[0.28em] text-primary/70">
								Focus areas
							</p>
							<h2 className="mt-4 max-w-lg text-3xl font-semibold tracking-tight sm:text-4xl">
								What I&apos;m studying through the lens.
							</h2>
						</motion.div>

						<div className="grid gap-6 md:grid-cols-3">
							{studies.map((study, index) => (
								<motion.article
									key={study.label}
									initial={{ opacity: 0, y: 22 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, amount: 0.35 }}
									transition={{
										duration: 0.5,
										delay: index * 0.08,
									}}
									className="group rounded-2xl border border-border/60 bg-card/50 p-8 transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-black/5"
								>
									<p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-500/70">
										{study.label}
									</p>
									<p className="mt-6 max-w-xs text-base leading-7 text-foreground/80">
										{study.description}
									</p>
								</motion.article>
							))}
						</div>
					</div>
				</section>

				{/* ═══════════════════════════════════════
				     CTA — where it goes next
				   ═══════════════════════════════════════ */}
				<section className="bg-background">
					<div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 md:px-10 lg:px-14">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.4 }}
							transition={{ duration: 0.55 }}
							className="relative overflow-hidden rounded-[2rem] border border-border/70 px-6 py-10 sm:px-10"
						>
							<div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800/95 to-zinc-900" />
							<div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(251,191,36,0.10),transparent_50%)]" />

							<div className="relative z-10 flex flex-col items-start justify-between gap-6 text-white lg:flex-row lg:items-end">
								<div className="max-w-2xl">
									<p className="text-sm font-medium uppercase tracking-[0.28em] text-amber-300/60">
										Where it goes next
									</p>
									<h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
										This gallery grows as new work is
										published. More frames to come.
									</h2>
									<p className="mt-4 text-base leading-7 text-white/55">
										Follow the journey, explore the projects
										side by side, or reach out if you want
										to collaborate.
									</p>
								</div>
								<div className="flex flex-col gap-3 sm:flex-row">
									<Link
										href="/contact"
										className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
									>
										Reach out
										<ArrowRight className="h-4 w-4" />
									</Link>
									<Link
										href="/"
										className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/8 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/14"
									>
										Back to home
									</Link>
								</div>
							</div>
						</motion.div>
					</div>
				</section>
			</main>

			{/* ═══════════════════════════════════════
			     LIGHTBOX — fullscreen photo viewer
			   ═══════════════════════════════════════ */}
			<AnimatePresence>
				{lightboxIndex !== null && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.25 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
						onClick={closeLightbox}
					>
						{/* Close */}
						<button
							onClick={closeLightbox}
							className="absolute right-5 top-5 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors duration-200 hover:bg-white/20 hover:text-white"
							aria-label="Close lightbox"
						>
							<X className="h-5 w-5" />
						</button>

						{/* Prev */}
						<button
							onClick={(e) => {
								e.stopPropagation();
								prevImage();
							}}
							className="absolute left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors duration-200 hover:bg-white/20 hover:text-white sm:left-6"
							aria-label="Previous image"
						>
							<ChevronLeft className="h-6 w-6" />
						</button>

						{/* Next */}
						<button
							onClick={(e) => {
								e.stopPropagation();
								nextImage();
							}}
							className="absolute right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors duration-200 hover:bg-white/20 hover:text-white sm:right-6"
							aria-label="Next image"
						>
							<ChevronRight className="h-6 w-6" />
						</button>

						{/* Image */}
						<motion.div
							key={lightboxIndex}
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							transition={{ duration: 0.2 }}
							className="relative max-h-[85vh] max-w-[90vw]"
							onClick={(e) => e.stopPropagation()}
						>
							<Image
								src={photos[lightboxIndex].src}
								alt={photos[lightboxIndex].alt}
								width={1200}
								height={900}
								className="max-h-[85vh] w-auto rounded-xl object-contain"
								quality={95}
							/>
							{/* Caption */}
							<div className="absolute inset-x-0 bottom-0 rounded-b-xl bg-gradient-to-t from-black/80 to-transparent p-6">
								<p className="text-lg font-semibold text-white">
									{photos[lightboxIndex].title}
								</p>
								<p className="mt-1 max-w-md text-sm text-white/60">
									{photos[lightboxIndex].description}
								</p>
							</div>
						</motion.div>

						{/* Dots indicator */}
						<div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
							{photos.map((_, i) => (
								<button
									key={i}
									onClick={(e) => {
										e.stopPropagation();
										setLightboxIndex(i);
									}}
									className={`h-2 w-2 rounded-full transition-all duration-200 ${
										i === lightboxIndex
											? 'w-6 bg-white'
											: 'bg-white/30 hover:bg-white/50'
									}`}
									aria-label={`View photo ${i + 1}`}
								/>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default PhotographyPage;
