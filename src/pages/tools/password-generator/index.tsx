import React, { useState, useEffect, useCallback } from 'react';
import { NextSeo } from 'next-seo';
import {
	Copy,
	Check,
	Shield,
	ShieldAlert,
	ShieldCheck,
	RefreshCw,
	Key,
	Info,
	Zap,
} from 'lucide-react';

export default function PasswordGenerator() {
	const [minLength, setMinLength] = useState(12);
	const [maxLength, setMaxLength] = useState(16);
	const [includeUpper, setIncludeUpper] = useState(true);
	const [includeLower, setIncludeLower] = useState(true);
	const [includeNumbers, setIncludeNumbers] = useState(true);
	const [includeSymbols, setIncludeSymbols] = useState(true);
	const [customSymbols, setCustomSymbols] = useState(
		'!@#$%^&*()_+-=[]{}|;:,.<>?',
	);
	const [excludeCharacters, setExcludeCharacters] = useState('');

	const [generatedPassword, setGeneratedPassword] = useState('');
	const [copied, setCopied] = useState(false);
	const [strength, setStrength] = useState({
		score: 0,
		label: 'Very Weak',
		color: 'bg-red-500',
	});
	const [crackTimes, setCrackTimes] = useState({
		online: 'Instantly',
		gpu: 'Instantly',
		rig: 'Instantly',
		supercomputer: 'Instantly',
	});

	const generatePassword = useCallback(() => {
		// Define base character sets
		const lowercase = 'abcdefghijklmnopqrstuvwxyz';
		const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		const numbers = '0123456789';
		const symbols = customSymbols || '!@#$%^&*()_+-=[]{}|;:,.<>?';

		// Construct character pool
		let pool = '';
		if (includeLower) pool += lowercase;
		if (includeUpper) pool += uppercase;
		if (includeNumbers) pool += numbers;
		if (includeSymbols) pool += symbols;

		// Filter out excluded characters
		if (excludeCharacters) {
			const excludeSet = new Set(excludeCharacters);
			pool = Array.from(pool)
				.filter((char) => !excludeSet.has(char))
				.join('');
		}

		if (!pool) {
			setGeneratedPassword('');
			return;
		}

		// Random length within min-max range
		const min = Math.min(minLength, maxLength);
		const max = Math.max(minLength, maxLength);
		const length = Math.floor(Math.random() * (max - min + 1)) + min;

		let password = '';

		// Ensure at least one character of each selected type is included (if space allows)
		const requiredChars: string[] = [];
		const filterExcluded = (str: string) =>
			Array.from(str)
				.filter((char) => !excludeCharacters.includes(char))
				.join('');

		if (includeLower && filterExcluded(lowercase).length > 0) {
			const clean = filterExcluded(lowercase);
			requiredChars.push(clean[Math.floor(Math.random() * clean.length)]);
		}
		if (includeUpper && filterExcluded(uppercase).length > 0) {
			const clean = filterExcluded(uppercase);
			requiredChars.push(clean[Math.floor(Math.random() * clean.length)]);
		}
		if (includeNumbers && filterExcluded(numbers).length > 0) {
			const clean = filterExcluded(numbers);
			requiredChars.push(clean[Math.floor(Math.random() * clean.length)]);
		}
		if (includeSymbols && filterExcluded(symbols).length > 0) {
			const clean = filterExcluded(symbols);
			requiredChars.push(clean[Math.floor(Math.random() * clean.length)]);
		}

		// Fill remaining length randomly
		const remainingLength = Math.max(0, length - requiredChars.length);
		for (let i = 0; i < remainingLength; i++) {
			const randomIndex = Math.floor(Math.random() * pool.length);
			password += pool[randomIndex];
		}

		// Combine and shuffle to avoid predictable first characters
		const combined = [...requiredChars, ...password.split('')];
		for (let i = combined.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[combined[i], combined[j]] = [combined[j], combined[i]];
		}

		setGeneratedPassword(combined.join(''));
	}, [
		minLength,
		maxLength,
		includeUpper,
		includeLower,
		includeNumbers,
		includeSymbols,
		customSymbols,
		excludeCharacters,
	]);

	// Format time duration helper
	const formatDuration = (seconds: number): string => {
		if (seconds === 0) return 'Instantly';
		if (seconds < 1) return 'Less than a second';
		if (seconds < 60) return `${Math.round(seconds)} seconds`;
		const minutes = seconds / 60;
		if (minutes < 60) return `${Math.round(minutes)} minutes`;
		const hours = minutes / 60;
		if (hours < 24) return `${Math.round(hours)} hours`;
		const days = hours / 24;
		if (days < 365) return `${Math.round(days)} days`;
		const years = days / 365;
		if (years < 1000) return `${Math.round(years)} years`;
		if (years < 1e6) return `${Math.round(years / 1000)} thousand years`;
		if (years < 1e9) return `${Math.round(years / 1e6)} million years`;
		if (years < 1e12) return `${Math.round(years / 1e9)} billion years`;
		return 'Trillions of years';
	};

	// Analyze strength and cracking speed
	useEffect(() => {
		if (!generatedPassword) {
			setStrength({
				score: 0,
				label: 'Very Weak',
				color: 'bg-red-500/20',
			});
			return;
		}

		// Calculate character pool size (R)
		let poolSize = 0;
		const uniqueChars = new Set(generatedPassword);

		let hasLower = false;
		let hasUpper = false;
		let hasNumber = false;
		let hasSymbol = false;

		uniqueChars.forEach((char) => {
			if (/[a-z]/.test(char)) hasLower = true;
			else if (/[A-Z]/.test(char)) hasUpper = true;
			else if (/[0-9]/.test(char)) hasNumber = true;
			else hasSymbol = true;
		});

		if (hasLower) poolSize += 26;
		if (hasUpper) poolSize += 26;
		if (hasNumber) poolSize += 10;
		if (hasSymbol) poolSize += customSymbols ? customSymbols.length : 32;

		const length = generatedPassword.length;
		const entropy = length * Math.log2(poolSize || 2);

		// Define strength levels based on entropy
		let score = 0;
		let label = 'Very Weak';
		let color = 'bg-red-500';

		if (entropy < 30) {
			score = 1;
			label = 'Weak';
			color = 'bg-red-500';
		} else if (entropy < 50) {
			score = 2;
			label = 'Moderate';
			color = 'bg-orange-500';
		} else if (entropy < 75) {
			score = 3;
			label = 'Strong';
			color = 'bg-yellow-500';
		} else if (entropy < 100) {
			score = 4;
			label = 'Very Strong';
			color = 'bg-green-500';
		} else {
			score = 5;
			label = 'Military Grade';
			color = 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]';
		}

		setStrength({ score, label, color });

		// Brute force estimates
		const totalPossibilities = Math.pow(poolSize || 2, length);

		// Hashes/guesses per second for different rigs
		const speeds = {
			online: 100, // Throttled web interface (100 guesses/sec)
			gpu: 1e9, // High-end desktop GPU e.g. RTX 4090 (1 billion guesses/sec)
			rig: 1e11, // Dedicated cracking rig with multiple GPUs (100 billion guesses/sec)
			supercomputer: 1e14, // Nation-state supercomputer/botnet cluster (100 trillion guesses/sec)
		};

		setCrackTimes({
			online: formatDuration(totalPossibilities / (2 * speeds.online)),
			gpu: formatDuration(totalPossibilities / (2 * speeds.gpu)),
			rig: formatDuration(totalPossibilities / (2 * speeds.rig)),
			supercomputer: formatDuration(
				totalPossibilities / (2 * speeds.supercomputer),
			),
		});
	}, [generatedPassword, customSymbols]);

	// Initial generation
	useEffect(() => {
		generatePassword();
	}, []);

	const copyToClipboard = () => {
		if (!generatedPassword) return;
		navigator.clipboard.writeText(generatedPassword);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<>
			<NextSeo
				title="Strong Password Generator | Joey Jazwinski"
				description="Generate highly secure, custom passwords. View visual strength metrics and real-world brute force cracking time estimates."
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-6xl mx-auto space-y-12">
					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Shield className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
							Password Generator
						</h1>
						<p className="text-muted-foreground text-lg">
							Create unbreakable passwords tailored to your
							precise rules. Calculate visual strength and
							brute-force cracking resistance instantly.
						</p>
					</div>

					{/* Layout */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
						{/* Configuration Column */}
						<div className="lg:col-span-7 bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
							<h2 className="text-xl font-bold border-b border-border/50 pb-3 flex items-center gap-2">
								<Key className="w-5 h-5 text-primary" />
								Generator Settings
							</h2>

							{/* Length Inputs */}
							<div className="space-y-4">
								<div className="flex justify-between items-center text-sm font-semibold text-muted-foreground">
									<span>Password Length Range</span>
									<span className="font-mono text-primary bg-primary/5 px-2 py-0.5 rounded">
										{minLength === maxLength
											? `${minLength} chars`
											: `${minLength} - ${maxLength} chars`}
									</span>
								</div>

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div className="space-y-1">
										<div className="flex justify-between text-xs text-muted-foreground">
											<label htmlFor="min-length">
												Min Length
											</label>
											<span>{minLength}</span>
										</div>
										<input
											id="min-length"
											type="range"
											min="6"
											max="64"
											value={minLength}
											onChange={(e) => {
												const val = Number(
													e.target.value,
												);
												setMinLength(val);
												if (val > maxLength)
													setMaxLength(val);
											}}
											className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
										/>
									</div>

									<div className="space-y-1">
										<div className="flex justify-between text-xs text-muted-foreground">
											<label htmlFor="max-length">
												Max Length
											</label>
											<span>{maxLength}</span>
										</div>
										<input
											id="max-length"
											type="range"
											min="6"
											max="64"
											value={maxLength}
											onChange={(e) => {
												const val = Number(
													e.target.value,
												);
												setMaxLength(val);
												if (val < minLength)
													setMinLength(val);
											}}
											className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
										/>
									</div>
								</div>
							</div>

							{/* Character Rule Toggles */}
							<div className="space-y-3">
								<label className="block text-sm font-semibold text-muted-foreground">
									Rules & Requirements
								</label>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
									<label className="flex items-center gap-3 p-3 rounded-xl border border-border/80 hover:bg-muted/40 cursor-pointer transition select-none">
										<input
											type="checkbox"
											checked={includeLower}
											onChange={(e) =>
												setIncludeLower(
													e.target.checked,
												)
											}
											className="w-4.5 h-4.5 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
										/>
										<div className="flex flex-col">
											<span className="text-sm font-medium">
												Lowercase letters
											</span>
											<span className="text-xs text-muted-foreground">
												abc
											</span>
										</div>
									</label>

									<label className="flex items-center gap-3 p-3 rounded-xl border border-border/80 hover:bg-muted/40 cursor-pointer transition select-none">
										<input
											type="checkbox"
											checked={includeUpper}
											onChange={(e) =>
												setIncludeUpper(
													e.target.checked,
												)
											}
											className="w-4.5 h-4.5 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
										/>
										<div className="flex flex-col">
											<span className="text-sm font-medium">
												Uppercase letters
											</span>
											<span className="text-xs text-muted-foreground">
												ABC
											</span>
										</div>
									</label>

									<label className="flex items-center gap-3 p-3 rounded-xl border border-border/80 hover:bg-muted/40 cursor-pointer transition select-none">
										<input
											type="checkbox"
											checked={includeNumbers}
											onChange={(e) =>
												setIncludeNumbers(
													e.target.checked,
												)
											}
											className="w-4.5 h-4.5 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
										/>
										<div className="flex flex-col">
											<span className="text-sm font-medium">
												Numbers
											</span>
											<span className="text-xs text-muted-foreground">
												123
											</span>
										</div>
									</label>

									<label className="flex items-center gap-3 p-3 rounded-xl border border-border/80 hover:bg-muted/40 cursor-pointer transition select-none">
										<input
											type="checkbox"
											checked={includeSymbols}
											onChange={(e) =>
												setIncludeSymbols(
													e.target.checked,
												)
											}
											className="w-4.5 h-4.5 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
										/>
										<div className="flex flex-col">
											<span className="text-sm font-medium">
												Symbols
											</span>
											<span className="text-xs text-muted-foreground">
												!@#$
											</span>
										</div>
									</label>
								</div>
							</div>

							{/* Custom & Excluded Symbols */}
							<div className="space-y-4 pt-2">
								<div className="space-y-1.5">
									<label
										htmlFor="custom-symbols"
										className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground"
									>
										Symbols Pool to Include
									</label>
									<input
										id="custom-symbols"
										type="text"
										disabled={!includeSymbols}
										value={customSymbols}
										onChange={(e) =>
											setCustomSymbols(e.target.value)
										}
										className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 transition"
										placeholder="e.g. !@#$%"
									/>
								</div>

								<div className="space-y-1.5">
									<label
										htmlFor="exclude-chars"
										className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground"
									>
										Characters to Exclude
									</label>
									<input
										id="exclude-chars"
										type="text"
										value={excludeCharacters}
										onChange={(e) =>
											setExcludeCharacters(e.target.value)
										}
										className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary transition"
										placeholder="e.g. i, l, 1, O, 0, o"
									/>
								</div>
							</div>

							{/* Actions */}
							<button
								onClick={generatePassword}
								className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition"
							>
								<RefreshCw className="w-5 h-5" />
								Generate Password
							</button>
						</div>

						{/* Output and Security Column */}
						<div className="lg:col-span-5 space-y-6">
							{/* Password Panel */}
							<div className="bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
								<h2 className="text-xl font-bold border-b border-border/50 pb-3 flex items-center gap-2">
									<ShieldCheck className="w-5 h-5 text-emerald-500" />
									Secure Output
								</h2>

								{/* Output Display */}
								<div className="relative group">
									<div className="w-full min-h-[72px] flex items-center px-4 py-3 rounded-xl border border-border bg-background font-mono text-lg break-all select-all pr-12 shadow-inner">
										{generatedPassword ? (
											<span className="text-foreground">
												{generatedPassword}
											</span>
										) : (
											<span className="text-muted-foreground/60 italic">
												Please select at least one
												character option...
											</span>
										)}
									</div>
									{generatedPassword && (
										<button
											onClick={copyToClipboard}
											className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-card border border-border hover:bg-secondary text-muted-foreground hover:text-foreground transition shadow"
											title="Copy to Clipboard"
										>
											{copied ? (
												<Check className="w-5 h-5 text-emerald-500" />
											) : (
												<Copy className="w-5 h-5" />
											)}
										</button>
									)}
								</div>

								{/* Strength Bar */}
								<div className="space-y-2">
									<div className="flex justify-between items-center text-sm">
										<span className="text-muted-foreground">
											Entropy Strength:
										</span>
										<span className="font-bold text-foreground">
											{strength.label}
										</span>
									</div>
									<div className="h-3 w-full bg-secondary rounded-full overflow-hidden flex gap-0.5">
										{[1, 2, 3, 4, 5].map((level) => (
											<div
												key={level}
												className={`h-full flex-1 transition-all duration-500 ${
													level <= strength.score
														? strength.color
														: 'bg-muted-foreground/20'
												}`}
											/>
										))}
									</div>
								</div>
							</div>

							{/* Crack Time Calculations */}
							<div className="bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
								<h3 className="text-lg font-bold flex items-center gap-2">
									<Zap className="w-5 h-5 text-yellow-500" />
									Estimated Crack Time
								</h3>

								<div className="space-y-4">
									{/* Crack Vectors */}
									<div className="grid grid-cols-2 gap-4">
										<div className="p-3 bg-secondary/40 border border-border/50 rounded-xl space-y-1">
											<span className="text-xs text-muted-foreground block">
												Online Attack
											</span>
											<span className="text-sm font-bold truncate block">
												{crackTimes.online}
											</span>
											<span className="text-[10px] text-muted-foreground block">
												Throttled (100 H/s)
											</span>
										</div>

										<div className="p-3 bg-secondary/40 border border-border/50 rounded-xl space-y-1">
											<span className="text-xs text-muted-foreground block">
												Desktop GPU
											</span>
											<span className="text-sm font-bold truncate block">
												{crackTimes.gpu}
											</span>
											<span className="text-[10px] text-muted-foreground block">
												RTX 4090 (1 GH/s)
											</span>
										</div>

										<div className="p-3 bg-secondary/40 border border-border/50 rounded-xl space-y-1">
											<span className="text-xs text-muted-foreground block">
												Hacking Rig
											</span>
											<span className="text-sm font-bold truncate block">
												{crackTimes.rig}
											</span>
											<span className="text-[10px] text-muted-foreground block">
												Multi-GPU (100 GH/s)
											</span>
										</div>

										<div className="p-3 bg-secondary/40 border border-border/50 rounded-xl space-y-1">
											<span className="text-xs text-muted-foreground block">
												Supercomputer
											</span>
											<span className="text-sm font-bold truncate block text-emerald-500">
												{crackTimes.supercomputer}
											</span>
											<span className="text-[10px] text-muted-foreground block">
												Botnet/Cluster (100 TH/s)
											</span>
										</div>
									</div>

									{/* Disclaimer */}
									<div className="flex gap-2.5 p-3 rounded-xl bg-primary/5 border border-primary/10 text-xs text-muted-foreground">
										<Info className="w-4 h-4 text-primary shrink-0" />
										<p>
											Estimates assume a standard
											brute-force search over the full
											search space of your character
											selections. Real-world dictionaries
											and common patterns crack much
											faster.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
