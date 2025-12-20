import React from 'react';
import { ComponentStyles } from '../../types';
import { convertStylesToCSS, getShadowClass } from '../../utils/styleUtils';
import { TrendingUp } from 'lucide-react';

interface StatsVariant3Props {
	styles?: Partial<ComponentStyles>;
}

export const StatsVariant3: React.FC<StatsVariant3Props> = ({
	styles = {},
}) => {
	const shadowClass = getShadowClass(styles.shadow);
	const cssStyles = convertStylesToCSS(styles);
	const stats = [
		{ value: '2.5M', label: 'Active Users', trend: '+12%' },
		{ value: '$48M', label: 'Revenue', trend: '+28%' },
		{ value: '127', label: 'Countries', trend: '+5' },
	];

	return (
		<section
			className={`w-full py-12 px-6 ${shadowClass}`}
			style={cssStyles}
		>
			<div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
				{stats.map((stat, i) => (
					<div
						key={i}
						className="flex items-center gap-4 p-6 border border-gray-200 rounded-xl"
					>
						<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
							<TrendingUp className="w-6 h-6 text-primary" />
						</div>
						<div>
							<div className="text-3xl font-bold">
								{stat.value}
							</div>
							<div className="text-sm text-muted-foreground">
								{stat.label}
							</div>
							<div className="text-xs text-green-600">
								{stat.trend}
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};
