import React from 'react';
import { ComponentStyles } from '../../types';
import { convertStylesToCSS, getShadowClass } from '../../utils/styleUtils';

interface NewsletterVariant2Props {
	styles?: Partial<ComponentStyles>;
}

export const NewsletterVariant2: React.FC<NewsletterVariant2Props> = ({
	styles = {},
}) => {
	const shadowClass = getShadowClass(styles.shadow);
	const cssStyles = convertStylesToCSS(styles);

	return (
		<section
			className={`w-full py-16 px-6 ${shadowClass}`}
			style={cssStyles}
		>
			<div className="max-w-5xl mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-12 text-white">
				<div className="grid md:grid-cols-2 gap-8 items-center">
					<div>
						<h2 className="text-3xl font-bold mb-4">
							Stay in the Loop
						</h2>
						<p className="opacity-90">
							Join 50,000+ subscribers getting weekly insights
						</p>
					</div>
					<div>
						<div className="bg-white rounded-lg p-1 flex">
							<input
								type="email"
								placeholder="your@email.com"
								className="flex-1 px-4 py-2 outline-none text-gray-900"
							/>
							<button className="px-6 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition">
								Join
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
