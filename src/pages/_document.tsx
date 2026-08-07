import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
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
					<script
						src="https://analytics.ahrefs.com/analytics.js"
						data-key="jTkBpMV+Z1KlJS0zzubvLA"
						async
					></script>
					<script src="https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"></script>
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
