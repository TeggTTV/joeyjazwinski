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

export const seoPrivacy = {
	title: 'Privacy Policy - Joey Jazwinski',
	description:
		'Learn how Joey Jazwinski collects, uses, protects, and handles your personal data, developer tool usage, and account security.',
	canonical: 'https://joeyjazwinski.com/privacy',
	openGraph: {
		title: 'Privacy Policy - Joey Jazwinski',
		description:
			'Learn how Joey Jazwinski collects, uses, protects, and handles your personal data, developer tool usage, and account security.',
		url: 'https://joeyjazwinski.com/privacy',
		type: 'website',
		images: [
			{
				url: 'https://joeyjazwinski.com/ogimage.png',
				width: 1200,
				height: 630,
				alt: 'Joey Jazwinski Privacy Policy',
			},
		],
	},
	twitter: {
		cardType: 'summary_large_image',
		title: 'Privacy Policy - Joey Jazwinski',
		description:
			'Learn how Joey Jazwinski collects, uses, protects, and handles your personal data, developer tool usage, and account security.',
		image: 'https://joeyjazwinski.com/ogimage.png',
	},
};

export const seoTerms = {
	title: 'Terms and Conditions - Joey Jazwinski',
	description:
		'Read the terms of service, acceptable use policies, intellectual property terms, and service disclaimers for using the Joey Jazwinski platform.',
	canonical: 'https://joeyjazwinski.com/terms',
	openGraph: {
		title: 'Terms and Conditions - Joey Jazwinski',
		description:
			'Read the terms of service, acceptable use policies, intellectual property terms, and service disclaimers for using the Joey Jazwinski platform.',
		url: 'https://joeyjazwinski.com/terms',
		type: 'website',
		images: [
			{
				url: 'https://joeyjazwinski.com/ogimage.png',
				width: 1200,
				height: 630,
				alt: 'Joey Jazwinski Terms and Conditions',
			},
		],
	},
	twitter: {
		cardType: 'summary_large_image',
		title: 'Terms and Conditions - Joey Jazwinski',
		description:
			'Read the terms of service, acceptable use policies, intellectual property terms, and service disclaimers for using the Joey Jazwinski platform.',
		image: 'https://joeyjazwinski.com/ogimage.png',
	},
};

export const seoPolls = {
	title: 'Polls - Completely Free Poll Creator',
	description:
		'Create free, instant community polls with no login required. Share questions, collect real-time votes, and explore live community surveys.',
	canonical: 'https://joeyjazwinski.com/polls',
	openGraph: {
		title: 'Polls - Completely Free Poll Creator',
		description:
			'Create free, instant community polls with no login required. Share questions, collect real-time votes, and explore live community surveys.',
		url: 'https://joeyjazwinski.com/polls',
		type: 'website',
		images: [
			{
				url: 'https://joeyjazwinski.com/ogimage.png',
				width: 1200,
				height: 630,
				alt: 'Community Polls on Joey Jazwinski',
			},
		],
	},
	twitter: {
		cardType: 'summary_large_image',
		title: 'Polls - Completely Free Poll Creator',
		description:
			'Create free, instant community polls with no login required. Share questions, collect real-time votes, and explore live community surveys.',
		image: 'https://joeyjazwinski.com/ogimage.png',
	},
};

export const seoCreatePoll = {
	title: 'Create a Poll - Free Instant Poll Maker | Joey Jazwinski',
	description:
		'Make a new poll in seconds with customizable durations, multi-vote options, and instant shareable links. No account required.',
	canonical: 'https://joeyjazwinski.com/polls/create',
	openGraph: {
		title: 'Create a Poll - Free Instant Poll Maker | Joey Jazwinski',
		description:
			'Make a new poll in seconds with customizable durations, multi-vote options, and instant shareable links. No account required.',
		url: 'https://joeyjazwinski.com/polls/create',
		type: 'website',
		images: [
			{
				url: 'https://joeyjazwinski.com/ogimage.png',
				width: 1200,
				height: 630,
				alt: 'Create a Poll - Joey Jazwinski',
			},
		],
	},
	twitter: {
		cardType: 'summary_large_image',
		title: 'Create a Poll - Free Instant Poll Maker | Joey Jazwinski',
		description:
			'Make a new poll in seconds with customizable durations, multi-vote options, and instant shareable links. No account required.',
		image: 'https://joeyjazwinski.com/ogimage.png',
	},
};

export function getSeoPollDetail(
	title: string,
	id: string,
	description?: string,
) {
	const pollTitle = `${title} - Vote on Community Poll | Joey Jazwinski`;
	const pollDesc =
		description && description.trim().length > 0
			? description
			: `Cast your vote on "${title}" and see real-time community results. Free online poll powered by Joey Jazwinski.`;
	const url = `https://joeyjazwinski.com/poll/${id}`;

	return {
		title: pollTitle,
		description: pollDesc,
		canonical: url,
		openGraph: {
			title: pollTitle,
			description: pollDesc,
			url,
			type: 'website',
			images: [
				{
					url: 'https://joeyjazwinski.com/ogimage.png',
					width: 1200,
					height: 630,
					alt: title,
				},
			],
		},
		twitter: {
			cardType: 'summary_large_image',
			title: pollTitle,
			description: pollDesc,
			image: 'https://joeyjazwinski.com/ogimage.png',
		},
	};
}

export function getSeoPollDashboard(title: string, id: string) {
	const pageTitle = `Poll Analytics & Dashboard - ${title} | Joey Jazwinski`;
	const pageDesc = `Real-time analytics, vote counts, distribution data, and management controls for the poll "${title}".`;
	const url = `https://joeyjazwinski.com/poll/dashboard/${id}`;

	return {
		title: pageTitle,
		description: pageDesc,
		canonical: url,
		openGraph: {
			title: pageTitle,
			description: pageDesc,
			url,
			type: 'website',
		},
	};
}
