import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getFullUrl } from '@/utils/db';
import { Course } from '@/lib/mdx';
import { Search, SortAsc } from 'lucide-react'; // Restore lucide-react
import { FiLayers, FiBook, FiArrowRight, FiCheckCircle } from 'react-icons/fi'; // Keep react-icons for new features
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { seoCourses } from '@/lib/seoConfig'; // Restore
import CourseCard from '@/components/Course/CourseCard'; // Restore
import CourseCardSkeleton from '@/components/Course/CourseCardSkeleton'; // Restore
import { calculateAverageRating } from '@/utils/courseUtils'; // Restore

// ... (other imports)

import { GetServerSideProps } from 'next';
import { FEATURES } from '@/config/features';

export const getServerSideProps: GetServerSideProps = async () => {
	if (!FEATURES.COURSES_ENABLED) {
		return {
			redirect: {
				destination: '/projects',
				permanent: false,
			},
		};
	}
	return { props: {} };
};

interface Track {
	id: string;
	title: string;
	description: string;
	slug: string;
	courseSlugs: string[];
}

const CoursesPage = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [loading, setLoading] = useState(true);
	const [courses, setCourses] = useState<Course[]>([]);
	const [completedCourses, setCompletedCourses] = useState<
		Record<string, boolean>
	>({});
	const [tracks, setTracks] = useState<Track[]>([]);

	// Sort State
	const [sortBy, setSortBy] = useState<
		'title' | 'duration' | 'rating' | 'lessons'
	>('title');
	const [isSortOpen, setIsSortOpen] = useState(false);

	useEffect(() => {
		const fetchTracks = async () => {
			try {
				const res = await fetch('/api/getCourseTracks');
				if (res.ok) {
					const data = await res.json();
					setTracks(data);
				}
			} catch (error) {
				console.error('Error fetching tracks:', error);
			}
		};
		fetchTracks();
	}, []);

	useEffect(() => {
		const fetchProgress = async () => {
			try {
				const response = await fetch(
					getFullUrl('/api/getAllUserCourseProgress'),
				);
				if (response.ok) {
					const data = await response.json();
					setCompletedCourses(data.progress || {});
				}
			} catch (error) {
				console.error('Error fetching progress:', error);
			}
		};
		fetchProgress();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(getFullUrl('/api/getCourses'), {
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include',
				});

				if (!response.ok) throw new Error('Failed to fetch courses');

				const data = await response.json();
				setCourses(data.data || []);
			} catch (error) {
				console.error('Error fetching courses:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	// Filter and Sort Logic
	const filteredAndSortedCourses = courses
		.filter((course) => {
			const lowerTerm = searchTerm.toLowerCase();
			const matchesTitle = course.title.toLowerCase().includes(lowerTerm);
			const matchesDescription = course.description
				?.toLowerCase()
				.includes(lowerTerm);

			return matchesTitle || matchesDescription;
		})
		.sort((a, b) => {
			if (sortBy === 'title') {
				return a.title.localeCompare(b.title);
			}
			if (sortBy === 'duration') {
				return (a.duration || 0) - (b.duration || 0);
			}
			if (sortBy === 'lessons') {
				return a.lessons.length - b.lessons.length;
			}
			if (sortBy === 'rating') {
				const ratingA = parseFloat(
					calculateAverageRating(a.rating) as string,
				);
				const ratingB = parseFloat(
					calculateAverageRating(b.rating) as string,
				);
				// Handle "No Ratings" (NaN)
				const valA = isNaN(ratingA) ? 0 : ratingA;
				const valB = isNaN(ratingB) ? 0 : ratingB;
				return valB - valA; // Descending for rating
			}
			return 0;
		});

	return (
		<>
			<NextSeo {...seoCourses} />

			<main className="min-h-screen pt-32 pb-16 px-4 relative overflow-hidden dark:bg-zinc-950">
				{/* ... (background decoration) */}
				<div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
				<div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10" />

				{/* Hero Section */}
				<motion.div
					className="text-center max-w-3xl mx-auto mb-16"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
						<span className="relative flex h-2 w-2">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
							<span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
						</span>
						Available Now
					</div>
					<h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
						Master Modern{' '}
						<span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-600">
							Development
						</span>
					</h1>
					<p className="text-lg text-muted-foreground mb-8 leading-relaxed">
						Comprehensive, project-based courses designed to take
						you from beginner to expert. Learn by building
						real-world applications.
					</p>

					{/* Quick Stats/Badges */}
					<div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-muted-foreground">
						<div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card">
							<FiBook className="text-primary" /> {courses.length}{' '}
							Courses
						</div>
						<div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card">
							<FiLayers className="text-primary" />{' '}
							{tracks.length} Learning Paths
						</div>
						<div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card">
							<FiCheckCircle className="text-primary" />{' '}
							{courses.reduce(
								(acc, c) => acc + (c.lessons?.length || 0),
								0,
							)}{' '}
							Lessons
						</div>
					</div>
				</motion.div>

				<div className="max-w-7xl mx-auto">
					{/* Course Tracks Section */}
					{tracks.length > 0 && !loading && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="mb-16"
						>
							<div className="flex items-center gap-3 mb-6">
								<FiLayers className="text-primary w-6 h-6" />
								<h2 className="text-2xl font-bold">
									Learning Paths
								</h2>
							</div>

							<div className="flex gap-6 overflow-x-auto pb-6 snap-x">
								{tracks.map((track) => (
									<Link
										key={track.id}
										href={`/tracks/${track.slug}`}
										className="snap-center shrink-0 w-87.5 bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-md group flex flex-col"
									>
										<div className="flex justify-between items-start mb-4">
											<div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
												<FiLayers size={24} />
											</div>
											<span className="text-xs font-bold px-2 py-1 bg-secondary rounded text-muted-foreground">
												{track.courseSlugs.length}{' '}
												Courses
											</span>
										</div>

										<h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
											{track.title}
										</h3>
										<p className="text-sm text-muted-foreground mb-6 line-clamp-2 grow">
											{track.description}
										</p>

										<div className="flex items-center text-primary text-sm font-medium mt-auto group-hover:gap-2 transition-all">
											Start Path{' '}
											<FiArrowRight className="ml-1" />
										</div>
									</Link>
								))}
							</div>
						</motion.div>
					)}

					{/* Filter/Sort Controls for Courses */}
					<div className="flex flex-col md:flex-row gap-4 mb-8">
						<div className="relative grow">
							<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
							<input
								type="text"
								placeholder="Search courses..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm text-foreground placeholder:text-muted-foreground"
							/>
						</div>

						{/* Custom Sort Dropdown */}
						<div className="relative min-w-50">
							<button
								onClick={() => setIsSortOpen(!isSortOpen)}
								onBlur={() =>
									setTimeout(() => setIsSortOpen(false), 200)
								}
								className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm text-foreground flex items-center justify-between text-left"
							>
								<SortAsc className="absolute left-4 w-5 h-5 text-muted-foreground" />
								<span className="truncate">
									{sortBy === 'title' && 'Alphabetical'}
									{sortBy === 'rating' && 'Highest Rated'}
									{sortBy === 'duration' &&
										'Duration (Shortest)'}
									{sortBy === 'lessons' && 'Lesson Count'}
								</span>
								<svg
									className={`w-4 h-4 text-muted-foreground transition-transform ${
										isSortOpen ? 'rotate-180' : ''
									}`}
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</button>

							{isSortOpen && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 10 }}
									className="absolute top-full mt-2 left-0 right-0 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden"
								>
									{[
										{
											label: 'Alphabetical',
											value: 'title',
										},
										{
											label: 'Highest Rated',
											value: 'rating',
										},
										{
											label: 'Duration (Shortest)',
											value: 'duration',
										},
										{
											label: 'Lesson Count',
											value: 'lessons',
										},
									].map((option) => (
										<button
											key={option.value}
											onClick={() => {
												setSortBy(option.value as any);
												setIsSortOpen(false);
											}}
											className={`w-full text-left px-4 py-3 hover:bg-secondary/50 transition-colors ${
												sortBy === option.value
													? 'bg-primary/5 text-primary font-medium'
													: 'text-foreground'
											}`}
										>
											{option.label}
										</button>
									))}
								</motion.div>
							)}
						</div>
					</div>

					{/* Courses Grid */}
					{loading ? (
						<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
							{[1, 2, 3, 4, 5, 6].map((i) => (
								<CourseCardSkeleton key={i} />
							))}
						</div>
					) : tracks.length === 0 && courses.length === 0 ? (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="text-center py-20 bg-card border border-border rounded-2xl border-dashed"
						>
							<FiBook className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-30" />
							<h3 className="text-xl font-bold text-muted-foreground">
								No Courses Available
							</h3>
							<p className="text-muted-foreground mt-2">
								Check back soon for new content!
							</p>
						</motion.div>
					) : filteredAndSortedCourses.length > 0 ? (
						<motion.div
							className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
							initial="hidden"
							animate="visible"
							variants={{
								visible: {
									transition: { staggerChildren: 0.1 },
								},
								hidden: {},
							}}
						>
							{filteredAndSortedCourses.map((course) => (
								<CourseCard
									key={course.slug}
									course={course}
									isCompleted={
										!!completedCourses[course.slug]
									}
								/>
							))}
						</motion.div>
					) : (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="text-center py-20"
						>
							<p className="text-xl text-muted-foreground">
								No courses found matching your search.
							</p>
						</motion.div>
					)}
					{/* Informational SEO text block */}
					<div className="mt-20 p-8 rounded-2xl bg-card/50 border border-border/80 max-w-4xl mx-auto space-y-6 text-left">
						<h2 className="text-2xl font-bold text-foreground">
							Our Learning Methodologies & Tech Curriculum
						</h2>
						<p className="text-sm text-muted-foreground leading-relaxed">
							Master modern software engineering concepts through
							practical, build-oriented guides. This educational
							platform features guided curriculum paths designed
							for self-paced software engineers, designers, and
							systems architects wanting to expand their coding
							capabilities.
						</p>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
							<div className="space-y-2">
								<h3 className="text-base font-semibold text-foreground">
									Project-Driven Education
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									We believe the most efficient way to acquire
									technical competence is by constructing
									working assets from scratch. Each course
									outlines clear architectural diagrams, API
									setups, database design structures, and
									client styling considerations rather than
									raw syntax memorization.
								</p>
							</div>
							<div className="space-y-2">
								<h3 className="text-base font-semibold text-foreground">
									Structured Track Paths
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Navigate learning tracks matching modern
									engineering domains. From advanced frontend
									interfaces with React/Next.js to secure
									backend container management, our modular
									curriculum paths group related skills
									together to build progressive competence.
								</p>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default CoursesPage;
