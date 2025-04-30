import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';
import { TutorialData } from '../../utils/db';
import { Course } from '@/lib/mdx';

type ResponseData = {
	message?: string;
	error?: string;
	tutorialPost?: TutorialData;
	tutorials?: TutorialData[];
};

const courseData: Record<string, Course> = {
	'javascript-essentials': {
		title: 'JavaScript Essentials',
		description:
			'Master the fundamentals of JavaScript with interactive lessons.',
		slug: 'javascript-essentials',
		progressional: true,
		lessons: [
			{
				title: 'Variables & Data Types',
				courseSlug: 'javascript-essentials',
				slug: 'variables-data-types',
				description:
					'Learn about var, let, const, and primitive data types.',
				exercises: [
					{
						question:
							'What keyword is used to declare a constant variable?',
						options: 'var,let,const',
						correctAnswer: 'const',
						type: 'multiple-choice',
						hint: 'Use const for variables that should not change.',
					},
					{
						question: 'What is the output of typeof null?',
						options: '',
						correctAnswer: 'object',
						type: 'text',
						hint: 'null is considered an object in JavaScript.',
					},
				],
			},
			{
				title: 'Functions & Scope',
				courseSlug: 'javascript-essentials',
				slug: 'functions-scope',
				description:
					'Understand how functions work and variable scope.',
				exercises: [
					{
						question:
							'What is the scope of a variable declared inside a function?',
						options: 'Global,Function,Block',
						correctAnswer: 'Function',
						type: 'multiple-choice',
						hint: 'Variables declared inside a function are not accessible outside of it.',
					},
					{
						question: 'What is a function parameter?',
						options: 'Argument,Variable,Callback',
						correctAnswer: 'Variable',
						type: 'multiple-choice',
						hint: 'Parameters are variables that accept values when a function is called.',
					},
				],
			},
			{
				title: 'DOM Manipulation',
				slug: 'dom-manipulation',
				description:
					'Interact with the HTML document using JavaScript.',
				courseSlug: 'javascript-essentials',
				exercises: [],
			},
			{
				title: 'Events',
				slug: 'events',
				description:
					'Learn how to handle user interactions with events.',
				courseSlug: 'javascript-essentials',
				exercises: [],
			},
			{
				title: 'ES6 Features',
				slug: 'es6-features',
				description:
					'Explore modern JavaScript features like arrow functions and destructuring.',
				courseSlug: 'javascript-essentials',
				exercises: [],
			},
			{
				title: 'Asynchronous JavaScript',
				slug: 'asynchronous-javascript',
				description: 'Understand callbacks,promises,and async/await.',
				courseSlug: 'javascript-essentials',
				exercises: [],
			},
			{
				title: 'Error Handling',
				slug: 'error-handling',
				description:
					'Learn how to handle errors gracefully in your code.',
				courseSlug: 'javascript-essentials',
				exercises: [],
			},
			{
				title: 'Project - To-Do List App',
				slug: 'todo-app',
				description:
					'Build a simple To-Do List application using JavaScript.',
				courseSlug: 'javascript-essentials',
				exercises: [],
			},
		],
	},
	'css-layouts': {
		title: 'CSS Layouts',
		description: 'Learn Flexbox,Grid,and modern layout techniques.',
		slug: 'css-layouts',
		progressional: false,
		lessons: [
			{
				title: 'Flexbox Basics',
				courseSlug: 'css-layouts',
				slug: 'flexbox-basics',
				description: 'Master flex container and item behavior.',
				exercises: [
					{
						question:
							'What property defines the main axis in Flexbox?',
						options: 'flex-direction,justify-content,align-items',
						correctAnswer: 'flex-direction',
						type: 'multiple-choice',
						hint: 'Use flex-direction to set the direction of the main axis.',
					},
					{
						question:
							'How do you center an item in a flex container?',
						options:
							'justify-content: center; align-items: center;,margin: auto;,text-align: center;',
						correctAnswer:
							'justify-content: center; align-items: center;',
						type: 'multiple-choice',
						hint: 'Use justify-content and align-items to center items in both axes.',
					},
				],
			},
			{
				title: 'Grid Systems',
				courseSlug: 'css-layouts',
				slug: 'grid-systems',
				description:
					'Create powerful layout structures using CSS Grid.',
				exercises: [
					{
						question:
							'What property defines the number of columns in a grid?',
						options:
							'grid-template-columns,grid-template-rows,grid-column',
						correctAnswer: 'grid-template-columns',
						type: 'multiple-choice',
						hint: 'Use grid-template-columns to set the number of columns in a grid.',
					},
					{
						question: 'How do you create a responsive grid layout?',
						options:
							'Use media queries,Use fixed widths,Use percentages',
						correctAnswer: 'Use media queries',
						type: 'multiple-choice',
						hint: 'Media queries allow you to change the grid layout based on screen size.',
					},
				],
			},
			{
				title: 'Positioning Elements',
				courseSlug: 'css-layouts',
				slug: 'positioning-elements',
				description: 'Learn absolute,relative,and fixed positioning.',
				exercises: [
					{
						question:
							'What is the default position value for elements?',
						options: 'static,relative,absolute',
						correctAnswer: 'static',
						type: 'multiple-choice',
						hint: 'Elements are positioned statically by default.',
					},
					{
						question: 'How do you create a fixed position element?',
						options:
							'position: fixed;,position: absolute;,position: relative;',
						correctAnswer: 'position: fixed;',
						type: 'multiple-choice',
						hint: 'Fixed position elements stay in the same place even when scrolling.',
					},
				],
			},
			{
				title: 'CSS Variables',
				courseSlug: 'css-layouts',
				slug: 'css-variables',
				description: 'Use custom properties for reusable styles.',
				exercises: [
					{
						question:
							'What is the syntax to declare a CSS variable?',
						options:
							'--variable-name: value;,var(--variable-name);variable-name: value;',
						correctAnswer: '--variable-name: value;',
						type: 'multiple-choice',
						hint: 'CSS variables are declared with a double hyphen.',
					},
					{
						question: 'How do you use a CSS variable?',
						options:
							'var(--variable-name),use(--variable-name),get(--variable-name)',
						correctAnswer: 'var(--variable-name)',
						type: 'multiple-choice',
						hint: 'Use var() to access the value of a CSS variable.',
					},
				],
			},
			{
				title: 'Responsive Design',
				courseSlug: 'css-layouts',
				slug: 'responsive-design',
				description:
					'Make layouts that adapt to different screen sizes.',
				exercises: [],
			},
			{
				title: 'Project - Portfolio Page',
				courseSlug: 'css-layouts',
				slug: 'portfolio-page',
				description:
					'Build a responsive portfolio page using CSS layouts.',
				exercises: [],
			},
		],
	},
	'nextjs-intro': {
		title: 'Intro to Next.js',
		description: 'A crash course into building web apps with Next.js.',
		slug: 'nextjs-intro',
		progressional: false,
		lessons: [
			{
				title: 'Pages & Routing',
				courseSlug: 'nextjs-intro',
				slug: 'pages-routing',
				description:
					'Explore file-based routing and dynamic routes in Next.js.',
				exercises: [
					{
						question:
							'What is the purpose of the pages directory in Next.js?',
						options:
							'To define routes,To store components,To manage state',
						correctAnswer: 'To define routes',
						type: 'multiple-choice',
						hint: 'The pages directory is used to define routes in Next.js.',
					},
					{
						question:
							'How do you create a dynamic route in Next.js?',
						options:
							'Using square brackets in the file name,Using curly braces in the file name,Using parentheses in the file name',
						correctAnswer: 'Using square brackets in the file name',
						type: 'multiple-choice',
						hint: 'Dynamic routes are created using square brackets in the file name.',
					},
				],
			},

			{
				title: 'Static Generation',
				courseSlug: 'nextjs-intro',
				slug: 'static-generation',
				description: 'Learn how to pre-render pages at build time.',
				exercises: [
					{
						question: 'What is static generation in Next.js?',
						options:
							'Pre-rendering pages at build time,Rendering pages on each request,Using client-side rendering',
						correctAnswer: 'Pre-rendering pages at build time',
						type: 'multiple-choice',
						hint: 'Static generation pre-renders pages at build time for better performance.',
					},
					{
						question:
							'How do you enable static generation for a page?',
						options:
							'Using getStaticProps,Using getServerSideProps,Using useEffect',
						correctAnswer: 'Using getStaticProps',
						type: 'multiple-choice',
						hint: 'getStaticProps is used to enable static generation for a page.',
					},
				],
			},
		],
	},
};

export default async function POST(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	try {
		const prisma = new PrismaClient();

		await prisma.$connect(); // Connect to the database

		await Promise.all(
			Object.values(courseData).map(async (course) => {
				await prisma.course.upsert({
					where: { slug: course.slug },
					update: {
						title: course.title,
						description: course.description,
						progressional: course.progressional,
					},
					create: {
						title: course.title,
						description: course.description,
						slug: course.slug,
						progressional: course.progressional,
					},
				});

				await Promise.all(
					course.lessons.map(async (lesson) => {
						await prisma.lesson.upsert({
							where: { slug: lesson.slug },
							update: {
								title: lesson.title,
								description: lesson.description,
								courseSlug: lesson.courseSlug,
							},
							create: {
								title: lesson.title,
								description: lesson.description,
								slug: lesson.slug,
								courseSlug: lesson.courseSlug,
							},
						});

						await Promise.all(
							lesson.exercises.map(async (exercise) => {
								await prisma.exercise.create({
									data: {
										question: exercise.question,
                                        type: exercise.type,
										options: exercise.options,
										correctAnswer: exercise.correctAnswer,
										hint: exercise.hint,
										lessonSlug: lesson.slug,
									},
								});
							})
						);
					})
				);
			})
		);

		console.log('Courses and lessons seeded successfully.');
		return res.status(200).json({
			message: 'Courses and lessons seeded successfully.',
		});
	} catch (error) {
		console.error('Error initializing PrismaClient:', error);
		return res
			.status(500)
			.json({ message: 'Internal server error', error: error instanceof Error ? error.message : String(error) });
	}
}
