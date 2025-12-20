import React from 'react';
import { ComponentStyles } from '../../types';
import { convertStylesToCSS, getShadowClass } from '../../utils/styleUtils';

interface LogosVariant1Props {
	styles?: Partial<ComponentStyles>;
}

export const LogosVariant1: React.FC<LogosVariant1Props> = ({
	styles = {},
}) => {
	const shadowClass = getShadowClass(styles.shadow);
	const cssStyles = convertStylesToCSS(styles);

	const logos = [
		'TechCorp',
		'InnovateCo',
		'FutureSoft',
		'CloudBase',
		'DataFlow',
		'CodeWorks',
	];

	return (
		<section
			className={`w-full py-12 px-6 ${shadowClass}`}
			style={cssStyles}
		>
			<div className="max-w-7xl mx-auto">
				<p className="text-center text-muted-foreground mb-8">
					Trusted by leading companies
				</p>

				<div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center">
					{logos.map((logo, index) => (
						<div
							key={index}
							className="flex items-center justify-center h-12 text-gray-400 font-bold text-lg hover:text-gray-600 transition opacity-60 hover:opacity-100"
						>
							{logo}
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
