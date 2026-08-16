import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedCounterProps {
	value: number;
	suffix?: string;
	prefix?: string;
	duration?: number;
	label: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
	value,
	suffix = '',
	prefix = '',
	duration = 2,
	label,
}) => {
	const [count, setCount] = useState(0);
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: '-100px' });
	const hasAnimated = useRef(false);

	useEffect(() => {
		if (isInView && !hasAnimated.current) {
			hasAnimated.current = true;
			const startTime = Date.now();

			const updateCount = () => {
				const now = Date.now();
				const progress = Math.min(
					(now - startTime) / (duration * 1000),
					1,
				);
				// Easing function for smooth animation
				const easeOutQuart = 1 - Math.pow(1 - progress, 4);
				setCount(Math.floor(easeOutQuart * value));

				if (progress < 1) {
					requestAnimationFrame(updateCount);
				} else {
					setCount(value);
				}
			};

			requestAnimationFrame(updateCount);
		}
	}, [isInView, value, duration]);

	return (
		<motion.div
			ref={ref}
			className="text-center group"
			initial={{ opacity: 0, y: 20 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
			transition={{ duration: 0.5 }}
		>
			<div className="relative">
				<h3 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent transition-all duration-300 group-hover:scale-110">
					{prefix}
					{count}
					{suffix}
				</h3>
				{/* Glow effect on hover */}
				<div className="absolute inset-0 blur-xl bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
			</div>
			<p className="text-sm text-muted-foreground uppercase tracking-wider mt-2 font-medium">
				{label}
			</p>
		</motion.div>
	);
};

export default AnimatedCounter;
