import React from 'react';
import { ComponentStyles } from '../../types';

interface PricingVariant3Props {
	styles?: Partial<ComponentStyles>;
}

export const PricingVariant3: React.FC<PricingVariant3Props> = ({
	styles = {},
}) => {
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
			<div className="max-w-4xl mx-auto text-center">
				<h2 className="text-4xl font-bold mb-4">
					One Plan, Everything Included
				</h2>
				<p className="text-xl opacity-80 mb-8">
					No hidden fees, cancel anytime
				</p>
				<div className="bg-white border-2 border-primary rounded-3xl p-12 inline-block">
					<div className="text-6xl font-bold text-primary mb-4">
						$49
					</div>
					<div className="text-2xl mb-6">per month</div>
					<ul className="text-left space-y-3 mb-8">
						<li>✓ Unlimited users and projects</li>
						<li>✓ Priority customer support</li>
						<li>✓ Advanced analytics</li>
						<li>✓ Custom integrations</li>
						<li>✓ 99.9% uptime SLA</li>
					</ul>
					<button className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary/90 transition">
						Start Your Free Trial
					</button>
					<p className="text-sm opacity-70 mt-4">
						No credit card required
					</p>
				</div>
			</div>
		</section>
	);
};
