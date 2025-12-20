import React from 'react';
import { ComponentStyles } from '../../types';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ContactVariant2Props {
	styles?: Partial<ComponentStyles>;
}

export const ContactVariant2: React.FC<ContactVariant2Props> = ({
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
			<div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
				<div>
					<h2 className="text-4xl font-bold mb-4">Contact Us</h2>
					<p className="text-lg opacity-80 mb-8">
						We're here to help and answer any question you might
						have.
					</p>
					<div className="space-y-4">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
								<Mail className="w-6 h-6 text-primary" />
							</div>
							<div>
								<div className="font-medium">Email</div>
								<div className="opacity-70">
									hello@example.com
								</div>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
								<Phone className="w-6 h-6 text-primary" />
							</div>
							<div>
								<div className="font-medium">Phone</div>
								<div className="opacity-70">
									+1 (555) 123-4567
								</div>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
								<MapPin className="w-6 h-6 text-primary" />
							</div>
							<div>
								<div className="font-medium">Office</div>
								<div className="opacity-70">
									123 Main St, City, State 12345
								</div>
							</div>
						</div>
					</div>
				</div>
				<form className="space-y-4">
					<input
						type="text"
						placeholder="Name"
						className="w-full px-4 py-3 border border-gray-300 rounded-lg"
					/>
					<input
						type="email"
						placeholder="Email"
						className="w-full px-4 py-3 border border-gray-300 rounded-lg"
					/>
					<textarea
						placeholder="Message"
						rows={5}
						className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none"
					/>
					<button className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition">
						Send Message
					</button>
				</form>
			</div>
		</section>
	);
};
