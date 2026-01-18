export interface PatchNote {
	version: string;
	date: string;
	title: string;
	changes: string[];
	type: 'major' | 'minor' | 'patch';
}

export const PATCH_NOTES: PatchNote[] = [
	{
		version: '1.7.0',
		date: '2026-01-17',
		title: 'SEO & Sitemap Generation',
		type: 'major',
		changes: [
			'feat: Implement comprehensive SEO, sitemap generation, and content management for blogs and courses.',
		],
	},
	{
		version: '1.6.0',
		date: '2026-01-17',
		title: 'Interactive Lesson Sandbox & UI Customization',
		type: 'major',
		changes: [
			'feat: Implement core application structure, interactive lesson sandbox, UI customization, and foundational API routes for courses and user profiles.',
		],
	},
	{
		version: '1.5.0',
		date: '2026-01-17',
		title: 'Learning Platform Foundation',
		type: 'major',
		changes: [
			'feat: Implement core application structure with Prisma, API endpoints, and a wide range of UI components for a new learning platform.',
		],
	},
	{
		version: '1.4.0',
		date: '2026-01-06',
		title: 'Course Management System',
		type: 'major',
		changes: [
			'feat: Implement course management system with API endpoints, database schema, and UI for creating courses, lessons, exercises, and tracking user progress.',
			'feat: Implement core application structure with Prisma, API routes, and UI components for content, courses, and user management.',
		],
	},
	{
		version: '1.3.1',
		date: '2026-01-05',
		title: 'Documentation Cleanup',
		type: 'patch',
		changes: ['Clean up README by removing outdated sections'],
	},
	{
		version: '1.3.0',
		date: '2025-12-20',
		title: 'Site Builder & Portfolio',
		type: 'major',
		changes: [
			'feat: Add new projects page with portfolio display, filtering, and detailed view, including Resellz project images.',
			'feat: add NavLinks component for dynamic navigation',
			'feat: add new demos index page with an entry for an interactive site builder.',
			'feat: add SiteBuilder core infrastructure with types, style utilities, component registry, and footer components, and include a new sitemap.',
			'feat: Add new SiteBuilder component variants and a comment section.',
			'feat: Implement Site Builder with a comprehensive component library and demo page.',
		],
	},
	{
		version: '1.2.0',
		date: '2025-12-19',
		title: 'Navigation & Content Indexes',
		type: 'minor',
		changes: [
			'feat: Add Navbar component with navigation links, theme toggle, and mobile menu functionality.',
			'feat: Add new blog and courses index pages with search and data display.',
			"feat: add new projects page with project details and associated images for 'SaaS Landing' project",
			'feat: add projects page with SEO configuration and placeholder images',
		],
	},
	{
		version: '1.1.0',
		date: '2025-12-17',
		title: 'Core Pages & Authentication',
		type: 'major',
		changes: [
			'feat: Implement a new login page with form submission, loading state, and toast notifications.',
			'feat: Add responsive Navbar component with dynamic navigation links and theme toggle.',
			'feat: Add new `index`, `about`, `demos`, and `projects` pages with supporting components, update `tsconfig` paths, and remove old configuration files.',
		],
	},
	{
		version: '1.0.5',
		date: '2025-12-10',
		title: 'Interactive Projects',
		type: 'minor',
		changes: [
			'feat: add projects page with interactive project cards, detailed view, and animations.',
		],
	},
	{
		version: '1.0.4',
		date: '2025-12-09',
		title: 'Landing Page Contacts',
		type: 'minor',
		changes: [
			'feat: add new ContactSection component to the landing page',
			'feat: Add landing page with new contact and newsletter signup sections.',
			'feat: Add a new projects page featuring detailed project views, image galleries, and a new Navbar component.',
		],
	},
	{
		version: '1.0.3',
		date: '2025-12-08',
		title: 'Initial Structure & SEO',
		type: 'minor',
		changes: [
			'feat: Add sitemap and disabled contact API endpoint, and update tsconfig for JSX transform and type includes.',
			'chore: update Next.js, React, and related dependencies.',
			'feat: Implement initial website structure, core pages, theming, and feature flag configuration.',
		],
	},
	{
		version: '1.0.2',
		date: '2025-05-18',
		title: 'Dashboard Notifications',
		type: 'patch',
		changes: [
			'Add toast notification for successful IndexNow update',
			'Refactor dashboard layout: add UpdateIndexNow component and rearrange sections',
		],
	},
	{
		version: '1.0.1',
		date: '2025-05-16',
		title: 'IndexNow Integration',
		type: 'patch',
		changes: [
			'Implement IndexNow notification API and refactor blog indexing logic',
			'Refactor loading indicators and improve error handling in various components',
		],
	},
	{
		version: '1.0.0',
		date: '2025-05-14',
		title: 'Blog Analytics & SEO',
		type: 'major',
		changes: [
			'Add heading for blog index page',
			'Add SEO configuration for courses and implement loader in login page',
			'Add Ahrefs analytics script to blog post component',
			'Enhance SEO metadata for blog posts by adding author and publisher details, and improving default image handling.',
			'fix: add TypeScript types for getServerSideProps and BlogPost in sitemap generation',
			'fix: update sitemap configuration and implement server-side sitemap generation',
			'fixed getuser api repsonse',
		],
	},
	{
		version: '0.9.5',
		date: '2025-05-13',
		title: 'Course Ratings System',
		type: 'minor',
		changes: [
			'fix: update rating display to show rating object instead of raw number',
			'fix: update rating type in Course interface and refactor course data fetching in pages',
			'fix: update setCourses prop type to use ExtendedCourse array',
			'fix: refactor rating update logic to use a serialized ratings array',
		],
	},
	{
		version: '0.9.4',
		date: '2025-05-12',
		title: 'Rating API',
		type: 'patch',
		changes: [
			'feat: implement API for fetching course ratings and update CoursePage to display user rating',
			'added rating stuff',
		],
	},
	{
		version: '0.9.3',
		date: '2025-05-11',
		title: 'Dynamic Blog Fetching',
		type: 'minor',
		changes: [
			'fix: change getStaticProps to getServerSideProps for dynamic blog post fetching',
			'fix: ensure post content is serialized safely in getServerSideProps',
			'feat(prisma): update schema and generated files',
			'feat: enhance blog post and user models with AI-related fields and improve error handling in savePost API',
			'feat: add CourseProgressService for managing user course progress',
		],
	},
	{
		version: '0.9.2',
		date: '2025-05-07',
		title: 'AI Field Integration',
		type: 'patch',
		changes: [
			'feat: add isAI field to BlogPost model and update related components',
		],
	},
	{
		version: '0.9.1',
		date: '2025-05-04',
		title: 'Course Progress Tracking',
		type: 'minor',
		changes: [
			'feat: Update Prisma schema and API for enhanced course and lesson progress tracking',
			'feat: implement blog post update API and integrate toast notifications in ManageBlogs',
		],
	},
	{
		version: '0.9.0',
		date: '2025-05-03',
		title: 'User Management & Toast',
		type: 'minor',
		changes: [
			'feat: add toast notifications for user creation success and failure in SignupPage',
			'refactor: remove unused toast import in Navbar and fix type assertion in SignupPage',
			'feat: update Prisma client and schema for MongoDB compatibility',
		],
	},
	{
		version: '0.8.0',
		date: '2025-05-02',
		title: 'Dashboard & Management Tools',
		type: 'minor',
		changes: [
			'feat: Implement ManageBlogs, ManageUsers, and SendMessage components with CRUD functionality',
			'Enhance BlogPost component: add animations for improved user experience, integrate back navigation link, and refactor paragraph and strong text rendering.',
			'Enhance AIGeneratedTextSection: add copy prompt functionality with user feedback, improve UI elements, and refactor button components for better interaction.',
			'Refactor createPost and AIGeneratedTextSection components: remove unused props, streamline state management, and enhance image handling functionality.',
			'Refactor dashboard components: enhance create post functionality, integrate AI-generated text section, and improve comment handling in blog posts.',
			'Enhance UI and functionality across components: add animations, improve user feedback with toast notifications, and update navigation links based on user authentication status.',
			'updateuser not implemented fixed stupid stuff',
			'updating courses from dashboard. need to make add/delete buttons',
		],
	},
	{
		version: '0.7.0',
		date: '2025-05-01',
		title: 'Breadcrumb & Dashboard Refactor',
		type: 'patch',
		changes: [
			'Refactor Breadcrumb and editCourseDashboard components for improved logic and UI; update Navbar and MobileMenu links; enhance DashboardPage effect dependencies',
		],
	},
	{
		version: '0.6.0',
		date: '2025-04-30',
		title: 'Server-Side Rendering Fixes',
		type: 'patch',
		changes: [
			'Refactor Breadcrumb and Dashboard components for improved styling and functionality',
			'SERVERSIDE PROPS WAS THE ANSWERRRR',
			'Added disconnect and logging statements in API handlers and LessonPage component',
			'Added some fixes for erros which make vercel go XD',
			'feat: Implement server-side fetching of courses and update API routes',
		],
	},
	{
		version: '0.5.0',
		date: '2025-04-28',
		title: 'Initial Dashboard & Auth',
		type: 'minor',
		changes: [
			'fix: update form reference in login page submit handler',
			'feat: add user authentication API endpoints and dashboard',
			'updated date for mdx so it dsplays the updatedAt date properly',
		],
	},
	{
		version: '0.1.0',
		date: '2024-10-24',
		title: 'Initial Commit',
		type: 'patch',
		changes: ['first commit', 'Create README.md'],
	},
];

export const LATEST_PATCH_NOTE = PATCH_NOTES[0];
