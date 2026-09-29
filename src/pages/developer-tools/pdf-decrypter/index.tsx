import React, {
	useState,
	useRef,
	useMemo,
	useCallback,
	useEffect,
} from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import ToolFaqSection from '@/components/tools/ToolFaqSection';
import RelatedTools from '@/components/tools/RelatedTools';
import {
	Upload,
	Download,
	FileText,
	ShieldCheck,
	ShieldAlert,
	Key,
	Eye,
	EyeOff,
	Trash2,
	Archive,
	Sparkles,
	RefreshCw,
	Check,
	ExternalLink,
	Lock,
	AlertCircle,
	X,
	Cpu,
	Zap,
	BookOpen,
	Sliders,
	Activity,
	StopCircle,
	ChevronRight,
	Grid3X3,
	Search,
	ArrowDown,
	ArrowUp,
	FileDown,
} from 'lucide-react';
import {
	checkPdfEncryption,
	decryptPdf,
	formatBytes,
	getCleanDecryptedFileName,
	generateDemoEncryptedPdf,
	getSharedQpdfRunner,
	resetSharedQpdfRunner,
	runQpdfWorker,
	createPdfPasswordValidator,
	type PdfSecurityInfo,
} from '@/lib/pdfDecrypter';
import { decryptPDF } from '@pdfsmaller/pdf-decrypt';
import { createZipArchive, type ZipFileEntry } from '@/lib/zipHelper';

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Password databases                                                          */
/* ─────────────────────────────────────────────────────────────────────────── */

const PASSWORD_DATABASES = [
	{
		id: 'top20',
		label: 'Top 20 Common (instant)',
		url: 'https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/top-20-common-SSH-passwords.txt',
		count: 20,
		estimatedSeconds: 1,
		color: 'emerald',
	},
	{
		id: 'top1000',
		label: 'Top 1,000 Passwords (~5 s)',
		url: 'https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/Pwdb_top-1000.txt',
		count: 1000,
		estimatedSeconds: 5,
		color: 'blue',
	},
	{
		id: 'ncsc100k',
		label: 'NCSC 100k Most Used (~2 min)',
		url: 'https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/100k-most-used-passwords-NCSC.txt',
		count: 100_000,
		estimatedSeconds: 120,
		color: 'amber',
	},
	{
		id: 'rockyou2m',
		label: 'RockYou 2M (~10 min)',
		url: 'https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Leaked-Databases/rockyou-75.txt',
		count: 2_000_000,
		estimatedSeconds: 600,
		color: 'rose',
	},
] as const;

type DbId = (typeof PASSWORD_DATABASES)[number]['id'];

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Constants & types                                                           */
/* ─────────────────────────────────────────────────────────────────────────── */

const CHARSETS = {
	lowercase: 'abcdefghijklmnopqrstuvwxyz',
	uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	digits: '0123456789',
	symbols: '!@#$%^&*()-_+=[]{}|;:,.<>?',
	space: ' ',
} as const;

type BruteTab = 'assisted' | 'pure' | 'dictionary';
type MainTab = 'engine' | 'recovery';

interface PdfItem {
	id: string;
	fileName: string;
	originalSize: number;
	bytes: Uint8Array;
	securityInfo?: PdfSecurityInfo;
	isAnalyzing: boolean;
	isDecrypting: boolean;
	password: string;
	showPassword: boolean;
	decryptedBytes?: Uint8Array;
	decryptedSize?: number;
	blobUrl?: string;
	engineUsed?: 'WebCrypto' | 'QPDF-WASM';
	durationMs?: number;
	pageCount?: number;
	status:
		| 'analyzing'
		| 'unencrypted'
		| 'needs_password'
		| 'ready_no_pass'
		| 'decrypting'
		| 'success'
		| 'error';
	errorMessage?: string;
}

interface BruteState {
	running: boolean;
	found: boolean;
	foundPassword: string | null;
	attempts: string[];
	totalTried: number;
	startedAt: number | null;
	estimatedTotal: number;
	error: string | null;
}

const INITIAL_BRUTE: BruteState = {
	running: false,
	found: false,
	foundPassword: null,
	attempts: [],
	totalTried: 0,
	startedAt: null,
	estimatedTotal: 0,
	error: null,
};

const PDF_DECRYPTER_FAQS = [
	{
		question: 'Does this tool upload my PDF to a remote server?',
		answer: 'No. All decryption runs inside your browser using Web Crypto and WebAssembly. Your files and passwords never leave your computer.',
	},
	{
		question: 'Do I need to know the password to decrypt the PDF?',
		answer: 'If the document has an open password, you can enter it or use the Recovery tab to recover a forgotten password. If the file only has print or edit restrictions, the tool strips them without any password.',
	},
	{
		question: 'What encryption standards are supported?',
		answer: 'The engine handles AES-256, AES-128, and legacy RC4 encryption across modern and older PDF specifications.',
	},
	{
		question: 'What is the Recovery tab for?',
		answer: 'The Recovery tab helps you regain access to your own encrypted documents when you forgot the password. It is built strictly for educational use and recovery of personal files.',
	},
	{
		question: 'How does Assisted Brute Force work?',
		answer: 'You can provide known character placements or masks (like "MTH #25"), or specify prefix and suffix hints. The engine only tests combinations that fit your constraints.',
	},
	{
		question: 'Is there a file size limit?',
		answer: 'No. Processing happens locally in background Web Workers so your browser stays responsive even with heavy documents.',
	},
];

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Helpers                                                                     */
/* ─────────────────────────────────────────────────────────────────────────── */

function buildCharset(opts: {
	lowercase: boolean;
	uppercase: boolean;
	digits: boolean;
	symbols: boolean;
	space?: boolean;
	extra?: string;
}): string {
	let s = '';
	if (opts.lowercase) s += CHARSETS.lowercase;
	if (opts.uppercase) s += CHARSETS.uppercase;
	if (opts.digits) s += CHARSETS.digits;
	if (opts.symbols) s += CHARSETS.symbols;
	if (opts.space) s += CHARSETS.space;
	if (opts.extra) {
		s += opts.extra
			.split('')
			.filter((c) => !s.includes(c))
			.join('');
	}
	return s || CHARSETS.lowercase;
}

/**
 * Interleaves characters from multiple groups into a single balanced alphabet.
 * e.g. [digits, uppercase] -> ['0', 'A', '1', 'B', '2', 'C', ...]
 */
function buildInterleavedCharset(groups: string[][]): string[] {
	const result: string[] = [];
	const maxLen = Math.max(...groups.map((g) => g.length), 0);
	for (let i = 0; i < maxLen; i++) {
		for (const g of groups) {
			if (i < g.length && !result.includes(g[i])) {
				result.push(g[i]);
			}
		}
	}
	return result;
}

/**
 * Generates combinations for W positions by ascending Manhattan sum of indices.
 * This guarantees that every position rotates through character sets evenly and interchanges
 * digits, letters, and symbols from the very first few attempts.
 */
function* generateBalancedCombinations(
	length: number,
	alphabet: string[],
): Generator<string> {
	if (length === 0) {
		yield '';
		return;
	}
	const N = alphabet.length;
	if (N === 0) return;
	const maxSum = length * (N - 1);

	function* sumTuples(
		wRemaining: number,
		currentSumTarget: number,
	): Generator<number[]> {
		if (wRemaining === 1) {
			if (currentSumTarget >= 0 && currentSumTarget < N) {
				yield [currentSumTarget];
			}
			return;
		}
		const minVal = Math.max(
			0,
			currentSumTarget - (wRemaining - 1) * (N - 1),
		);
		const maxVal = Math.min(N - 1, currentSumTarget);
		for (let v = minVal; v <= maxVal; v++) {
			for (const rest of sumTuples(
				wRemaining - 1,
				currentSumTarget - v,
			)) {
				yield [v, ...rest];
			}
		}
	}

	for (let S = 0; S <= maxSum; S++) {
		for (const tuple of sumTuples(length, S)) {
			let s = '';
			for (let i = 0; i < length; i++) {
				s += alphabet[tuple[i]];
			}
			yield s;
		}
	}
}

function estimateCount(
	charset: string,
	minLen: number,
	maxLen: number,
): number {
	let total = 0;
	for (let l = minLen; l <= maxLen; l++) {
		total += Math.pow(charset.length, l);
	}
	return total;
}

function formatDuration(seconds: number): string {
	if (seconds < 60) return `~${Math.ceil(seconds)}s`;
	if (seconds < 3600) return `~${Math.ceil(seconds / 60)}m`;
	return `~${(seconds / 3600).toFixed(1)}h`;
}

/**
 * Detects whether the file's encryption is supported by Web Crypto.
 * If not (e.g. AES-128 / V=4, R=4), attempts should be routed directly to QPDF WebAssembly.
 */
function isCryptoSupportedForFile(securityInfo?: PdfSecurityInfo): boolean {
	if (!securityInfo) return true;
	if (securityInfo.error) return false;
	if (
		securityInfo.algorithm === 'AES-128' ||
		securityInfo.algorithm === 'Unknown'
	) {
		return false;
	}
	if (securityInfo.version === 4) return false;
	if (securityInfo.version === 5 && securityInfo.revision !== 6) return false;
	return true;
}

/**
 * Validates whether a candidate password decrypts the PDF.
 * Tries the fast Web Crypto API first. If the file structure requires QPDF WebAssembly,
 * it routes cleanly to the worker engine.
 */
async function tryPassword(
	bytes: Uint8Array,
	password: string,
	preferredEngine: 'auto' | 'crypto' | 'wasm' = 'auto',
	engineHint?: { current: 'auto' | 'crypto' | 'wasm' },
): Promise<boolean> {
	if (!bytes || bytes.length === 0) return false;

	const targetEngine = engineHint?.current ?? preferredEngine;

	// Explicit or locked to WASM Web Worker
	if (targetEngine === 'wasm') {
		try {
			const out = await runQpdfWorker(bytes, password);
			return Boolean(out && out.length > 0);
		} catch {
			return false;
		}
	}

	// Strictly crypto
	if (targetEngine === 'crypto') {
		try {
			await decryptPDF(bytes, password);
			return true;
		} catch {
			return false;
		}
	}

	// Auto: Try Web Crypto first
	try {
		await decryptPDF(bytes, password);
		if (engineHint) engineHint.current = 'crypto';
		return true;
	} catch (cryptoErr: any) {
		const msg = String(cryptoErr?.message || '');
		// If WebCrypto explicitly cannot handle this document's cipher or format, lock to WASM
		if (
			msg.includes('Unsupported encryption') ||
			msg.includes('Missing /OE') ||
			msg.includes('Failed to read PDF')
		) {
			if (engineHint) engineHint.current = 'wasm';
			try {
				const out = await runQpdfWorker(bytes, password);
				return Boolean(out && out.length > 0);
			} catch {
				return false;
			}
		}

		if (preferredEngine === 'crypto') return false;

		return false;
	}
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Page Component                                                              */
/* ─────────────────────────────────────────────────────────────────────────── */

export default function PdfDecrypter() {
	/* files */
	const [files, setFiles] = useState<PdfItem[]>([]);
	const [batchPassword, setBatchPassword] = useState('');
	const [previewItem, setPreviewItem] = useState<{
		fileName: string;
		blobUrl: string;
	} | null>(null);
	const [isGeneratingDemo, setIsGeneratingDemo] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	/* active file for recovery */
	const [activeFileId, setActiveFileId] = useState<string | null>(null);
	const activeFile = useMemo(
		() => files.find((f) => f.id === activeFileId) ?? files[0] ?? null,
		[files, activeFileId],
	);

	/* main tab */
	const [mainTab, setMainTab] = useState<MainTab>('engine');
	const [mainTabVisible, setMainTabVisible] = useState(true);

	/* engine mode */
	const [preferredEngine, setPreferredEngine] = useState<
		'auto' | 'crypto' | 'wasm'
	>('auto');

	/* brute-force sub-tab */
	const [bruteTab, setBruteTab] = useState<BruteTab>('assisted');
	const [bruteTabVisible, setBruteTabVisible] = useState(true);

	/* brute state */
	const [brute, setBrute] = useState<BruteState>(INITIAL_BRUTE);
	const stopRef = useRef(false);

	/* ── Assisted BF settings ── */
	const [assistedSubMode, setAssistedSubMode] = useState<
		'mask' | 'prefix_suffix'
	>('mask');
	const [assistedMask, setAssistedMask] = useState('MTH#25');
	const [assistedPrefix, setAssistedPrefix] = useState('MTH');
	const [assistedSuffix, setAssistedSuffix] = useState('25');
	const [assistedMinLen, setAssistedMinLen] = useState(1);
	const [assistedMaxLen, setAssistedMaxLen] = useState(1);
	const [assistedAutoSpace, setAssistedAutoSpace] = useState(true);
	const [assistedKnownChars, setAssistedKnownChars] = useState('');
	const [assistedUseLower, setAssistedUseLower] = useState(false);
	const [assistedUseUpper, setAssistedUseUpper] = useState(false);
	const [assistedUseDigits, setAssistedUseDigits] = useState(true);
	const [assistedUseSymbols, setAssistedUseSymbols] = useState(false);
	const [assistedUseSpace, setAssistedUseSpace] = useState(false);

	/* ── Pure BF settings ── */
	const [pureLower, setPureLower] = useState(true);
	const [pureUpper, setPureUpper] = useState(false);
	const [pureDigits, setPureDigits] = useState(true);
	const [pureSymbols, setPureSymbols] = useState(false);
	const [pureSpace, setPureSpace] = useState(false);
	const [pureExclude, setPureExclude] = useState('');
	const [pureMinLen, setPureMinLen] = useState(1);
	const [pureMaxLen, setPureMaxLen] = useState(4);

	/* ── Dictionary settings ── */
	const [selectedDbs, setSelectedDbs] = useState<DbId[]>(['top20']);

	/* ── Full History & Dynamic Loading State ── */
	const fullAttemptsRef = useRef<string[]>([]);
	const [visibleCount, setVisibleCount] = useState(100);
	const [historyFilter, setHistoryFilter] = useState('');
	const [autoScroll, setAutoScroll] = useState(true);

	/* scroll log to bottom when autoScroll is active */
	const logRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (autoScroll && logRef.current) {
			logRef.current.scrollTop = logRef.current.scrollHeight;
		}
	}, [brute.totalTried, autoScroll]);

	/* Preload QPDF WASM runner once when entering recovery mode */
	useEffect(() => {
		if (mainTab === 'recovery') {
			getSharedQpdfRunner().catch(() => {});
		}
	}, [mainTab]);

	/* ─────────────────────────────── */
	/*  Tab switching with fade        */
	/* ─────────────────────────────── */

	const switchMainTab = (t: MainTab) => {
		if (t === mainTab) return;
		setMainTabVisible(false);
		setTimeout(() => {
			setMainTab(t);
			setMainTabVisible(true);
		}, 50);
	};

	const switchBruteTab = (t: BruteTab) => {
		if (t === bruteTab) return;
		setBruteTabVisible(false);
		setTimeout(() => {
			setBruteTab(t);
			setBruteTabVisible(true);
		}, 50);
	};

	/* ─────────────────────────────── */
	/*  File handling                  */
	/* ─────────────────────────────── */

	const handleFilesAdded = async (fileList: File[]) => {
		const newItems: PdfItem[] = fileList.map((file) => ({
			id: Math.random().toString(36).substring(2, 9),
			fileName: file.name,
			originalSize: file.size,
			bytes: new Uint8Array(),
			isAnalyzing: true,
			isDecrypting: false,
			password: batchPassword,
			showPassword: false,
			status: 'analyzing',
		}));
		setFiles((prev) => [...prev, ...newItems]);

		for (let i = 0; i < fileList.length; i++) {
			const file = fileList[i];
			const currentId = newItems[i].id;
			try {
				const buffer = await file.arrayBuffer();
				const bytes = new Uint8Array(buffer);
				const security = await checkPdfEncryption(bytes);
				setFiles((prev) =>
					prev.map((item) => {
						if (item.id !== currentId) return item;
						let status: PdfItem['status'] = 'needs_password';
						if (!security.encrypted) status = 'unencrypted';
						else if (security.canDecryptWithoutPassword)
							status = 'ready_no_pass';
						return {
							...item,
							bytes,
							securityInfo: security,
							isAnalyzing: false,
							pageCount: security.pageCount,
							status,
						};
					}),
				);
			} catch (err: any) {
				setFiles((prev) =>
					prev.map((item) =>
						item.id === currentId
							? {
									...item,
									isAnalyzing: false,
									status: 'error',
									errorMessage:
										err?.message ||
										'Failed to inspect file.',
								}
							: item,
					),
				);
			}
		}
	};

	const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const dropped = Array.from(e.dataTransfer.files).filter((f) =>
			f.name.toLowerCase().endsWith('.pdf'),
		);
		if (dropped.length > 0) handleFilesAdded(dropped);
	};

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selected = Array.from(e.target.files || []).filter((f) =>
			f.name.toLowerCase().endsWith('.pdf'),
		);
		if (selected.length > 0) handleFilesAdded(selected);
		if (fileInputRef.current) fileInputRef.current.value = '';
	};

	const handleLoadDemo = async () => {
		setIsGeneratingDemo(true);
		try {
			const demo = await generateDemoEncryptedPdf();
			const security = await checkPdfEncryption(demo.bytes);
			const demoItem: PdfItem = {
				id: Math.random().toString(36).substring(2, 9),
				fileName: demo.fileName,
				originalSize: demo.bytes.length,
				bytes: demo.bytes,
				securityInfo: security,
				isAnalyzing: false,
				isDecrypting: false,
				password: demo.password,
				showPassword: true,
				status: 'needs_password',
				pageCount: 2,
			};
			setFiles((prev) => [demoItem, ...prev]);
		} catch (err: any) {
			console.error(err);
		} finally {
			setIsGeneratingDemo(false);
		}
	};

	/* ─────────────────────────────── */
	/*  Known-password decrypt         */
	/* ─────────────────────────────── */

	const handleDecryptSingle = async (
		id: string,
		overridePassword?: string,
	) => {
		const target = files.find((f) => f.id === id);
		if (!target || target.isDecrypting || target.bytes.length === 0) return;

		const activePw = overridePassword ?? target.password;

		setFiles((prev) =>
			prev.map((item) =>
				item.id === id
					? {
							...item,
							password: activePw,
							isDecrypting: true,
							status: 'decrypting',
							errorMessage: undefined,
						}
					: item,
			),
		);

		try {
			const result = await decryptPdf(
				target.bytes,
				activePw,
				preferredEngine,
			);
			const blob = new Blob([result.bytes as BlobPart], {
				type: 'application/pdf',
			});
			const blobUrl = URL.createObjectURL(blob);
			setFiles((prev) =>
				prev.map((item) =>
					item.id === id
						? {
								...item,
								isDecrypting: false,
								status: 'success',
								decryptedBytes: result.bytes,
								decryptedSize: result.bytes.length,
								blobUrl,
								engineUsed: result.engine,
								durationMs: result.durationMs,
								pageCount: result.pageCount ?? item.pageCount,
							}
						: item,
				),
			);
		} catch (err: any) {
			setFiles((prev) =>
				prev.map((item) =>
					item.id === id
						? {
								...item,
								isDecrypting: false,
								status: 'error',
								errorMessage:
									err?.message || 'Decryption failed.',
							}
						: item,
				),
			);
		}
	};

	const handleDecryptAll = async () => {
		for (const item of files.filter((f) =>
			['needs_password', 'ready_no_pass', 'error'].includes(f.status),
		)) {
			await handleDecryptSingle(item.id);
		}
	};

	const applyBatchPassword = () => {
		if (!batchPassword) return;
		setFiles((prev) =>
			prev.map((item) =>
				item.status !== 'success'
					? { ...item, password: batchPassword }
					: item,
			),
		);
	};

	const handleDownloadSingle = (item: PdfItem) => {
		if (!item.blobUrl) return;
		const a = document.createElement('a');
		a.href = item.blobUrl;
		a.download = getCleanDecryptedFileName(item.fileName);
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};

	const handleDownloadAllZip = () => {
		const readyItems = files.filter(
			(f) => f.decryptedBytes && f.status === 'success',
		);
		if (!readyItems.length) return;
		const entries: ZipFileEntry[] = readyItems.map((item) => ({
			name: getCleanDecryptedFileName(item.fileName),
			data: item.decryptedBytes!,
		}));
		const zipBlob = createZipArchive(entries);
		const url = URL.createObjectURL(zipBlob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'decrypted-documents.zip';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const handleRemoveItem = (id: string) => {
		setFiles((prev) => {
			const target = prev.find((item) => item.id === id);
			if (target?.blobUrl) URL.revokeObjectURL(target.blobUrl);
			return prev.filter((item) => item.id !== id);
		});
	};

	const handleClearAll = () => {
		files.forEach((f) => {
			if (f.blobUrl) URL.revokeObjectURL(f.blobUrl);
		});
		setFiles([]);
	};

	const stats = useMemo(
		() => ({
			totalCount: files.length,
			readyCount: files.filter((f) => f.status === 'success').length,
			totalOriginalBytes: files.reduce(
				(acc, f) => acc + f.originalSize,
				0,
			),
		}),
		[files],
	);

	/* ─────────────────────────────── */
	/*  Brute-force logic              */
	/* ─────────────────────────────── */

	const appendAttempts = useCallback((batch: string[]) => {
		if (batch.length === 0) return;
		fullAttemptsRef.current.push(...batch);
		setBrute((prev) => ({
			...prev,
			totalTried: prev.totalTried + batch.length,
		}));
	}, []);

	const resetBruteRun = useCallback((estimatedTotal = 0) => {
		stopRef.current = false;
		fullAttemptsRef.current = [];
		setVisibleCount(100);
		setHistoryFilter('');
		setAutoScroll(true);
		resetSharedQpdfRunner();
		setBrute({
			running: true,
			found: false,
			foundPassword: null,
			attempts: [],
			totalTried: 0,
			startedAt: Date.now(),
			estimatedTotal,
			error: null,
		});
	}, []);

	const stopBrute = () => {
		stopRef.current = true;
		resetSharedQpdfRunner();
		setBrute((prev) => ({ ...prev, running: false }));
	};

	const yieldControl = () =>
		new Promise<void>((resolve) => setTimeout(resolve, 0));

	const handlePasswordFound = async (foundPw: string) => {
		setBrute((prev) => ({
			...prev,
			running: false,
			found: true,
			foundPassword: foundPw,
		}));

		if (activeFile) {
			setFiles((prev) =>
				prev.map((f) =>
					f.id === activeFile.id ? { ...f, password: foundPw } : f,
				),
			);
			await handleDecryptSingle(activeFile.id, foundPw);
		}
	};

	/* ── Full History Dynamic Loading Logic ── */
	const totalHistoryCount = fullAttemptsRef.current.length;

	const filteredTotalCount = useMemo(() => {
		const query = historyFilter.trim().toLowerCase();
		if (!query) return totalHistoryCount;
		let c = 0;
		for (const pw of fullAttemptsRef.current) {
			if (pw.toLowerCase().includes(query)) c++;
		}
		return c;
	}, [totalHistoryCount, historyFilter, brute.totalTried]);

	const displayedAttempts = useMemo(() => {
		const all = fullAttemptsRef.current;
		const query = historyFilter.trim().toLowerCase();

		if (query) {
			const filtered: { index: number; password: string }[] = [];
			for (let i = 0; i < all.length; i++) {
				if (all[i].toLowerCase().includes(query)) {
					filtered.push({ index: i + 1, password: all[i] });
				}
			}
			return filtered.slice(-visibleCount);
		}

		const startIdx = Math.max(0, all.length - visibleCount);
		const slice: { index: number; password: string }[] = [];
		for (let i = startIdx; i < all.length; i++) {
			slice.push({ index: i + 1, password: all[i] });
		}
		return slice;
	}, [brute.totalTried, visibleCount, historyFilter]);

	const olderCountAvailable = Math.max(0, filteredTotalCount - visibleCount);

	const loadOlderAttempts = () => {
		if (logRef.current) {
			const prevScrollHeight = logRef.current.scrollHeight;
			setVisibleCount((prev) => {
				const next = prev + 100;
				requestAnimationFrame(() => {
					if (logRef.current) {
						logRef.current.scrollTop =
							logRef.current.scrollHeight - prevScrollHeight;
					}
				});
				return next;
			});
		} else {
			setVisibleCount((prev) => prev + 100);
		}
	};

	const loadAllAttempts = () => {
		setVisibleCount(Math.max(filteredTotalCount, 10000));
	};

	const handleLogScroll = (e: React.UIEvent<HTMLDivElement>) => {
		const target = e.currentTarget;
		const isAtBottom =
			target.scrollHeight - target.scrollTop - target.clientHeight < 35;
		const isAtTop = target.scrollTop < 15;

		if (isAtBottom) {
			setAutoScroll(true);
		} else {
			setAutoScroll(false);
		}

		if (isAtTop && olderCountAvailable > 0) {
			const prevScrollHeight = target.scrollHeight;
			setVisibleCount((prev) => {
				const next = prev + 100;
				requestAnimationFrame(() => {
					if (logRef.current) {
						logRef.current.scrollTop =
							logRef.current.scrollHeight - prevScrollHeight;
					}
				});
				return next;
			});
		}
	};

	const handleDownloadLog = () => {
		const all = fullAttemptsRef.current;
		if (all.length === 0) return;
		const lines = [
			`PDF Decrypter - Password Recovery Attempt Log`,
			`Document: ${activeFile?.fileName || 'Unknown'}`,
			`Generated: ${new Date().toLocaleString()}`,
			`Total attempts: ${all.length}`,
			`Status: ${brute.found ? `Found password "${brute.foundPassword}"` : brute.running ? 'Running' : 'Stopped / Not found'}`,
			'--------------------------------------------------',
			...all.map((pw, i) => `#${i + 1}: ${pw}`),
		];
		const blob = new Blob([lines.join('\n')], {
			type: 'text/plain;charset=utf-8',
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `recovery-attempts-${activeFile?.fileName || 'pdf'}.txt`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	/* ── Assisted BF: Pattern Mask Mode ── */
	const runAssistedMask = async () => {
		if (!activeFile || !activeFile.bytes || activeFile.bytes.length === 0)
			return;
		stopRef.current = false;

		// Build individual character groups so we can interleave them across wildcard positions
		const groups: string[][] = [];
		if (assistedUseDigits) groups.push(CHARSETS.digits.split(''));
		if (assistedUseUpper) groups.push(CHARSETS.uppercase.split(''));
		if (assistedUseLower) groups.push(CHARSETS.lowercase.split(''));
		if (assistedUseSymbols) groups.push(CHARSETS.symbols.split(''));
		if (assistedUseSpace) groups.push(CHARSETS.space.split(''));
		if (assistedKnownChars) {
			const extras = assistedKnownChars
				.split('')
				.filter((c) => !groups.some((g) => g.includes(c)));
			if (extras.length > 0) groups.push(extras);
		}
		if (groups.length === 0) groups.push(CHARSETS.digits.split(''));

		const alphabet = buildInterleavedCharset(groups);

		// Identify all wildcard indices in the mask
		const wildcardPositions: number[] = [];
		for (let i = 0; i < assistedMask.length; i++) {
			if (['?', '#', '_', '*'].includes(assistedMask[i])) {
				wildcardPositions.push(i);
			}
		}

		const W = wildcardPositions.length;
		const totalCombinations = assistedMaskEstimate;

		resetBruteRun(totalCombinations);

		const pdfBytes = activeFile.bytes;
		let batch: string[] = [];

		const validator = await createPdfPasswordValidator(
			pdfBytes,
			preferredEngine,
		);

		if (W === 0) {
			if (await validator.test(assistedMask)) {
				appendAttempts([assistedMask]);
				await handlePasswordFound(assistedMask);
			} else {
				appendAttempts([assistedMask]);
				setBrute((prev) => ({ ...prev, running: false }));
			}
			return;
		}

		for (const combo of generateBalancedCombinations(W, alphabet)) {
			if (stopRef.current) break;

			const chars = assistedMask.split('');
			for (let w = 0; w < W; w++) {
				chars[wildcardPositions[w]] = combo[w];
			}
			const candidate = chars.join('');
			batch.push(candidate);

			if (batch.length >= 25) {
				appendAttempts(batch);
				batch = [];
				await yieldControl();
			}

			if (await validator.test(candidate)) {
				if (batch.length > 0) appendAttempts(batch);
				await handlePasswordFound(candidate);
				return;
			}
		}

		if (batch.length > 0) appendAttempts(batch);
		setBrute((prev) => ({ ...prev, running: false }));
	};

	/* ── Assisted BF: Prefix & Suffix Mode ── */
	const runAssistedPrefixSuffix = async () => {
		if (!activeFile || !activeFile.bytes || activeFile.bytes.length === 0)
			return;
		stopRef.current = false;

		const groups: string[][] = [];
		if (assistedUseDigits) groups.push(CHARSETS.digits.split(''));
		if (assistedUseUpper) groups.push(CHARSETS.uppercase.split(''));
		if (assistedUseLower) groups.push(CHARSETS.lowercase.split(''));
		if (assistedUseSymbols) groups.push(CHARSETS.symbols.split(''));
		if (assistedUseSpace) groups.push(CHARSETS.space.split(''));
		if (assistedKnownChars) {
			const extras = assistedKnownChars
				.split('')
				.filter((c) => !groups.some((g) => g.includes(c)));
			if (extras.length > 0) groups.push(extras);
		}
		if (groups.length === 0) groups.push(CHARSETS.digits.split(''));

		const alphabet = buildInterleavedCharset(groups);

		const prefixVariations = [assistedPrefix];
		if (
			assistedAutoSpace &&
			assistedPrefix &&
			!assistedPrefix.endsWith(' ')
		) {
			prefixVariations.push(assistedPrefix + ' ');
		}

		const suffixVariations = [assistedSuffix];
		if (
			assistedAutoSpace &&
			assistedSuffix &&
			!assistedSuffix.startsWith(' ')
		) {
			suffixVariations.push(' ' + assistedSuffix);
		}

		const totalEst = assistedPrefixSuffixEstimate;

		resetBruteRun(totalEst);

		const pdfBytes = activeFile.bytes;
		let batch: string[] = [];

		const validator = await createPdfPasswordValidator(
			pdfBytes,
			preferredEngine,
		);

		for (let len = assistedMinLen; len <= assistedMaxLen; len++) {
			if (stopRef.current) break;

			for (const middlePart of generateBalancedCombinations(
				len,
				alphabet,
			)) {
				if (stopRef.current) break;

				for (const pfx of prefixVariations) {
					for (const sfx of suffixVariations) {
						if (stopRef.current) break;
						const candidate = pfx + middlePart + sfx;
						batch.push(candidate);

						if (batch.length >= 25) {
							appendAttempts(batch);
							batch = [];
							await yieldControl();
						}

						if (await validator.test(candidate)) {
							if (batch.length > 0) appendAttempts(batch);
							await handlePasswordFound(candidate);
							return;
						}
					}
				}
			}
		}

		if (batch.length > 0) appendAttempts(batch);
		setBrute((prev) => ({ ...prev, running: false }));
	};

	/* ── Pure BF ── */
	const runPure = async () => {
		if (!activeFile || !activeFile.bytes || activeFile.bytes.length === 0)
			return;
		stopRef.current = false;
		let charset = buildCharset({
			lowercase: pureLower,
			uppercase: pureUpper,
			digits: pureDigits,
			symbols: pureSymbols,
			space: pureSpace,
			extra: '',
		});
		if (pureExclude) {
			charset = charset
				.split('')
				.filter((c) => !pureExclude.includes(c))
				.join('');
		}
		if (!charset) {
			setBrute((prev) => ({ ...prev, error: 'Charset is empty.' }));
			return;
		}

		const estimated = estimateCount(charset, pureMinLen, pureMaxLen);
		resetBruteRun(estimated);

		const pdfBytes = activeFile.bytes;
		let batchAcc: string[] = [];

		const validator = await createPdfPasswordValidator(
			pdfBytes,
			preferredEngine,
		);

		for (let len = pureMinLen; len <= pureMaxLen; len++) {
			if (stopRef.current) break;
			const totalAtLen = Math.pow(charset.length, len);
			const indices = new Array(len).fill(0);
			let count = 0;

			while (count < totalAtLen) {
				if (stopRef.current) break;
				const candidate = indices.map((i) => charset[i]).join('');
				batchAcc.push(candidate);

				if (batchAcc.length >= 35) {
					appendAttempts(batchAcc);
					batchAcc = [];
					await yieldControl();
				}

				if (await validator.test(candidate)) {
					if (batchAcc.length > 0) appendAttempts(batchAcc);
					await handlePasswordFound(candidate);
					return;
				}

				let pos = len - 1;
				while (pos >= 0) {
					indices[pos]++;
					if (indices[pos] < charset.length) break;
					indices[pos] = 0;
					pos--;
				}
				count++;
			}
		}

		if (batchAcc.length > 0) appendAttempts(batchAcc);
		if (!stopRef.current) setBrute((prev) => ({ ...prev, running: false }));
	};

	/* ── Dictionary ── */
	const runDictionary = async () => {
		if (
			!activeFile ||
			!activeFile.bytes ||
			activeFile.bytes.length === 0 ||
			!selectedDbs.length
		)
			return;
		resetBruteRun(0);
		const pdfBytes = activeFile.bytes;

		const validator = await createPdfPasswordValidator(
			pdfBytes,
			preferredEngine,
		);

		for (const dbId of selectedDbs) {
			const db = PASSWORD_DATABASES.find((d) => d.id === dbId)!;
			setBrute((prev) => ({
				...prev,
				estimatedTotal: prev.estimatedTotal + db.count,
			}));
			let text = '';
			try {
				const res = await fetch(db.url);
				text = await res.text();
			} catch {
				setBrute((prev) => ({
					...prev,
					error: `Failed to load ${db.label}. Check network.`,
				}));
				continue;
			}
			const lines = text
				.split('\n')
				.map((l) => l.trim())
				.filter(Boolean);
			let batch: string[] = [];
			for (const pw of lines) {
				if (stopRef.current) {
					setBrute((prev) => ({ ...prev, running: false }));
					return;
				}
				batch.push(pw);
				if (batch.length >= 35) {
					appendAttempts(batch);
					batch = [];
					await yieldControl();
				}
				if (await validator.test(pw)) {
					if (batch.length > 0) appendAttempts(batch);
					await handlePasswordFound(pw);
					return;
				}
			}
			if (batch.length) appendAttempts(batch);
		}
		setBrute((prev) => ({ ...prev, running: false }));
	};

	/* Derived estimates */
	const assistedMaskEstimate = useMemo(() => {
		let total = 1;
		const baseLen = buildCharset({
			digits: assistedUseDigits,
			lowercase: assistedUseLower,
			uppercase: assistedUseUpper,
			symbols: assistedUseSymbols,
			space: assistedUseSpace,
			extra: assistedKnownChars,
		}).length;

		for (const ch of assistedMask) {
			if (['?', '#', '_', '*'].includes(ch)) {
				total *= baseLen;
			}
		}
		return total;
	}, [
		assistedMask,
		assistedUseDigits,
		assistedUseLower,
		assistedUseUpper,
		assistedUseSymbols,
		assistedUseSpace,
		assistedKnownChars,
	]);

	const assistedCharset = buildCharset({
		lowercase: assistedUseLower,
		uppercase: assistedUseUpper,
		digits: assistedUseDigits,
		symbols: assistedUseSymbols,
		space: assistedUseSpace,
		extra: assistedKnownChars,
	});
	const assistedPrefixSuffixEstimate =
		estimateCount(assistedCharset, assistedMinLen, assistedMaxLen) *
		(assistedAutoSpace ? 2 : 1) *
		(assistedAutoSpace ? 2 : 1);

	const pureCharsetStr = buildCharset({
		lowercase: pureLower,
		uppercase: pureUpper,
		digits: pureDigits,
		symbols: pureSymbols,
		space: pureSpace,
		extra: '',
	});
	const pureEstimate = estimateCount(pureCharsetStr, pureMinLen, pureMaxLen);

	const dictEstimate = selectedDbs.reduce(
		(acc, id) =>
			acc + (PASSWORD_DATABASES.find((d) => d.id === id)?.count ?? 0),
		0,
	);
	const dictSeconds = selectedDbs.reduce(
		(acc, id) =>
			acc +
			(PASSWORD_DATABASES.find((d) => d.id === id)?.estimatedSeconds ??
				0),
		0,
	);

	const bruteProgress =
		brute.estimatedTotal > 0
			? Math.min(
					99,
					Math.round((brute.totalTried / brute.estimatedTotal) * 100),
				)
			: 0;

	/* ─────────────────────────────── */
	/*  Render                         */
	/* ─────────────────────────────── */

	return (
		<>
			<NextSeo
				title="PDF Decrypter | Remove PDF Passwords In Browser - Joey Jazwinski"
				description="Download a password free version of your pdf for free and completely on your browser. 100% client-side privacy with Web Crypto and WebAssembly."
				canonical="https://joeyjazwinski.com/developer-tools/pdf-decrypter"
				openGraph={{
					title: 'PDF Decrypter | Remove PDF Passwords In Browser - Joey Jazwinski',
					description:
						'Download a password free version of your pdf for free and completely on your browser. 100% client-side privacy with Web Crypto and WebAssembly.',
					url: 'https://joeyjazwinski.com/developer-tools/pdf-decrypter',
					type: 'website',
					images: [
						{
							url: 'https://joeyjazwinski.com/ogimage.png',
							width: 1200,
							height: 630,
							alt: 'PDF Decrypter',
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
				name="PDF Decrypter"
				description="Download a password free version of your pdf for free and completely on your browser"
				url="https://joeyjazwinski.com/developer-tools/pdf-decrypter"
				category="SecurityApplication"
				faqs={PDF_DECRYPTER_FAQS}
			/>

			<main className="bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground min-h-screen">
				<div className="max-w-6xl mx-auto space-y-8">
					{/* Breadcrumb */}
					<div>
						<Link
							href="/developer-tools"
							className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-primary transition"
						>
							&larr; Back to all developer tools
						</Link>
					</div>

					{/* Header */}
					<div className="text-center space-y-4 max-w-3xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-rose-500/10 text-rose-500 border border-rose-500/20">
							<ShieldCheck className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-rose-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">
							PDF Decrypter
						</h1>
						<p className="text-muted-foreground text-lg max-w-2xl mx-auto">
							Download a password free version of your pdf for
							free and completely on your browser
						</p>
						<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
							<ShieldCheck className="w-4 h-4 shrink-0" />
							<span>
								Zero server uploads. Decrypted locally in your
								browser memory.
							</span>
						</div>
					</div>

					{/* Primary Workbench */}
					<div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
						{/* Drop Zone */}
						<div
							onDragOver={(e) => e.preventDefault()}
							onDrop={onDrop}
							onClick={() => fileInputRef.current?.click()}
							className="relative flex flex-col items-center justify-center border-b border-border border-dashed hover:border-primary/60 py-10 px-4 hover:bg-secondary/20 cursor-pointer transition text-center group mx-6 mt-6 rounded-xl border-2"
						>
							<input
								ref={fileInputRef}
								type="file"
								accept=".pdf,application/pdf"
								multiple
								onChange={onInputChange}
								className="hidden"
							/>
							<div className="p-4 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform mb-3">
								<Upload className="w-8 h-8" />
							</div>
							<div className="text-base font-bold text-foreground">
								Drop your PDF files here or click to browse
							</div>
							<p className="text-xs text-muted-foreground mt-1 max-w-md">
								Accepts files of any size. Processing happens
								client-side without bandwidth limits.
							</p>
							<div className="mt-4 flex flex-wrap items-center justify-center gap-2">
								{[
									'AES-256',
									'AES-128',
									'RC4 128-bit',
									'Owner Restrictions',
								].map((tag) => (
									<span
										key={tag}
										className="text-[11px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border"
									>
										{tag}
									</span>
								))}
							</div>
						</div>

						{/* Demo button */}
						<div className="px-6 pt-4 pb-2 flex items-center gap-2 text-xs">
							<span className="text-muted-foreground">
								Don&apos;t have an encrypted PDF handy?
							</span>
							<button
								type="button"
								onClick={handleLoadDemo}
								disabled={isGeneratingDemo}
								className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline cursor-pointer disabled:opacity-50"
							>
								<Sparkles className="w-3.5 h-3.5" />
								{isGeneratingDemo
									? 'Generating sample...'
									: 'Try Demo Encrypted PDF'}
							</button>
						</div>

						{/* Main Tabs: Engine / Recovery */}
						<div className="px-6 pb-6 pt-2 space-y-4">
							<div className="flex items-center gap-1 p-1 rounded-xl bg-muted/60 border border-border w-fit">
								{(
									[
										{
											id: 'engine' as MainTab,
											label: 'Decrypt Engine',
											icon: (
												<Key className="w-3.5 h-3.5" />
											),
										},
										{
											id: 'recovery' as MainTab,
											label: 'Password Recovery Mode',
											icon: (
												<Search className="w-3.5 h-3.5" />
											),
										},
									] as const
								).map((tab) => (
									<button
										key={tab.id}
										type="button"
										onClick={() => switchMainTab(tab.id)}
										className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
											mainTab === tab.id
												? 'bg-card text-foreground shadow-sm border border-border scale-[1.02]'
												: 'text-muted-foreground hover:text-foreground'
										}`}
									>
										{tab.icon}
										{tab.label}
									</button>
								))}
							</div>

							{/* Tab Content with fade */}
							<div
								style={{
									opacity: mainTabVisible ? 1 : 0,
									transition: 'opacity 50ms ease',
								}}
							>
								{/* ── ENGINE TAB ── */}
								{mainTab === 'engine' && (
									<div className="space-y-4">
										<div className="flex items-center gap-3 text-xs text-muted-foreground p-3 rounded-xl bg-muted/30 border border-border/60">
											<Cpu className="w-4 h-4 shrink-0 text-primary" />
											<div className="flex items-center gap-2 flex-wrap">
												<span>Decryption engine:</span>
												<select
													value={preferredEngine}
													onChange={(e) =>
														setPreferredEngine(
															e.target
																.value as any,
														)
													}
													className="bg-background border border-border rounded px-2 py-1 text-xs text-foreground cursor-pointer focus:outline-none focus:border-primary"
												>
													<option value="auto">
														Auto (Web Crypto + WASM)
													</option>
													<option value="crypto">
														Web Crypto API Only
													</option>
													<option value="wasm">
														QPDF Web Worker Only
													</option>
												</select>
											</div>
										</div>

										{/* Batch Controls */}
										{files.length > 0 && (
											<div className="p-4 rounded-xl bg-secondary/40 border border-border/70 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
												<div className="flex items-center gap-3 text-xs">
													<span className="text-muted-foreground">
														Loaded{' '}
														<span className="font-bold text-foreground">
															{files.length}
														</span>{' '}
														file
														{files.length === 1
															? ''
															: 's'}{' '}
														(
														{formatBytes(
															stats.totalOriginalBytes,
														)}
														)
													</span>
													{stats.readyCount > 0 && (
														<span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
															{stats.readyCount}{' '}
															Decrypted
														</span>
													)}
												</div>
												<div className="flex flex-wrap items-center gap-2">
													<div className="flex items-center gap-1.5">
														<input
															type="password"
															placeholder="Batch password..."
															value={
																batchPassword
															}
															onChange={(e) =>
																setBatchPassword(
																	e.target
																		.value,
																)
															}
															className="w-36 bg-background border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary"
														/>
														<button
															type="button"
															onClick={
																applyBatchPassword
															}
															className="px-2.5 py-1.5 rounded-lg border border-border bg-card hover:bg-secondary text-foreground text-xs font-medium cursor-pointer"
														>
															Apply
														</button>
													</div>
													<button
														type="button"
														onClick={
															handleDecryptAll
														}
														className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition cursor-pointer flex items-center gap-1.5"
													>
														<Lock className="w-3.5 h-3.5" />
														Decrypt All
													</button>
													{stats.readyCount > 1 && (
														<button
															type="button"
															onClick={
																handleDownloadAllZip
															}
															className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:opacity-90 transition cursor-pointer flex items-center gap-1.5"
														>
															<Archive className="w-3.5 h-3.5" />
															ZIP (
															{stats.readyCount})
														</button>
													)}
													<button
														type="button"
														onClick={handleClearAll}
														className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 transition cursor-pointer"
														title="Clear all"
													>
														<Trash2 className="w-3.5 h-3.5" />
													</button>
												</div>
											</div>
										)}
									</div>
								)}

								{/* ── RECOVERY TAB ── */}
								{mainTab === 'recovery' && (
									<div className="space-y-4">
										{/* Educational Disclaimer */}
										<div className="flex gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-700 dark:text-amber-400">
											<AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
											<span>
												<strong>
													Educational use only.
												</strong>{' '}
												This recovery suite is designed
												to help you regain access to
												your own password-protected
												files. It runs completely inside
												your browser memory with zero
												telemetry.
											</span>
										</div>

										{/* Target File Selector */}
										{files.length === 0 ? (
											<p className="text-xs text-muted-foreground">
												Upload a password-protected PDF
												above to start recovery.
											</p>
										) : (
											<div className="flex items-center gap-2 text-xs">
												<span className="text-muted-foreground shrink-0 font-medium">
													Target document:
												</span>
												<select
													value={activeFile?.id ?? ''}
													onChange={(e) =>
														setActiveFileId(
															e.target.value,
														)
													}
													className="flex-1 bg-background border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground cursor-pointer focus:outline-none focus:border-primary max-w-xs"
												>
													{files.map((f) => (
														<option
															key={f.id}
															value={f.id}
														>
															{f.fileName} (
															{formatBytes(
																f.originalSize,
															)}
															)
														</option>
													))}
												</select>
											</div>
										)}

										{/* Recovery Method Sub-tabs */}
										<div className="flex items-center gap-1 p-1 rounded-xl bg-muted/60 border border-border w-fit flex-wrap">
											{(
												[
													{
														id: 'assisted' as BruteTab,
														label: 'Assisted / Mask Placement',
														icon: (
															<Sliders className="w-3.5 h-3.5" />
														),
													},
													{
														id: 'pure' as BruteTab,
														label: 'Pure Brute Force',
														icon: (
															<Grid3X3 className="w-3.5 h-3.5" />
														),
													},
													{
														id: 'dictionary' as BruteTab,
														label: 'Password Dataset List',
														icon: (
															<BookOpen className="w-3.5 h-3.5" />
														),
													},
												] as const
											).map((tab) => (
												<button
													key={tab.id}
													type="button"
													onClick={() =>
														switchBruteTab(tab.id)
													}
													className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
														bruteTab === tab.id
															? 'bg-card text-foreground shadow-sm border border-border scale-[1.02]'
															: 'text-muted-foreground hover:text-foreground'
													}`}
												>
													{tab.icon}
													{tab.label}
												</button>
											))}
										</div>

										{/* Sub-tab content with fade */}
										<div
											style={{
												opacity: bruteTabVisible
													? 1
													: 0,
												transition: 'opacity 50ms ease',
											}}
											className="space-y-4"
										>
											{/* ── ASSISTED BF ── */}
											{bruteTab === 'assisted' && (
												<div className="space-y-4">
													{/* Assisted Sub-selector */}
													<div className="flex items-center gap-2 border-b border-border/60 pb-2 text-xs">
														<button
															type="button"
															onClick={() =>
																setAssistedSubMode(
																	'mask',
																)
															}
															className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer transition ${
																assistedSubMode ===
																'mask'
																	? 'bg-primary/10 text-primary border border-primary/20'
																	: 'text-muted-foreground hover:text-foreground'
															}`}
														>
															Pattern / Character
															Placement Mask
														</button>
														<button
															type="button"
															onClick={() =>
																setAssistedSubMode(
																	'prefix_suffix',
																)
															}
															className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer transition ${
																assistedSubMode ===
																'prefix_suffix'
																	? 'bg-primary/10 text-primary border border-primary/20'
																	: 'text-muted-foreground hover:text-foreground'
															}`}
														>
															Prefix &amp; Suffix
															Range
														</button>
													</div>

													{/* 1. MASK / CHARACTER PLACEMENT MODE */}
													{assistedSubMode ===
														'mask' && (
														<div className="space-y-3">
															<p className="text-xs text-muted-foreground">
																Define the exact
																placement of
																known and
																unknown
																characters. For
																example,{' '}
																<code className="px-1.5 py-0.5 rounded bg-muted font-mono font-bold text-foreground">
																	MTH#25
																</code>{' '}
																tests digits in
																the 5th slot
																while keeping
																spaces and text
																fixed.
															</p>

															<div className="space-y-1.5">
																<div className="flex items-center justify-between text-xs">
																	<label className="font-semibold text-foreground">
																		Placement
																		Mask
																	</label>
																	<span className="text-[11px] text-muted-foreground">
																		Wildcards:{' '}
																		<span className="font-mono text-primary font-bold">
																			#
																		</span>{' '}
																		or{' '}
																		<span className="font-mono text-primary font-bold">
																			?
																		</span>{' '}
																		or{' '}
																		<span className="font-mono text-primary font-bold">
																			*
																		</span>{' '}
																		(tests
																		all
																		checked
																		character
																		sets)
																	</span>
																</div>
																<input
																	value={
																		assistedMask
																	}
																	onChange={(
																		e,
																	) =>
																		setAssistedMask(
																			e
																				.target
																				.value,
																		)
																	}
																	placeholder="e.g. MTH #25 or admin??"
																	className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-primary"
																/>
															</div>

															{/* Interactive Visual Slots */}
															<div className="p-3 rounded-xl bg-secondary/30 border border-border/70 space-y-2">
																<div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
																	Character
																	Placement
																	Slots (
																	{
																		assistedMask.length
																	}{' '}
																	positions)
																</div>
																<div className="flex flex-wrap gap-1.5">
																	{assistedMask
																		.split(
																			'',
																		)
																		.map(
																			(
																				ch,
																				i,
																			) => {
																				const isWildcard =
																					[
																						'#',
																						'?',
																						'_',
																						'*',
																					].includes(
																						ch,
																					);
																				const isSpace =
																					ch ===
																					' ';
																				return (
																					<div
																						key={
																							i
																						}
																						className={`w-9 h-11 rounded-lg border flex flex-col items-center justify-center font-mono transition ${
																							isWildcard
																								? 'bg-rose-500/10 border-rose-500/30 text-rose-500 font-bold'
																								: isSpace
																									? 'bg-blue-500/10 border-blue-500/30 text-blue-500 font-bold'
																									: 'bg-card border-border text-foreground font-semibold'
																						}`}
																					>
																						<span className="text-xs">
																							{isSpace
																								? '␣'
																								: ch}
																						</span>
																						<span className="text-[9px] text-muted-foreground mt-0.5">
																							{
																								i
																							}
																						</span>
																					</div>
																				);
																			},
																		)}
																</div>
															</div>

															<div className="text-[11px] text-muted-foreground font-mono">
																Candidates in
																this mask: ~
																{assistedMaskEstimate.toLocaleString()}{' '}
																&bull; Est.{' '}
																{formatDuration(
																	assistedMaskEstimate *
																		0.005,
																)}
															</div>
														</div>
													)}

													{/* 2. PREFIX & SUFFIX MODE */}
													{assistedSubMode ===
														'prefix_suffix' && (
														<div className="space-y-3">
															<p className="text-xs text-muted-foreground">
																Provide known
																start or end
																strings with a
																middle range.
															</p>

															<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
																<div className="space-y-1.5">
																	<label className="text-xs font-semibold text-foreground">
																		Known
																		Prefix
																	</label>
																	<input
																		value={
																			assistedPrefix
																		}
																		onChange={(
																			e,
																		) =>
																			setAssistedPrefix(
																				e
																					.target
																					.value,
																			)
																		}
																		placeholder='e.g. "MTH" or "MTH "'
																		className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
																	/>
																</div>
																<div className="space-y-1.5">
																	<label className="text-xs font-semibold text-foreground">
																		Known
																		Suffix
																	</label>
																	<input
																		value={
																			assistedSuffix
																		}
																		onChange={(
																			e,
																		) =>
																			setAssistedSuffix(
																				e
																					.target
																					.value,
																			)
																		}
																		placeholder='e.g. "25"'
																		className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
																	/>
																</div>
																<div className="space-y-1.5">
																	<label className="text-xs font-semibold text-foreground">
																		Min
																		middle
																		length
																	</label>
																	<input
																		type="number"
																		min={0}
																		max={8}
																		value={
																			assistedMinLen
																		}
																		onChange={(
																			e,
																		) =>
																			setAssistedMinLen(
																				Number(
																					e
																						.target
																						.value,
																				),
																			)
																		}
																		className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
																	/>
																</div>
																<div className="space-y-1.5">
																	<label className="text-xs font-semibold text-foreground">
																		Max
																		middle
																		length
																	</label>
																	<input
																		type="number"
																		min={1}
																		max={8}
																		value={
																			assistedMaxLen
																		}
																		onChange={(
																			e,
																		) =>
																			setAssistedMaxLen(
																				Number(
																					e
																						.target
																						.value,
																				),
																			)
																		}
																		className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
																	/>
																</div>
															</div>

															<label className="flex items-center gap-2 text-xs text-foreground cursor-pointer pt-1">
																<input
																	type="checkbox"
																	checked={
																		assistedAutoSpace
																	}
																	onChange={(
																		e,
																	) =>
																		setAssistedAutoSpace(
																			e
																				.target
																				.checked,
																		)
																	}
																	className="accent-primary"
																/>
																<span>
																	Auto-test
																	space
																	separators
																	(e.g.{' '}
																	<code className="font-mono text-muted-foreground">
																		&quot;MTH
																		225&quot;
																	</code>{' '}
																	as well as{' '}
																	<code className="font-mono text-muted-foreground">
																		&quot;MTH225&quot;
																	</code>
																	)
																</span>
															</label>

															<div className="text-[11px] text-muted-foreground font-mono">
																Candidates:~
																{assistedPrefixSuffixEstimate.toLocaleString()}{' '}
																&bull; Est.{' '}
																{formatDuration(
																	assistedPrefixSuffixEstimate *
																		0.005,
																)}
															</div>
														</div>
													)}

													{/* Character Set Checkboxes */}
													<div className="space-y-2 pt-2 border-t border-border/50">
														<div className="flex items-center justify-between text-xs">
															<label className="font-semibold text-foreground">
																Active Character
																Set (
																{
																	assistedCharset.length
																}{' '}
																characters)
															</label>
															<span className="text-muted-foreground text-[11px] font-mono">
																{[
																	assistedUseDigits
																		? '0-9'
																		: null,
																	assistedUseLower
																		? 'a-z'
																		: null,
																	assistedUseUpper
																		? 'A-Z'
																		: null,
																	assistedUseSymbols
																		? 'symbols'
																		: null,
																	assistedUseSpace
																		? 'space'
																		: null,
																]
																	.filter(
																		Boolean,
																	)
																	.join(
																		' + ',
																	) ||
																	'none selected'}
															</span>
														</div>
														<div className="flex flex-wrap gap-2 text-xs">
															{[
																{
																	label: '0-9 digits (10)',
																	state: assistedUseDigits,
																	toggle: () =>
																		setAssistedUseDigits(
																			(
																				v,
																			) =>
																				!v,
																		),
																},
																{
																	label: 'a-z lowercase (26)',
																	state: assistedUseLower,
																	toggle: () =>
																		setAssistedUseLower(
																			(
																				v,
																			) =>
																				!v,
																		),
																},
																{
																	label: 'A-Z uppercase (26)',
																	state: assistedUseUpper,
																	toggle: () =>
																		setAssistedUseUpper(
																			(
																				v,
																			) =>
																				!v,
																		),
																},
																{
																	label: 'Symbols !@#…',
																	state: assistedUseSymbols,
																	toggle: () =>
																		setAssistedUseSymbols(
																			(
																				v,
																			) =>
																				!v,
																		),
																},
																{
																	label: 'Space ␣ (1)',
																	state: assistedUseSpace,
																	toggle: () =>
																		setAssistedUseSpace(
																			(
																				v,
																			) =>
																				!v,
																		),
																},
															].map(
																({
																	label,
																	state,
																	toggle,
																}) => (
																	<button
																		key={
																			label
																		}
																		type="button"
																		onClick={
																			toggle
																		}
																		className={`px-2.5 py-1.5 rounded-lg border font-semibold transition cursor-pointer ${
																			state
																				? 'bg-primary/10 border-primary/40 text-primary shadow-xs'
																				: 'border-border text-muted-foreground hover:border-primary/30'
																		}`}
																	>
																		{label}
																	</button>
																),
															)}
														</div>
													</div>

													<div className="space-y-1.5">
														<label className="text-xs font-semibold text-foreground">
															Extra characters
															(optional)
														</label>
														<input
															autoComplete="off"
															autoCorrect="off"
															value={
																assistedKnownChars
															}
															onChange={(e) =>
																setAssistedKnownChars(
																	e.target
																		.value,
																)
															}
															placeholder='e.g. "-_@"'
															className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
														/>
													</div>
												</div>
											)}

											{/* ── PURE BF ── */}
											{bruteTab === 'pure' && (
												<div className="space-y-4">
													<p className="text-xs text-muted-foreground">
														Select character sets
														and length range. The
														engine tests every
														permutation in order.
													</p>
													<div className="flex flex-wrap gap-2 text-xs">
														{[
															{
																label: 'a-z lowercase',
																state: pureLower,
																toggle: () =>
																	setPureLower(
																		(v) =>
																			!v,
																	),
															},
															{
																label: 'A-Z uppercase',
																state: pureUpper,
																toggle: () =>
																	setPureUpper(
																		(v) =>
																			!v,
																	),
															},
															{
																label: '0-9 digits',
																state: pureDigits,
																toggle: () =>
																	setPureDigits(
																		(v) =>
																			!v,
																	),
															},
															{
																label: 'Symbols !@#…',
																state: pureSymbols,
																toggle: () =>
																	setPureSymbols(
																		(v) =>
																			!v,
																	),
															},
															{
																label: 'Space ␣',
																state: pureSpace,
																toggle: () =>
																	setPureSpace(
																		(v) =>
																			!v,
																	),
															},
														].map(
															({
																label,
																state,
																toggle,
															}) => (
																<button
																	key={label}
																	type="button"
																	onClick={
																		toggle
																	}
																	className={`px-2.5 py-1.5 rounded-lg border font-semibold transition cursor-pointer ${
																		state
																			? 'bg-primary/10 border-primary/30 text-primary'
																			: 'border-border text-muted-foreground hover:border-primary/30'
																	}`}
																>
																	{label}
																</button>
															),
														)}
													</div>
													<div className="grid grid-cols-2 gap-4">
														<div className="space-y-1.5">
															<label className="text-xs font-semibold text-foreground">
																Min length
															</label>
															<input
																type="number"
																min={1}
																max={12}
																value={
																	pureMinLen
																}
																onChange={(e) =>
																	setPureMinLen(
																		Number(
																			e
																				.target
																				.value,
																		),
																	)
																}
																className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
															/>
														</div>
														<div className="space-y-1.5">
															<label className="text-xs font-semibold text-foreground">
																Max length
															</label>
															<input
																type="number"
																min={1}
																max={12}
																value={
																	pureMaxLen
																}
																onChange={(e) =>
																	setPureMaxLen(
																		Number(
																			e
																				.target
																				.value,
																		),
																	)
																}
																className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
															/>
														</div>
													</div>
													<div className="space-y-1.5">
														<label className="text-xs font-semibold text-foreground">
															Exclude characters
														</label>
														<input
															value={pureExclude}
															onChange={(e) =>
																setPureExclude(
																	e.target
																		.value,
																)
															}
															placeholder='e.g. "0O1l"'
															className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
														/>
													</div>
													<div className="text-[11px] text-muted-foreground font-mono">
														Charset:{' '}
														{pureCharsetStr.length}{' '}
														chars &bull; ~
														{pureEstimate.toLocaleString()}{' '}
														candidates &bull; Est.{' '}
														{formatDuration(
															pureEstimate *
																0.005,
														)}
													</div>
												</div>
											)}

											{/* ── DICTIONARY ── */}
											{bruteTab === 'dictionary' && (
												<div className="space-y-4">
													<p className="text-xs text-muted-foreground">
														Check if the PDF was
														protected with a common
														password. Lists are
														streamed lazily over the
														network.
													</p>
													<div className="space-y-2">
														{PASSWORD_DATABASES.map(
															(db) => {
																const checked =
																	selectedDbs.includes(
																		db.id,
																	);
																const colorMap: Record<
																	string,
																	string
																> = {
																	emerald:
																		'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
																	blue: 'border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400',
																	amber: 'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400',
																	rose: 'border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400',
																};
																return (
																	<label
																		key={
																			db.id
																		}
																		className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
																			checked
																				? 'border-primary/40 bg-primary/5'
																				: 'border-border hover:border-primary/30'
																		}`}
																	>
																		<input
																			type="checkbox"
																			checked={
																				checked
																			}
																			onChange={() =>
																				setSelectedDbs(
																					(
																						prev,
																					) =>
																						checked
																							? prev.filter(
																									(
																										id,
																									) =>
																										id !==
																										db.id,
																								)
																							: [
																									...prev,
																									db.id,
																								],
																				)
																			}
																			className="accent-primary"
																		/>
																		<div className="flex-1 min-w-0">
																			<div className="text-xs font-semibold text-foreground">
																				{
																					db.label
																				}
																			</div>
																			<div className="text-[11px] text-muted-foreground font-mono">
																				{db.count.toLocaleString()}{' '}
																				passwords
																				&bull;
																				SecLists
																			</div>
																		</div>
																		<span
																			className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${colorMap[db.color]}`}
																		>
																			{formatDuration(
																				db.estimatedSeconds,
																			)}
																		</span>
																	</label>
																);
															},
														)}
													</div>
													<div className="text-[11px] text-muted-foreground font-mono">
														Selected:{' '}
														{dictEstimate.toLocaleString()}{' '}
														passwords &bull; Total
														est.{' '}
														{formatDuration(
															dictSeconds,
														)}
													</div>
												</div>
											)}
										</div>

										{/* Run / Stop buttons */}
										<div className="flex items-center gap-2 pt-2">
											{!brute.running ? (
												<button
													type="button"
													disabled={
														!activeFile ||
														files.length === 0
													}
													onClick={
														bruteTab === 'assisted'
															? assistedSubMode ===
																'mask'
																? runAssistedMask
																: runAssistedPrefixSuffix
															: bruteTab ===
																  'pure'
																? runPure
																: runDictionary
													}
													className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold flex items-center gap-2 hover:bg-rose-500 transition cursor-pointer disabled:opacity-40"
												>
													<Zap className="w-4 h-4" />
													Start{' '}
													{bruteTab === 'assisted'
														? 'Assisted'
														: bruteTab === 'pure'
															? 'Pure'
															: 'Dictionary'}{' '}
													Recovery
												</button>
											) : (
												<button
													type="button"
													onClick={stopBrute}
													className="px-4 py-2 rounded-xl bg-muted border border-border text-foreground text-xs font-bold flex items-center gap-2 hover:bg-secondary transition cursor-pointer"
												>
													<StopCircle className="w-4 h-4 text-rose-500" />
													Stop
												</button>
											)}
											{brute.found && (
												<span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/30">
													<Check className="w-4 h-4 text-emerald-500" />
													Password Found:{' '}
													<code className="font-mono bg-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-700 dark:text-emerald-300">
														{brute.foundPassword}
													</code>
													&bull; File decrypted!
												</span>
											)}
										</div>

										{/* Live Attempt Log with Full History & Dynamic Loading */}
										{(brute.running ||
											totalHistoryCount > 0) && (
											<div className="rounded-xl border border-border overflow-hidden">
												<div className="flex items-center justify-between px-3 py-2 bg-muted/40 border-b border-border text-[11px]">
													<div className="flex items-center gap-2 text-muted-foreground font-mono">
														<Activity
															className={`w-3.5 h-3.5 ${
																brute.running
																	? 'text-primary animate-pulse'
																	: 'text-muted-foreground'
															}`}
														/>
														{brute.running
															? `Testing candidates... ${totalHistoryCount.toLocaleString()} tried`
															: `Complete — ${totalHistoryCount.toLocaleString()} total attempts`}
													</div>
													{brute.found && (
														<span className="font-bold text-emerald-500 flex items-center gap-1">
															<Check className="w-3.5 h-3.5" />
															Match located
														</span>
													)}
													{!brute.found &&
														!brute.running &&
														totalHistoryCount >
															0 && (
															<span className="text-rose-500 font-semibold">
																Password not
																found in this
																batch
															</span>
														)}
												</div>

												{/* Log Toolbar: Filter, Auto-scroll, Export */}
												<div className="flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 bg-muted/20 border-b border-border text-[11px]">
													<div className="relative flex-1 min-w-37.5 max-w-xs">
														<Search className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
														<input
															value={
																historyFilter
															}
															onChange={(e) => {
																setHistoryFilter(
																	e.target
																		.value,
																);
																setVisibleCount(
																	100,
																);
															}}
															placeholder="Filter full history..."
															className="w-full pl-6 pr-5 py-1 bg-background border border-border rounded text-[11px] font-mono text-foreground focus:outline-none focus:border-primary"
														/>
														{historyFilter && (
															<button
																type="button"
																onClick={() => {
																	setHistoryFilter(
																		'',
																	);
																	setVisibleCount(
																		100,
																	);
																}}
																className="absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-[12px] leading-none px-1 cursor-pointer"
															>
																&times;
															</button>
														)}
													</div>

													<div className="flex items-center gap-2 text-[10px]">
														<span className="text-muted-foreground font-mono">
															{historyFilter
																? `${displayedAttempts.length} of ${filteredTotalCount} matches`
																: `${displayedAttempts.length} of ${totalHistoryCount} shown`}
														</span>

														<button
															type="button"
															onClick={() =>
																setAutoScroll(
																	(v) => !v,
																)
															}
															className={`px-2 py-1 rounded font-semibold border flex items-center gap-1 cursor-pointer transition ${
																autoScroll
																	? 'bg-primary/10 border-primary/40 text-primary'
																	: 'bg-muted border-border text-muted-foreground hover:text-foreground'
															}`}
															title={
																autoScroll
																	? 'Auto-scroll is on (following newest attempts)'
																	: 'Auto-scroll is off (click to resume)'
															}
														>
															<ArrowDown
																className={`w-3 h-3 ${autoScroll ? 'animate-bounce' : ''}`}
															/>
															{autoScroll
																? 'Auto-scroll'
																: 'Paused'}
														</button>

														<button
															type="button"
															onClick={
																handleDownloadLog
															}
															disabled={
																totalHistoryCount ===
																0
															}
															className="px-2 py-1 rounded font-semibold border border-border bg-card hover:bg-secondary text-foreground flex items-center gap-1 cursor-pointer disabled:opacity-40 transition"
															title="Export full attempt log as .txt"
														>
															<FileDown className="w-3 h-3" />
															Export
														</button>
													</div>
												</div>

												{/* Scrollable log with Dynamic Loading */}
												<div
													ref={logRef}
													onScroll={handleLogScroll}
													className="h-52 overflow-y-auto bg-background p-3 font-mono text-[10px] space-y-0.5 leading-snug relative"
												>
													{olderCountAvailable >
														0 && (
														<div className="sticky top-0 z-10 -mx-3 -mt-3 mb-2 p-1.5 bg-muted/95 backdrop-blur-xs border-b border-border/80 flex items-center justify-between text-[10px] text-muted-foreground shadow-xs">
															<span>
																{olderCountAvailable.toLocaleString()}{' '}
																older attempts
																above
															</span>
															<div className="flex items-center gap-1.5">
																<button
																	type="button"
																	onClick={
																		loadOlderAttempts
																	}
																	className="px-2 py-0.5 rounded bg-card border border-border hover:border-primary/50 text-foreground font-semibold cursor-pointer transition flex items-center gap-1"
																>
																	<ArrowUp className="w-2.5 h-2.5" />
																	Load older
																	100
																</button>
																<button
																	type="button"
																	onClick={
																		loadAllAttempts
																	}
																	className="px-2 py-0.5 rounded bg-card border border-border hover:border-primary/50 text-foreground font-semibold cursor-pointer transition"
																>
																	Load all
																</button>
															</div>
														</div>
													)}

													{displayedAttempts.length ===
														0 && (
														<div className="py-6 text-center text-muted-foreground">
															{historyFilter
																? `No attempts matching "${historyFilter}"`
																: 'Initializing recovery test...'}
														</div>
													)}

													{displayedAttempts.map(
														({
															index,
															password: pw,
														}) => {
															const isFound =
																pw ===
																brute.foundPassword;
															return (
																<div
																	key={index}
																	className={`flex items-center justify-between px-1.5 py-0.5 rounded transition ${
																		isFound
																			? 'text-emerald-500 font-bold bg-emerald-500/15 border border-emerald-500/30'
																			: 'text-muted-foreground hover:bg-secondary/40'
																	}`}
																>
																	<div className="flex items-center gap-2 truncate">
																		<span className="text-[9px] text-muted-foreground/60 w-10 shrink-0 font-mono">
																			#
																			{
																				index
																			}
																		</span>
																		<ChevronRight className="w-2.5 h-2.5 shrink-0 opacity-40" />
																		<span className="truncate text-foreground font-semibold">
																			{pw}
																		</span>
																	</div>
																	{isFound && (
																		<span className="shrink-0 flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-500/20 px-2 py-0.5 rounded">
																			<Check className="w-3 h-3 text-emerald-500" />
																			MATCH
																		</span>
																	)}
																</div>
															);
														},
													)}
												</div>

												{/* Estimation progress bar */}
												<div className="px-3 py-2 bg-muted/20 border-t border-border text-[11px] text-muted-foreground flex items-center justify-between gap-2">
													<div className="flex items-center gap-2 flex-1 min-w-0">
														<div className="flex-1 bg-border rounded-full h-1.5 overflow-hidden">
															<div
																className="h-full bg-primary rounded-full transition-all duration-300"
																style={{
																	width: `${bruteProgress}%`,
																}}
															/>
														</div>
														<span className="font-mono shrink-0">
															{bruteProgress}%
														</span>
													</div>
													{brute.startedAt &&
														brute.running && (
															<span className="font-mono shrink-0 text-muted-foreground/70">
																{formatDuration(
																	Math.max(
																		0,
																		(brute.estimatedTotal -
																			brute.totalTried) *
																			0.005,
																	),
																)}{' '}
																remaining
															</span>
														)}
													{brute.error && (
														<span className="text-rose-500 truncate">
															{brute.error}
														</span>
													)}
												</div>
											</div>
										)}
									</div>
								)}
							</div>
						</div>

						{/* Files List — always visible below tabs */}
						{files.length > 0 && (
							<div className="px-6 pb-6 space-y-3">
								<div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pb-1 border-t border-border pt-4">
									Uploaded Files
								</div>
								{files.map((item) => {
									const isSuccess = item.status === 'success';
									const isAnalyzing =
										item.status === 'analyzing';
									const isDecrypting =
										item.status === 'decrypting';
									const isUnencrypted =
										item.status === 'unencrypted';
									const isReadyNoPass =
										item.status === 'ready_no_pass';
									const isNeedsPassword =
										item.status === 'needs_password';
									const isError = item.status === 'error';

									return (
										<div
											key={item.id}
											onClick={() =>
												setActiveFileId(item.id)
											}
											className={`p-4 rounded-xl border transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs cursor-pointer ${
												activeFile?.id === item.id
													? 'border-primary/50 bg-primary/5'
													: 'border-border bg-card hover:border-border/90'
											}`}
										>
											{/* File Info */}
											<div className="flex items-start gap-3 min-w-0 max-w-full md:max-w-[50%]">
												<div
													className={`p-2.5 rounded-xl border shrink-0 mt-0.5 ${
														isSuccess
															? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
															: isUnencrypted
																? 'bg-muted border-border text-muted-foreground'
																: 'bg-rose-500/10 border-rose-500/30 text-rose-500'
													}`}
												>
													<FileText className="w-5 h-5" />
												</div>
												<div className="min-w-0">
													<div
														className="font-bold text-foreground text-sm truncate"
														title={item.fileName}
													>
														{item.fileName}
													</div>
													<div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-muted-foreground font-mono">
														<span>
															{formatBytes(
																item.originalSize,
															)}
														</span>
														{item.pageCount && (
															<span>
																&bull;{' '}
																{item.pageCount}{' '}
																pages
															</span>
														)}
														{item.securityInfo
															?.algorithm && (
															<span className="px-1.5 rounded bg-secondary text-foreground text-[10px]">
																{
																	item
																		.securityInfo
																		.algorithm
																}
															</span>
														)}
													</div>
													<div className="mt-1.5 flex items-center gap-1.5">
														{isAnalyzing && (
															<span className="inline-flex items-center gap-1 text-muted-foreground">
																<RefreshCw className="w-3 h-3 animate-spin text-primary" />
																Analyzing...
															</span>
														)}
														{isUnencrypted && (
															<span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
																<Check className="w-3 h-3" />
																Already
																password-free
															</span>
														)}
														{isReadyNoPass && (
															<span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
																<ShieldAlert className="w-3 h-3" />
																Owner restricted
															</span>
														)}
														{isNeedsPassword && (
															<span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-medium">
																<Lock className="w-3 h-3" />
																Password
																protected
															</span>
														)}
														{isDecrypting && (
															<span className="inline-flex items-center gap-1 text-primary font-medium">
																<RefreshCw className="w-3 h-3 animate-spin" />
																Decrypting...
															</span>
														)}
														{isSuccess && (
															<span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
																<Check className="w-3.5 h-3.5" />
																Password removed
																(
																{
																	item.durationMs
																}
																ms &bull;{' '}
																{
																	item.engineUsed
																}
																)
															</span>
														)}
														{isError && (
															<span className="inline-flex items-center gap-1 text-rose-500 font-medium">
																<AlertCircle className="w-3 h-3 shrink-0" />
																{item.errorMessage ||
																	'Failed'}
															</span>
														)}
													</div>
												</div>
											</div>

											{/* Controls */}
											<div
												className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end"
												onClick={(e) =>
													e.stopPropagation()
												}
											>
												{(isNeedsPassword ||
													isError) && (
													<div className="relative flex items-center">
														<input
															type={
																item.showPassword
																	? 'text'
																	: 'password'
															}
															placeholder="Enter password..."
															value={
																item.password
															}
															onChange={(e) => {
																const val =
																	e.target
																		.value;
																setFiles(
																	(prev) =>
																		prev.map(
																			(
																				f,
																			) =>
																				f.id ===
																				item.id
																					? {
																							...f,
																							password:
																								val,
																						}
																					: f,
																		),
																);
															}}
															onKeyDown={(e) => {
																if (
																	e.key ===
																	'Enter'
																)
																	handleDecryptSingle(
																		item.id,
																	);
															}}
															className="bg-background border border-border rounded-lg pl-3 pr-8 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary w-40 sm:w-48"
															autoComplete="off"
															autoCorrect="off"
														/>
														<button
															type="button"
															onClick={() =>
																setFiles(
																	(prev) =>
																		prev.map(
																			(
																				f,
																			) =>
																				f.id ===
																				item.id
																					? {
																							...f,
																							showPassword:
																								!f.showPassword,
																						}
																					: f,
																		),
																)
															}
															className="absolute right-2 text-muted-foreground hover:text-foreground cursor-pointer"
														>
															{item.showPassword ? (
																<EyeOff className="w-3.5 h-3.5" />
															) : (
																<Eye className="w-3.5 h-3.5" />
															)}
														</button>
													</div>
												)}
												{(isNeedsPassword ||
													isReadyNoPass ||
													isError) && (
													<button
														type="button"
														onClick={() =>
															handleDecryptSingle(
																item.id,
															)
														}
														disabled={
															isDecrypting ||
															isAnalyzing
														}
														className="px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold text-xs flex items-center gap-1.5 hover:opacity-90 transition cursor-pointer disabled:opacity-50"
													>
														{isDecrypting ? (
															<>
																<RefreshCw className="w-3.5 h-3.5 animate-spin" />
																Decrypting...
															</>
														) : (
															<>
																<Key className="w-3.5 h-3.5" />
																Decrypt
															</>
														)}
													</button>
												)}
												{isSuccess && item.blobUrl && (
													<>
														<button
															type="button"
															onClick={() =>
																setPreviewItem({
																	fileName:
																		item.fileName,
																	blobUrl:
																		item.blobUrl!,
																})
															}
															className="px-2.5 py-1.5 rounded-lg border border-border bg-card hover:bg-secondary text-foreground text-xs font-medium flex items-center gap-1 cursor-pointer transition"
														>
															<ExternalLink className="w-3 h-3" />
															Preview
														</button>
														<button
															type="button"
															onClick={() =>
																handleDownloadSingle(
																	item,
																)
															}
															className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold text-xs flex items-center gap-1.5 hover:bg-emerald-500 transition cursor-pointer"
														>
															<Download className="w-3.5 h-3.5" />
															Download PDF
														</button>
													</>
												)}
												<button
													type="button"
													onClick={() =>
														handleRemoveItem(
															item.id,
														)
													}
													className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 transition cursor-pointer"
													title="Remove"
												>
													<Trash2 className="w-3.5 h-3.5" />
												</button>
											</div>
										</div>
									);
								})}
							</div>
						)}
					</div>

					{/* Technical Capabilities */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
						{[
							{
								icon: <ShieldCheck className="w-5 h-5" />,
								color: 'emerald',
								title: '100% In-Browser Privacy',
								desc: 'Your documents and passwords never travel over a network. Everything executes inside your local browser memory sandbox.',
							},
							{
								icon: <Cpu className="w-5 h-5" />,
								color: 'blue',
								title: 'Any File Size',
								desc: 'Handles heavy files using background Web Worker execution. Your interface stays smooth during processing.',
							},
							{
								icon: <Key className="w-5 h-5" />,
								color: 'rose',
								title: 'All PDF Ciphers',
								desc: 'Handles AES-256, AES-128, RC4 128-bit, and removes owner printing or editing restrictions.',
							},
							{
								icon: <Sparkles className="w-5 h-5" />,
								color: 'purple',
								title: 'Complete Fidelity',
								desc: 'Preserves all vector fonts, form fields, layout coordinates, hyperlinks, bookmarks, and image resolutions.',
							},
						].map(({ icon, color, title, desc }) => (
							<div
								key={title}
								className="p-5 rounded-2xl bg-card border border-border space-y-2"
							>
								<div
									className={`p-2.5 rounded-xl bg-${color}-500/10 text-${color}-500 border border-${color}-500/20 w-fit`}
								>
									{icon}
								</div>
								<h3 className="font-bold text-sm text-foreground">
									{title}
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									{desc}
								</p>
							</div>
						))}
					</div>

					<ToolFaqSection faqs={PDF_DECRYPTER_FAQS} />
					<RelatedTools
						currentHref="/developer-tools/pdf-decrypter"
						count={4}
					/>
				</div>
			</main>

			{/* Preview Modal */}
			{previewItem && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
					<div className="bg-card border border-border rounded-2xl w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
						<div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
							<div className="flex items-center gap-2 truncate">
								<FileText className="w-4 h-4 text-primary shrink-0" />
								<span className="font-bold text-sm text-foreground truncate">
									{previewItem.fileName}
								</span>
								<span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
									Password-Free
								</span>
							</div>
							<div className="flex items-center gap-2">
								<a
									href={previewItem.blobUrl}
									target="_blank"
									rel="noreferrer"
									className="p-1.5 rounded-lg border border-border hover:bg-secondary text-foreground text-xs flex items-center gap-1 transition"
								>
									<ExternalLink className="w-3.5 h-3.5" />
									Open in tab
								</a>
								<button
									type="button"
									onClick={() => setPreviewItem(null)}
									className="p-1.5 rounded-lg border border-border hover:bg-secondary text-muted-foreground hover:text-foreground transition cursor-pointer"
								>
									<X className="w-4 h-4" />
								</button>
							</div>
						</div>
						<div className="flex-1 bg-muted/10">
							<iframe
								src={previewItem.blobUrl}
								title="Decrypted PDF Preview"
								className="w-full h-full border-none"
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
