import React from 'react';
import HeroSection from '@/components/LandingPage/HeroSection';
import FeaturesSection from '@/components/LandingPage/FeaturesSection';
import JourneySection from '@/components/LandingPage/JourneySection';
import TestimonialsSection from '@/components/LandingPage/TestimonialsSection';
import CTASection from '@/components/LandingPage/CTASection';
import NewsletterSection from '@/components/LandingPage/NewsletterSection';

const HomePage: React.FC = () => {
    return (
        <main className="min-h-screen flex flex-col items-center bg-background text-text">
            <HeroSection />
            <FeaturesSection />
            <JourneySection />
            <TestimonialsSection />
            <CTASection />
            <NewsletterSection />
        </main>
    );
};

export default HomePage;
