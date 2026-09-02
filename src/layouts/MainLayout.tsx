import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import ScrollProgress from '../components/ScrollProgress';
import RelatedTools from '../components/tools/RelatedTools';
import { useUI } from '../context/UIContext';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getFullUrl } from '@/utils/db';

interface MainLayoutProps {
	children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	const { isFocusMode } = useUI();
	const router = useRouter();

	const isIndividualToolPage =
		router.pathname.startsWith('/developer-tools/') &&
		router.pathname !== '/developer-tools';

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
