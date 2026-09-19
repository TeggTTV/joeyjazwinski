import React, { useEffect } from 'react';
import { trackHomeView } from '@/lib/analytics';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { seoHome } from '@/lib/seoConfig';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/LandingPage/HeroSection';

const LearningFeaturesSection = dynamic(
	() => import('@/components/LandingPage/LearningFeaturesSection')
);
const FeaturedToolsSection = dynamic(
	() => import('@/components/LandingPage/FeaturedToolsSection')
);
const CertificationsSection = dynamic(
	() => import('@/components/LandingPage/CertificationsSection')
);
const SkillsSection = dynamic(
	() => import('@/components/LandingPage/SkillsSection')
);
const JourneySection = dynamic(
	() => import('@/components/LandingPage/JourneySection')
);
const ContactSection = dynamic(
	() => import('@/components/LandingPage/ContactSection')
);

const GameWidget = dynamic(
	() => import('@/components/Dashboard/GameWidget'),
	{ ssr: false }
);

const HomePage: React.FC = () => {
	useEffect(() => {
		trackHomeView();
	}, []);
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
				<ContactSection />
				<GameWidget />
			</main>
		</>
	);
};

export default HomePage;
