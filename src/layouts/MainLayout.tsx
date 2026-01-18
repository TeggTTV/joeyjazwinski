import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';

interface MainLayoutProps {
	children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
	<>
		<Navbar />
		<Breadcrumb />
		<div className="min-h-screen max-w-5xl mx-auto px-10 py-2">
			{children}
		</div>
		<Footer />
	</>
);

export default MainLayout;
