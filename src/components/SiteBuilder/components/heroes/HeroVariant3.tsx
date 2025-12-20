import React from 'react';
import { ComponentStyles } from '../../types';

interface HeroVariant3Props {
	styles?: Partial<ComponentStyles>;
}

export const HeroVariant3: React.FC<HeroVariant3Props> = ({ styles = {} }) => {
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
				backgroundColor: styles.bgColor || '#1a1a2e',
				marginTop: styles.margin?.top,
				marginRight: styles.margin?.right,
				marginBottom: styles.margin?.bottom,
				marginLeft: styles.margin?.left,
				paddingTop: styles.padding?.top || 100,
				paddingRight: styles.padding?.right,
				paddingBottom: styles.padding?.bottom || 100,
				paddingLeft: styles.padding?.left,
			}}
		>
			<div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10"></div>
			<div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
				<h1 className="text-5xl md:text-7xl font-bold mb-6">
					Welcome to the Future
				</h1>
				<p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
					Experience cutting-edge technology that adapts to your needs
					and scales with your ambitions.
				</p>
				<div className="flex gap-4 justify-center">
					<button className="px-10 py-4 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition">
						Get Started Free
					</button>
					<button className="px-10 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition">
						Watch Demo
					</button>
				</div>
			</div>
		</section>
	);
};
