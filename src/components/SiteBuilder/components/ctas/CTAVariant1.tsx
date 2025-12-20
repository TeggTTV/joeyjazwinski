import React from 'react';
import { ComponentStyles } from '../../types';
import { ArrowRight } from 'lucide-react';

interface CTAVariant1Props {
	styles?: Partial<ComponentStyles>;
}

export const CTAVariant1: React.FC<CTAVariant1Props> = ({ styles = {} }) => {
	const shadowClass =
		styles.shadow && styles.shadow !== 'none'
			? `shadow-${styles.shadow}`
			: '';

	return (
		<section
			className={`w-full py-20 px-6 ${shadowClass}`}
			style={{
				fontFamily: styles.fontFamily,
				fontSize: styles.fontSize,
				color: styles.fontColor || '#ffffff',
				backgroundColor: styles.bgColor || '#3b82f6',
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
			<div className="max-w-4xl mx-auto text-center">
				<h2 className="text-4xl md:text-5xl font-bold mb-6">
					Ready to Get Started?
				</h2>
				<p className="text-xl md:text-2xl opacity-90 mb-8">
					Join thousands of satisfied customers and transform your
					business today
				</p>
				<button className="px-10 py-4 bg-white text-gray-900 rounded-full font-bold text-lg hover:bg-gray-100 transition inline-flex items-center gap-2">
					Start Free Trial
					<ArrowRight className="w-5 h-5" />
				</button>
			</div>
		</section>
	);
};
