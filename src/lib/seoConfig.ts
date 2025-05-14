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

// Per-page SEO configs for static pages
export const seoHome = {
  title: 'Joey Jazwinski | Blog, Tutorials, and Coding Journey',
  description: 'Personal blog and tutorials on tech, coding, Linux, and more by Joey Jazwinski. Learn, explore, and grow your skills!',
  canonical: 'https://joeyjazwinski.vercel.app/',
  openGraph: {
    title: 'Joey Jazwinski | Blog, Tutorials, and Coding Journey',
    description: 'Personal blog and tutorials on tech, coding, Linux, and more by Joey Jazwinski. Learn, explore, and grow your skills!',
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
    title: 'Joey Jazwinski | Blog, Tutorials, and Coding Journey',
    description: 'Personal blog and tutorials on tech, coding, Linux, and more by Joey Jazwinski. Learn, explore, and grow your skills!',
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
  description: 'Login to your Joey Jazwinski account to access personalized features and content.',
  canonical: 'https://joeyjazwinski.vercel.app/login',
  openGraph: {
    title: 'Login | Joey Jazwinski',
    description: 'Login to your Joey Jazwinski account to access personalized features and content.',
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
    description: 'Login to your Joey Jazwinski account to access personalized features and content.',
    image: 'https://joeyjazwinski.vercel.app/next.svg',
  },
};

export const seoSignup = {
  title: 'Sign Up | Joey Jazwinski',
  description: 'Create a new Joey Jazwinski account to join the community and access exclusive content.',
  canonical: 'https://joeyjazwinski.vercel.app/signup',
  openGraph: {
    title: 'Sign Up | Joey Jazwinski',
    description: 'Create a new Joey Jazwinski account to join the community and access exclusive content.',
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
    description: 'Create a new Joey Jazwinski account to join the community and access exclusive content.',
    image: 'https://joeyjazwinski.vercel.app/next.svg',
  },
};

export const seoDashboard = {
  title: 'Dashboard | Joey Jazwinski',
  description: 'Access your dashboard to manage your courses, posts, and account settings.',
  canonical: 'https://joeyjazwinski.vercel.app/dashboard',
  openGraph: {
    title: 'Dashboard | Joey Jazwinski',
    description: 'Access your dashboard to manage your courses, posts, and account settings.',
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
    description: 'Access your dashboard to manage your courses, posts, and account settings.',
    image: 'https://joeyjazwinski.vercel.app/next.svg',
  },
};

export const seoContact = {
  title: 'Contact | Joey Jazwinski',
  description: 'Get in touch with Joey Jazwinski for questions, feedback, or collaboration opportunities.',
  canonical: 'https://joeyjazwinski.vercel.app/contact',
  openGraph: {
    title: 'Contact | Joey Jazwinski',
    description: 'Get in touch with Joey Jazwinski for questions, feedback, or collaboration opportunities.',
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
    description: 'Get in touch with Joey Jazwinski for questions, feedback, or collaboration opportunities.',
    image: 'https://joeyjazwinski.vercel.app/next.svg',
  },
};

export const seoBlogs = {
  title: 'All Blogs | Joey Jazwinski',
  description: 'Browse all blog posts by Joey Jazwinski on tech, coding, Linux, tutorials, and more. Discover new insights and learn something new!',
  canonical: 'https://joeyjazwinski.vercel.app/blogs',
  openGraph: {
    title: 'All Blogs | Joey Jazwinski',
    description: 'Browse all blog posts by Joey Jazwinski on tech, coding, Linux, tutorials, and more. Discover new insights and learn something new!',
    url: 'https://joeyjazwinski.vercel.app/blogs',
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

export const seoCourses = {
  title: 'Courses | Joey Jazwinski',
  description: 'Browse all coding, tech, and Linux courses by Joey Jazwinski. Learn new skills and advance your knowledge with hands-on tutorials and lessons.',
  canonical: 'https://joeyjazwinski.vercel.app/courses',
  openGraph: {
    title: 'Courses | Joey Jazwinski',
    description: 'Browse all coding, tech, and Linux courses by Joey Jazwinski. Learn new skills and advance your knowledge with hands-on tutorials and lessons.',
    url: 'https://joeyjazwinski.vercel.app/courses',
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