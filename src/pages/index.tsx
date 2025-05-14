import React from 'react';
import Head from 'next/head';
import HeroSection from '@/components/LandingPage/HeroSection';
import FeaturesSection from '@/components/LandingPage/FeaturesSection';
import JourneySection from '@/components/LandingPage/JourneySection';
import TestimonialsSection from '@/components/LandingPage/TestimonialsSection';
import CTAWithNewsletterSection from '@/components/LandingPage/CTAWithNewsletterSection';
// import NewsletterSection from '@/components/LandingPage/NewsletterSection';

const HomePage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Joey Jazwinski | Blog, Tutorials, and Coding Journey</title>
                <meta name="description" content="Personal blog and tutorials on tech, coding, Linux, and more by Joey Jazwinski. Learn, explore, and grow your skills!" />
                <link rel="canonical" href="https://joeyjazwinski.vercel.app/" />
                <meta property="og:title" content="Joey Jazwinski | Blog, Tutorials, and Coding Journey" />
                <meta property="og:description" content="Personal blog and tutorials on tech, coding, Linux, and more by Joey Jazwinski. Learn, explore, and grow your skills!" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://joeyjazwinski.vercel.app/" />
                <meta property="og:image" content="https://joeyjazwinski.vercel.app/next.svg" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Joey Jazwinski | Blog, Tutorials, and Coding Journey" />
                <meta name="twitter:description" content="Personal blog and tutorials on tech, coding, Linux, and more by Joey Jazwinski. Learn, explore, and grow your skills!" />
                <meta name="twitter:image" content="https://joeyjazwinski.vercel.app/next.svg" />
            </Head>
            <main className="min-h-screen flex flex-col items-center bg-background text-text">
                <HeroSection />
                <FeaturesSection />
                <JourneySection />
                <TestimonialsSection />
                <CTAWithNewsletterSection />
                {/* <NewsletterSection /> */}
            </main>
        </>
    );
};

export default HomePage;
