import React from 'react';
import { ComponentStyles } from '../../types';
import { convertStylesToCSS, getShadowClass } from '../../utils/styleUtils';
import { Check } from 'lucide-react';

interface ComparisonVariant2Props {
	styles?: Partial<ComponentStyles>;
}

export const ComparisonVariant2: React.FC<ComparisonVariant2Props> = ({
	styles = {},
}) => {
	const shadowClass = getShadowClass(styles.shadow);
	const cssStyles = convertStylesToCSS(styles);

	const plans = [
		{
			name: 'Starter',
			features: ['Up to 10 users', '5GB storage', 'Email support'],
		},
		{
			name: 'Professional',
			features: [
				'Up to 50 users',
				'50GB storage',
				'Priority support',
				'Advanced analytics',
			],
		},
		{
			name: 'Enterprise',
			features: [
				'Unlimited users',
				'Unlimited storage',
				'24/7 phone support',
				'Custom integrations',
				'Dedicated manager',
			],
		},
	];

	return (
		<section
			className={`w-full py-16 px-6 ${shadowClass}`}
			style={cssStyles}
		>
			<div className="max-w-6xl mx-auto">
				<h2 className="text-3xl font-bold mb-12 text-center">
					Compare Plans
				</h2>

				<div className="grid md:grid-cols-3 gap-6">
					{plans.map((plan, index) => (
						<div
							key={index}
							className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition border-2 border-transparent hover:border-primary"
						>
							<h3 className="text-2xl font-bold mb-6">
								{plan.name}
							</h3>
							<ul className="space-y-3">
								{plan.features.map((feature, fIndex) => (
									<li
										key={fIndex}
										className="flex items-start gap-3"
									>
										<Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
										<span className="text-sm">
											{feature}
										</span>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
