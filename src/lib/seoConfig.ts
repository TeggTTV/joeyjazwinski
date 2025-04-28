import type { DefaultSeoProps } from 'next-seo';

const SEO: DefaultSeoProps = {
  title: 'Joey Jazwinski',
  description: 'Personal blog and tutorials on tech, politics, and more.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://joeyjazwinski.vercel.app',
    site_name: 'Joey Jazwinski',
  },
  twitter: {
    handle: '@teggundrut',
    site: 'https://x.com/teggundrut',
    cardType: 'summary_large_image',
  },
};

export default SEO;