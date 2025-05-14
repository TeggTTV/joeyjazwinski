import React from 'react';
import { motion } from 'framer-motion';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Course } from '@/lib/mdx';
import { getFullUrl } from '@/utils/db';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { FaLock, FaCheckCircle, FaPlayCircle, FaStar } from 'react-icons/fa';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const getCourse = async () => {
		try {
			const response = await fetch(getFullUrl('/api/getCourseData'), {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({ slug: params?.slug }),
			});

			if (!response.ok) {
				if (response.status === 401) {
					toast.error(
						'Unauthorized. Please log in to view this course.'
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
	const { slug: querySlug } = router.query;

	const [progress, setProgress] = useState<Record<string, string>>({});
	const [starHovered, setStarHovered] = useState(0);
	const [selectedRating, setSelectedRating] = useState(0);
	const [userRating, setUserRating] = useState<number | null>(null);
	const [loading, setLoading] = useState(true);
	const [courseData, setCourseData] = useState<Course | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			if (!querySlug) return;
			try {
				const response = await fetch(getFullUrl('/api/getCourseData'), {
					method: 'POST',
					credentials: 'include',
					body: JSON.stringify({ slug: querySlug }),
				});

				if (!response.ok) throw new Error('Failed to fetch course data');

				const data = await response.json();
				setCourseData(data);
			} catch (error) {
				console.error('Error fetching course data:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [querySlug]);

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
					}
				);

				if (!response.ok) {
					throw new Error(
						`HTTP error! status: ${response.status}`
					);
				}

				const data = await response.json();
				const progressData: Record<string, string> = {};
				data.lessonProgress.forEach(
					(lesson: { lessonSlug: string; completed: string }) => {
						progressData[lesson.lessonSlug] = lesson.completed;
					}
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
						body: JSON.stringify({ slug }),
					}
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
					}
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
						data
					);
					return;
				}
				const progressData: Record<string, string> = {};
				data.lessonProgress.forEach(
					(lesson: { lessonSlug: string; completed: string }) => {
						progressData[lesson.lessonSlug] = lesson.completed;
					}
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

	if(!progress) {
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
				body: JSON.stringify({ slug, rating }),
			});

			if (!response.ok) {
				if (response.status === 409) {
					toast.info('You have already rated this course.');
					return;
				}
				throw new Error('Failed to submit rating');
			}

			setSelectedRating(rating); // Update the selected rating state
			setUserRating(rating); // Hide the rating section by setting userRating
		} catch (error) {
			console.error('Error submitting rating:', error);
			toast.error('Failed to submit rating. Please try again later.');
		}
	};


	return (
		<section className="max-w-5xl px-10 mx-auto">
			<motion.h1
				className="text-3xl font-bold mb-4"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
			>
				{course.title}
			</motion.h1>

			<motion.p
				className="text-gray-700 mb-6"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.1 }}
			>
				{course.description}
			</motion.p>
			{/* Inside <section> after title */}
			<div className="flex items-center justify-between mb-6">
				<div className="w-full bg-gray-200 rounded-full h-3">
					<div
						className="bg-blue-600 h-3 rounded-full"
						style={{
							width: `${
								(Object.values(progress).filter((p) => p)
									.length /
									course.order.length) *
								100
							}%`,
						}}
					></div>
				</div>
				{!userRating && (
					<div className="ml-6">
						<h3 className="text-lg font-semibold">
							Rate this Course:
						</h3>
						<div className="flex items-center gap-2">
							{[1, 2, 3, 4, 5].map((star) => (
								<FaStar
									key={star}
									className={`cursor-pointer transition-colors duration-200 ${
										selectedRating >= star ||
										starHovered >= star
											? 'text-yellow-500'
											: 'text-gray-300'
									}`}
									onMouseEnter={() => setStarHovered(star)}
									onMouseLeave={() => setStarHovered(0)}
									onClick={() => handleRating(star)}
									style={{ fontSize: '1.5rem' }}
								/>
							))}
						</div>
						<p className="text-sm text-gray-500 mt-2">
							{Array.isArray(course.rating)
								? course.rating.length
								: 0}{' '}
							total ratings
							{userRating && (
								<span> (Your rating: {userRating})</span>
							)}
						</p>
					</div>
				)}
			</div>
			<p className="text-sm text-gray-500 mb-6">
				{Object.values(progress).filter((p) => p).length} of{' '}
				{course.order.length} lessons completed
			</p>

			{/* Lesson List */}
			<ul className="space-y-4">
				{course.order.map((lessonSlug, index) => {
					const lesson = course.lessons.find(
						(l) => l.slug === lessonSlug
					);

					if (!lesson) return null;

					const isCompleted = progress[lesson.slug];
					const isLocked = isLessonLocked(index);

					return (
						<li key={lesson.id}>
							<motion.div
								className={`flex justify-between p-4 border rounded shadow ${
									!progress[lessonSlug] && 'hover:bg-blue-50'
								} relative ${
									progress[lessonSlug] ? 'bg-green-50' : ''
								}`}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
							>
								<div className="flex items-center justify-between">
									<div>
										<div className="block text-lg font-medium text-blue-600">
											{lesson.title}
										</div>
										<p className="text-gray-600 text-sm mt-1">
											{lesson.description}
										</p>
									</div>
								</div>
								{isCompleted ? (
									<FaCheckCircle className="self-center text-green-600 text-2xl" />
								) : (
									<Link
										href={`/courses/${slug}/${lesson.slug}`}
										className={`flex self-center items-center gap-2 px-4 py-2 rounded font-bold ${
											isLocked
												? 'bg-gray-400 text-gray-700 cursor-not-allowed'
												: 'bg-blue-600 text-white hover:bg-blue-700'
										}`}
										onClick={(e) =>
											isLocked && e.preventDefault()
										}
									>
										{isLocked ? (
											<FaLock />
										) : (
											<FaPlayCircle />
										)}{' '}
										{isLocked ? 'Locked' : 'Start'}
									</Link>
								)}
							</motion.div>
						</li>
					);
				})}
			</ul>
			{/* <div>
				<h1>{courseData?.title}</h1>
				<p>{courseData?.description}</p>
				<div>Duration: {courseData?.duration} minutes</div>
				<div>Lessons: {courseData?.lessons.length}</div>
			</div> */}
		</section>
	);
}
