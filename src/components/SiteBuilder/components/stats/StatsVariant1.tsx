import React from 'react';
import { ComponentStyles } from '../../types';
import { convertStylesToCSS, getShadowClass } from '../../utils/styleUtils';

interface StatsVariant1Props {
	styles?: Partial<ComponentStyles>;
}

export const StatsVariant1: React.FC<StatsVariant1Props> = ({
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
				<h2 className="text-3xl font-bold mb-12 text-center">
					By The Numbers
				</h2>

				<div className="grid md:grid-cols-4 gap-8 text-center">
					<div>
						<div className="text-5xl font-bold text-primary mb-2">
							10M+
						</div>
						<div className="text-muted-foreground">
							Active Users
						</div>
					</div>
					<div>
						<div className="text-5xl font-bold text-primary mb-2">
							99.9%
						</div>
						<div className="text-muted-foreground">Uptime</div>
					</div>
					<div>
						<div className="text-5xl font-bold text-primary mb-2">
							24/7
						</div>
						<div className="text-muted-foreground">Support</div>
					</div>
					<div>
						<div className="text-5xl font-bold text-primary mb-2">
							150+
						</div>
						<div className="text-muted-foreground">Countries</div>
					</div>
				</div>
			</div>
		</section>
	);
};
