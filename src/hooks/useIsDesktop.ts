import { useState, useEffect } from 'react';

export function useIsDesktop(breakpoint = 768) {
	const [isDesktop, setIsDesktop] = useState(false);
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
		const check = () => {
			setIsDesktop(window.innerWidth >= breakpoint);
		};
		check();
		window.addEventListener('resize', check, { passive: true });
		return () => window.removeEventListener('resize', check);
	}, [breakpoint]);

	return { isDesktop, hasMounted };
}
