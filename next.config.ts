import type { NextConfig } from 'next';

// Standard Next.js configuration
const nextConfig: NextConfig = {
  devIndicators: false,
  // Default TSX/TS extensions; MDX handled via next-mdx-remote
  pageExtensions: ['ts', 'tsx'],
};

export default nextConfig;
