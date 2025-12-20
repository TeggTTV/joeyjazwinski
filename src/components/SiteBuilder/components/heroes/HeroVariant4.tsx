import React from 'react';
import { ComponentStyles } from '../../types';
import { motion } from 'framer-motion';

interface HeroVariant4Props {
	styles?: Partial<ComponentStyles>;
}

export const HeroVariant4: React.FC<HeroVariant4Props> = ({ styles = {} }) => {
	const shadowClass =
		styles.shadow && styles.shadow !== 'none'
			? `shadow-${styles.shadow}`
			: '';

	return (
		<section
			className={`w-full relative overflow-hidden ${shadowClass}`}
			style={{
				fontFamily: styles.fontFamily,
				fontSize: styles.fontSize,
				color: styles.fontColor,
				backgroundColor: styles.bgColor,
				marginTop: styles.margin?.top,
				marginRight: styles.margin?.right,
				marginBottom: styles.margin?.bottom,
				marginLeft: styles.margin?.left,
				paddingTop: styles.padding?.top || 120,
				paddingRight: styles.padding?.right,
				paddingBottom: styles.padding?.bottom || 120,
				paddingLeft: styles.padding?.left,
			}}
		>
			<div className="max-w-7xl mx-auto px-6 text-center">
				<motion.h1
					className="text-6xl md:text-7xl font-extrabold mb-6"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					Innovate. Create.{' '}
					<span className="text-primary">Succeed.</span>
				</motion.h1>
				<motion.p
					className="text-xl md:text-2xl opacity-80 mb-10 max-w-3xl mx-auto"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					Empowering businesses worldwide with next-generation
					solutions that drive real results.
				</motion.p>
				<motion.div
					className="flex flex-col sm:flex-row gap-4 justify-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
				>
					<button className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary/90 transition shadow-lg">
						Start Your Journey
					</button>
					<button className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-current rounded-full font-bold text-lg hover:bg-white/20 transition">
						Explore Features
					</button>
				</motion.div>
			</div>
		</section>
	);
};
