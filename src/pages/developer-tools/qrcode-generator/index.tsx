import { useState, useEffect, useRef, useMemo } from 'react';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import Script from 'next/script';
import {
	Download,
	Link as LinkIcon,
	QrCode,
	Wifi,
	User,
	Mail,
	MessageSquare,
	FileText,
	Copy,
	Check,
} from 'lucide-react';
import {
	formatWifiQr,
	formatVCardQr,
	formatEmailQr,
	formatSmsQr,
} from '@/lib/qrPresets';

export default function QRCodeGenerator() {
	const [activeType, setActiveType] = useState<
		'url' | 'wifi' | 'vcard' | 'email' | 'sms' | 'text'
	>('url');

	// Form inputs
	const [urlInput, setUrlInput] = useState('https://joeyjazwinski.com');
	const [textInput, setTextInput] = useState(
		'Joey Jazwinski Developer Tools',
	);

	// Wi-Fi inputs
	const [wifiSsid, setWifiSsid] = useState('Guest_Network');
	const [wifiPass, setWifiPass] = useState('SuperSecretPass');
	const [wifiEnc, setWifiEnc] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
	const [wifiHidden, setWifiHidden] = useState(false);

	// vCard inputs
	const [vFirstName, setVFirstName] = useState('Joey');
	const [vLastName, setVLastName] = useState('Jazwinski');
	const [vPhone, setVPhone] = useState('+1 (555) 234-5678');
	const [vEmail, setVEmail] = useState('contact@joeyjazwinski.com');
	const [vCompany, setVCompany] = useState('Software Engineering');
	const [vTitle, setVTitle] = useState('Full-Stack Engineer');

	// Email inputs
	const [emailTo, setEmailTo] = useState('hello@example.com');
	const [emailSubject, setEmailSubject] = useState('Project Inquiry');
	const [emailBody, setEmailBody] = useState(
		'Hi Joey,\n\nI saw your developer tools...',
	);

	// SMS inputs
	const [smsPhone, setSmsPhone] = useState('+15552345678');
	const [smsMessage, setSmsMessage] = useState(
		'Hey, check out this QR code!',
	);

	// Appearance
	const [pixelSize, setPixelSize] = useState(300);
	const [colorDark, setColorDark] = useState('#0F172A');
	const [colorLight, setColorLight] = useState('#FFFFFF');
	const [scriptLoaded, setScriptLoaded] = useState(false);
	const [copied, setCopied] = useState(false);

	const containerRef = useRef<HTMLDivElement>(null);

	// Calculate payload based on active type
	const qrPayload = useMemo(() => {
		if (activeType === 'url') return urlInput.trim();
		if (activeType === 'text') return textInput.trim();
		if (activeType === 'wifi') {
			return formatWifiQr({
				ssid: wifiSsid,
				password: wifiPass,
				encryption: wifiEnc,
				hidden: wifiHidden,
			});
		}
		if (activeType === 'vcard') {
			return formatVCardQr({
				firstName: vFirstName,
				lastName: vLastName,
				phone: vPhone,
				email: vEmail,
				company: vCompany,
				title: vTitle,
			});
		}
		if (activeType === 'email') {
			return formatEmailQr({
				email: emailTo,
				subject: emailSubject,
				body: emailBody,
			});
		}
		if (activeType === 'sms') {
			return formatSmsQr({
				phone: smsPhone,
				message: smsMessage,
			});
		}
		return '';
	}, [
		activeType,
		urlInput,
		textInput,
		wifiSsid,
		wifiPass,
		wifiEnc,
		wifiHidden,
		vFirstName,
		vLastName,
		vPhone,
		vEmail,
		vCompany,
		vTitle,
		emailTo,
		emailSubject,
		emailBody,
		smsPhone,
		smsMessage,
	]);

	// Render QR Code via library
	useEffect(() => {
		if (typeof window === 'undefined' || !containerRef.current) return;
		const qrClass = (window as unknown as { QRCode?: any }).QRCode;
		if (!qrClass) return;

		containerRef.current.innerHTML = '';

		if (qrPayload.trim()) {
			try {
				new qrClass(containerRef.current, {
					text: qrPayload,
					width: pixelSize,
					height: pixelSize,
					colorDark: colorDark,
					colorLight: colorLight,
					correctLevel: qrClass.CorrectLevel
						? qrClass.CorrectLevel.H
						: 2,
				});
			} catch {
				// Ignore formatting length exceptions
			}
		}
	}, [qrPayload, pixelSize, colorDark, colorLight, scriptLoaded]);

	const handleDownload = () => {
		if (!containerRef.current) return;
		const img = containerRef.current.querySelector('img');
		const canvas = containerRef.current.querySelector('canvas');

		let dataUrl = '';
		if (img && img.src && img.src.startsWith('data:')) {
			dataUrl = img.src;
		} else if (canvas) {
			dataUrl = canvas.toDataURL('image/png');
		}

		if (dataUrl) {
			const link = document.createElement('a');
			link.href = dataUrl;
			link.download = `qrcode-${activeType}-${pixelSize}px.png`;
			link.click();
		}
	};

	const copyPayload = () => {
		navigator.clipboard.writeText(qrPayload);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<>
			<Script
				src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"
				strategy="lazyOnload"
				onLoad={() => setScriptLoaded(true)}
			/>
			<NextSeo
				title="Custom QR Code Generator | Wi-Fi, vCard, URL & Text"
				description="Generate high-resolution custom QR codes for Wi-Fi networks, vCard contacts, URLs, SMS, and emails. Instant client-side PNG downloads with custom colors."
				canonical="https://joeyjazwinski.com/developer-tools/qrcode-generator"
				openGraph={{
					title: 'Custom QR Code Generator | Wi-Fi, vCard, URL & Text',
					description:
						'Generate high-resolution custom QR codes for Wi-Fi networks, vCard contacts, URLs, SMS, and emails. Instant client-side PNG downloads with custom colors.',
					url: 'https://joeyjazwinski.com/developer-tools/qrcode-generator',
					type: 'website',
					images: [
						{
							url: 'https://joeyjazwinski.com/ogimage.png',
							width: 1200,
							height: 630,
							alt: 'Custom QR Code Generator',
						},
					],
				}}
				twitter={{
					handle: '@JoeyJazwinski',
					site: '@JoeyJazwinski',
					cardType: 'summary_large_image',
				}}
			/>
			<ToolJsonLd
				name="Custom QR Code Generator"
				description="Generate high-resolution custom QR codes for Wi-Fi networks, vCard contacts, URLs, SMS, and emails. Instant client-side PNG downloads with custom colors."
				url="https://joeyjazwinski.com/developer-tools/qrcode-generator"
				category="DesignApplication"
			/>
			<main className="bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-6xl mx-auto space-y-10">
					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<QrCode className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
							QR Code Generator
						</h1>
						<p className="text-muted-foreground text-lg">
							Create scan-ready QR codes for Wi-Fi networks,
							vCards, URLs, and emails. Custom styling with
							instant high-resolution PNG export.
						</p>
					</div>

					{/* Workspace */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
						{/* Configuration Controls */}
						<div className="lg:col-span-7 bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
							{/* Format Type Selector Pills */}
							<div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-secondary border border-border">
								{(
									[
										{
											id: 'url',
											label: 'URL Link',
											icon: LinkIcon,
										},
										{
											id: 'wifi',
											label: 'Wi-Fi Network',
											icon: Wifi,
										},
										{
											id: 'vcard',
											label: 'vCard Contact',
											icon: User,
										},
										{
											id: 'email',
											label: 'Email',
											icon: Mail,
										},
										{
											id: 'sms',
											label: 'SMS Text',
											icon: MessageSquare,
										},
										{
											id: 'text',
											label: 'Plain Text',
											icon: FileText,
										},
									] as const
								).map((t) => {
									const Icon = t.icon;
									return (
										<button
											key={t.id}
											onClick={() => setActiveType(t.id)}
											className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
												activeType === t.id
													? 'bg-background text-foreground shadow-xs'
													: 'text-muted-foreground hover:text-foreground'
											}`}
										>
											<Icon className="w-3.5 h-3.5" />
											<span>{t.label}</span>
										</button>
									);
								})}
							</div>

							{/* Dynamic Input Form based on Type */}
							<div className="space-y-4">
								{activeType === 'url' && (
									<div className="space-y-1.5">
										<label className="text-xs font-semibold text-muted-foreground">
											Target URL
										</label>
										<input
											type="url"
											value={urlInput}
											onChange={(e) =>
												setUrlInput(e.target.value)
											}
											placeholder="https://example.com"
											className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-xs focus:ring-2 focus:ring-primary"
										/>
									</div>
								)}

								{activeType === 'wifi' && (
									<div className="space-y-4">
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
											<div className="space-y-1">
												<label className="text-xs font-semibold text-muted-foreground">
													Network Name (SSID)
												</label>
												<input
													type="text"
													value={wifiSsid}
													onChange={(e) =>
														setWifiSsid(
															e.target.value,
														)
													}
													className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs"
												/>
											</div>
											<div className="space-y-1">
												<label className="text-xs font-semibold text-muted-foreground">
													Password
												</label>
												<input
													type="text"
													value={wifiPass}
													onChange={(e) =>
														setWifiPass(
															e.target.value,
														)
													}
													className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs"
												/>
											</div>
										</div>
										<div className="flex items-center justify-between text-xs">
											<div className="flex items-center gap-2">
												<span className="text-muted-foreground">
													Security:
												</span>
												<select
													value={wifiEnc}
													onChange={(e) =>
														setWifiEnc(
															e.target
																.value as any,
														)
													}
													className="px-2 py-1 rounded-lg border border-border bg-background text-xs"
												>
													<option value="WPA">
														WPA / WPA2 / WPA3
													</option>
													<option value="WEP">
														WEP
													</option>
													<option value="nopass">
														None (Open)
													</option>
												</select>
											</div>
											<label className="flex items-center gap-1.5 cursor-pointer text-muted-foreground">
												<input
													type="checkbox"
													checked={wifiHidden}
													onChange={(e) =>
														setWifiHidden(
															e.target.checked,
														)
													}
													className="rounded text-primary focus:ring-primary"
												/>
												<span>Hidden Network</span>
											</label>
										</div>
									</div>
								)}

								{activeType === 'vcard' && (
									<div className="space-y-3">
										<div className="grid grid-cols-2 gap-3">
											<div className="space-y-1">
												<label className="text-xs font-semibold text-muted-foreground">
													First Name
												</label>
												<input
													type="text"
													value={vFirstName}
													onChange={(e) =>
														setVFirstName(
															e.target.value,
														)
													}
													className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs"
												/>
											</div>
											<div className="space-y-1">
												<label className="text-xs font-semibold text-muted-foreground">
													Last Name
												</label>
												<input
													type="text"
													value={vLastName}
													onChange={(e) =>
														setVLastName(
															e.target.value,
														)
													}
													className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs"
												/>
											</div>
										</div>
										<div className="grid grid-cols-2 gap-3">
											<div className="space-y-1">
												<label className="text-xs font-semibold text-muted-foreground">
													Phone Number
												</label>
												<input
													type="tel"
													value={vPhone}
													onChange={(e) =>
														setVPhone(
															e.target.value,
														)
													}
													className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs"
												/>
											</div>
											<div className="space-y-1">
												<label className="text-xs font-semibold text-muted-foreground">
													Email
												</label>
												<input
													type="email"
													value={vEmail}
													onChange={(e) =>
														setVEmail(
															e.target.value,
														)
													}
													className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs"
												/>
											</div>
										</div>
										<div className="grid grid-cols-2 gap-3">
											<div className="space-y-1">
												<label className="text-xs font-semibold text-muted-foreground">
													Company
												</label>
												<input
													type="text"
													value={vCompany}
													onChange={(e) =>
														setVCompany(
															e.target.value,
														)
													}
													className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs"
												/>
											</div>
											<div className="space-y-1">
												<label className="text-xs font-semibold text-muted-foreground">
													Job Title
												</label>
												<input
													type="text"
													value={vTitle}
													onChange={(e) =>
														setVTitle(
															e.target.value,
														)
													}
													className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs"
												/>
											</div>
										</div>
									</div>
								)}

								{activeType === 'email' && (
									<div className="space-y-3">
										<div className="space-y-1">
											<label className="text-xs font-semibold text-muted-foreground">
												Recipient Email
											</label>
											<input
												type="email"
												value={emailTo}
												onChange={(e) =>
													setEmailTo(e.target.value)
												}
												className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs"
											/>
										</div>
										<div className="space-y-1">
											<label className="text-xs font-semibold text-muted-foreground">
												Subject
											</label>
											<input
												type="text"
												value={emailSubject}
												onChange={(e) =>
													setEmailSubject(
														e.target.value,
													)
												}
												className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs"
											/>
										</div>
										<div className="space-y-1">
											<label className="text-xs font-semibold text-muted-foreground">
												Body Content
											</label>
											<textarea
												rows={3}
												value={emailBody}
												onChange={(e) =>
													setEmailBody(e.target.value)
												}
												className="w-full p-3 rounded-xl border border-border bg-background text-xs"
											/>
										</div>
									</div>
								)}

								{activeType === 'sms' && (
									<div className="space-y-3">
										<div className="space-y-1">
											<label className="text-xs font-semibold text-muted-foreground">
												Phone Number
											</label>
											<input
												type="tel"
												value={smsPhone}
												onChange={(e) =>
													setSmsPhone(e.target.value)
												}
												className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs"
											/>
										</div>
										<div className="space-y-1">
											<label className="text-xs font-semibold text-muted-foreground">
												Pre-filled Message
											</label>
											<textarea
												rows={3}
												value={smsMessage}
												onChange={(e) =>
													setSmsMessage(
														e.target.value,
													)
												}
												className="w-full p-3 rounded-xl border border-border bg-background text-xs"
											/>
										</div>
									</div>
								)}

								{activeType === 'text' && (
									<div className="space-y-1">
										<label className="text-xs font-semibold text-muted-foreground">
											Freeform Content
										</label>
										<textarea
											rows={4}
											value={textInput}
											onChange={(e) =>
												setTextInput(e.target.value)
											}
											className="w-full p-3 rounded-xl border border-border bg-background text-xs font-mono"
										/>
									</div>
								)}
							</div>

							{/* Customization Options */}
							<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-border/50 text-xs">
								<div className="space-y-1">
									<label className="font-semibold text-muted-foreground block">
										Size
									</label>
									<select
										value={pixelSize}
										onChange={(e) =>
											setPixelSize(Number(e.target.value))
										}
										className="w-full p-2 rounded-lg border border-border bg-background text-xs"
									>
										<option value={200}>
											200 x 200 px
										</option>
										<option value={300}>
											300 x 300 px
										</option>
										<option value={400}>
											400 x 400 px
										</option>
										<option value={500}>
											500 x 500 px
										</option>
									</select>
								</div>

								<div className="space-y-1">
									<label className="font-semibold text-muted-foreground block">
										QR Color
									</label>
									<div className="flex items-center gap-2">
										<input
											type="color"
											value={colorDark}
											onChange={(e) =>
												setColorDark(e.target.value)
											}
											className="w-8 h-8 rounded border border-border cursor-pointer bg-transparent"
										/>
										<input
											type="text"
											value={colorDark}
											onChange={(e) =>
												setColorDark(e.target.value)
											}
											className="w-full px-2 py-1 rounded border border-border bg-background text-xs font-mono uppercase"
										/>
									</div>
								</div>

								<div className="space-y-1">
									<label className="font-semibold text-muted-foreground block">
										Background
									</label>
									<div className="flex items-center gap-2">
										<input
											type="color"
											value={colorLight}
											onChange={(e) =>
												setColorLight(e.target.value)
											}
											className="w-8 h-8 rounded border border-border cursor-pointer bg-transparent"
										/>
										<input
											type="text"
											value={colorLight}
											onChange={(e) =>
												setColorLight(e.target.value)
											}
											className="w-full px-2 py-1 rounded border border-border bg-background text-xs font-mono uppercase"
										/>
									</div>
								</div>
							</div>
						</div>

						{/* Output & Preview Column */}
						<div className="lg:col-span-5 bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl flex flex-col items-center justify-between text-center">
							<div className="w-full flex justify-between items-center pb-2 border-b border-border/50 text-xs">
								<span className="font-bold text-muted-foreground uppercase tracking-wider">
									Live QR Code Preview
								</span>
								<span className="font-mono text-[11px] text-muted-foreground">
									Level H (30% Redundancy)
								</span>
							</div>

							<div className="p-6 rounded-2xl bg-white border border-border shadow-inner flex items-center justify-center min-w-65 min-h-65">
								<div
									ref={containerRef}
									className="flex items-center justify-center overflow-hidden"
								/>
							</div>

							{/* Actions */}
							<div className="w-full space-y-2">
								<button
									onClick={handleDownload}
									className="w-full py-2.5 px-4 bg-primary text-primary-foreground font-semibold rounded-xl text-xs flex items-center justify-center gap-2 hover:opacity-90 transition cursor-pointer shadow-sm"
								>
									<Download className="w-4 h-4" />
									<span>Download PNG ({pixelSize}px)</span>
								</button>

								<button
									onClick={copyPayload}
									className="w-full py-2 px-4 bg-secondary hover:bg-secondary/80 border border-border text-foreground font-medium rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer"
								>
									{copied ? (
										<Check className="w-3.5 h-3.5 text-emerald-500" />
									) : (
										<Copy className="w-3.5 h-3.5" />
									)}
									<span>Copy Raw QR Data Payload</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
