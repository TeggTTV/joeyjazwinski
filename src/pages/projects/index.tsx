import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Code2, X, Play } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import FloatingParticles from '@/components/LandingPage/FloatingParticles';
import { seoProjects } from '@/lib/seoConfig';

// Project data structure
interface Project {
	id: number;
	title: string;
	description: string;
	longDescription: string;
	thumbnail: string;
	link: string;
	github?: string;
	tags: string[];
	category: 'Web' | 'Game' | 'Other';
	gallery: {
		type: 'image' | 'video';
		src: string;
		alt?: string;
	}[];
}

// Sample projects - replace with your actual projects
const projects: Project[] = [
	{
		id: 5,
		title: 'Resellz',
		description:
			'A SaaS which aims to increase profits by providing expert data analysis and recommendations for resellers.',
		longDescription:
			'A SaaS which aims to increase profits by providing expert data analysis and recommendations for resellers.',
		thumbnail: '/images/resellz/1.png',
		link: 'https://resellz.vercel.app',
		github: 'https://github.com/TeggTTV/resellz',
		category: 'Web',
		tags: ['React', 'TypeScript', 'TailwindCSS'],
		gallery: [
			{
				type: 'image',
				src: '/images/resellz/1.png',
				alt: 'Hero',
			},
			{
				type: 'image',
				src: '/images/resellz/2.png',
				alt: 'Features',
			},
			{
				type: 'image',
				src: '/images/resellz/3.png',
				alt: 'Testimonials',
			},
		],
	},
	{
		id: 1,
		title: 'Sample Site',
		description:
			'A placeholder site I made to showcase my web development skills.',
		longDescription:
			'A placeholder site I made to showcase my web development skills.',
		thumbnail: '/images/placeholdersite/1.png',
		link: 'https://placeholdersitetd.vercel.app',
		github: 'https://github.com/TeggTTV/saleswebsite',
		category: 'Web',
		tags: ['React', 'TypeScript', 'TailwindCSS'],
		gallery: [
			{
				type: 'image',
				src: '/images/placeholdersite/1.png',
				alt: 'Hero',
			},
			{
				type: 'image',
				src: '/images/placeholdersite/2.png',
				alt: 'Features',
			},
			{
				type: 'image',
				src: '/images/placeholdersite/3.png',
				alt: 'Testimonials',
			},
			{
				type: 'image',
				src: '/images/placeholdersite/4.png',
				alt: 'Contact',
			},
		],
	},
	{
		id: 4,
		title: 'Sample SaaS Landing Page',
		description:
			'A sample SaaS buisiness landing page I made to showcase my web development skills.',
		longDescription:
			'A sample SaaS buisiness landing page I made to showcase my web development skills.',
		category: 'Web',
		thumbnail: '/images/saaslandingtd/1.png',
		link: 'https://saaslandingtd.vercel.app',
		github: 'https://github.com/TeggTTV/saas-landing',
		tags: ['React', 'TypeScript', 'TailwindCSS'],
		gallery: [
			{
				type: 'image',
				src: '/images/saaslandingtd/1.png',
				alt: 'Hero',
			},
			{
				type: 'image',
				src: '/images/saaslandingtd/2.png',
				alt: 'Hero 2',
			},
			{
				type: 'image',
				src: '/images/saaslandingtd/3.png',
				alt: 'Testimonials',
			},
			{
				type: 'image',
				src: '/images/saaslandingtd/4.png',
				alt: 'Pricing',
			},
		],
	},
	{
		id: 2,
		title: 'Drag',
		category: 'Game',
		description:
			'A challenging 2D top-down drag racing game where players strategically upgrade their cars and master gear-shifting to outpace rivals.',
		longDescription:
			'A challenging 2D top-down drag racing game where players strategically upgrade their cars and master gear-shifting to outpace rivals.',
		thumbnail: '/images/drag/1.png',
		link: 'https://drag-racing.vercel.app',
		github: 'https://github.com/TeggTTV/drag-racing',
		tags: ['React', 'TypeScript', 'JSAudio'],
		gallery: [
			{
				type: 'image',
				src: '/images/drag/1.png',
				alt: 'Main Menu',
			},
			{
				type: 'image',
				src: '/images/drag/2.png',
				alt: 'Racing',
			},
			{
				type: 'image',
				src: '/images/drag/3.png',
				alt: 'Junkyard',
			},
			{
				type: 'image',
				src: '/images/drag/4.png',
				alt: 'Inventory',
			},
		],
	},
	{
		id: 3,
		title: 'Adelphi AI Society Website',
		category: 'Web',
		description:
			'A website for the Adelphi AI Society, showcasing the organization"s mission, projects, and upcoming events.',
		longDescription:
			'A website for the Adelphi AI Society, showcasing the organization"s mission, projects, and upcoming events.',
		thumbnail: '/images/adelphiaisociety/1.png',
		link: 'https://adelphiaisociety.vercel.app',
		github: 'https://github.com/TeggTTV/adelphiaiclub',
		tags: ['React', 'TypeScript', 'TailwindCSS'],
		gallery: [
			{
				type: 'image',
				src: '/images/adelphiaisociety/1.png',
				alt: 'Hero',
			},
			{
				type: 'image',
				src: '/images/adelphiaisociety/2.png',
				alt: 'Members',
			},
			{
				type: 'image',
				src: '/images/adelphiaisociety/3.png',
				alt: 'Events',
			},
			{
				type: 'image',
				src: '/images/adelphiaisociety/4.png',
				alt: 'FAQ',
			},
		],
	},

	// {
	// 	id: 3,
	// 	title: '3d Game',
	// 	category: 'Game',
	// 	description: 'An unfinished 3d-minecraft-like game I made. ',
	// 	longDescription: 'An unfinished 3d-minecraft-like game I made. ',
	// 	thumbnail: '/images/3dgame/1.png',
	// 	link: 'https://tegg-3dgame.web.app',
	// 	github: undefined,
	// 	tags: ['React', 'TypeScript', 'Three.js'],
	// 	gallery: [
	// 		{
	// 			type: 'image',
	// 			src: '/images/3dgame/1.png',
	// 			alt: 'Hero',
	// 		},
	// 		{
	// 			type: 'image',
	// 			src: '/images/3dgame/2.png',
	// 			alt: 'Members',
	// 		},
	// 		{
	// 			type: 'image',
	// 			src: '/images/3dgame/3.png',
	// 			alt: 'Events',
	// 		},
	// 		{
	// 			type: 'image',
	// 			src: '/images/3dgame/4.png',
	// 			alt: 'FAQ',
	// 		},
	// 	],
	// },
];

export default function ProjectsPage() {
	const [selectedProject, setSelectedProject] = useState<Project | null>(
		null,
	);
	const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);
	const [filter, setFilter] = useState<'All' | 'Web' | 'Game'>('All');

	const filteredProjects = projects.filter(
		(p) => filter === 'All' || p.category === filter,
	);

	return (
		<>
			<NextSeo {...seoProjects} />
			<main className="min-h-screen py-20 px-4 relative overflow-hidden bg-zinc-950">
				{/* Animated background particles */}
				<FloatingParticles />

				{/* Gradient mesh background — toned down */}
				<div className="absolute inset-0 bg-gradient-to-b from-primary/3 via-transparent to-transparent pointer-events-none" />
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.08),transparent)] pointer-events-none" />

				<div className="max-w-7xl mx-auto relative z-10">
					{/* Header Section */}
					<motion.div
						className="text-center mb-16"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						{/* Badge */}
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.2, duration: 0.5 }}
							className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
						>
							<Code2 className="w-4 h-4 text-primary" />
							<span className="text-sm font-medium text-primary">
								Portfolio Showcase
							</span>
						</motion.div>

						<h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 text-white">
							My <span className="text-shimmer">Projects</span>
						</h1>
						<p className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
							A collection of projects I&apos;ve built, showcasing
							my skills in web development, software engineering,
							and creative problem-solving.
						</p>
					</motion.div>

					{/* Filter Buttons */}
					<motion.div
						className="flex justify-center gap-3 mb-12"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
					>
						{(['All', 'Web', 'Game'] as const).map((category) => (
							<motion.button
								key={category}
								onClick={() => setFilter(category)}
								className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
									filter === category
										? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
										: 'bg-card/80 backdrop-blur-sm hover:bg-muted text-muted-foreground border border-border hover:border-primary/30'
								}`}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								{category}
							</motion.button>
						))}
					</motion.div>

					{/* Projects Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
						{filteredProjects.map((project, index) => (
							<motion.div
								key={project.id}
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.5,
									delay: index * 0.1,
								}}
								className="group cursor-pointer"
								onClick={() => {
									setSelectedProject(project);
									setSelectedGalleryIndex(0);
								}}
							>
								<div className="bg-card/80 backdrop-blur-md border border-border/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 h-full flex flex-col hover:border-primary/30">
									{/* Thumbnail */}
									<div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
										<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

										{/* Project image */}
										<Image
											src={project.thumbnail}
											alt={project.title}
											fill
											className="object-cover group-hover:scale-110 transition-transform duration-700"
										/>

										{/* Click hint */}
										<div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
											<motion.div
												className="bg-primary/90 text-primary-foreground px-6 py-3 rounded-full font-medium shadow-lg"
												initial={{
													scale: 0.8,
													opacity: 0,
												}}
												whileHover={{ scale: 1 }}
												animate={{
													scale: 1,
													opacity: 1,
												}}
											>
												Click to view details
											</motion.div>
										</div>
									</div>

									{/* Content */}
									<div className="p-6 flex-1 flex flex-col">
										<h3 className="text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors duration-300">
											{project.title}
										</h3>
										<p className="text-white/55 mb-4 flex-1 leading-relaxed">
											{project.description}
										</p>

										{/* Tags */}
										<div className="flex flex-wrap gap-2 mb-4">
											{project.tags.map((tag) => (
												<span
													key={tag}
													className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20 font-medium"
												>
													{tag}
												</span>
											))}
										</div>

										{/* View Details hint */}
										<div className="text-primary text-sm font-medium flex items-center gap-2">
											<span>View Details</span>
											<ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>

					{/* CTA Section */}
					<motion.div
						className="mt-20 text-center"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.5 }}
					>
						<div className="bg-card/60 backdrop-blur-md border border-border/50 rounded-3xl p-8 md:p-12 relative overflow-hidden">
							{/* Background decorative elements */}
							<div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
							<div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

							<div className="relative z-10">
								<h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
									Interested in working together?
								</h2>
								<p className="text-white/55 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
									I&apos;m always open to discussing new
									projects, creative ideas, or opportunities
									to be part of your vision.
								</p>
								<div className="flex flex-col sm:flex-row gap-4 justify-center">
									<Link
										href="/contact"
										className="group bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-8 rounded-full font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 inline-flex items-center justify-center gap-2"
									>
										Get In Touch
										<ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
									</Link>
									<Link
										href="/"
										className="bg-card/80 backdrop-blur-sm hover:bg-muted text-foreground border border-border hover:border-primary/30 py-3 px-8 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300"
									>
										Back to Home
									</Link>
								</div>
							</div>
						</div>
					</motion.div>
				</div>

				{/* Side Panel */}
				<AnimatePresence>
					{selectedProject && (
						<>
							{/* Backdrop */}
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.3 }}
								className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
								onClick={() => setSelectedProject(null)}
							/>

							{/* Side Panel */}
							<motion.div
								initial={{ x: '100%' }}
								animate={{ x: 0 }}
								exit={{ x: '100%' }}
								transition={{
									type: 'spring',
									damping: 30,
									stiffness: 300,
								}}
								className="fixed right-0 top-0 h-full w-full md:w-3/4 bg-background border-l border-border shadow-2xl z-50 overflow-y-auto"
							>
								<div className="relative">
									{/* Close Button */}
									<button
										onClick={() => setSelectedProject(null)}
										className="absolute top-6 right-6 z-10 bg-background/80 backdrop-blur-sm hover:bg-background text-foreground p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
									>
										<X className="w-6 h-6" />
									</button>

									{/* Content */}
									<div className="p-8 md:p-12">
										{/* Header */}
										<div className="mb-8">
											<div className="flex items-center gap-3 mb-4">
												<Code2 className="w-8 h-8 text-primary" />
												<h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
													{selectedProject.title}
												</h2>
											</div>
											<p className="text-muted-foreground text-lg mb-6">
												{
													selectedProject.longDescription
												}
											</p>

											{/* Tags */}
											<div className="flex flex-wrap gap-2 mb-6">
												{selectedProject.tags.map(
													(tag) => (
														<span
															key={tag}
															className="px-4 py-2 bg-primary/10 text-primary rounded-full border border-primary/20 font-medium"
														>
															{tag}
														</span>
													),
												)}
											</div>

											{/* Action Buttons */}
											<div className="flex flex-wrap gap-4">
												<motion.a
													href={selectedProject.link}
													target="_blank"
													rel="noopener noreferrer"
													className="bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
													whileHover={{ scale: 1.05 }}
													whileTap={{ scale: 0.95 }}
												>
													<ExternalLink className="w-5 h-5" />
													Visit Project
												</motion.a>
												{selectedProject.github && (
													<motion.a
														href={
															selectedProject.github
														}
														target="_blank"
														rel="noopener noreferrer"
														className="bg-foreground hover:bg-foreground/90 text-background py-3 px-6 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
														whileHover={{
															scale: 1.05,
														}}
														whileTap={{
															scale: 0.95,
														}}
													>
														<Github className="w-5 h-5" />
														View Code
													</motion.a>
												)}
											</div>
										</div>

										{/* Gallery */}
										<div className="space-y-6">
											<h3 className="text-2xl font-bold mb-4">
												Project Gallery
											</h3>

											{/* Main Display */}
											<div className="relative aspect-video bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl overflow-hidden shadow-xl">
												{selectedProject.gallery[
													selectedGalleryIndex
												].type === 'image' ? (
													<Image
														src={
															selectedProject
																.gallery[
																selectedGalleryIndex
															].src
														}
														alt={
															selectedProject
																.gallery[
																selectedGalleryIndex
															].alt ||
															selectedProject.title
														}
														fill
														className="object-cover"
													/>
												) : (
													<div className="w-full h-full flex items-center justify-center">
														<div className="text-center">
															<Play className="w-20 h-20 text-primary/50 mx-auto mb-4" />
															<p className="text-muted-foreground">
																Video player
																would go here
															</p>
														</div>
													</div>
												)}
											</div>

											{/* Thumbnail Grid */}
											<div className="grid grid-cols-3 md:grid-cols-4 gap-4">
												{selectedProject.gallery.map(
													(item, index) => (
														<motion.div
															key={index}
															className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
																index ===
																selectedGalleryIndex
																	? 'border-primary shadow-lg scale-105'
																	: 'border-border hover:border-primary/50'
															}`}
															onClick={() =>
																setSelectedGalleryIndex(
																	index,
																)
															}
															whileHover={{
																scale:
																	index ===
																	selectedGalleryIndex
																		? 1.05
																		: 1.02,
															}}
															whileTap={{
																scale: 0.98,
															}}
														>
															{item.type ===
															'image' ? (
																<Image
																	src={
																		item.src
																	}
																	alt={
																		item.alt ||
																		`Gallery ${
																			index +
																			1
																		}`
																	}
																	fill
																	className="object-cover"
																/>
															) : (
																<div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
																	<Play className="w-8 h-8 text-primary" />
																</div>
															)}
														</motion.div>
													),
												)}
											</div>
										</div>
									</div>
								</div>
							</motion.div>
						</>
					)}
				</AnimatePresence>
			</main>
		</>
	);
}
