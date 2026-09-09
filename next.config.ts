import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	compress: true,
	devIndicators: false,
	pageExtensions: ['ts', 'tsx'],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
	async redirects() {
		return [
			{
				source: '/:path*',
				has: [
					{
						type: 'host',
						value: 'joeyjazwinski.vercel.app',
					},
				],
				destination: 'https://joeyjazwinski.com/:path*',
				permanent: true,
			},
			{
				source: '/blogs',
				destination: '/developer-blog',
				permanent: true,
			},
			{
				source: '/blogs/:path*',
				destination: '/developer-blog/:path*',
				permanent: true,
			},
			{
				source: '/privacy-policy',
				destination: '/privacy',
				permanent: true,
			},
			{
				source: '/terms-and-conditions',
				destination: '/terms',
				permanent: true,
			},
			{
				source: '/terms-of-service',
				destination: '/terms',
				permanent: true,
			},
			{
				source: '/demos',
				destination: '/',
				permanent: true,
			},
			{
				source: '/demos/:path*',
				destination: '/',
				permanent: true,
			},
			{
				source: '/tos',
				destination: '/terms',
				permanent: true,
			},
		];
	},
};

export default nextConfig;
