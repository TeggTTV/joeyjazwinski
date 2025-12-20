import React from 'react';
import { ComponentStyles } from '../../types';
import { convertStylesToCSS, getShadowClass } from '../../utils/styleUtils';

interface LogosVariant3Props {
	styles?: Partial<ComponentStyles>;
}

export const LogosVariant3: React.FC<LogosVariant3Props> = ({
	styles = {},
}) => {
	const shadowClass = getShadowClass(styles.shadow);
	const cssStyles = convertStylesToCSS(styles);

	const logos = ['Acme Co', 'Globex', 'Initech', 'Umbrella', 'Weyland'];

	return (
		<section
			className={`w-full py-10 px-6 ${shadowClass}`}
			style={cssStyles}
		>
			<div className="max-w-6xl mx-auto">
				<div className="flex flex-wrap justify-center items-center gap-12">
					{logos.map((logo, index) => (
						<div
							key={index}
							className="text-white/60 font-bold text-2xl hover:text-white transition"
						>
							{logo}
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
