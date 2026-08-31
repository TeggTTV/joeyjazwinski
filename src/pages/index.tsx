import React from 'react';
import Head from 'next/head';
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
	const personSchema = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				'@id': 'https://joeyjazwinski.com/#website',
				url: 'https://joeyjazwinski.com',
				name: 'Joey Jazwinski',
				description:
					'Portfolio, developer blog, and utility toolbox of software developer Joey Jazwinski.',
				inLanguage: 'en-US',
			},
			{
				'@type': 'ProfilePage',
				'@id': 'https://joeyjazwinski.com/#profile',
				isPartOf: { '@id': 'https://joeyjazwinski.com/#website' },
				mainEntity: { '@id': 'https://joeyjazwinski.com/#person' },
			},
			{
				'@type': 'Person',
				'@id': 'https://joeyjazwinski.com/#person',
				name: 'Joey Jazwinski',
				url: 'https://joeyjazwinski.com',
				jobTitle: 'Software Developer & Creator',
				sameAs: [
					'https://github.com/TeggTTV',
					'https://coursera.org/share/d38b6d0a03ff58df005b139765d6746c',
					'https://coursera.org/share/306ca32eb9bf33c5c3f7e059bdcc5980',
					'https://coursera.org/share/023d2adbbb0bca7a9252f706645fd80c',
					'https://coursera.org/share/fa835ee2d9fe1bd2905378ed5f81b0f9',
				],
				knowsAbout: [
					'Full-Stack Web Development',
					'Next.js',
					'React',
					'TypeScript',
					'Cybersecurity',
					'User Experience Design',
					'Generative AI & Prompt Engineering',
				],
			},
		],
	};

	return (
		<>
			<NextSeo {...seoHome} />
			<Head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(personSchema),
					}}
				/>
			</Head>
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
