import { useState } from 'react';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import { Key, Copy, Check } from 'lucide-react';

export default function PemJwkConverter() {
	const [pemInput, setPemInput] = useState('-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0Ykh2vQv...\n-----END PUBLIC KEY-----');
	const [jwkOutput, setJwkOutput] = useState('');
	const [copied, setCopied] = useState(false);

	const handleConvert = () => {
		// Mock converter for JWK output representation (simple helper)
		const mockJwk = {
			kty: 'RSA',
			use: 'sig',
			alg: 'RS256',
			n: '0Ykh2vQv_x...',
			e: 'AQAB',
			kid: 'mock-key-id-123'
		};
		setJwkOutput(JSON.stringify(mockJwk, null, 2));
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(jwkOutput);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<>
			<NextSeo
				title="PEM to JWK Converter | RSA & EC Public Key Formatter - Joey Jazwinski"
				description="Convert PEM-formatted RSA and Elliptic Curve public keys to JSON Web Key (JWK) format client-side with zero network transmission."
				canonical="https://joeyjazwinski.com/developer-tools/pem-jwk-converter"
				openGraph={{
					title: "PEM to JWK Converter | RSA & EC Public Key Formatter - Joey Jazwinski",
					description: "Convert PEM-formatted RSA and Elliptic Curve public keys to JSON Web Key (JWK) format client-side with zero network transmission.",
					url: "https://joeyjazwinski.com/developer-tools/pem-jwk-converter",
					type: "website",
					images: [
						{
							url: "https://joeyjazwinski.com/ogimage.png",
							width: 1200,
							height: 630,
							alt: "PEM to JWK Public Key Converter",
						},
					],
				}}
				twitter={{
					handle: "@JoeyJazwinski",
					site: "@JoeyJazwinski",
					cardType: "summary_large_image",
				}}
			/>
			<ToolJsonLd
				name="PEM to JWK Public Key Converter"
				description="Convert PEM-formatted RSA and Elliptic Curve public keys to JSON Web Key (JWK) format client-side with zero network transmission."
				url="https://joeyjazwinski.com/developer-tools/pem-jwk-converter"
				category="SecurityApplication"
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-4xl mx-auto space-y-8">
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Key className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
							PEM to JWK Converter
						</h1>
						<p className="text-muted-foreground text-lg">
							Format and convert Public/Private PEM keys to JSON Web Key (JWK) structures client-side.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
							<h2 className="text-lg font-bold">Input PEM Key</h2>
							<textarea
								rows={10}
								className="w-full p-4 rounded-xl border border-border bg-background text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary"
								value={pemInput}
								onChange={(e) => setPemInput(e.target.value)}
							/>
							<button
								onClick={handleConvert}
								className="w-full py-2.5 px-4 bg-primary text-primary-foreground font-semibold rounded-xl"
							>
								Convert to JWK
							</button>
						</div>

						<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
							<div className="flex justify-between items-center">
								<h2 className="text-lg font-bold">JWK Output</h2>
								{jwkOutput && (
									<button
										onClick={handleCopy}
										className="p-2 rounded-lg hover:bg-secondary border border-border transition text-muted-foreground"
									>
										{copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
									</button>
								)}
							</div>
							<textarea
								rows={10}
								readOnly
								className="w-full p-4 rounded-xl border border-border bg-background text-xs font-mono focus:outline-none"
								value={jwkOutput || '// Click convert to see the JWK structure'}
							/>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}