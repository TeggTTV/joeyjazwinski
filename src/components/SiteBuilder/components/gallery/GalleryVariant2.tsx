import React from 'react';
import { ComponentStyles } from '../../types';
import { convertStylesToCSS, getShadowClass } from '../../utils/styleUtils';
import { Image } from 'lucide-react';

interface GalleryVariant2Props {
	styles?: Partial<ComponentStyles>;
}

export const GalleryVariant2: React.FC<GalleryVariant2Props> = ({
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
					Featured Work
				</h2>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
					{[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
						<div
							key={i}
							className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 hover:shadow-xl transition-shadow cursor-pointer"
						>
							<div className="w-full h-full flex items-center justify-center">
								<Image className="w-12 h-12 text-gray-300" />
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
