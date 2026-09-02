/** @type {import('next').NextConfig} */
const nextConfig = {
	compress: true,
	devIndicators: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
		// domains: [
		//     "images.unsplash.com",
		//     "images.pexels.com",
		//     "thecrazyorganizedblog.com",
		// ],
	},
	async redirects() {
		return [
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
		];
	},
};

export default nextConfig;
