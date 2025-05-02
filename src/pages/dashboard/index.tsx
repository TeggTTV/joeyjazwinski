'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { Course } from '@/lib/mdx';
import editCourseDashboard from '@/components/Dashboard/editCourseDashboard';
import { createPost } from '@/components/Dashboard/createPost';
import AIGeneratedTextSection from '@/components/Dashboard/AIGeneratedTextSection';

const DashboardPage = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [tags, setTags] = useState<string[]>([]);
	const [tagInput, setTagInput] = useState('');
	const [autosaveMsg, setAutosaveMsg] = useState('');
	const [lastSaved, setLastSaved] = useState<number>(Date.now());
	const [image, setImage] = useState<string | null>(null);
	const [previewMode, setPreviewMode] = useState<'edit' | 'split'>('edit');
	const [postType] = useState<'blog' | 'tutorial'>('blog');
	const [difficulty] = useState<'beginner' | 'intermediate' | 'advanced'>(
		'beginner'
	);
	const [mdxContent, setMdxContent] =
		useState<MDXRemoteSerializeResult | null>(null);

	// const [courses, setCourses] = useState<Course[]>([
	// 	{
	// 		id: '1',
	// 		title: 'Sample Course',
	// 		description: 'This is a sample course.',
	// 		slug: 'sample-course',
	// 		progressional: true,
	// 		order: ['1-1', '1-2'],
	// 		lessons: [
	// 			{
	// 				id: '1-1',
	// 				title: 'Sample Lesson 1',
	// 				description: 'This is a sample lesson.',
	// 				slug: 'sample-lesson-1',
	// 				courseSlug: 'sample-course',
	// 				exercises: [
	// 					{
	// 						id: '1-1-1',
	// 						question: 'Sample Exercise 1',
	// 						type: 'multiple-choice',
	// 						options: 'A,B,C,D',
	// 						correctAnswer: 'A',
	// 						hint: 'Think about the basics.',
	// 					},
	// 					{
	// 						id: '1-1-2',
	// 						question: 'Sample Exercise 2',
	// 						type: 'multiple-choice',
	// 						options: 'A,B,C,D',
	// 						correctAnswer: 'B',
	// 						hint: 'Consider the statement carefully.',
	// 					},
	// 				],
	// 			},
	// 		],
	// 	},
	// ]);
	const [courses, setCourses] = useState<Course[]>([]);

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

	useEffect(() => {
		const timer = setTimeout(() => {
			setAutosaveMsg(`Saved at ${new Date().toLocaleTimeString()}`);
			setLastSaved(Date.now());
		}, 1500);
		return () => clearTimeout(timer);
	}, [title, content, tags]);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const reader = new FileReader();
			reader.onload = (ev) => {
				if (ev.target?.result) setImage(ev.target.result as string);
			};
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	// Add drag-and-drop functionality for image upload
	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			const reader = new FileReader();
			reader.onload = (ev) => {
				if (ev.target?.result) setImage(ev.target.result as string);
			};
			reader.readAsDataURL(e.dataTransfer.files[0]);
		}
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const handleSave = async () => {
		const response = await fetch('/api/savePost', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title,
				content,
				tags,
				postType,
				difficulty,
				image,
				status: 'published',
			}),
		});
		const data = await response.json();
		alert(data.message || 'Post saved successfully!');
	};

	const handleSaveAsDraft = async () => {
		const response = await fetch('/api/savePost', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title,
				content,
				tags,
				postType,
				difficulty,
				image,
				status: 'draft',
			}),
		});
		const data = await response.json();
		alert(data.message || 'Post saved as draft successfully!');
	};

	useEffect(() => {
		const autoSave = async () => {
			if (Date.now() - lastSaved > 5000 && content && title) {
				// await fetch('/api/savePost', {
				// 	method: 'POST',
				// 	headers: { 'Content-Type': 'application/json' },
				// 	body: JSON.stringify({
				// 		title,
				// 		content,
				// 		tags,
				// 		postType,
				// 		difficulty,
				// 		image,
				// 		status: 'draft',
				// 	}),
				// });
				setLastSaved(Date.now());
				setAutosaveMsg(
					`Autosaved at ${new Date().toLocaleTimeString()}`
				);
				// console.log('courses', courses);
			}
		};
		const timer = setInterval(autoSave, 5000);
		return () => clearInterval(timer);
	}, [title, content, tags, postType, difficulty, image, lastSaved, courses]);

	return (
		<motion.div
			className="py-8 max-w-5xl px-10 mx-auto space-y-8"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			{AIGeneratedTextSection()}

			{createPost({
				autosaveMsg,
				title,
				setTitle,
				handleDrop,
				handleDragOver,
				handleImageChange,
				image,
				tagInput,
				setTagInput,
				tags,
				setTags,
				setPreviewMode,
				previewMode,
				content,
				setContent,
				mdxContent,
				setMdxContent,
				handleSaveAsDraft,
				handleSave,
			})}

			{editCourseDashboard(courses, setCourses)}
		</motion.div>
	);
};

export default DashboardPage;
