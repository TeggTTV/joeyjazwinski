import React from 'react';
import { ComponentStyles } from '../../types';
import { Zap, Shield, Rocket } from 'lucide-react';

interface FeaturesVariant1Props {
	styles?: Partial<ComponentStyles>;
}

export const FeaturesVariant1: React.FC<FeaturesVariant1Props> = ({
	styles = {},
}) => {
	const shadowClass =
		styles.shadow && styles.shadow !== 'none'
			? `shadow-${styles.shadow}`
			: '';

	const features = [
		{
			icon: Zap,
			title: 'Lightning Fast',
			description: 'Optimized for speed and performance',
		},
		{
			icon: Shield,
			title: 'Secure',
			description: 'Enterprise-grade security built-in',
		},
		{
			icon: Rocket,
			title: 'Scalable',
			description: 'Grows with your business needs',
		},
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
			<div className="max-w-7xl mx-auto">
				<h2 className="text-4xl font-bold text-center mb-12">
					Amazing Features
				</h2>
				<div className="grid md:grid-cols-3 gap-8">
					{features.map((feature, index) => (
						<div
							key={index}
							className="text-center p-6 rounded-lg hover:bg-black/5 transition"
						>
							<feature.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
							<h3 className="text-xl font-bold mb-2">
								{feature.title}
							</h3>
							<p className="opacity-80">{feature.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
