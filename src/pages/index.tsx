import React from 'react';
import { NextSeo } from 'next-seo';
import { seoHome } from '@/lib/seoConfig';
import HeroSection from '@/components/LandingPage/HeroSection';
import SkillsSection from '@/components/LandingPage/SkillsSection';
import JourneySection from '@/components/LandingPage/JourneySection';
import LearningFeaturesSection from '@/components/LandingPage/LearningFeaturesSection';
import FeaturedToolsSection from '@/components/LandingPage/FeaturedToolsSection';
import CertificationsSection from '@/components/LandingPage/CertificationsSection';
import TestimonialsSection from '@/components/LandingPage/TestimonialsSection';
import ContactSection from '@/components/LandingPage/ContactSection';
import GameWidget from '@/components/Dashboard/GameWidget';

const HomePage: React.FC = () => {
	return (
		<>
			<NextSeo {...seoHome} />
			<main className="min-h-screen flex flex-col bg-background text-foreground">
				<HeroSection />
				<LearningFeaturesSection />
				<FeaturedToolsSection />
				<CertificationsSection />
				<SkillsSection />
				<JourneySection />
				{/* <TestimonialsSection /> */}
				<ContactSection />
				{/* <FooterSection /> */}
				{/* <CTAWithNewsletterSection /> */}
				{/* <NewsletterSection /> */}
				<GameWidget />
			</main>
		</>
	);
};

export default HomePage;
