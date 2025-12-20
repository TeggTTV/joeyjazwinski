import React from 'react';
import { ComponentStyles } from '../../types';

interface ContactVariant1Props {
	styles?: Partial<ComponentStyles>;
}

export const ContactVariant1: React.FC<ContactVariant1Props> = ({
	styles = {},
}) => {
	const shadowClass =
		styles.shadow && styles.shadow !== 'none'
			? `shadow-${styles.shadow}`
			: '';

	return (
		<section
			className={`w-full py-16 px-6 ${shadowClass}`}
			style={{
				fontFamily: styles.fontFamily,
				fontSize: styles.fontSize,
				color: styles.fontColor,
				backgroundColor: styles.bgColor,
				marginTop: styles.margin?.top,
				marginRight: styles.margin?.right,
				marginBottom: styles.margin?.bottom,
				marginLeft: styles.margin?.left,
				paddingTop: styles.padding?.top,
				paddingRight: styles.padding?.right,
				paddingBottom: styles.padding?.bottom,
				paddingLeft: styles.padding?.left,
			}}
		>
			<div className="max-w-2xl mx-auto">
				<h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
				<p className="text-xl opacity-80 mb-8">
					Have a question? We&apos;d love to hear from you.
				</p>
				<form className="space-y-4">
					<div className="grid md:grid-cols-2 gap-4">
						<input
							type="text"
							placeholder="First Name"
							className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
						/>
						<input
							type="text"
							placeholder="Last Name"
							className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
						/>
					</div>
					<input
						type="email"
						placeholder="Email Address"
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
					/>
					<textarea
						placeholder="Your Message"
						rows={5}
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary resize-none"
					/>
					<button
						type="submit"
						className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition"
					>
						Send Message
					</button>
				</form>
			</div>
		</section>
	);
};
