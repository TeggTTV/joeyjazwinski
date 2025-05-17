'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Course } from '@/lib/mdx';
import EditCourseDashboard from '@/components/Dashboard/EditCourseDashboard';
import CreatePost from '@/components/Dashboard/CreatePost';
import AIGeneratedTextSection from '@/components/Dashboard/AIGeneratedTextSection';
import SendMessage from '@/components/Dashboard/SendMessage';
import ManageUsers from '@/components/Dashboard/ManageUsers';
import ManageBlogs from '@/components/Dashboard/ManageBlogs';
import '@/styles/loader.css';
import { NextSeo } from 'next-seo';
import { seoDashboard } from '@/lib/seoConfig';

// Extend the Course type to include tags
interface ExtendedCourse extends Course {
  tags: string[];
}

const DashboardPage = () => {
	const [courses, setCourses] = useState<ExtendedCourse[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/api/getCourses');
				if (!response.ok) {
					console.error('Failed to fetch courses');
					return;
				}
				const data = await response.json();
				setCourses(Array.isArray(data.data) ? data.data : []);
			} catch (error) {
				console.error('Error fetching courses:', error);
				setCourses([]); // Fallback to an empty array on error
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="loader" /> {/* Add a CSS loader animation */}
			</div>
		);
	}

	// Enrich courses with default tags
	const enrichedCourses: ExtendedCourse[] = courses.map((course) => ({
		...course,
		tags: course.tags || [], // Add default empty tags if missing
	}));

	return (
		<>
			<NextSeo {...seoDashboard} />
			<main className="min-h-screen flex flex-col items-center">
				<motion.h1
					className="text-4xl font-bold mb-4"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
				>
					Dashboard
				</motion.h1>
				<motion.div
					className="w-full max-w-5xl grid gap-y-8"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
				>
					<EditCourseDashboard
						course={enrichedCourses[0]}
						setCourses={setCourses}
					/>
					<CreatePost />
					<AIGeneratedTextSection />
					<SendMessage />
					<ManageUsers />
					<ManageBlogs />
				</motion.div>
			</main>
		</>
	);
};

export default DashboardPage;
