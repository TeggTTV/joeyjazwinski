import React from 'react';
import { ComponentStyles } from '../../types';
import { convertStylesToCSS, getShadowClass } from '../../utils/styleUtils';

interface SpacerVariant3Props {
	styles?: Partial<ComponentStyles>;
}

export const SpacerVariant3: React.FC<SpacerVariant3Props> = ({
	styles = {},
}) => {
	const shadowClass = getShadowClass(styles.shadow);
	const cssStyles = convertStylesToCSS(styles);

	return (
		<div
			className={`w-full ${shadowClass}`}
			style={{ height: '128px', ...cssStyles }}
			aria-hidden="true"
		/>
	);
};
