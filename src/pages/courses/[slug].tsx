import { GetServerSideProps } from 'next';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { Course } from '@/lib/mdx';
import { getFullUrl } from '@/utils/db';
import { useRouter } from 'next/router';

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
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching course data:', error);
			return null;
		}
	};

	const response = await getCourse();

	if (!response || !response.course) {
		return { notFound: true };
	}

	return { props: { course: response.course, slug: params?.slug } };
};

export default function CoursePage({
	course,
	slug,
}: {
	course: Course;
	slug: string;
}) {
	const router = useRouter();

	if (router.isFallback) {
		// console.log('Loading...');

		return <div>Loading...</div>;
	}

	if (!router.isReady) {
		// console.log('Router not ready:', router.isReady);
		return <div>Loading...</div>;
	}

	if (!course) {
		console.log(
			'Course not found:',
			course,
			'slug:',
			slug,
			'response:',
			response
		);
		return <div>Course not found</div>;
	}

	// console.log('course:', course, 'slug:', slug);

	const [progress, setProgress] = useState<Record<string, string>>({});
	// console.log('asds course:', course);
	useEffect(() => {
		const updatedProgress: Record<string, string> = {};
		course.lessons.forEach((lesson) => {
			updatedProgress[lesson.slug] = 'not-started';
		});
		setProgress(updatedProgress);
	}, [course.lessons]);

	const isLessonLocked = (index: number) => {
		if (!course.progressional) return false;
		for (let i = 0; i < index; i++) {
			if (progress[course.lessons[i].slug] !== 'completed') {
				return true;
			}
		}
		return false;
	};

	return (
		<section className="max-w-5xl px-10 mx-auto py-10">
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
						width: `${
							(Object.values(progress).filter(
								(p) => p === 'completed'
							).length /
								course.order.length) *
							100
						}%`,
					}}
				></div>
			</div>
			<p className="text-sm text-gray-500 mb-6">
				{
					Object.values(progress).filter((p) => p === 'completed')
						.length
				}{' '}
				of {course.order.length} lessons completed
			</p>

			<motion.ul className="space-y-4">
				{course.order.map((lessonSlug, index) => {
					const lesson = course.lessons.find(
						(l) => l.slug === lessonSlug
					);
					if (!lesson) return null;
					return (
						<motion.li
							key={lesson.id}
							className={`p-4 border rounded shadow hover:bg-blue-50 relative ${
								progress[lesson.slug] === 'completed'
									? 'bg-green-50'
									: ''
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
								{progress[lesson.slug] === 'completed' ? (
									<div className="flex items-center gap-2 ml-4 mt-1 text-sm px-2 py-1 border rounded font-bold bg-green-600 text-white">
										<Check />
										Completed
									</div>
								) : progress[lesson.slug] === 'in-progress' ? (
									<Link
										href={`/courses/${slug}/${lesson.slug}`}
										className="ml-4 mt-1 text-sm px-8 py-2 rounded font-bold border border-blue-600 text-blue-600 hover:bg-blue-200"
									>
										In Progress
									</Link>
								) : (
									<motion.div
										className=""
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										whileFocus={{ scale: 1.02 }}
										transition={{ duration: 0.2 }}
									>
										<Link
											href={`/courses/${slug}/${lesson.slug}`}
											className={`ml-4 mt-1 text-sm px-8 py-2 border rounded font-bold ${
												isLessonLocked(index)
													? 'bg-gray-400 text-gray-700 cursor-not-allowed'
													: 'bg-blue-600 text-white hover:bg-blue-700'
											}`}
											onClick={(e) =>
												isLessonLocked(index) &&
												e.preventDefault()
											}
										>
											{isLessonLocked(index)
												? 'Locked'
												: 'Start'}
										</Link>
									</motion.div>
								)}
							</div>
						</motion.li>
					);
				})}
			</motion.ul>
		</section>
	);
}
