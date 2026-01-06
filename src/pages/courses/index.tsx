import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getFullUrl } from '@/utils/db';
import { Course } from '@/lib/mdx';
import { Search, Clock, Star, ArrowRight, BookOpen } from 'lucide-react';
import { NextSeo } from 'next-seo';
// import { seoCourses } from '@/lib/seoConfig';

const calculateAverageRating = (
	ratings: { userId: string; rating: number }[] | any[] | null | undefined
) => {
	let safeRatings = ratings;
	if (
		safeRatings &&
		typeof safeRatings === 'object' &&
		!Array.isArray(safeRatings) &&
		'set' in safeRatings
	) {
		safeRatings = (safeRatings as any).set;
	}

	if (!Array.isArray(safeRatings) || safeRatings.length === 0)
		return 'No Ratings';
	const total = safeRatings.reduce((sum, item) => {
		if (typeof item === 'number') return sum + item;
		if (item && typeof item === 'object' && 'rating' in item)
			return sum + item.rating;
		return sum;
	}, 0);
	return (total / safeRatings.length).toFixed(1);
};

const CoursesPage = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [loading, setLoading] = useState(true);
	const [courses, setCourses] = useState<Course[]>([]);

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

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen bg-background">
				<div className="loader" />
			</div>
		);
	}

	const filteredCourses = courses.filter((course) =>
		course.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<>
			{/* <NextSeo {...seoCourses} /> */}
			<main className="min-h-screen bg-background py-16 px-4 sm:px-6 md:px-8 relative overflow-hidden">
				{/* Background decoration */}
				<div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
				<div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10" />

				{/* Hero Section */}
				<motion.div
					className="text-center max-w-3xl mx-auto mb-16"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
						Curated Courses
					</h1>
					<p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
						Explore a comprehensive library of courses designed to
						elevate your engineering skills.
					</p>

					<div className="relative max-w-lg mx-auto">
						<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
						<input
							type="text"
							placeholder="Search for a topic..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm text-foreground placeholder:text-muted-foreground"
						/>
					</div>
				</motion.div>

				{/* Courses Grid */}
				<div className="max-w-7xl mx-auto">
					{filteredCourses.length > 0 ? (
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
							{filteredCourses.map((course) => (
								<motion.div
									key={course.slug}
									variants={{
										hidden: { opacity: 0, y: 20 },
										visible: { opacity: 1, y: 0 },
									}}
									className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300"
								>
									<div className="p-8 flex-grow flex flex-col">
										<div className="flex justify-between items-start mb-4">
											<div className="p-2 bg-primary/10 rounded-lg text-primary">
												<BookOpen className="w-6 h-6" />
											</div>
											{course.rating && (
												<div className="flex items-center text-sm font-medium bg-secondary/50 px-2 py-1 rounded-md">
													<Star
														className="w-3.5 h-3.5 text-yellow-500 mr-1.5"
														fill="currentColor"
													/>
													{calculateAverageRating(
														course.rating
													)}
												</div>
											)}
										</div>

										<h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
											{course.title}
										</h2>
										<p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
											{course.description}
										</p>

										<div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-4 border-t border-border/50">
											<div className="flex items-center gap-1.5">
												<Clock className="w-3.5 h-3.5" />
												<span>
													{course.duration
														? `${course.duration} min`
														: 'Self-paced'}
												</span>
											</div>
											<div className="flex items-center gap-1.5">
												<span>
													{course.lessons.length}{' '}
													Lessons
												</span>
											</div>
										</div>
									</div>

									<div className="px-6 pb-6">
										<Link
											href={`/courses/${course.slug}`}
											className="flex items-center justify-center w-full py-3 bg-secondary hover:bg-primary hover:text-white text-secondary-foreground font-medium rounded-xl transition-colors gap-2"
										>
											Start Learning
											<ArrowRight className="w-4 h-4" />
										</Link>
									</div>
								</motion.div>
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
				</div>
			</main>
		</>
	);
};

export default CoursesPage;
