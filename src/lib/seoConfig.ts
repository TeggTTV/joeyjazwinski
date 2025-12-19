import type { DefaultSeoProps } from 'next-seo';

const SEO: DefaultSeoProps = {
	title: 'Joey Jazwinski',
	description:
		'Software developer and creator. Explore my projects and work.',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url:
			process.env.NEXT_PUBLIC_SITE_URL ||
			'https://joeyjazwinski.vercel.app',
		site_name: 'Joey Jazwinski',
	},
	twitter: {
		handle: '@teggundrut',
		site: 'https://x.com/teggundrut',
		cardType: 'summary_large_image',
	},
};

export default SEO;

// Per-page SEO configs for static pages
export const seoHome = {
	title: 'Joey Jazwinski | Software Developer & Creator',
	description:
		"Software developer passionate about building innovative projects. Explore my work and see what I've been creating.",
	canonical: 'https://joeyjazwinski.vercel.app/',
	openGraph: {
		title: 'Joey Jazwinski | Software Developer & Creator',
		description:
			"Software developer passionate about building innovative projects. Explore my work and see what I've been creating.",
		url: 'https://joeyjazwinski.vercel.app/',
		type: 'website',
		images: [
			{
				url: 'https://joeyjazwinski.vercel.app/next.svg',
				width: 1200,
				height: 630,
				alt: 'Joey Jazwinski Logo',
			},
		],
	},
	twitter: {
		cardType: 'summary_large_image',
		title: 'Joey Jazwinski | Software Developer & Creator',
		description:
			"Software developer passionate about building innovative projects. Explore my work and see what I've been creating.",
		image: 'https://joeyjazwinski.vercel.app/next.svg',
	},
};

export const seoCustomize = {
	title: 'Customize | Joey Jazwinski',
	description: 'Customize your accent color and preferences.',
	canonical: 'https://joeyjazwinski.vercel.app/customize',
	openGraph: {
		title: 'Customize | Joey Jazwinski',
		description: 'Customize your accent color and preferences.',
		url: 'https://joeyjazwinski.vercel.app/customize',
		type: 'website',
		images: [
			{
				url: 'https://joeyjazwinski.vercel.app/next.svg',
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
		image: 'https://joeyjazwinski.vercel.app/next.svg',
	},
};

export const seoLogin = {
	title: 'Login | Joey Jazwinski',
	description:
		'Login to your Joey Jazwinski account to access personalized features and content.',
	canonical: 'https://joeyjazwinski.vercel.app/login',
	openGraph: {
		title: 'Login | Joey Jazwinski',
		description:
			'Login to your Joey Jazwinski account to access personalized features and content.',
		url: 'https://joeyjazwinski.vercel.app/login',
		type: 'website',
		images: [
			{
				url: 'https://joeyjazwinski.vercel.app/next.svg',
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
		image: 'https://joeyjazwinski.vercel.app/next.svg',
	},
};

export const seoSignup = {
	title: 'Sign Up | Joey Jazwinski',
	description:
		'Create a new Joey Jazwinski account to join the community and access exclusive content.',
	canonical: 'https://joeyjazwinski.vercel.app/signup',
	openGraph: {
		title: 'Sign Up | Joey Jazwinski',
		description:
			'Create a new Joey Jazwinski account to join the community and access exclusive content.',
		url: 'https://joeyjazwinski.vercel.app/signup',
		type: 'website',
		images: [
			{
				url: 'https://joeyjazwinski.vercel.app/next.svg',
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
		image: 'https://joeyjazwinski.vercel.app/next.svg',
	},
};

export const seoDashboard = {
	title: 'Dashboard | Joey Jazwinski',
	description:
		'Access your dashboard to manage your projects and account settings.',
	canonical: 'https://joeyjazwinski.vercel.app/dashboard',
	openGraph: {
		title: 'Dashboard | Joey Jazwinski',
		description:
			'Access your dashboard to manage your projects and account settings.',
		url: 'https://joeyjazwinski.vercel.app/dashboard',
		type: 'website',
		images: [
			{
				url: 'https://joeyjazwinski.vercel.app/next.svg',
				width: 1200,
				height: 630,
				alt: 'Joey Jazwinski Logo',
			},
		],
	},
	twitter: {
		cardType: 'summary_large_image',
		title: 'Dashboard | Joey Jazwinski',
		description:
			'Access your dashboard to manage your projects and account settings.',
		image: 'https://joeyjazwinski.vercel.app/next.svg',
	},
};

export const seoContact = {
	title: 'Contact | Joey Jazwinski',
	description:
		'Get in touch with Joey Jazwinski for questions, feedback, or collaboration opportunities.',
	canonical: 'https://joeyjazwinski.vercel.app/contact',
	openGraph: {
		title: 'Contact | Joey Jazwinski',
		description:
			'Get in touch with Joey Jazwinski for questions, feedback, or collaboration opportunities.',
		url: 'https://joeyjazwinski.vercel.app/contact',
		type: 'website',
		images: [
			{
				url: 'https://joeyjazwinski.vercel.app/next.svg',
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
		image: 'https://joeyjazwinski.vercel.app/next.svg',
	},
};

export const seoProjects = {
	title: 'Projects | Joey Jazwinski',
	description:
		"Explore my portfolio of software projects and creative work. See what I've built and what I'm currently working on.",
	canonical: 'https://joeyjazwinski.vercel.app/projects',
	openGraph: {
		title: 'Projects | Joey Jazwinski',
		description:
			"Explore my portfolio of software projects and creative work. See what I've built and what I'm currently working on.",
		url: 'https://joeyjazwinski.vercel.app/projects',
		type: 'website',
		images: [
			{
				url: 'https://joeyjazwinski.vercel.app/next.svg',
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
