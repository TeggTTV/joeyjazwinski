import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ArrowUp } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function BackToTop() {
	const [isVisible, setIsVisible] = useState(false);
	const router = useRouter();
	const isHome = router.pathname === '/';

	const isVisibleRef = React.useRef(false);

	useEffect(() => {
		let rafId: number | null = null;
		const handleScroll = () => {
			if (rafId !== null) return;
			rafId = requestAnimationFrame(() => {
				const threshold = window.innerHeight * 2;
				const nextVisible = window.scrollY > threshold;
				if (isVisibleRef.current !== nextVisible) {
					isVisibleRef.current = nextVisible;
					setIsVisible(nextVisible);
				}
				rafId = null;
			});
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
			if (rafId !== null) cancelAnimationFrame(rafId);
		};
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
							? 'bottom-[max(4rem,calc(env(safe-area-inset-bottom)+3.5rem))] right-4 sm:bottom-22 sm:right-6'
							: 'bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 sm:bottom-6 sm:right-6'
					}`}
				>
					<ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
				</motion.button>
			)}
		</AnimatePresence>
	);
}
