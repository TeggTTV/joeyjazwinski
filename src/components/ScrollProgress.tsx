import React, { useEffect, useRef } from 'react';

const ScrollProgress: React.FC = () => {
	const barRef = useRef<HTMLDivElement>(null);
	const rafRef = useRef<number | null>(null);

	useEffect(() => {
		const updateScrollProgress = () => {
			if (!barRef.current) return;
			const scrollTop = window.scrollY;
			const docHeight =
				document.documentElement.scrollHeight - window.innerHeight;
			const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
			barRef.current.style.transform = `scaleX(${progress})`;
			rafRef.current = null;
		};

		const handleScroll = () => {
			if (rafRef.current === null) {
				rafRef.current = requestAnimationFrame(updateScrollProgress);
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		updateScrollProgress();

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
				ref={barRef}
				className="h-full w-full bg-linear-to-r from-primary via-purple-500 to-pink-500 origin-left"
				style={{
					transform: 'scaleX(0)',
					willChange: 'transform',
				}}
			/>
		</div>
	);
};

export default ScrollProgress;
