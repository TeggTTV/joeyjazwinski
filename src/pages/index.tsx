import React from 'react';
import HeroSection from '@/components/LandingPage/HeroSection';
import FeaturesSection from '@/components/LandingPage/FeaturesSection';
import JourneySection from '@/components/LandingPage/JourneySection';
import TestimonialsSection from '@/components/LandingPage/TestimonialsSection';
import CTAWithNewsletterSection from '@/components/LandingPage/CTAWithNewsletterSection';
// import NewsletterSection from '@/components/LandingPage/NewsletterSection';

const HomePage: React.FC = () => {
    return (
        <main className="min-h-screen flex flex-col items-center bg-background text-text">
            <HeroSection />
            <FeaturesSection />
            <JourneySection />
            <TestimonialsSection />
            <CTAWithNewsletterSection />
            {/* <NewsletterSection /> */}
        </main>
    );
};

export default HomePage;
