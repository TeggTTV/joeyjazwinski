import React from 'react';
import { ComponentStyles } from '../../types';

interface FooterVariant2Props {
	styles?: Partial<ComponentStyles>;
}

export const FooterVariant2: React.FC<FooterVariant2Props> = ({
	styles = {},
}) => {
	const shadowClass =
		styles.shadow && styles.shadow !== 'none'
			? `shadow-${styles.shadow}`
			: '';

	return (
		<footer
			className={`w-full py-8 px-6 ${shadowClass}`}
			style={{
				fontFamily: styles.fontFamily,
				fontSize: styles.fontSize,
				color: styles.fontColor || '#ffffff',
				backgroundColor: styles.bgColor || '#111827',
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
			<div className="max-w-7xl mx-auto text-center">
				<div className="text-2xl font-bold mb-6">YourBrand</div>
				<div className="flex flex-wrap justify-center gap-6 mb-6 opacity-80">
					<a href="#" className="hover:opacity-100 transition">
						Home
					</a>
					<a href="#" className="hover:opacity-100 transition">
						About
					</a>
					<a href="#" className="hover:opacity-100 transition">
						Services
					</a>
					<a href="#" className="hover:opacity-100 transition">
						Contact
					</a>
					<a href="#" className="hover:opacity-100 transition">
						Privacy
					</a>
				</div>
				<p className="opacity-60 text-sm">
					© 2024 YourBrand. All rights reserved.
				</p>
			</div>
		</footer>
	);
};
