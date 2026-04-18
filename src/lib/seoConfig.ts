import type { DefaultSeoProps } from 'next-seo';

const SEO: DefaultSeoProps = {
	title: 'Joey Jazwinski',
	description:
		'Software developer and creator. Explore my projects and work.',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: process.env.NEXT_PUBLIC_SITE_URL || 'https://joeyjazwinski.com',
		site_name: 'Joey Jazwinski',
	},
};

export default SEO;

// Per-page SEO configs for static pages
export const seoHome = {
	title: 'Joey Jazwinski | Software Developer, Creator, and Photographer',
	description:
		'Software developer, creator, and photographer building products while documenting light, place, and process.',
	canonical: 'https://joeyjazwinski.com',
	openGraph: {
		title: 'Joey Jazwinski | Software Developer, Creator, and Photographer',
		description:
			'Software developer, creator, and photographer building products while documenting light, place, and process.',
		url: 'https://joeyjazwinski.com',
		type: 'website',
		images: [
			{
				url: 'https://joeyjazwinski.com/next.svg',
				width: 1200,
				height: 630,
				alt: 'Joey Jazwinski Logo',
			},
		],
	},
	twitter: {
		cardType: 'summary_large_image',
		title: 'Joey Jazwinski | Software Developer, Creator, and Photographer',
		description:
			'Software developer, creator, and photographer building products while documenting light, place, and process.',
		image: 'https://joeyjazwinski.com/next.svg',
	},
};

export const seoCustomize = {
	title: 'Customize | Joey Jazwinski',
	description: 'Customize your accent color and preferences.',
	canonical: 'https://joeyjazwinski.com/customize',
	openGraph: {
		title: 'Customize | Joey Jazwinski',
		description: 'Customize your accent color and preferences.',
		url: 'https://joeyjazwinski.com/customize',
		type: 'website',
		images: [
			{
				url: 'https://joeyjazwinski.com/next.svg',
				width: 1200,
				height: 630,
				alt: 'Joey Jazwinski Logo',
			},
		],
	},
	twitter: {
		cardType: 'summary_large_image',
		title: 'Customize | Joey Jazwinski',
		description: 'Customize your accent color and preferences.',
		image: 'https://joeyjazwinski.com/next.svg',
	},
};

export const seoLogin = {
	title: 'Login | Joey Jazwinski',
	description:
		'Login to your Joey Jazwinski account to access personalized features and content.',
	canonical: 'https://joeyjazwinski.com/login',
	openGraph: {
		title: 'Login | Joey Jazwinski',
		description:
			'Login to your Joey Jazwinski account to access personalized features and content.',
		url: 'https://joeyjazwinski.com/login',
		type: 'website',
		images: [
			{
				url: 'https://joeyjazwinski.com/next.svg',
				width: 1200,
				height: 630,
				alt: 'Joey Jazwinski Logo',
			},
		],
	},
	twitter: {
		cardType: 'summary_large_image',
		title: 'Login | Joey Jazwinski',
		description:
			'Login to your Joey Jazwinski account to access personalized features and content.',
		image: 'https://joeyjazwinski.com/next.svg',
	},
};

export const seoSignup = {
	title: 'Sign Up | Joey Jazwinski',
	description:
		'Create a new Joey Jazwinski account to join the community and access exclusive content.',
	canonical: 'https://joeyjazwinski.com/signup',
	openGraph: {
		title: 'Sign Up | Joey Jazwinski',
		description:
			'Create a new Joey Jazwinski account to join the community and access exclusive content.',
		url: 'https://joeyjazwinski.com/signup',
		type: 'website',
		images: [
			{
				url: 'https://joeyjazwinski.com/next.svg',
				width: 1200,
				height: 630,
				alt: 'Joey Jazwinski Logo',
			},
		],
	},
	twitter: {
		cardType: 'summary_large_image',
		title: 'Sign Up | Joey Jazwinski',
		description:
			'Create a new Joey Jazwinski account to join the community and access exclusive content.',
		image: 'https://joeyjazwinski.com/next.svg',
	},
};

export const seoContact = {
	title: 'Contact | Joey Jazwinski',
	description:
		'Get in touch with Joey Jazwinski for questions, feedback, or collaboration opportunities.',
	canonical: 'https://joeyjazwinski.com/contact',
	openGraph: {
		title: 'Contact | Joey Jazwinski',
		description:
			'Get in touch with Joey Jazwinski for questions, feedback, or collaboration opportunities.',
		url: 'https://joeyjazwinski.com/contact',
		type: 'website',
		images: [
			{
				url: 'https://joeyjazwinski.com/next.svg',
				width: 1200,
				height: 630,
				alt: 'Joey Jazwinski Logo',
			},
		],
	},
	twitter: {
		cardType: 'summary_large_image',
		title: 'Contact | Joey Jazwinski',
		description:
			'Get in touch with Joey Jazwinski for questions, feedback, or collaboration opportunities.',
		image: 'https://joeyjazwinski.com/next.svg',
	},
};

export const seoProjects = {
	title: 'Projects | Joey Jazwinski',
	description:
		"Explore my portfolio of software projects and creative work. See what I've built and what I'm currently working on.",
	canonical: 'https://joeyjazwinski.com/projects',
	openGraph: {
		title: 'Projects | Joey Jazwinski',
		description:
			"Explore my portfolio of software projects and creative work. See what I've built and what I'm currently working on.",
		url: 'https://joeyjazwinski.com/projects',
		type: 'website',
		images: [
			{
				url: 'https://joeyjazwinski.com/next.svg',
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

export const seoCourses = {
	title: 'Courses | Joey Jazwinski',
	description:
		'Explore a comprehensive library of courses designed to elevate your engineering skills in web development, React, Next.js, and more.',
	canonical: 'https://joeyjazwinski.com/courses',
	openGraph: {
		title: 'Courses | Joey Jazwinski',
		description:
			'Explore a comprehensive library of courses designed to elevate your engineering skills in web development, React, Next.js, and more.',
		url: 'https://joeyjazwinski.com/courses',
		type: 'website',
		images: [
			{
				url: 'https://joeyjazwinski.com/og-courses.png', // Assuming this might exist or just placeholder
				width: 1200,
				height: 630,
				alt: 'Joey Jazwinski Courses',
			},
		],
	},
	twitter: {
		cardType: 'summary_large_image',
		title: 'Courses | Joey Jazwinski',
		description:
			'Explore a comprehensive library of courses designed to elevate your engineering skills.',
		image: 'https://joeyjazwinski.com/og-courses.png',
	},
};
