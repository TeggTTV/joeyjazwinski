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

// Extend the Course type to include tags
interface ExtendedCourse extends Course {
  tags: string[];
}

const DashboardPage = () => {
	const [courses, setCourses] = useState<ExtendedCourse[]>([]);

	useEffect(() => {
		// console.log('Changes:', changes);
		const fetchCourses = async () => {
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
			}
		};
		fetchCourses();
	}, []);

	// Enrich courses with default tags
	const enrichedCourses: ExtendedCourse[] = courses.map((course) => ({
		...course,
		tags: course.tags || [], // Add default empty tags if missing
	}));

	return (
		<motion.div
			className="py-8 max-w-5xl px-10 mx-auto space-y-8"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<h1 className="text-3xl font-bold">Dashboard</h1>

			{ManageBlogs()}

			{ManageUsers()}

			{SendMessage()}

			{AIGeneratedTextSection()}

			{CreatePost()}

			<EditCourseDashboard course={enrichedCourses[0]} setCourses={setCourses} />
		</motion.div>
	);
};

export default DashboardPage;
