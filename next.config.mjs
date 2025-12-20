/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

export default nextConfig;
