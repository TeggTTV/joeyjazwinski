import { useState, useEffect, useCallback } from 'react';
import { NextSeo } from 'next-seo';
import {
	Copy,
	Check,
	Shield,
	ShieldCheck,
	RefreshCw,
	Info,
	Zap,
} from 'lucide-react';

export default function PasswordGenerator() {
	const [activeTab, setActiveTab] = useState<'random' | 'keyword'>('random');

	// Tab 1: Random States
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

	// Tab 2: Keyword States
	const [keywords, setKeywords] = useState('coffee coding active');
	const [separator, setSeparator] = useState('-');
	const [caseStyle, setCaseStyle] = useState('title');
	const [leetLevel, setLeetLevel] = useState(0);
	const [addNumbers, setAddNumbers] = useState(true);
	const [numberCount, setNumberCount] = useState(2);
	const [addSymbol, setAddSymbol] = useState(true);

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

	// Random Generator Function
	const generatePassword = useCallback(() => {
		const lowercase = 'abcdefghijklmnopqrstuvwxyz';
		const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		const numbers = '0123456789';
		const symbols = customSymbols || '!@#$%^&*()_+-=[]{}|;:,.<>?';

		let pool = '';
		if (includeLower) pool += lowercase;
		if (includeUpper) pool += uppercase;
		if (includeNumbers) pool += numbers;
		if (includeSymbols) pool += symbols;

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

		const min = Math.min(minLength, maxLength);
		const max = Math.max(minLength, maxLength);
		const length = Math.floor(Math.random() * (max - min + 1)) + min;

		let password = '';
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

		const remainingLength = Math.max(0, length - requiredChars.length);
		for (let i = 0; i < remainingLength; i++) {
			const randomIndex = Math.floor(Math.random() * pool.length);
			password += pool[randomIndex];
		}

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

	// Keyword Passphrase Generator Function
	const generateKeywordPassword = useCallback(() => {
		let words = keywords.split(/[\s,]+/).filter((w) => w.trim().length > 0);

		if (words.length === 0) {
			setGeneratedPassword('');
			return;
		}

		// Capitalization transformations
		words = words.map((w) => {
			const word = w.toLowerCase();
			if (caseStyle === 'upper') return word.toUpperCase();
			if (caseStyle === 'lower') return word;
			if (caseStyle === 'title') {
				return word.charAt(0).toUpperCase() + word.slice(1);
			}
			if (caseStyle === 'random') {
				return Array.from(word)
					.map((char) =>
						Math.random() > 0.5 ? char.toUpperCase() : char,
					)
					.join('');
			}
			return w;
		});

		// Leetspeak substitutions
		const leetBasicMap: Record<string, string> = {
			a: '4',
			e: '3',
			o: '0',
			i: '1',
			s: '5',
			t: '7',
		};
		const leetAdvancedMap: Record<string, string> = {
			...leetBasicMap,
			b: '8',
			g: '9',
			z: '2',
			c: '(',
		};

		if (leetLevel > 0) {
			const map = leetLevel === 1 ? leetBasicMap : leetAdvancedMap;
			words = words.map((w) => {
				return Array.from(w)
					.map((char) => {
						const lower = char.toLowerCase();
						if (map[lower]) {
							return map[lower];
						}
						return char;
					})
					.join('');
			});
		}

		// Separator resolution
		let sepChar = separator;
		if (separator === 'random') {
			const syms = '!@#$%^&*()_+-=[]{}|;:,.<>?';
			sepChar = syms[Math.floor(Math.random() * syms.length)];
		}

		let passphrase = words.join(sepChar);

		// Exclude characters
		if (excludeCharacters) {
			const excludeSet = new Set(excludeCharacters);
			passphrase = Array.from(passphrase)
				.filter((char) => !excludeSet.has(char))
				.join('');
		}

		// Add random numbers
		if (addNumbers) {
			let nums = '';
			for (let i = 0; i < numberCount; i++) {
				nums += Math.floor(Math.random() * 10).toString();
			}
			passphrase += nums;
		}

		// Add random symbol
		if (addSymbol) {
			const syms = customSymbols || '!@#$%^&*()_+-=[]{}|;:,.<>?';
			if (syms.length > 0) {
				const filteredSyms = Array.from(syms).filter(
					(char) => !excludeCharacters.includes(char),
				);
				if (filteredSyms.length > 0) {
					const sym =
						filteredSyms[
							Math.floor(Math.random() * filteredSyms.length)
						];
					passphrase += sym;
				}
			}
		}

		setGeneratedPassword(passphrase);
	}, [
		keywords,
		separator,
		caseStyle,
		leetLevel,
		addNumbers,
		numberCount,
		addSymbol,
		customSymbols,
		excludeCharacters,
	]);

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

	// Analyze strength
	useEffect(() => {
		if (!generatedPassword) {
			setStrength({
				score: 0,
				label: 'Very Weak',
				color: 'bg-red-500/20',
			});
			return;
		}

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

		const totalPossibilities = Math.pow(poolSize || 2, length);
		const speeds = {
			online: 100,
			gpu: 1e9,
			rig: 1e11,
			supercomputer: 1e14,
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

	// Auto generate on param change
	useEffect(() => {
		if (activeTab === 'random') {
			generatePassword();
		} else {
			generateKeywordPassword();
		}
	}, [activeTab, generatePassword, generateKeywordPassword]);

	const copyToClipboard = () => {
		if (!generatedPassword) return;
		navigator.clipboard.writeText(generatedPassword);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const triggerGeneration = () => {
		if (activeTab === 'random') generatePassword();
		else generateKeywordPassword();
	};

	return (
		<>
			<NextSeo
				title="Strong Password & Passphrase Generator - Joey Jazwinski"
				description="Generate highly secure passwords or keyword passphrases. View visual strength metrics and crack time estimates instantly."
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-6xl mx-auto space-y-12">
					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Shield className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
							Password Generator
						</h1>
						<p className="text-muted-foreground text-lg">
							Create random secure passwords or memorable
							keyword-based passphrases.
						</p>
					</div>

					{/* Layout */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
						{/* Configuration Column */}
						<div className="lg:col-span-7 bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
							{/* Tab Switcher */}
							<div className="flex border-b border-border/50 pb-2">
								<button
									onClick={() => setActiveTab('random')}
									className={`flex-1 pb-2.5 text-sm font-bold border-b-2 transition-all ${
										activeTab === 'random'
											? 'border-primary text-primary'
											: 'border-transparent text-muted-foreground hover:text-foreground'
									}`}
								>
									Random Characters
								</button>
								<button
									onClick={() => setActiveTab('keyword')}
									className={`flex-1 pb-2.5 text-sm font-bold border-b-2 transition-all ${
										activeTab === 'keyword'
											? 'border-primary text-primary'
											: 'border-transparent text-muted-foreground hover:text-foreground'
									}`}
								>
									Keyword Passphrase
								</button>
							</div>

							{activeTab === 'random' ? (
								// Tab 1: Random Characters Panel
								<div className="space-y-6">
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

									{/* Rule Toggles */}
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
								</div>
							) : (
								// Tab 2: Keyword Passphrase Panel
								<div className="space-y-6">
									{/* Seed Keywords Input */}
									<div className="space-y-1.5">
										<label
											htmlFor="keywords-input"
											className="block text-sm font-semibold text-muted-foreground"
										>
											Base Keywords (Separated by
											spaces/commas)
										</label>
										<input
											id="keywords-input"
											type="text"
											autoComplete="off"
											className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
											value={keywords}
											onChange={(e) =>
												setKeywords(e.target.value)
											}
											placeholder="e.g. coffee coding active"
										/>
									</div>

									{/* Word Options Grid */}
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										{/* Separator Selection */}
										<div className="space-y-1.5">
											<label
												htmlFor="separator-select"
												className="block text-xs font-semibold text-muted-foreground"
											>
												Separator Character
											</label>
											<select
												id="separator-select"
												className="w-full p-2.5 border border-border rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
												value={separator}
												onChange={(e) =>
													setSeparator(e.target.value)
												}
											>
												<option value="-">
													Hyphen (-)
												</option>
												<option value="_">
													Underscore (_)
												</option>
												<option value=".">
													Period (.)
												</option>
												<option value="">
													None (Concatenate)
												</option>
												<option value="random">
													Random Symbol
												</option>
											</select>
										</div>

										{/* Capitalization Selection */}
										<div className="space-y-1.5">
											<label
												htmlFor="case-select"
												className="block text-xs font-semibold text-muted-foreground"
											>
												Capitalization Style
											</label>
											<select
												id="case-select"
												className="w-full p-2.5 border border-border rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
												value={caseStyle}
												onChange={(e) =>
													setCaseStyle(e.target.value)
												}
											>
												<option value="title">
													Title Case (Word)
												</option>
												<option value="lower">
													lowercase (word)
												</option>
												<option value="upper">
													UPPERCASE (WORD)
												</option>
												<option value="random">
													rAnDoM cAsE (wOrD)
												</option>
											</select>
										</div>

										{/* Leetspeak Level Selection */}
										<div className="space-y-1.5">
											<label
												htmlFor="leet-select"
												className="block text-xs font-semibold text-muted-foreground"
											>
												Leetspeak Substitution
											</label>
											<select
												id="leet-select"
												className="w-full p-2.5 border border-border rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
												value={leetLevel}
												onChange={(e) =>
													setLeetLevel(
														Number(e.target.value),
													)
												}
											>
												<option value="0">
													None (Standard Text)
												</option>
												<option value="1">
													Basic (a→4, e→3, o→0)
												</option>
												<option value="2">
													Advanced (b→8, g→9, c→()
												</option>
											</select>
										</div>

										{/* Number count if appended */}
										<div className="space-y-1.5">
											<label
												htmlFor="digits-select"
												className="block text-xs font-semibold text-muted-foreground"
											>
												Random Digits to Append
											</label>
											<div className="flex items-center gap-3">
												<input
													id="append-nums"
													type="checkbox"
													checked={addNumbers}
													onChange={(e) =>
														setAddNumbers(
															e.target.checked,
														)
													}
													className="w-4.5 h-4.5 text-primary bg-background border-border rounded focus:ring-primary"
												/>
												<select
													disabled={!addNumbers}
													className="grow p-2 border border-border rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 transition"
													value={numberCount}
													onChange={(e) =>
														setNumberCount(
															Number(
																e.target.value,
															),
														)
													}
												>
													<option value="2">
														2 Digits (e.g. 59)
													</option>
													<option value="3">
														3 Digits (e.g. 284)
													</option>
													<option value="4">
														4 Digits (e.g. 9173)
													</option>
												</select>
											</div>
										</div>
									</div>

									{/* Add Symbol toggle */}
									<label className="flex items-center gap-3 p-3 rounded-xl border border-border/80 hover:bg-muted/40 cursor-pointer transition select-none">
										<input
											type="checkbox"
											checked={addSymbol}
											onChange={(e) =>
												setAddSymbol(e.target.checked)
											}
											className="w-4.5 h-4.5 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
										/>
										<div className="flex flex-col">
											<span className="text-sm font-medium">
												Append Random Symbol
											</span>
											<span className="text-xs text-muted-foreground">
												Adds a trailing symbol at the
												very end
											</span>
										</div>
									</label>
								</div>
							)}

							{/* Custom & Excluded Symbols (Visible on both modes) */}
							<div className="space-y-4 pt-2 border-t border-border/50">
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
										disabled={
											activeTab === 'random' &&
											!includeSymbols
										}
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
								onClick={triggerGeneration}
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
									<div className="w-full min-h-18 flex items-center px-4 py-3 rounded-xl border border-border bg-background font-mono text-lg break-all select-all pr-12 shadow-inner">
										{generatedPassword ? (
											<span className="text-foreground">
												{generatedPassword}
											</span>
										) : (
											<span className="text-muted-foreground/60 italic">
												Please select options to
												generate...
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
