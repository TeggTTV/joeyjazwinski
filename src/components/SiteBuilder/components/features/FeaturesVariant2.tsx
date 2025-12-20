import React from 'react';
import { ComponentStyles } from '../../types';
import { Check } from 'lucide-react';

interface FeaturesVariant2Props {
	styles?: Partial<ComponentStyles>;
}

export const FeaturesVariant2: React.FC<FeaturesVariant2Props> = ({
	styles = {},
}) => {
	const shadowClass =
		styles.shadow && styles.shadow !== 'none'
			? `shadow-${styles.shadow}`
			: '';

	const features = [
		'Real-time collaboration',
		'Advanced analytics dashboard',
		'24/7 customer support',
		'Unlimited storage',
		'Custom integrations',
		'Mobile apps for iOS and Android',
	];

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
			<div className="max-w-5xl mx-auto">
				<h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
				<p className="text-xl opacity-80 mb-8">
					All the tools to succeed in one powerful platform
				</p>
				<div className="grid md:grid-cols-2 gap-4">
					{features.map((feature, index) => (
						<div key={index} className="flex items-center gap-3">
							<div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
								<Check className="w-4 h-4 text-white" />
							</div>
							<span className="text-lg">{feature}</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
