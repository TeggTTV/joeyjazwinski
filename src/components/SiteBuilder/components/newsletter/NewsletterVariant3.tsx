import React from 'react';
import { ComponentStyles } from '../../types';
import { convertStylesToCSS, getShadowClass } from '../../utils/styleUtils';

interface NewsletterVariant3Props {
	styles?: Partial<ComponentStyles>;
}

export const NewsletterVariant3: React.FC<NewsletterVariant3Props> = ({
	styles = {},
}) => {
	const shadowClass = getShadowClass(styles.shadow);
	const cssStyles = convertStylesToCSS(styles);

	return (
		<section
			className={`w-full py-12 px-6 ${shadowClass}`}
			style={cssStyles}
		>
			<div className="max-w-2xl mx-auto border-2 border-border rounded-xl p-8 bg-white">
				<h3 className="text-2xl font-bold mb-2">Weekly Newsletter</h3>
				<p className="text-muted-foreground mb-6">
					No spam, unsubscribe anytime
				</p>

				<form className="space-y-3">
					<input
						type="text"
						placeholder="Full Name"
						className="w-full px-4 py-3 border border-border rounded-lg"
					/>
					<input
						type="email"
						placeholder="Email Address"
						className="w-full px-4 py-3 border border-border rounded-lg"
					/>
					<button className="w-full px-4 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition">
						Sign Up
					</button>
				</form>
			</div>
		</section>
	);
};
