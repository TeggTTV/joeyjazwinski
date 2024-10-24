import { Inter } from 'next/font/google';
import './globals.css';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'TDTrade - Simple Trading and Gaming Platform',
	description:
		'TDTrade is a simple trading and gaming platform that allows you to trade and play games with your friends. This site does not use real money for that would be illegal.',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark">
			<body className={inter.className}>
				{children}
				<ToastContainer
					position="top-center"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="dark"
					transition={Bounce}
				/>
				{/* syntax highlighting for <code> blocks */}
			</body>
		</html>
	);
}
