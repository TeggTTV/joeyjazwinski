import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getFullUrl } from '@/utils/db';
import { Lesson } from '@/lib/mdx';
import { GetServerSideProps } from 'next';
import { FaSearch, FaStar, FaClock } from 'react-icons/fa';

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
		duration?: string;
		rating?: number;
	}[];
}) => {
	const [searchTerm, setSearchTerm] = useState('');

	const filteredCourses = courses.filter((course) =>
		course.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<section className="max-w-7xl px-6 mx-auto">
			{/* Hero Section */}
			<div className="text-center py-12">
				<h1 className="text-4xl font-bold mb-4">Welcome to Our Courses</h1>
				<p className="text-lg text-gray-600 mb-6">
					Explore a variety of courses to enhance your skills and knowledge.
				</p>
				<div className="relative max-w-md mx-auto">
					<input
						type="text"
						placeholder="Search courses..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full border rounded-full py-2 px-4 pl-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<FaSearch className="absolute top-3 left-3 text-gray-400" />
				</div>
			</div>

			{/* Courses Grid */}
			<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
				{filteredCourses.map((course) => (
					<motion.div
						key={course.slug}
						className="border p-6 rounded-2xl shadow-sm bg-white hover:shadow-md transition relative"
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
					>
						<h2 className="text-xl font-semibold mb-2">{course.title}</h2>
						<p className="text-sm text-gray-600 mb-3">{course.description}</p>
						<div className="flex items-center text-xs text-gray-500 mb-4">
							<FaClock className="mr-1" /> {course.duration || 'N/A'}
							<FaStar className="ml-4 mr-1 text-yellow-500" /> {course.rating || 'No Ratings'}
						</div>
						<p className="text-xs text-gray-500 mb-4">
							{course.lessons.length} Lessons
						</p>
						<Link
							href={`/courses/${course.slug}`}
							className="text-blue-600 font-medium hover:underline"
						>
							Start Now →
						</Link>
					</motion.div>
				))}
			</div>
		</section>
	);
};

export default CoursesPage;
