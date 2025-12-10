import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Code2, X, Play } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

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
	gallery: {
		type: 'image' | 'video';
		src: string;
		alt?: string;
	}[];
}

// Sample projects - replace with your actual projects
const projects: Project[] = [
	{
		id: 1,
		title: 'Drag',
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
		id: 2,
		title: 'Adelphi AI Society Website',
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
	{
		id: 3,
		title: '3d Game',
		description: 'An unfinished 3d-minecraft-like game I made. ',
		longDescription: 'An unfinished 3d-minecraft-like game I made. ',
		thumbnail: '/images/3dgame/1.png',
		link: 'https://tegg-3dgame.web.app',
		github: undefined,
		tags: ['React', 'TypeScript', 'Three.js'],
		gallery: [
			{
				type: 'image',
				src: '/images/3dgame/1.png',
				alt: 'Hero',
			},
			{
				type: 'image',
				src: '/images/3dgame/2.png',
				alt: 'Members',
			},
			{
				type: 'image',
				src: '/images/3dgame/3.png',
				alt: 'Events',
			},
			{
				type: 'image',
				src: '/images/3dgame/4.png',
				alt: 'FAQ',
			},
		],
	},
];

const seoProjects = {
	title: 'Projects | Joseph Jazwinski',
	description:
		'Explore my portfolio of web development projects, applications, and software solutions.',
	canonical: 'https://yourwebsite.com/projects',
	openGraph: {
		title: 'Projects | Joseph Jazwinski',
		description:
			'Explore my portfolio of web development projects, applications, and software solutions.',
		url: 'https://yourwebsite.com/projects',
		type: 'website',
	},
};

export default function ProjectsPage() {
	const [selectedProject, setSelectedProject] = useState<Project | null>(
		null
	);
	const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);

	return (
		<>
			<NextSeo {...seoProjects} />
			<main className="min-h-screen py-20 px-4 relative overflow-hidden">
				{/* Animated background gradient */}
				<div className="absolute inset-0 pointer-events-none" />

				{/* Decorative blobs */}
				<div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
				<div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />

				<div className="max-w-7xl mx-auto relative z-10">
					{/* Header Section */}
					<motion.div
						className="text-center mb-16"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<div className="flex items-center justify-center gap-3 mb-6">
							<Code2 className="w-10 h-10 text-primary" />
							<h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
								My Projects
							</h1>
						</div>
						<p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
							A collection of projects I&apos;ve built, showcasing
							my skills in web development, software engineering,
							and creative problem-solving.
						</p>
					</motion.div>

					{/* Projects Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
						{projects.map((project, index) => (
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
								<div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
									{/* Thumbnail */}
									<div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
										<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

										{/* Project image */}
										<Image
											src={project.thumbnail}
											alt={project.title}
											fill
											className="object-cover group-hover:scale-110 transition-transform duration-500"
										/>

										{/* Click hint */}
										<div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
											<div className="bg-primary/90 text-primary-foreground px-6 py-3 rounded-full font-medium shadow-lg">
												Click to view details
											</div>
										</div>
									</div>

									{/* Content */}
									<div className="p-6 flex-1 flex flex-col">
										<h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
											{project.title}
										</h3>
										<p className="text-muted-foreground mb-4 flex-1">
											{project.description}
										</p>

										{/* Tags */}
										<div className="flex flex-wrap gap-2 mb-4">
											{project.tags.map((tag) => (
												<span
													key={tag}
													className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
												>
													{tag}
												</span>
											))}
										</div>

										{/* View Details hint */}
										<div className="text-primary text-sm font-medium flex items-center gap-2">
											<span>View Details</span>
											<ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
						<div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12">
							<h2 className="text-3xl md:text-4xl font-bold mb-4">
								Interested in working together?
							</h2>
							<p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
								I&apos;m always open to discussing new projects,
								creative ideas, or opportunities to be part of
								your vision.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Link
									href="/contact"
									className="bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-8 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center gap-2"
								>
									Get In Touch
									<ExternalLink className="w-4 h-4" />
								</Link>
								<Link
									href="/"
									className="bg-card hover:text-white hover:bg-accent text-foreground border border-border py-3 px-8 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300"
								>
									Back to Home
								</Link>
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
													)
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
																	index
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
													)
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
