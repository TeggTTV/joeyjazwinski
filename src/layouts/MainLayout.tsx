import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import ScrollProgress from '../components/ScrollProgress';
import RelatedTools from '../components/tools/RelatedTools';
import { useUI } from '../context/UIContext';
import { usePoints } from '../context/PointsContext';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getFullUrl } from '@/utils/db';

interface MainLayoutProps {
	children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	const { isFocusMode } = useUI();
	const { trackToolUse } = usePoints();
	const router = useRouter();

	const isIndividualToolPage =
		router.pathname.startsWith('/developer-tools/') &&
		router.pathname !== '/developer-tools';

	useEffect(() => {
		if (!isIndividualToolPage) return;

		const toolName = router.pathname
			.replace('/developer-tools/', '')
			.replace(/\/$/, '');
		let hasInteracted = false;

		const handleUserInteraction = (e: Event) => {
			if (hasInteracted) return;

			const target = e.target as HTMLElement | null;
			if (!target) return;

			// Exclude clicks on header navigation and footer
			if (target.closest('nav') || target.closest('footer')) return;

			// Check for interactive elements (buttons, inputs, textareas, forms, sliders) or events inside main content
			const isInteractiveElement = !!target.closest(
				'button, input, textarea, select, form, [role="button"], [role="slider"], [contenteditable="true"]',
			);
			const isMainContent = !!target.closest('main');

			if (isInteractiveElement || ((e.type === 'input' || e.type === 'change') && isMainContent)) {
				hasInteracted = true;
				trackToolUse(toolName);
				removeListeners();
			}
		};

		const removeListeners = () => {
			document.removeEventListener('click', handleUserInteraction);
			document.removeEventListener('input', handleUserInteraction);
			document.removeEventListener('change', handleUserInteraction);
			document.removeEventListener('keydown', handleUserInteraction);
		};

		document.addEventListener('click', handleUserInteraction);
		document.addEventListener('input', handleUserInteraction);
		document.addEventListener('change', handleUserInteraction);
		document.addEventListener('keydown', handleUserInteraction);

		return () => {
			removeListeners();
		};
	}, [isIndividualToolPage, router.pathname, trackToolUse]);

	useEffect(() => {
		// Heartbeat to track active status
		const ping = async () => {
			try {
				await fetch(getFullUrl('/api/heartbeat'), { method: 'POST' });
			} catch (e) {
				// ignore
			}
		};
		ping();
		const interval = setInterval(ping, 5 * 60000); // Every 5 minutes
		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<ScrollProgress />
			{!isFocusMode && <Navbar />}
			{/* <Breadcrumb /> */}
			<div className="min-h-screen flex flex-col justify-between">
				<div>
					{children}
					{isIndividualToolPage && (
						<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
							<RelatedTools currentHref={router.pathname} />
						</div>
					)}
				</div>
				{!isFocusMode && <Footer />}
			</div>
		</>
	);
};

export default MainLayout;
