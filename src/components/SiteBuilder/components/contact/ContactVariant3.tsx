import React from 'react';
import { ComponentStyles } from '../../types';

interface ContactVariant3Props {
	styles?: Partial<ComponentStyles>;
}

export const ContactVariant3: React.FC<ContactVariant3Props> = ({
	styles = {},
}) => {
	const shadowClass =
		styles.shadow && styles.shadow !== 'none'
			? `shadow-${styles.shadow}`
			: '';

	return (
		<section
			className={`w-full ${shadowClass}`}
			style={{
				fontFamily: styles.fontFamily,
				fontSize: styles.fontSize,
				color: styles.fontColor,
				backgroundColor: styles.bgColor,
				marginTop: styles.margin?.top,
				marginRight: styles.margin?.right,
				marginBottom: styles.margin?.bottom,
				marginLeft: styles.margin?.left,
				paddingTop: styles.padding?.top || 0,
				paddingRight: styles.padding?.right || 0,
				paddingBottom: styles.padding?.bottom || 0,
				paddingLeft: styles.padding?.left || 0,
			}}
		>
			<div className="grid md:grid-cols-2">
				<div className="h-96 bg-gray-200 flex items-center justify-center">
					<span className="text-4xl">🗺️</span>
				</div>
				<div className="p-12 bg-white">
					<h2 className="text-3xl font-bold mb-6">Drop Us a Line</h2>
					<form className="space-y-4">
						<input
							type="text"
							placeholder="Your Name"
							className="w-full px-4 py-3 border border-gray-300 rounded-lg"
						/>
						<input
							type="email"
							placeholder="Your Email"
							className="w-full px-4 py-3 border border-gray-300 rounded-lg"
						/>
						<input
							type="text"
							placeholder="Subject"
							className="w-full px-4 py-3 border border-gray-300 rounded-lg"
						/>
						<textarea
							placeholder="Your Message"
							rows={4}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none"
						/>
						<button className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition">
							Submit
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};
