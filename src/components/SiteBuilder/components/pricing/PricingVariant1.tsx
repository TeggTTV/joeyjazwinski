import React from 'react';
import { ComponentStyles } from '../../types';
import { Check } from 'lucide-react';

interface PricingVar1Props {
	styles?: Partial<ComponentStyles>;
}

export const PricingVariant1: React.FC<PricingVar1Props> = ({
	styles = {},
}) => {
	const shadowClass =
		styles.shadow && styles.shadow !== 'none'
			? `shadow-${styles.shadow}`
			: '';

	const plans = [
		{
			name: 'Starter',
			price: '$9',
			features: ['Up to 10 users', 'Basic support', '10GB storage'],
			popular: false,
		},
		{
			name: 'Professional',
			price: '$29',
			features: [
				'Unlimited users',
				'Priority support',
				'100GB storage',
				'Advanced analytics',
			],
			popular: true,
		},
		{
			name: 'Enterprise',
			price: '$99',
			features: [
				'Unlimited everything',
				'24/7 support',
				'Unlimited storage',
				'Custom integrations',
			],
			popular: false,
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
				<h2 className="text-4xl font-bold text-center mb-4">
					Simple, Transparent Pricing
				</h2>
				<p className="text-center text-xl opacity-80 mb-12">
					Choose the perfect plan for your needs
				</p>
				<div className="grid md:grid-cols-3 gap-8">
					{plans.map((plan, index) => (
						<div
							key={index}
							className={`p-8 rounded-2xl border-2 ${
								plan.popular
									? 'border-primary bg-primary/5 relative'
									: 'border-gray-200'
							}`}
						>
							{plan.popular && (
								<div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-sm font-bold rounded-full">
									Most Popular
								</div>
							)}
							<h3 className="text-2xl font-bold mb-2">
								{plan.name}
							</h3>
							<div className="mb-6">
								<span className="text-5xl font-bold">
									{plan.price}
								</span>
								<span className="opacity-70">/month</span>
							</div>
							<ul className="space-y-3 mb-8">
								{plan.features.map((feature, i) => (
									<li
										key={i}
										className="flex items-center gap-2"
									>
										<Check className="w-5 h-5 text-primary flex-shrink-0" />
										<span>{feature}</span>
									</li>
								))}
							</ul>
							<button
								className={`w-full py-3 rounded-lg font-medium transition ${
									plan.popular
										? 'bg-primary text-white hover:bg-primary/90'
										: 'border-2 border-current hover:bg-black/5'
								}`}
							>
								Get Started
							</button>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
