import React from 'react';
import { ComponentStyles } from '../../types';
import { convertStylesToCSS, getShadowClass } from '../../utils/styleUtils';

interface ComparisonVariant3Props {
	styles?: Partial<ComponentStyles>;
}

export const ComparisonVariant3: React.FC<ComparisonVariant3Props> = ({
	styles = {},
}) => {
	const shadowClass = getShadowClass(styles.shadow);
	const cssStyles = convertStylesToCSS(styles);

	const comparisons = [
		{ label: 'Users', free: '1', premium: 'Unlimited' },
		{ label: 'Storage', free: '1GB', premium: '1TB' },
		{ label: 'Support', free: 'Email', premium: '24/7 Priority' },
		{ label: 'API Access', free: 'Limited', premium: 'Full' },
	];

	return (
		<section
			className={`w-full py-16 px-6 ${shadowClass}`}
			style={cssStyles}
		>
			<div className="max-w-3xl mx-auto">
				<h2 className="text-3xl font-bold mb-12 text-center">
					Free vs Premium
				</h2>

				<div className="space-y-4">
					{comparisons.map((item, index) => (
						<div
							key={index}
							className="grid grid-cols-3 gap-4 p-4 border border-border rounded-lg hover:border-primary transition"
						>
							<div className="font-semibold">{item.label}</div>
							<div className="text-center text-muted-foreground">
								{item.free}
							</div>
							<div className="text-center font-bold text-primary">
								{item.premium}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
