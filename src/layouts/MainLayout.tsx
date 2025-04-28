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
        <div className="min-h-screen">
            {children}
        </div>
        <Footer />
    </>
);

export default MainLayout;
