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
				potentialAction: {
					'@type': 'SearchAction',
					target: {
						'@type': 'EntryPoint',
						urlTemplate:
							'https://joeyjazwinski.com/developer-blog?q={search_term_string}',
					},
					'query-input': 'required name=search_term_string',
				},
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
				alumniOf: {
					'@type': 'CollegeOrUniversity',
					name: 'Adelphi University',
				},
				sameAs: [
					'https://github.com/TeggTTV',
					'https://coursera.org/share/d38b6d0a03ff58df005b139765d6746c',
					'https://coursera.org/share/306ca32eb9bf33c5c3f7e059bdcc5980',
					'https://coursera.org/share/023d2adbbb0bca7a9252f706645fd80c',
					'https://coursera.org/share/fa835ee2d9fe1bd2905378ed5f81b0f9',
					'https://coursera.org/share/cd3849397b606cd1997387f1a1f2502f',
					'https://coursera.org/share/ed7e3fb6d6f4de0315afc108b56ef1da',
					'https://www.linkedin.com/learning/certificates/d2ec12b2597b7b13e05dbd1709b8081da9f608b695b694598911686216e7a9a0',
					'https://www.linkedin.com/learning/certificates/31fde3a696e822b12bff124b538e9617add5f574a8d23cf684396d6b75e21ae5',
					'https://www.linkedin.com/learning/certificates/8db371b966100359505c38a1d546dbd2b6fb972dfe3da55d2d7adccddd80333d',
				],
				hasCredential: [
					{
						'@type': 'EducationalOccupationalCredential',
						name: 'Google AI Essentials',
						credentialCategory: 'Certificate',
						recognizedBy: {
							'@type': 'Organization',
							name: 'Google',
						},
						url: 'https://coursera.org/share/d38b6d0a03ff58df005b139765d6746c',
					},
					{
						'@type': 'EducationalOccupationalCredential',
						name: 'Foundations of User Experience (UX)',
						credentialCategory: 'Certificate',
						recognizedBy: {
							'@type': 'Organization',
							name: 'Google',
						},
						url: 'https://coursera.org/share/306ca32eb9bf33c5c3f7e059bdcc5980',
					},
					{
						'@type': 'EducationalOccupationalCredential',
						name: 'Foundations of Cyber Security',
						credentialCategory: 'Certificate',
						recognizedBy: {
							'@type': 'Organization',
							name: 'Google',
						},
						url: 'https://coursera.org/share/023d2adbbb0bca7a9252f706645fd80c',
					},
					{
						'@type': 'EducationalOccupationalCredential',
						name: 'Introduction to AI',
						credentialCategory: 'Certificate',
						recognizedBy: {
							'@type': 'Organization',
							name: 'Google',
						},
						url: 'https://coursera.org/share/fa835ee2d9fe1bd2905378ed5f81b0f9',
					},
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
