import { motion } from 'framer-motion';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Course } from '@/lib/mdx';
import { getFullUrl } from '@/utils/db';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { FaLock, FaCheckCircle, FaPlayCircle, FaStar } from 'react-icons/fa';
import { FEATURES } from '@/config/features';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	if (!FEATURES.COURSES_ENABLED) {
		return {
			redirect: {
				destination: '/projects',
				permanent: false,
			},
		};
	}
	const getCourse = async () => {
		try {
			const response = await fetch(getFullUrl('/api/getCourseData'), {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ slug: params?.slug }),
			});

			if (!response.ok) {
				if (response.status === 401) {
					toast.error(
						'Unauthorized. Please log in to view this course.',
					);
					return null;
				}
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching course data:', error);
			return null;
		}
	};

	const courseResponse = await getCourse();

	if (!courseResponse || !courseResponse.course) {
		return { notFound: true };
	}

	return { props: { course: courseResponse.course, slug: params?.slug } };
};

export default function CoursePage({
	course,
	slug,
}: {
	course: Course;
	slug: string;
}) {
	const router = useRouter();

	const [progress, setProgress] = useState<Record<string, string>>({});
	const [starHovered, setStarHovered] = useState(0);
	const [selectedRating, setSelectedRating] = useState(0);
	const [userRating, setUserRating] = useState<number | null>(null);
	const [loading] = useState(true);
	const [] = useState<Course | null>(null);

	useEffect(() => {
		const getCourseProgress = async () => {
			if (router.isFallback || !router.isReady) return;
			try {
				const response = await fetch(
					getFullUrl('/api/getCourseProgress'),
					{
						method: 'POST',
						credentials: 'include',
						body: slug,
					},
				);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				const progressData: Record<string, string> = {};
				data.lessonProgress.forEach(
					(lesson: { lessonSlug: string; completed: string }) => {
						progressData[lesson.lessonSlug] = lesson.completed;
					},
				);
				setProgress(progressData);
			} catch (error) {
				console.error('Error fetching course progress:', error);
			}
		};

		getCourseProgress();
	}, [router.isFallback, router.isReady, slug]);

	useEffect(() => {
		const fetchRatingData = async () => {
			try {
				const response = await fetch(
					getFullUrl('/api/getCourseRating'),
					{
						method: 'POST',
						credentials: 'include',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ slug }),
					},
				);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				if (data.userRating) {
					setUserRating(data.userRating);
					setSelectedRating(data.userRating);
				}
			} catch (error) {
				console.error('Error fetching rating data:', error);
			}
		};

		fetchRatingData();
	}, [slug]);

	useEffect(() => {
		const getCourseProgress = async () => {
			try {
				const response = await fetch(
					getFullUrl('/api/getCourseProgress'),
					{
						method: 'POST',
						credentials: 'include',
						body: slug,
					},
				);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				return data;
			} catch (error) {
				console.error('Error fetching course progress:', error);
				return null;
			}
		};
		getCourseProgress()
			.then((data) => {
				if (!data || !data.courseProgress) {
					console.log(
						'No progress found for course:',
						course.title,
						slug,
						data,
					);
					return;
				}
				const progressData: Record<string, string> = {};
				data.lessonProgress.forEach(
					(lesson: { lessonSlug: string; completed: string }) => {
						progressData[lesson.lessonSlug] = lesson.completed;
					},
				);
				console.log('Progress data:', data, progressData);

				setProgress(progressData);
			})
			.catch((error) => {
				console.error('Error fetching course progress:', error);
			});
	}, [slug, course.title]);

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="loader" />
			</div>
		);
	}

	if (router.isFallback || !router.isReady) {
		return <div>Loading...</div>;
	}

	if (!course) {
		return <div>Course not found</div>;
	}

	if (!progress) {
		return <div>Progress not found</div>;
	}

	// console.log('asds course:', course);
	// eslint-disable-next-line react-hooks/rules-of-hooks

	const isLessonLocked = (index: number) => {
		if (!course.progressional) return false;
		if (index === 0) return false; // First lesson is always unlocked
		const previousLessonSlug = course.order[index - 1];
		// console.log('Previous lesson slug:', previousLessonSlug, progress);

		const previousLessonProgress = progress[previousLessonSlug];
		// console.log(previousLessonProgress, progress, course.order[index - 1]);

		if (previousLessonProgress) return false;
		return true;
	};

	// Update the `handleRating` function to hide the rating section after submission
	const handleRating = async (rating: number) => {
		try {
			const response = await fetch(getFullUrl('/api/addRating'), {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ slug, rating }),
			});

			if (!response.ok) {
				if (response.status === 409) {
					toast.info('You have already rated this course.');
					return;
				}
				throw new Error(
					`Failed to submit rating: ${response.status} ${response.statusText}`,
				);
			}

			setSelectedRating(rating); // Update the selected rating state
			setUserRating(rating); // Hide the rating section by setting userRating
		} catch (error) {
			console.error('Error submitting rating:', error);
			toast.error('Failed to submit rating. Please try again later.');
		}
	};

	return (
		<section className="min-h-screen pt-30 pb-16 px-4 sm:px-6 md:px-10 relative overflow-hidden">
			{/* Background decorations */}
			<div className="absolute top-0 right-0 w-150 h-150 bg-linear-to-bl from-primary/10 via-purple-500/5 to-transparent rounded-full blur-3xl -z-10" />
			<div className="absolute bottom-0 left-0 w-125 h-125 bg-linear-to-tr from-blue-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl -z-10" />

			<div className="max-w-5xl mx-auto">
				{/* Back Button */}
				<div className="mb-8">
					<Link
						href="/courses"
						className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors hover-lift"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="m15 18-6-6 6-6" />
						</svg>
						Back to Courses
					</Link>
				</div>

				<motion.h1
					className="text-3xl sm:text-4xl font-bold mb-4"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
				>
					{course.title}
				</motion.h1>

				<motion.p
					className="text-muted-foreground mb-8 text-lg"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.1 }}
				>
					{course.description}
				</motion.p>

				{/* Progress Bar & Rating */}
				<div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-6 mb-8">
					<div className="flex-1">
						<div className="flex items-center justify-between mb-2">
							<span className="text-sm font-medium text-muted-foreground">
								Course Progress
							</span>
							<span className="text-sm font-bold text-primary">
								{Math.round(
									(Object.values(progress).filter((p) => p)
										.length /
										course.order.length) *
										100,
								)}
								%
							</span>
						</div>
						<div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
							<motion.div
								initial={{ width: 0 }}
								animate={{
									width: `${(Object.values(progress).filter((p) => p).length / course.order.length) * 100}%`,
								}}
								transition={{ duration: 0.8, delay: 0.2 }}
								className="bg-linear-to-r from-primary via-purple-500 to-pink-500 h-3 rounded-full"
							/>
						</div>
					</div>

					<div className="flex flex-col items-end">
						<span className="text-sm font-semibold mb-2 text-muted-foreground">
							Rate this Course
						</span>
						{!userRating ? (
							<div className="flex items-center gap-1 bg-card p-2 rounded-xl border border-border">
								{[1, 2, 3, 4, 5].map((star) => (
									<motion.button
										key={star}
										whileHover={{ scale: 1.2 }}
										whileTap={{ scale: 0.9 }}
										onClick={() => handleRating(star)}
										onMouseEnter={() =>
											setStarHovered(star)
										}
										onMouseLeave={() => setStarHovered(0)}
										className="focus:outline-none"
									>
										<FaStar
											className={`w-6 h-6 transition-colors duration-200 ${
												selectedRating >= star ||
												starHovered >= star
													? 'text-yellow-400 drop-shadow-[0_0_4px_rgba(250,204,21,0.5)]'
													: 'text-muted-foreground/30'
											}`}
										/>
									</motion.button>
								))}
							</div>
						) : (
							<div className="flex flex-col items-end gap-2">
								<div className="flex items-center gap-1 bg-card p-2 rounded-xl border border-border">
									{[1, 2, 3, 4, 5].map((star) => (
										<div key={star}>
											<FaStar
												className={`w-6 h-6 transition-colors duration-200 ${
													userRating >= star
														? 'text-yellow-400 drop-shadow-[0_0_4px_rgba(250,204,21,0.5)]'
														: 'text-muted-foreground/30'
												}`}
											/>
										</div>
									))}
								</div>
								<div className="text-sm font-medium text-green-500 bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20">
									✓ You rated this course
								</div>
							</div>
						)}
						{!userRating && (
							<p className="text-xs text-muted-foreground mt-1">
								Click to rate
							</p>
						)}
					</div>
				</div>

				{/* Stats Bar */}
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8 text-sm text-muted-foreground bg-card border border-border p-4 rounded-2xl shadow-sm"
				>
					<div className="flex items-center gap-2">
						<div className="p-2 bg-primary/10 rounded-lg">
							<FaPlayCircle className="text-primary" />
						</div>
						<span className="font-medium">
							{course.lessons.length} Lessons
						</span>
					</div>
					<div className="w-px h-8 bg-border hidden sm:block" />
					<div className="flex items-center gap-2">
						<div className="p-2 bg-green-500/10 rounded-lg">
							<FaCheckCircle className="text-green-500" />
						</div>
						<span className="font-medium">
							{Object.values(progress).filter((p) => p).length}{' '}
							Completed
						</span>
					</div>
					<div className="w-px h-8 bg-border hidden sm:block" />
					<div className="flex items-center gap-2">
						<div className="p-2 bg-yellow-500/10 rounded-lg">
							<FaStar className="text-yellow-500" />
						</div>
						<span className="font-medium">
							{Array.isArray(course.rating)
								? course.rating.length
								: course.rating &&
									  typeof course.rating === 'object' &&
									  'set' in course.rating
									? (course.rating as any).set.length
									: 0}{' '}
							Ratings
						</span>
					</div>
				</motion.div>

				{/* Lesson List */}
				<div className="space-y-4">
					<h2 className="text-xl font-bold mb-4">Course Lessons</h2>
					<ul className="space-y-3">
						{(course.order && course.order.length > 0
							? course.order
							: course.lessons.map((l) => l.slug)
						).map((lessonSlug, index) => {
							const lesson = course.lessons.find(
								(l) => l.slug === lessonSlug,
							);

							if (!lesson) return null;

							const isCompleted = progress[lesson.slug];
							const isLocked = isLessonLocked(index);

							return (
								<motion.li
									key={lesson.id}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: index * 0.05 }}
								>
									<div
										className={`flex items-center justify-between p-4 sm:p-5 rounded-xl border transition-all ${
											isCompleted
												? 'bg-green-500/10 border-green-500/30'
												: isLocked
													? 'bg-card/50 border-border/50 opacity-60'
													: 'bg-card border-border hover:border-primary/50 hover:shadow-md'
										}`}
									>
										<div className="flex items-center gap-4 flex-1">
											<div
												className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
													isCompleted
														? 'bg-green-500 text-white'
														: isLocked
															? 'bg-muted text-muted-foreground'
															: 'bg-primary/10 text-primary'
												}`}
											>
												{isCompleted ? (
													<FaCheckCircle />
												) : (
													index + 1
												)}
											</div>
											<div className="flex-1">
												<h3
													className={`font-semibold ${
														isCompleted
															? 'text-green-600 dark:text-green-400'
															: isLocked
																? 'text-muted-foreground'
																: 'text-foreground'
													}`}
												>
													{lesson.title}
												</h3>
												<p className="text-sm text-muted-foreground line-clamp-1">
													{lesson.description}
												</p>
											</div>
										</div>

										{isCompleted ? (
											<div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-600 dark:text-green-400 rounded-lg font-medium text-sm">
												<FaCheckCircle />
												Completed
											</div>
										) : (
											<Link
												href={`/courses/${slug}/${lesson.slug}`}
												className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
													isLocked
														? 'bg-muted text-muted-foreground cursor-not-allowed'
														: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20'
												}`}
												onClick={(e) =>
													isLocked &&
													e.preventDefault()
												}
											>
												{isLocked ? (
													<>
														<FaLock />
														Locked
													</>
												) : (
													<>
														<FaPlayCircle />
														Start
													</>
												)}
											</Link>
										)}
									</div>
								</motion.li>
							);
						})}
					</ul>
				</div>
			</div>
		</section>
	);
}
