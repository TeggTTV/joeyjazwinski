import React from 'react';
import { motion } from 'framer-motion';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Course } from '@/lib/mdx';
import { getFullUrl } from '@/utils/db';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { FaLock, FaCheckCircle, FaPlayCircle } from 'react-icons/fa';

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
					toast.error('Unauthorized. Please log in to view this course.');
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

	useEffect(() => {
		if (!router.isFallback && router.isReady) {
			const getCourseProgress = async () => {
				try {
					const response = await fetch(getFullUrl('/api/getCourseProgress'), {
						method: 'POST',
						credentials: 'include',
						body: slug,
					});

					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status}`);
					}

					const data = await response.json();
					console.log(data);

					const progressData: Record<string, string> = {};
					data.lessonProgress.forEach((lesson: { lessonSlug: string; completed: string }) => {
						console.log('Lesson:', lesson.lessonSlug, 'Completed:', lesson.completed);

						progressData[lesson.lessonSlug] = lesson.completed;
					});
					console.log('Progress Data:', progressData);

					setProgress(progressData);
				} catch (error) {
					console.error('Error fetching course progress:', error);
				}
			};

			getCourseProgress();
		}
	}, [router.isFallback, router.isReady, slug]);

	if (router.isFallback || !router.isReady) {
		return <div>Loading...</div>;
	}

	if (!course) {
		return <div>Course not found</div>;
	}

	// console.log('asds course:', course);
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
						'slug:',
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
			<div className="w-full bg-gray-200 rounded-full h-3 mb-4">
				<div
					className="bg-blue-600 h-3 rounded-full"
					style={{
						width: `${(Object.values(progress).filter((p) => p).length /
							course.order.length) *
							100
							}%`,
					}}
				></div>
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
						<motion.li
							key={lesson.id}
							className={`flex justify-between p-4 border rounded shadow ${!progress[lessonSlug] && 'hover:bg-blue-50'
								} relative ${progress[lessonSlug] ? 'bg-green-50' : ''
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
									className={`flex self-center items-center gap-2 px-4 py-2 rounded font-bold ${isLocked ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
									onClick={(e) => isLocked && e.preventDefault()}
								>
									{isLocked ? <FaLock /> : <FaPlayCircle />} {isLocked ? 'Locked' : 'Start'}
								</Link>
							)}
						</motion.li>
					);
				})}
			</ul>
		</section>
	);
}
