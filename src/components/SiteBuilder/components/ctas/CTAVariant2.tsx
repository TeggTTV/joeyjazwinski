import React from 'react';
import { ComponentStyles } from '../../types';

interface CTAVariant2Props {
	styles?: Partial<ComponentStyles>;
}

export const CTAVariant2: React.FC<CTAVariant2Props> = ({ styles = {} }) => {
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
					<h2 className="text-4xl font-bold mb-4">
						Start Building Today
					</h2>
					<p className="text-lg opacity-80 mb-6">
						No credit card required. Get started in minutes with our
						powerful platform.
					</p>
					<div className="flex gap-4">
						<button className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition">
							Get Started
						</button>
						<button className="px-6 py-3 border-2 border-current rounded-lg font-medium hover:bg-black/5 transition">
							Learn More
						</button>
					</div>
				</div>
				<div className="h-64 bg-linear-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center">
					<span className="text-6xl">🚀</span>
				</div>
			</div>
		</section>
	);
};
