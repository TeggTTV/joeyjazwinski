import React from 'react';
import { ComponentStyles } from '../../types';

interface PricingVariant2Props {
	styles?: Partial<ComponentStyles>;
}

export const PricingVariant2: React.FC<PricingVariant2Props> = ({
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
			<div className="max-w-5xl mx-auto">
				<h2 className="text-4xl font-bold text-center mb-12">
					Pricing That Scales
				</h2>
				<div className="border border-gray-200 rounded-2xl overflow-hidden">
					<table className="w-full">
						<thead className="bg-gray-50">
							<tr>
								<th className="p-4 text-left">Feature</th>
								<th className="p-4 text-center">Basic</th>
								<th className="p-4 text-center bg-primary/10">
									Pro
								</th>
								<th className="p-4 text-center">Enterprise</th>
							</tr>
						</thead>
						<tbody>
							<tr className="border-t border-gray-200">
								<td className="p-4 font-medium">Users</td>
								<td className="p-4 text-center">5</td>
								<td className="p-4 text-center bg-primary/5">
									Unlimited
								</td>
								<td className="p-4 text-center">Unlimited</td>
							</tr>
							<tr className="border-t border-gray-200">
								<td className="p-4 font-medium">Storage</td>
								<td className="p-4 text-center">10GB</td>
								<td className="p-4 text-center bg-primary/5">
									100GB
								</td>
								<td className="p-4 text-center">Unlimited</td>
							</tr>
							<tr className="border-t border-gray-200">
								<td className="p-4 font-medium">Support</td>
								<td className="p-4 text-center">Email</td>
								<td className="p-4 text-center bg-primary/5">
									Priority
								</td>
								<td className="p-4 text-center">24/7 Phone</td>
							</tr>
							<tr className="border-t border-gray-200 bg-gray-50">
								<td className="p-4 font-bold">Price</td>
								<td className="p-4 text-center font-bold">
									$9/mo
								</td>
								<td className="p-4 text-center bg-primary/10 font-bold">
									$29/mo
								</td>
								<td className="p-4 text-center font-bold">
									Custom
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
};
