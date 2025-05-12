import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Course } from '@/lib/mdx';
import { getFullUrl } from '@/utils/db';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { FaLock, FaCheckCircle, FaPlayCircle } from 'react-icons/fa';

// const courseData: Record<string, Course> = {
// 	'javascript-essentials': {
// 		title: 'JavaScript Essentials',
// 		description:
// 			'Master the fundamentals of JavaScript with interactive lessons.',
// 		progressional: true, // Added progressional flag
// 		lessons: [
// 			{
// 				id: 1,
// 				title: 'Variables & Data Types',
// 				slug: 'variables-data-types',
// 				description:
// 					'Learn about var, let, const, and primitive data types.',
// 			},
// 			{
// 				id: 2,
// 				title: 'Functions & Scope',
// 				slug: 'functions-scope',
// 				description:
// 					'Understand how functions work and variable scope.',
// 			},
// 			{
// 				id: 3,
// 				title: 'DOM Manipulation',
// 				slug: 'dom-manipulation',
// 				description:
// 					'Interact with the HTML document using JavaScript.',
// 			},
// 			{
// 				id: 4,
// 				title: 'Events',
// 				slug: 'events',
// 				description:
// 					'Learn how to handle user interactions with events.',
// 			},
// 			{
// 				id: 5,
// 				title: 'ES6 Features',
// 				slug: 'es6-features',
// 				description:
// 					'Explore modern JavaScript features like arrow functions and destructuring.',
// 			},
// 			{
// 				id: 6,
// 				title: 'Asynchronous JavaScript',
// 				slug: 'asynchronous-javascript',
// 				description: 'Understand callbacks, promises, and async/await.',
// 			},
// 			{
// 				id: 7,
// 				title: 'Error Handling',
// 				slug: 'error-handling',
// 				description:
// 					'Learn how to handle errors gracefully in your code.',
// 			},
// 			{
// 				id: 8,
// 				title: 'Project - To-Do List App',
// 				slug: 'todo-app',
// 				description:
// 					'Build a simple To-Do List application using JavaScript.',
// 			},
// 		],
// 	},
// };

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

	// const getCourseProgress = async () => {
	// 	try {
	// 		const response = await fetch(getFullUrl('/api/getCourseProgress'), {
	// 			method: 'POST',
	// 			credentials: 'include',
	// 			body: JSON.stringify({ slug: params?.slug }),
	// 		});

	// 		if (!response.ok) {
	// 			if(response.status === 401) {
	// 				toast.error('Unauthorized. Please log in to view your course progress.');
	// 				return null;
	// 			}
	// 			throw new Error(`HTTP error! status: ${response.status}`);
	// 		}

	// 		const data = await response.json();
	// 		return data;
	// 	}
	// 	catch (error) {
	// 		console.error('Error fetching course progress:', error);
	// 		return null;
	// 	}
	// };

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
					const progressData: Record<string, string> = {};
					data.lessons.forEach((lesson: { lessonSlug: string; completed: string }) => {

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

	const isLessonLocked = (index: number) => {
		if (!course.progressional) return false;

		// Unlock the next lesson if the previous one in the order is completed
		if (index === 0) return false; // First lesson is never locked

		const previousLessonSlug = course.order[index - 1];
		return !progress[previousLessonSlug];
	};

	return (
		<section className="max-w-5xl px-6 mx-auto">
			{/* Hero Section */}
			<div className="bg-blue-600 text-white p-8 rounded-lg mb-8">
				<h1 className="text-4xl font-bold mb-2">{course.title}</h1>
				<p className="text-lg">{course.description}</p>
			</div>

			{/* Progress Tracker */}
			<div className="mb-8">
				<div className="w-full bg-gray-200 rounded-full h-4">
					<div
						className="bg-blue-600 h-4 rounded-full"
						style={{
							width: `${(Object.values(progress).filter((p) => p).length / course.order.length) * 100}%`,
						}}
					></div>
				</div>
				<p className="text-sm text-gray-500 mt-2">
					{Object.values(progress).filter((p) => p).length} of {course.order.length} lessons completed
				</p>
			</div>

			{/* Lesson List */}
			<ul className="space-y-4">
				{course.order.map((lessonSlug, index) => {
					const lesson = course.lessons.find((l) => l.slug === lessonSlug);
					if (!lesson) return null;

					const isCompleted = progress[lesson.slug];
					const isLocked = isLessonLocked(index);

					return (
						<li
							key={lesson.id}
							className={`p-4 border rounded-lg shadow flex items-center justify-between ${isCompleted ? 'bg-green-50' : ''}`}
						>
							<div>
								<h3 className="text-lg font-medium text-blue-600">{lesson.title}</h3>
								<p className="text-sm text-gray-600">{lesson.description}</p>
							</div>
							{isCompleted ? (
								<FaCheckCircle className="text-green-600 text-2xl" />
							) : (
								<Link
									href={`/courses/${slug}/${lesson.slug}`}
									className={`flex items-center gap-2 px-4 py-2 rounded font-bold ${isLocked ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
									onClick={(e) => isLocked && e.preventDefault()}
								>
									{isLocked ? <FaLock /> : <FaPlayCircle />} {isLocked ? 'Locked' : 'Start'}
								</Link>
							)}
						</li>
					);
				})}
			</ul>
		</section>
	);
}
