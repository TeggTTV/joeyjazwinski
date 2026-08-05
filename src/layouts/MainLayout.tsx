import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import ScrollProgress from '../components/ScrollProgress';
import { useUI } from '../context/UIContext';
import { useEffect } from 'react';
import { getFullUrl } from '@/utils/db';

interface MainLayoutProps {
	children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	const { isFocusMode } = useUI();
	const isHomePage =
		typeof window !== 'undefined' && window.location.pathname === '/';

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
		const interval = setInterval(ping, 60000); // Every minute
		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<ScrollProgress />
			{!isFocusMode && <Navbar />}
			{/* <Breadcrumb /> */}
			<div className={`min-h-screen`}>{children}</div>
			{!isFocusMode && <Footer />}
		</>
	);
};

export default MainLayout;
