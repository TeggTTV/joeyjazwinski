import React from 'react';
import { ComponentStyles } from '../../types';
import { convertStylesToCSS, getShadowClass } from '../../utils/styleUtils';
import { Check, X } from 'lucide-react';

interface ComparisonVariant1Props {
	styles?: Partial<ComponentStyles>;
}

export const ComparisonVariant1: React.FC<ComparisonVariant1Props> = ({
	styles = {},
}) => {
	const shadowClass = getShadowClass(styles.shadow);
	const cssStyles = convertStylesToCSS(styles);

	const features = [
		{ name: 'Feature A', basic: true, pro: true, enterprise: true },
		{ name: 'Feature B', basic: true, pro: true, enterprise: true },
		{ name: 'Feature C', basic: false, pro: true, enterprise: true },
		{ name: 'Feature D', basic: false, pro: false, enterprise: true },
	];

	return (
		<section
			className={`w-full py-16 px-6 ${shadowClass}`}
			style={cssStyles}
		>
			<div className="max-w-5xl">
				<h2 className="text-3xl font-bold mb-12 text-center">
					Plan Comparison
				</h2>

				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b-2 border-border">
								<th className="text-left py-4 px-6">
									Features
								</th>
								<th className="text-center py-4 px-6">Basic</th>
								<th className="text-center py-4 px-6">Pro</th>
								<th className="text-center py-4 px-6">
									Enterprise
								</th>
							</tr>
						</thead>
						<tbody>
							{features.map((feature, index) => (
								<tr
									key={index}
									className="border-b border-border"
								>
									<td className="py-4 px-6 font-medium">
										{feature.name}
									</td>
									<td className="py-4 px-6 text-center">
										{feature.basic ? (
											<Check className="w-5 h-5 text-green-500 mx-auto" />
										) : (
											<X className="w-5 h-5 text-red-400 mx-auto" />
										)}
									</td>
									<td className="py-4 px-6 text-center">
										{feature.pro ? (
											<Check className="w-5 h-5 text-green-500 mx-auto" />
										) : (
											<X className="w-5 h-5 text-red-400 mx-auto" />
										)}
									</td>
									<td className="py-4 px-6 text-center">
										{feature.enterprise ? (
											<Check className="w-5 h-5 text-green-500 mx-auto" />
										) : (
											<X className="w-5 h-5 text-red-400 mx-auto" />
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
};
