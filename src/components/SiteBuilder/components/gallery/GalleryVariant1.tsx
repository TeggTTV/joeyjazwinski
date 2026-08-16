import React from 'react';
import { ComponentStyles } from '../../types';
import { convertStylesToCSS, getShadowClass } from '../../utils/styleUtils';
import { Image } from 'lucide-react';

interface GalleryVariant1Props {
	styles?: Partial<ComponentStyles>;
}

export const GalleryVariant1: React.FC<GalleryVariant1Props> = ({
	styles = {},
}) => {
	const shadowClass = getShadowClass(styles.shadow);
	const cssStyles = convertStylesToCSS(styles);

	const images = [
		{ id: 1, title: 'Mountain Vista' },
		{ id: 2, title: 'Ocean Sunset' },
		{ id: 3, title: 'City Lights' },
		{ id: 4, title: 'Forest Path' },
		{ id: 5, title: 'Desert Dunes' },
		{ id: 6, title: 'Northern Lights' },
	];

	return (
		<section
			className={`w-full py-16 px-6 ${shadowClass}`}
			style={cssStyles}
		>
			<div className="max-w-7xl mx-auto">
				<h2 className="text-4xl font-bold mb-4 text-center">
					Our Gallery
				</h2>
				<p className="text-center text-muted-foreground mb-12">
					Explore our stunning collection
				</p>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{images.map((img) => (
						<div
							key={img.id}
							className="group relative aspect-video rounded-xl overflow-hidden bg-linear-to-br from-blue-100 to-purple-100 cursor-pointer hover:scale-105 transition-transform"
						>
							<div className="absolute inset-0 flex items-center justify-center">
								<Image className="w-16 h-16 text-gray-400" />
							</div>
							<div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
								<p className="text-white font-medium">
									{img.title}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
