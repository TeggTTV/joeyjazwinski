import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Joey Jazwinski | Blog, Tutorials, and Coding Journey',
	description:
		'Discover blogs, courses, and tutorials from Joey Jazwinski - a passionate software engineer sharing knowledge and coding experiences.',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<body className="bg-background text-foreground">
				<main>{children}</main>
			</body>
		</html>
	);
};

export default Layout;
