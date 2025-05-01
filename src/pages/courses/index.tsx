import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getFullUrl } from '@/utils/db';
import { Lesson } from '@/lib/mdx';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
	try {
		const response = await fetch(getFullUrl('/api/getCourses'), {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		});

		if (!response.ok) throw new Error('Failed to fetch courses');

		const data = await response.json();
		
		return {
			props: {
				courses: data.data || [],
			},
		};
	} catch (error) {
		console.error('Error fetching courses:', error);
		return {
			props: {
				courses: [],
			},
		};
	}
};

const CoursesPage = ({
	courses,
}: {
	courses: {
		slug: string;
		title: string;
		description: string;
		lessons: Lesson[];
	}[];
}) => {
	return (
		<section className="max-w-5xl px-10 mx-auto py-16">
			<motion.h1
				className="text-4xl font-bold mb-12"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				Courses
			</motion.h1>

			<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
				{courses.map((course) => (
					<motion.div
						key={course.slug}
						className="border p-6 rounded-2xl shadow-sm bg-white hover:shadow-md transition"
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
					>
						<h2 className="text-xl font-semibold mb-2">
							{course.title}
						</h2>
						<p className="text-sm text-gray-600 mb-3">
							{course.description}
						</p>
						<p className="text-xs text-gray-500 mb-4">
							Level: {course.lessons.length} Lessons
						</p>
						<Link
							href={`/courses/${course.slug}`}
							className="text-blue-600 font-medium hover:underline"
						>
							View Course →
						</Link>
					</motion.div>
				))}
			</div>
		</section>
	);
};

export default CoursesPage;
