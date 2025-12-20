import React from 'react';
import { ComponentStyles } from '../../types';
import { convertStylesToCSS, getShadowClass } from '../../utils/styleUtils';

interface StatsVariant2Props {
	styles?: Partial<ComponentStyles>;
}

export const StatsVariant2: React.FC<StatsVariant2Props> = ({
	styles = {},
}) => {
	const shadowClass = getShadowClass(styles.shadow);
	const cssStyles = convertStylesToCSS(styles);

	return (
		<section
			className={`w-full py-16 px-6 ${shadowClass}`}
			style={cssStyles}
		>
			<div className="max-w-7xl mx-auto">
				<h2 className="text-3xl font-bold mb-8 text-center">
					Our Impact
				</h2>
				<div className="grid md:grid-cols-3 gap-6">
					<div className="bg-white/10 p-6 rounded-xl">
						<div className="text-4xl font-bold mb-2">150M+</div>
						<div className="opacity-80">Downloads</div>
					</div>
					<div className="bg-white/10 p-6 rounded-xl">
						<div className="text-4xl font-bold mb-2">98%</div>
						<div className="opacity-80">Satisfaction</div>
					</div>
					<div className="bg-white/10 p-6 rounded-xl">
						<div className="text-4xl font-bold mb-2">50K+</div>
						<div className="opacity-80">Businesses</div>
					</div>
				</div>
			</div>
		</section>
	);
};
