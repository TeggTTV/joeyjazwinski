import React, { useEffect, useRef, useState } from 'react';

const ScrollProgress: React.FC = () => {
	const [scrollProgress, setScrollProgress] = useState(0);
	const rafRef = useRef<number | null>(null);

	useEffect(() => {
		const updateScrollProgress = () => {
			const scrollTop = window.scrollY;
			const docHeight =
				document.documentElement.scrollHeight - window.innerHeight;
			const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
			setScrollProgress(progress);
			rafRef.current = null;
		};

		const handleScroll = () => {
			// Use requestAnimationFrame for smoother updates
			if (rafRef.current === null) {
				rafRef.current = requestAnimationFrame(updateScrollProgress);
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		updateScrollProgress(); // Initial call

		return () => {
			window.removeEventListener('scroll', handleScroll);
			if (rafRef.current !== null) {
				cancelAnimationFrame(rafRef.current);
			}
		};
	}, []);

	return (
		<div className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent pointer-events-none">
			<div
				className="h-full bg-gradient-to-r from-primary via-purple-500 to-pink-500"
				style={{
					width: `${scrollProgress}%`,
					transition: 'none', // Remove CSS transition for immediate response
				}}
			/>
		</div>
	);
};

export default ScrollProgress;
