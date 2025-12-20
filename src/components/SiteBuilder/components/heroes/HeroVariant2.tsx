import React from 'react';
import { ComponentStyles } from '../../types';

interface HeroVariant2Props {
	styles?: Partial<ComponentStyles>;
}

export const HeroVariant2: React.FC<HeroVariant2Props> = ({ styles = {} }) => {
	const shadowClass =
		styles.shadow && styles.shadow !== 'none'
			? `shadow-${styles.shadow}`
			: '';

	return (
		<section
			className={`w-full py-16 px-6 ${shadowClass}`}
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
			<div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
				<div>
					<h1 className="text-4xl md:text-5xl font-bold mb-6">
						Transform Your Business with Innovation
					</h1>
					<p className="text-lg md:text-xl opacity-80 mb-8">
						Join thousands of companies already using our platform
						to streamline operations and boost productivity.
					</p>
					<button className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition">
						Start Free Trial
					</button>
				</div>
				<div className="h-64 md:h-96 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center">
					<span className="text-6xl opacity-50">📱</span>
				</div>
			</div>
		</section>
	);
};
