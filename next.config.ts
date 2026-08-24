import type { NextConfig } from 'next';

// Standard Next.js configuration
const nextConfig: NextConfig = {
	devIndicators: false,
	// Default TSX/TS extensions; MDX handled via next-mdx-remote
	pageExtensions: ['ts', 'tsx'],

	// Redirects for domain canonicalization and legal page aliases
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
				source: '/tos',
				destination: '/terms',
				permanent: true,
			},
		];
	},
};

export default nextConfig;
