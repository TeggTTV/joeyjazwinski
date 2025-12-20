import React from 'react';
import { ComponentStyles } from '../../types';
import { convertStylesToCSS, getShadowClass } from '../../utils/styleUtils';

interface LogosVariant2Props {
	styles?: Partial<ComponentStyles>;
}

export const LogosVariant2: React.FC<LogosVariant2Props> = ({
	styles = {},
}) => {
	const shadowClass = getShadowClass(styles.shadow);
	const cssStyles = convertStylesToCSS(styles);

	const logos = ['Alpha Inc', 'Beta Corp', 'Gamma LLC', 'Delta Systems'];

	return (
		<section
			className={`w-full py-16 px-6 ${shadowClass}`}
			style={cssStyles}
		>
			<div className="max-w-5xl">
				<h3 className="text-2xl font-bold text-center mb-12">
					Our Partners
				</h3>

				<div className="grid md:grid-cols-4 gap-12">
					{logos.map((logo, index) => (
						<div
							key={index}
							className="flex items-center justify-center h-20 border-2 border-border rounded-lg hover:border-primary transition p-6"
						>
							<span className="font-bold text-xl text-gray-500">
								{logo}
							</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
