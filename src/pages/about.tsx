import React from 'react';
import { NextSeo } from 'next-seo';
import JourneySection from '@/components/LandingPage/JourneySection';
import { motion } from 'framer-motion';

const AboutPage: React.FC = () => {
	return (
		<>
			<NextSeo
				title="About Me | Joey Jazwinski"
				description="Learn more about Joey Jazwinski, a passionate software engineer and web developer."
			/>
			<main className="min-h-screen py-20 px-4 md:px-8 bg-background">
				<div className="max-w-4xl mx-auto mb-16 text-center">
					<motion.h1
						className="text-4xl md:text-6xl font-bold mb-6"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
					>
						About Me
					</motion.h1>
					<motion.p
						className="text-lg text-muted-foreground leading-relaxed"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
					>
						I'm a dedicated developer with a passion for building
						clean, efficient, and user-friendly applications. My
						journey started with simple scripts and has evolved into
						full-stack development using modern technologies.
					</motion.p>
				</div>

				<JourneySection />
			</main>
		</>
	);
};

export default AboutPage;
