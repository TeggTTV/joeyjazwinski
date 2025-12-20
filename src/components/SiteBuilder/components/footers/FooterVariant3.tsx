import React from 'react';
import { ComponentStyles } from '../../types';
import { Heart } from 'lucide-react';

interface FooterVariant3Props {
	styles?: Partial<ComponentStyles>;
}

export const FooterVariant3: React.FC<FooterVariant3Props> = ({
	styles = {},
}) => {
	const shadowClass =
		styles.shadow && styles.shadow !== 'none'
			? `shadow-${styles.shadow}`
			: '';

	return (
		<footer
			className={`w-full py-6 px-6 ${shadowClass}`}
			style={{
				fontFamily: styles.fontFamily,
				fontSize: styles.fontSize,
				color: styles.fontColor || '#ffffff',
				backgroundColor: styles.bgColor || '#1e293b',
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
			<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
				<div className="font-bold text-xl">Brand™</div>
				<p className="opacity-70 text-sm flex items-center gap-2">
					Made with{' '}
					<Heart className="w-4 h-4 fill-red-500 text-red-500" /> by
					Your Team
				</p>
			</div>
		</footer>
	);
};
