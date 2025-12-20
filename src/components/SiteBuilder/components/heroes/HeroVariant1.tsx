import React from 'react';
import { ComponentStyles } from '../../types';

interface HeroVariant1Props {
	styles?: Partial<ComponentStyles>;
}

export const HeroVariant1: React.FC<HeroVariant1Props> = ({ styles = {} }) => {
	const shadowClass =
		styles.shadow && styles.shadow !== 'none'
			? `shadow-${styles.shadow}`
			: '';

	return (
		<section
			className={`w-full py-20 px-6 text-center ${shadowClass}`}
			style={{
				fontFamily: styles.fontFamily,
				fontSize: styles.fontSize,
				color: styles.fontColor,
				backgroundColor: styles.bgColor,
				marginTop: styles.margin?.top,
				marginRight: styles.margin?.right,
				marginBottom: styles.margin?.bottom,
				marginLeft: styles.margin?.left,
				paddingTop: styles.padding?.top,
				paddingRight: styles.padding?.right,
				paddingBottom: styles.padding?.bottom,
				paddingLeft: styles.padding?.left,
			}}
		>
			<div className="max-w-4xl mx-auto">
				<h1 className="text-5xl md:text-6xl font-bold mb-6">
					Build Something Amazing
				</h1>
				<p className="text-xl md:text-2xl opacity-80 mb-8">
					The perfect solution for your business needs. Start building
					your dream today.
				</p>
				<div className="flex gap-4 justify-center">
					<button className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition">
						Get Started
					</button>
					<button className="px-8 py-3 border-2 border-current rounded-lg font-semibold hover:bg-white/10 transition">
						Learn More
					</button>
				</div>
			</div>
		</section>
	);
};
