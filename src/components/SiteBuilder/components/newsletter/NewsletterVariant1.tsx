import React from 'react';
import { ComponentStyles } from '../../types';
import { convertStylesToCSS, getShadowClass } from '../../utils/styleUtils';
import { Mail } from 'lucide-react';

interface NewsletterVariant1Props {
	styles?: Partial<ComponentStyles>;
}

export const NewsletterVariant1: React.FC<NewsletterVariant1Props> = ({
	styles = {},
}) => {
	const shadowClass = getShadowClass(styles.shadow);
	const cssStyles = convertStylesToCSS(styles);

	return (
		<section
			className={`w-full py-16 px-6 ${shadowClass}`}
			style={cssStyles}
		>
			<div className="max-w-4xl mx-auto text-center">
				<Mail className="w-12 h-12 mx-auto mb-4" />
				<h2 className="text-3xl font-bold mb-4">
					Subscribe to Our Newsletter
				</h2>
				<p className="mb-8 opacity-90">
					Get the latest updates and news delivered to your inbox
				</p>

				<div className="flex gap-2 max-w-md mx-auto">
					<input
						type="email"
						placeholder="Enter your email"
						className="flex-1 px-4 py-3 rounded-lg text-gray-900"
					/>
					<button className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition">
						Subscribe
					</button>
				</div>
			</div>
		</section>
	);
};
