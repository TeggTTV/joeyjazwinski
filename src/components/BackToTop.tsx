import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ArrowUp } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function BackToTop() {
	const [isVisible, setIsVisible] = useState(false);
	const router = useRouter();
	const isHome = router.pathname === '/';

	useEffect(() => {
		const handleScroll = () => {
			// Appears when user scrolls down 200vh (2x window.innerHeight)
			const threshold = window.innerHeight * 2;
			setIsVisible(window.scrollY > threshold);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		// Initial check
		handleScroll();

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.button
					key="back-to-top"
					initial={{ opacity: 0, scale: 0.8, y: 10 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.8, y: 10 }}
					transition={{ duration: 0.2, ease: 'easeOut' }}
					onClick={scrollToTop}
					aria-label="Back to top"
					title="Back to top"
					className={`fixed z-40 p-2.5 sm:p-3 rounded-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-border/80 dark:border-white/15 hover:border-primary/50 text-foreground hover:text-primary shadow-xl hover:shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center group ${
						isHome
							? 'bottom-16 right-4 sm:bottom-22 sm:right-6'
							: 'bottom-4 right-4 sm:bottom-6 sm:right-6'
					}`}
				>
					<ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
				</motion.button>
			)}
		</AnimatePresence>
	);
}
