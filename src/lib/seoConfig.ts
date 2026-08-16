import type { DefaultSeoProps } from 'next-seo';

const SEO: DefaultSeoProps = {
	title: 'Joey Jazwinski - Software Developer and Creator',
	description:
		'Explore the portfolio, developer blog, and utility toolbox of Joey Jazwinski, a developer building tools and exploring systems.',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: process.env.NEXT_PUBLIC_SITE_URL || 'https://joeyjazwinski.com',
		site_name: 'Joey Jazwinski',
		images: [
			{
				url: 'https://joeyjazwinski.com/ogimage.png',
				width: 1200,
				height: 630,
				alt: 'Joey Jazwinski Logo',
			},
		],
	},
	twitter: {
		cardType: 'summary_large_image',
	},
};

export default SEO;

// Per-page SEO configs for static pages
export const seoHome = {
	title: 'Joey Jazwinski - Software Developer and Creator',
	description:
		'Explore the portfolio, developer blog, and utility toolbox of Joey Jazwinski, a developer building tools and exploring systems.',
	canonical: 'https://joeyjazwinski.com',
	openGraph: {
		title: 'Joey Jazwinski - Software Developer and Creator',
		description:
			'Explore the portfolio, developer blog, and utility toolbox of Joey Jazwinski, a developer building tools and exploring systems.',
		url: 'https://joeyjazwinski.com',
		type: 'website',
		images: [
			{
				url: 'https://joeyjazwinski.com/ogimage.png',
				width: 1200,
				height: 630,
				alt: 'Joey Jazwinski Logo',
			},
		],
	},
	twitter: {
		cardType: 'summary_large_image',
		title: 'Joey Jazwinski - Software Developer and Creator',
		description:
			'Explore the portfolio, developer blog, and utility toolbox of Joey Jazwinski, a developer building tools and exploring systems.',
		image: 'https://joeyjazwinski.com/ogtwitter.png',
	},
};

export const seoCustomize = {
	title: 'Customize - Joey Jazwinski',
	description:
		"Personalize your experience on Joey Jazwinski's developer site. Tailor accent colors, layouts, and accessibility configurations to your preference.",
	canonical: 'https://joeyjazwinski.com/customize',
	openGraph: {
		title: 'Customize - Joey Jazwinski',
		description:
			"Personalize your experience on Joey Jazwinski's developer site. Tailor accent colors, layouts, and accessibility configurations to your preference.",
		url: 'https://joeyjazwinski.com/customize',
		type: 'website',
		images: [
			{
				url: 'https://joeyjazwinski.com/ogimage.png',
				width: 1200,
				height: 630,
				alt: 'Joey Jazwinski Logo',
			},
		],
	},
	twitter: {
		cardType: 'summary_large_image',
		title: 'Customize - Joey Jazwinski',
		description:
			"Personalize your experience on Joey Jazwinski's developer site. Tailor accent colors, layouts, and accessibility configurations to your preference.",
		image: 'https://joeyjazwinski.com/web-app-manifest-512x512.png',
	},
};

export const seoLogin = {
	title: 'Log In or Sign Up - Joey Jazwinski',
	description:
		"Securely sign in to your developer profile on Joey Jazwinski's site to track your course progress, manage preferences, and view custom analytics.",
	canonical: 'https://joeyjazwinski.com/login',
	openGraph: {
		title: 'Log In or Sign Up - Joey Jazwinski',
		description:
			"Securely sign in to your developer profile on Joey Jazwinski's site to track your course progress, manage preferences, and view custom analytics.",
		url: 'https://joeyjazwinski.com/login',
		type: 'website',
		images: [
			{
				url: 'https://joeyjazwinski.com/ogimage.png',
				width: 1200,
				height: 630,
				alt: 'Joey Jazwinski Logo',
			},
		],
	},
	twitter: {
		cardType: 'summary_large_image',
		title: 'Log In or Sign Up - Joey Jazwinski',
		description:
			"Securely sign in to your developer profile on Joey Jazwinski's site to track your course progress, manage preferences, and view custom analytics.",
		image: 'https://joeyjazwinski.com/web-app-manifest-512x512.png',
	},
};

export const seoSignup = {
	title: 'Sign Up - Joey Jazwinski',
	description:
		'Register a new profile to access the developer dashboard, save track milestones on courses, customize themes, and unlock interactive system tools.',
	canonical: 'https://joeyjazwinski.com/create-account',
	openGraph: {
		title: 'Sign Up - Joey Jazwinski',
		description:
			'Register a new profile to access the developer dashboard, save track milestones on courses, customize themes, and unlock interactive system tools.',
		url: 'https://joeyjazwinski.com/create-account',
		type: 'website',
		images: [
			{
				url: 'https://joeyjazwinski.com/ogimage.png',
				width: 1200,
				height: 630,
				alt: 'Joey Jazwinski Logo',
			},
		],
	},
	twitter: {
		cardType: 'summary_large_image',
		title: 'Sign Up - Joey Jazwinski',
		description:
			'Register a new profile to access the developer dashboard, save track milestones on courses, customize themes, and unlock interactive system tools.',
		image: 'https://joeyjazwinski.com/web-app-manifest-512x512.png',
	},
};

export const seoContact = {
	title: 'Contact Joey Jazwinski - Based in New York, USA',
	description:
		'Contact software engineer Joey Jazwinski regarding project consultation, system architecture planning, freelance capacity, or web platform inquiries.',
	canonical: 'https://joeyjazwinski.com/contact',
	openGraph: {
		title: 'Contact Joey Jazwinski - Based in New York, USA',
		description:
			'Contact software engineer Joey Jazwinski regarding project consultation, system architecture planning, freelance capacity, or web platform inquiries.',
		url: 'https://joeyjazwinski.com/contact',
		type: 'website',
		images: [
			{
				url: 'https://joeyjazwinski.com/ogimage.png',
				width: 1200,
				height: 630,
				alt: 'Joey Jazwinski Logo',
			},
		],
	},
	twitter: {
		cardType: 'summary_large_image',
		title: 'Contact Joey Jazwinski - Based in New York, USA',
		description:
			'Contact software engineer Joey Jazwinski regarding project consultation, system architecture planning, freelance capacity, or web platform inquiries.',
		image: 'https://joeyjazwinski.com/web-app-manifest-512x512.png',
	},
};

export const seoProjects = {
	title: 'Projects - Joey Jazwinski',
	description:
		'Browse the engineering portfolio of Joey Jazwinski. Discover custom web platforms, client utilities, game engines, and open-source system layouts.',
	canonical: 'https://joeyjazwinski.com/projects',
	openGraph: {
		title: 'Projects - Joey Jazwinski',
		description:
			'Browse the engineering portfolio of Joey Jazwinski. Discover custom web platforms, client utilities, game engines, and open-source system layouts.',
		url: 'https://joeyjazwinski.com/projects',
		type: 'website',
		images: [
			{
				url: 'https://joeyjazwinski.com/ogimage.png',
				width: 1200,
				height: 630,
				alt: 'Joey Jazwinski Logo',
			},
		],
	},
	twitter: {
		title: 'Projects - Joey Jazwinski',
		description:
			'Browse the engineering portfolio of Joey Jazwinski. Discover custom web platforms, client utilities, game engines, and open-source system layouts.',
		image: 'https://joeyjazwinski.com/web-app-manifest-512x512.png',
		cardType: 'summary_large_image',
	},
};

export const seoCourses = {
	title: 'Online Courses by Joey Jazwinski - Learn by Building',
	description:
		'Master modern software engineering concepts with project-based courses. Learn system design, React frontend flows, secure API structures, and databases.',
	canonical: 'https://joeyjazwinski.com/courses',
	openGraph: {
		title: 'Online Courses by Joey Jazwinski - Learn by Building',
		description:
			'Master modern software engineering concepts with project-based courses. Learn system design, React frontend flows, secure API structures, and databases.',
		url: 'https://joeyjazwinski.com/courses',
		type: 'website',
		images: [
			{
				url: 'https://joeyjazwinski.com/og-courses.png',
				width: 1200,
				height: 630,
				alt: 'Joey Jazwinski Courses',
			},
		],
	},
	twitter: {
		cardType: 'summary_large_image',
		title: 'Online Courses by Joey Jazwinski - Learn by Building',
		description:
			'Master modern software engineering concepts with project-based courses. Learn system design, React frontend flows, secure API structures, and databases.',
		image: 'https://joeyjazwinski.com/og-courses.png',
	},
};
