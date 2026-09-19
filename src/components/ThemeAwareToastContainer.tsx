import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ThemeAwareToastContainer() {
	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<ToastContainer
			theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
			position="top-right"
			autoClose={3000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
		/>
	);
}
