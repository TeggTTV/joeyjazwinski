import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getFullUrl } from '@/utils/db';
import { Course } from '@/lib/mdx';
import { FaSearch, FaStar, FaClock } from 'react-icons/fa';

// Update `calculateAverageRating` to handle non-array `ratings`
const calculateAverageRating = (ratings: { userId: string; rating: number }[] | null | undefined) => {
  if (!Array.isArray(ratings) || ratings.length === 0) return 'No Ratings';
  const total = ratings.reduce((sum, { rating }) => sum + rating, 0);
  return (total / ratings.length).toFixed(1); // Return average to 1 decimal place
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
			<div className="flex items-center justify-center h-screen">
				<div className="loader" />
			</div>
		);
	}

	const filteredCourses = courses.filter((course) =>
		course.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<section className="max-w-7xl px-6 mx-auto">
			{/* Hero Section */}
			<div className="text-center py-12">
				<h1 className="text-4xl font-bold mb-4">Curated Courses</h1>
				<p className="text-lg text-gray-600 mb-6">
					Explore a variety of courses to enhance your skills and
					knowledge.
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
					>
						<h2 className="text-xl font-semibold mb-2">
							{course.title}
						</h2>
						<p className="text-sm text-gray-600 mb-3">
							{course.description}
						</p>
						<div className="flex items-center text-sm text-gray-500 mb-4">
							<FaClock className="mr-1" />
							<div className="text-sm">{course.duration && course.duration + ' minutes' || 'N/A'}</div>
							<FaStar className="ml-4 mr-1 text-yellow-500" />{' '}
							{calculateAverageRating(course.rating)}
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
