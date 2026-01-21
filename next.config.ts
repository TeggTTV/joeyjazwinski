import type { NextConfig } from 'next';

// Standard Next.js configuration
const nextConfig: NextConfig = {
	devIndicators: false,
	// Default TSX/TS extensions; MDX handled via next-mdx-remote
	pageExtensions: ['ts', 'tsx'],

	// Redirect from Vercel subdomain to production domain to fix canonical issues
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
		];
	},
};

export default nextConfig;
