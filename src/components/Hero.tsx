"use client";

import { ArrowRight, ChevronRight } from 'lucide-react';
// import { BorderBeam } from './components/magicui/border-beam';
// import Meteors from './components/magicui/meteors';
import Particles from './magicui/particles';
import AnimatedShinyText from './magicui/animated-shiny-text';
import WordFadeIn from './magicui/word-fade-in';
import Link from 'next/link';
// import SparklesText from './components/magicui/sparkles-text';

function Hero(props: { theme: string }) {
	return (
		<section className="md:h-[calc(90vh-72px)] h-[calc(80vh-72px)] relative overflow-hidden bg-white dark:bg-gray-900 after:content-[''] after:absolute dark:after:w-full dark:after:h-full dark:after:top-0 after:bg-gradient-to-b dark:after:from-transparent light:after:to-white dark:after:to-black after:z-[-1] z-10">
			<Particles
				className="absolute inset-0"
				quantity={100}
				ease={80}
				color={props.theme === 'dark' ? '#ffffff' : '#000000'}
				refresh
			/>
			<div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
				<div
					className="pointer-events-none relative inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
					role="alert"
				>
					<span className="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 mr-3">
						New
					</span>{' '}
					<AnimatedShinyText>
						<span className="text-sm font-medium">
							compy is here! Get started by creating an account.
						</span>
					</AnimatedShinyText>
					<ChevronRight className="w-5 h-5 ml-2" />
				</div>

				<WordFadeIn
					words="Make Learning Fun"
					className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
				></WordFadeIn>
				<p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
					Play games, learn new things, and have fun with compy. We make learning fun
					for everyone. 
				</p>
				<div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
					<Link
						href="#"
						className="relative inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-[24px] bg-blue-700 hover:bg-primary-800"
					>
						Get Started
						<ArrowRight className="ml-2 -mr-1 w-6 h-6" />
					</Link>
				</div>
			</div>
		</section>
	);
}

export default Hero;
