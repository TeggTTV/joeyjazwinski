import React from 'react';
import { NextSeo } from 'next-seo';
import { seoHome } from '@/lib/seoConfig';
import HeroSection from '@/components/LandingPage/HeroSection';
import SkillsSection from '@/components/LandingPage/SkillsSection';
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
				<div className="absolute top-30 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
				<div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

				<HeroSection />
				<SkillsSection />
				<JourneySection />
				{/* <TestimonialsSection /> */}
				<ContactSection />
				{/* <FooterSection /> */}
				{/* <CTAWithNewsletterSection /> */}
				{/* <NewsletterSection /> */}
			</main>
		</>
	);
};

export default HomePage;
