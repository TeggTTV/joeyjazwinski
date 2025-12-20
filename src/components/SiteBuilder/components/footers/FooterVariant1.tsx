import React from 'react';
import { ComponentStyles } from '../../types';
import { Github, Twitter, Linkedin } from 'lucide-react';

interface FooterVariant1Props {
	styles?: Partial<ComponentStyles>;
}

export const FooterVariant1: React.FC<FooterVariant1Props> = ({
	styles = {},
}) => {
	const shadowClass =
		styles.shadow && styles.shadow !== 'none'
			? `shadow-${styles.shadow}`
			: '';

	return (
		<footer
			className={`w-full py-12 px-6 ${shadowClass}`}
			style={{
				fontFamily: styles.fontFamily,
				fontSize: styles.fontSize,
				color: styles.fontColor || '#ffffff',
				backgroundColor: styles.bgColor || '#1f2937',
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
			<div className="max-w-7xl mx-auto">
				<div className="grid md:grid-cols-4 gap-8 mb-8">
					<div>
						<h3 className="font-bold text-lg mb-4">Company</h3>
						<ul className="space-y-2 opacity-80">
							<li>
								<a
									href="#"
									className="hover:opacity-100 transition"
								>
									About Us
								</a>
							</li>
							<li>
								<a
									href="#"
									className="hover:opacity-100 transition"
								>
									Careers
								</a>
							</li>
							<li>
								<a
									href="#"
									className="hover:opacity-100 transition"
								>
									Press
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="font-bold text-lg mb-4">Product</h3>
						<ul className="space-y-2 opacity-80">
							<li>
								<a
									href="#"
									className="hover:opacity-100 transition"
								>
									Features
								</a>
							</li>
							<li>
								<a
									href="#"
									className="hover:opacity-100 transition"
								>
									Pricing
								</a>
							</li>
							<li>
								<a
									href="#"
									className="hover:opacity-100 transition"
								>
									Updates
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="font-bold text-lg mb-4">Resources</h3>
						<ul className="space-y-2 opacity-80">
							<li>
								<a
									href="#"
									className="hover:opacity-100 transition"
								>
									Blog
								</a>
							</li>
							<li>
								<a
									href="#"
									className="hover:opacity-100 transition"
								>
									Help Center
								</a>
							</li>
							<li>
								<a
									href="#"
									className="hover:opacity-100 transition"
								>
									Documentation
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="font-bold text-lg mb-4">Legal</h3>
						<ul className="space-y-2 opacity-80">
							<li>
								<a
									href="#"
									className="hover:opacity-100 transition"
								>
									Privacy
								</a>
							</li>
							<li>
								<a
									href="#"
									className="hover:opacity-100 transition"
								>
									Terms
								</a>
							</li>
							<li>
								<a
									href="#"
									className="hover:opacity-100 transition"
								>
									Security
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
					<p className="opacity-70">
						© 2024 Your Company. All rights reserved.
					</p>
					<div className="flex gap-4">
						<a href="#" className="hover:opacity-70 transition">
							<Twitter className="w-5 h-5" />
						</a>
						<a href="#" className="hover:opacity-70 transition">
							<Github className="w-5 h-5" />
						</a>
						<a href="#" className="hover:opacity-70 transition">
							<Linkedin className="w-5 h-5" />
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};
