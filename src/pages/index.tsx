import React from 'react';
import { NextSeo } from 'next-seo';
import { seoHome } from '@/lib/seoConfig';
import HeroSection from '@/components/LandingPage/HeroSection';
import FeaturesSection from '@/components/LandingPage/FeaturesSection';
import JourneySection from '@/components/LandingPage/JourneySection';
import TestimonialsSection from '@/components/LandingPage/TestimonialsSection';
import ContactSection from '@/components/LandingPage/ContactSection';
// import FooterSection from '@/components/LandingPage/FooterSection';
// import CTAWithNewsletterSection from '@/components/LandingPage/CTAWithNewsletterSection';
// import NewsletterSection from '@/components/LandingPage/NewsletterSection';

const HomePage: React.FC = () => {
	return (
		<>
			<NextSeo {...seoHome} />
			<main className="min-h-screen flex flex-col items-center bg-background text-text">
				<HeroSection />
				<FeaturesSection />
				<JourneySection />
				<TestimonialsSection />
				<ContactSection />
				{/* <FooterSection /> */}
				{/* <CTAWithNewsletterSection /> */}
				{/* <NewsletterSection /> */}
			</main>
		</>
	);
};

export default HomePage;
