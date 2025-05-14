import '../styles/globals.css';
import type { AppProps } from 'next/app';
import MainLayout from '../layouts/MainLayout';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
// import { DefaultSeo } from 'next-seo';
// import SEO from '../lib/seoConfig';
import { AccentProvider } from '../context/AccentContext';
import { BreadcrumbProvider } from '../components/BreadcrumbContext';
import { ToastContainer } from 'react-toastify';

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AccentProvider>
			<>
			
				<NextThemeProvider attribute="class" defaultTheme="light">
					<BreadcrumbProvider>
						<MainLayout>
							<Component {...pageProps} />
						</MainLayout>
						<ToastContainer />
            
					</BreadcrumbProvider>
				</NextThemeProvider>
			</>
		</AccentProvider>
	);
}
