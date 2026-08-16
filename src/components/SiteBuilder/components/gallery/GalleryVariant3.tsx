import React from 'react';
import { ComponentStyles } from '../../types';
import { convertStylesToCSS, getShadowClass } from '../../utils/styleUtils';
import { Image } from 'lucide-react';

interface GalleryVariant3Props {
	styles?: Partial<ComponentStyles>;
}

export const GalleryVariant3: React.FC<GalleryVariant3Props> = ({
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
				<h2 className="text-3xl font-bold mb-12">Portfolio Showcase</h2>

				<div className="flex gap-4 overflow-x-auto pb-4">
					{[1, 2, 3, 4, 5].map((i) => (
						<div
							key={i}
							className="shrink-0 w-80 h-56 rounded-xl overflow-hidden bg-linear-to-br from-indigo-900 to-purple-900 hover:scale-105 transition-transform cursor-pointer"
						>
							<div className="w-full h-full flex items-center justify-center">
								<Image className="w-16 h-16 text-white/30" />
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
