import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<meta
						name="apple-mobile-web-app-title"
						content="Joey Jazwinski"
					/>
					<meta
						name="theme-color"
						content="#F9FAFB"
						media="(prefers-color-scheme: light)"
					/>
					<meta
						name="theme-color"
						content="#0F172A"
						media="(prefers-color-scheme: dark)"
					/>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin="anonymous"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&family=Space+Grotesk:wght@400;500;600;700&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<body className="bg-background text-text">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
