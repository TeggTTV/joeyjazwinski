import JSZip from 'jszip';

export interface SitemapUrl {
	id?: string;
	loc: string;
	lastmod?: string;
	changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' | string;
	priority?: string;
}

export interface SitemapIssue {
	type: 'error' | 'warning' | 'info';
	code: string;
	message: string;
	url?: string;
	line?: number;
}

export interface SitemapValidationResult {
	isValid: boolean;
	isIndex: boolean;
	format: 'urlset' | 'sitemapindex' | 'invalid';
	totalUrls: number;
	totalSitemaps?: number;
	fileSizeBytes: number;
	errors: SitemapIssue[];
	warnings: SitemapIssue[];
	passes: string[];
	entries: SitemapUrl[];
	indexEntries?: { loc: string; lastmod?: string }[];
	stats: {
		uniqueDomains: string[];
		changefreqCounts: Record<string, number>;
		priorityCounts: Record<string, number>;
		hasLastmodCount: number;
		duplicateCount: number;
		httpsCount: number;
		httpCount: number;
	};
}

export interface SplitSitemapOptions {
	maxUrlsPerFile: number;
	indexBaseUrl: string;
	indexFilename?: string;
	childPrefix?: string;
}

export interface SplitResultFile {
	filename: string;
	xml: string;
	urlCount: number;
	sizeBytes: number;
}

export interface SplitResult {
	indexXml: string;
	indexFilename: string;
	childFiles: SplitResultFile[];
	totalUrls: number;
	totalFiles: number;
}

const VALID_CHANGEFREQS = new Set([
	'always',
	'hourly',
	'daily',
	'weekly',
	'monthly',
	'yearly',
	'never',
]);

export function escapeXml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export function generateSitemapXml(urls: SitemapUrl[]): string {
	let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
	xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

	urls.forEach((url) => {
		const loc = url.loc.trim();
		if (loc) {
			xml += `  <url>\n`;
			xml += `    <loc>${escapeXml(loc)}</loc>\n`;
			if (url.lastmod && url.lastmod.trim()) {
				xml += `    <lastmod>${escapeXml(url.lastmod.trim())}</lastmod>\n`;
			}
			if (url.changefreq && url.changefreq.trim()) {
				xml += `    <changefreq>${escapeXml(url.changefreq.trim())}</changefreq>\n`;
			}
			if (url.priority && url.priority.trim()) {
				xml += `    <priority>${escapeXml(url.priority.trim())}</priority>\n`;
			}
			xml += `  </url>\n`;
		}
	});

	xml += `</urlset>`;
	return xml;
}

export function generateSitemapIndexXml(
	sitemaps: { loc: string; lastmod?: string }[],
): string {
	let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
	xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

	sitemaps.forEach((sm) => {
		const loc = sm.loc.trim();
		if (loc) {
			xml += `  <sitemap>\n`;
			xml += `    <loc>${escapeXml(loc)}</loc>\n`;
			if (sm.lastmod && sm.lastmod.trim()) {
				xml += `    <lastmod>${escapeXml(sm.lastmod.trim())}</lastmod>\n`;
			}
			xml += `  </sitemap>\n`;
		}
	});

	xml += `</sitemapindex>`;
	return xml;
}

export function parseBulkUrls(rawText: string): SitemapUrl[] {
	const lines = rawText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
	const results: SitemapUrl[] = [];
	const today = new Date().toISOString().split('T')[0];

	lines.forEach((line) => {
		if (line.startsWith('#') || line.startsWith('//')) return;

		// Support CSV format: url,lastmod,changefreq,priority or whitespace/tab separation
		let parts: string[] = [];
		if (line.includes(',')) {
			parts = line.split(',').map((p) => p.trim());
		} else if (line.includes('\t')) {
			parts = line.split('\t').map((p) => p.trim());
		} else {
			parts = [line];
		}

		const loc = parts[0] || '';
		if (!loc) return;

		const lastmod = parts[1] || today;
		const changefreq = parts[2] || 'weekly';
		const priority = parts[3] || '0.8';

		results.push({
			id: Math.random().toString(36).substring(2, 9),
			loc,
			lastmod,
			changefreq,
			priority,
		});
	});

	return results;
}

export function validateSitemapXml(xmlString: string): SitemapValidationResult {
	const trimmed = xmlString.trim();
	const fileSizeBytes = new Blob([xmlString]).size;
	const errors: SitemapIssue[] = [];
	const warnings: SitemapIssue[] = [];
	const passes: string[] = [];
	const entries: SitemapUrl[] = [];
	const indexEntries: { loc: string; lastmod?: string }[] = [];

	const uniqueDomainsSet = new Set<string>();
	const seenUrls = new Set<string>();
	const changefreqCounts: Record<string, number> = {};
	const priorityCounts: Record<string, number> = {};
	let hasLastmodCount = 0;
	let duplicateCount = 0;
	let httpsCount = 0;
	let httpCount = 0;

	if (!trimmed) {
		errors.push({
			type: 'error',
			code: 'EMPTY_INPUT',
			message: 'Sitemap content is empty.',
		});
		return {
			isValid: false,
			isIndex: false,
			format: 'invalid',
			totalUrls: 0,
			fileSizeBytes: 0,
			errors,
			warnings,
			passes,
			entries: [],
			stats: {
				uniqueDomains: [],
				changefreqCounts: {},
				priorityCounts: {},
				hasLastmodCount: 0,
				duplicateCount: 0,
				httpsCount: 0,
				httpCount: 0,
			},
		};
	}

	// 50 MB limit check (uncompressed)
	const MAX_BYTES = 50 * 1024 * 1024; // 50MB
	if (fileSizeBytes > MAX_BYTES) {
		errors.push({
			type: 'error',
			code: 'FILE_SIZE_LIMIT_EXCEEDED',
			message: `File size (${(fileSizeBytes / (1024 * 1024)).toFixed(2)} MB) exceeds standard protocol limit of 50 MB.`,
		});
	} else {
		passes.push(`File size (${(fileSizeBytes / 1024).toFixed(1)} KB) is within the 50 MB protocol limit.`);
	}

	let doc: Document | null = null;
	let parseErrorMsg = '';

	if (typeof window !== 'undefined' && typeof window.DOMParser !== 'undefined') {
		try {
			const parser = new DOMParser();
			doc = parser.parseFromString(trimmed, 'application/xml');
			const parserError = doc.querySelector('parsererror');
			if (parserError) {
				parseErrorMsg = parserError.textContent || 'XML Parsing syntax error';
				doc = null;
			}
		} catch (e) {
			parseErrorMsg = e instanceof Error ? e.message : 'XML Parsing failed';
			doc = null;
		}
	}

	if (parseErrorMsg) {
		errors.push({
			type: 'error',
			code: 'XML_SYNTAX_ERROR',
			message: `XML syntax error: ${parseErrorMsg.slice(0, 300)}`,
		});
	} else if (doc) {
		passes.push('XML markup is well-formed with valid syntax.');
	}

	let rootTagName = '';
	let isIndex = false;

	if (doc) {
		const root = doc.documentElement;
		rootTagName = root ? root.nodeName.toLowerCase() : '';
		const ns = root ? root.getAttribute('xmlns') : null;

		if (rootTagName === 'urlset') {
			isIndex = false;
			if (ns !== 'http://www.sitemaps.org/schemas/sitemap/0.9') {
				warnings.push({
					type: 'warning',
					code: 'MISSING_NAMESPACE',
					message: 'Root <urlset> is missing standard xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" attribute.',
				});
			} else {
				passes.push('Valid Sitemaps.org namespace specified on root <urlset>.');
			}
		} else if (rootTagName === 'sitemapindex') {
			isIndex = true;
			if (ns !== 'http://www.sitemaps.org/schemas/sitemap/0.9') {
				warnings.push({
					type: 'warning',
					code: 'MISSING_NAMESPACE',
					message: 'Root <sitemapindex> is missing standard xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" attribute.',
				});
			} else {
				passes.push('Valid Sitemaps.org namespace specified on root <sitemapindex>.');
			}
		} else {
			errors.push({
				type: 'error',
				code: 'INVALID_ROOT_TAG',
				message: `Root element <${rootTagName}> is invalid. Expected <urlset> or <sitemapindex>.`,
			});
		}

		if (rootTagName === 'urlset') {
			const urlNodes = doc.getElementsByTagName('url');
			for (let i = 0; i < urlNodes.length; i++) {
				const uNode = urlNodes[i];
				const locNode = uNode.getElementsByTagName('loc')[0];
				const lastmodNode = uNode.getElementsByTagName('lastmod')[0];
				const changefreqNode = uNode.getElementsByTagName('changefreq')[0];
				const priorityNode = uNode.getElementsByTagName('priority')[0];

				const loc = locNode ? locNode.textContent?.trim() || '' : '';
				const lastmod = lastmodNode ? lastmodNode.textContent?.trim() : undefined;
				const changefreq = changefreqNode ? changefreqNode.textContent?.trim() : undefined;
				const priority = priorityNode ? priorityNode.textContent?.trim() : undefined;

				validateUrlEntry(
					{ loc, lastmod, changefreq, priority },
					i + 1,
					errors,
					warnings,
					uniqueDomainsSet,
					seenUrls,
					changefreqCounts,
					priorityCounts,
				);

				if (lastmod) hasLastmodCount++;
				if (loc.startsWith('https://')) httpsCount++;
				if (loc.startsWith('http://')) httpCount++;

				entries.push({
					id: `entry-${i + 1}`,
					loc,
					lastmod,
					changefreq,
					priority,
				});
			}
		} else if (rootTagName === 'sitemapindex') {
			const smNodes = doc.getElementsByTagName('sitemap');
			for (let i = 0; i < smNodes.length; i++) {
				const smNode = smNodes[i];
				const locNode = smNode.getElementsByTagName('loc')[0];
				const lastmodNode = smNode.getElementsByTagName('lastmod')[0];
				const loc = locNode ? locNode.textContent?.trim() || '' : '';
				const lastmod = lastmodNode ? lastmodNode.textContent?.trim() : undefined;

				if (!loc) {
					errors.push({
						type: 'error',
						code: 'MISSING_SITEMAP_LOC',
						message: `<sitemap> entry #${i + 1} is missing a required <loc> tag.`,
					});
				} else {
					validateUrlString(loc, `Sitemap #${i + 1}`, errors, warnings);
					try {
						const parsed = new URL(loc);
						uniqueDomainsSet.add(parsed.hostname);
					} catch {
						// already handled in validateUrlString
					}
				}

				if (lastmod) {
					validateDateString(lastmod, loc || `Sitemap #${i + 1}`, warnings);
					hasLastmodCount++;
				}

				indexEntries.push({ loc, lastmod });
			}
		}
	} else {
		// Fallback regex parser if DOMParser not available or syntax error
		const isIndexCandidate = trimmed.includes('<sitemapindex');
		const isUrlsetCandidate = trimmed.includes('<urlset');
		if (isIndexCandidate) {
			rootTagName = 'sitemapindex';
			isIndex = true;
		} else if (isUrlsetCandidate) {
			rootTagName = 'urlset';
			isIndex = false;
		}

		if (isIndex) {
			const smBlockRegex = /<sitemap[\s\S]*?<\/sitemap>/gi;
			let smMatch;
			let smCount = 0;
			while ((smMatch = smBlockRegex.exec(trimmed)) !== null) {
				smCount++;
				const block = smMatch[0];
				const locMatch = block.match(/<loc>([\s\S]*?)<\/loc>/i);
				const lastmodMatch = block.match(/<lastmod>([\s\S]*?)<\/lastmod>/i);

				const loc = locMatch ? locMatch[1].trim() : '';
				const lastmod = lastmodMatch ? lastmodMatch[1].trim() : undefined;

				if (!loc) {
					errors.push({
						type: 'error',
						code: 'MISSING_SITEMAP_LOC',
						message: `<sitemap> entry #${smCount} is missing a required <loc> tag.`,
					});
				} else {
					validateUrlString(loc, `Sitemap #${smCount}`, errors, warnings);
					try {
						const parsed = new URL(loc);
						uniqueDomainsSet.add(parsed.hostname);
					} catch {
						// handled
					}
				}

				if (lastmod) {
					validateDateString(lastmod, loc || `Sitemap #${smCount}`, warnings);
					hasLastmodCount++;
				}

				indexEntries.push({ loc, lastmod });
			}
		} else {
			// Regex extraction for urls
			const urlBlockRegex = /<url[\s\S]*?<\/url>/gi;
			let match;
			let count = 0;
			while ((match = urlBlockRegex.exec(trimmed)) !== null) {
				count++;
				const block = match[0];
				const locMatch = block.match(/<loc>([\s\S]*?)<\/loc>/i);
				const lastmodMatch = block.match(/<lastmod>([\s\S]*?)<\/lastmod>/i);
				const changefreqMatch = block.match(/<changefreq>([\s\S]*?)<\/changefreq>/i);
				const priorityMatch = block.match(/<priority>([\s\S]*?)<\/priority>/i);

				const loc = locMatch ? locMatch[1].trim() : '';
				const lastmod = lastmodMatch ? lastmodMatch[1].trim() : undefined;
				const changefreq = changefreqMatch ? changefreqMatch[1].trim() : undefined;
				const priority = priorityMatch ? priorityMatch[1].trim() : undefined;

				validateUrlEntry(
					{ loc, lastmod, changefreq, priority },
					count,
					errors,
					warnings,
					uniqueDomainsSet,
					seenUrls,
					changefreqCounts,
					priorityCounts,
				);

				if (lastmod) hasLastmodCount++;
				if (loc.startsWith('https://')) httpsCount++;
				if (loc.startsWith('http://')) httpCount++;

				entries.push({
					id: `entry-${count}`,
					loc,
					lastmod,
					changefreq,
					priority,
				});
			}
		}
	}

	const totalUrls = isIndex ? indexEntries.length : entries.length;
	duplicateCount = seenUrls.size > 0 ? entries.length - seenUrls.size : 0;

	// 50,000 URLs protocol limit check
	const MAX_URLS = 50000;
	if (totalUrls > MAX_URLS) {
		errors.push({
			type: 'error',
			code: 'URL_COUNT_EXCEEDED',
			message: `Sitemap contains ${totalUrls.toLocaleString()} URLs, which exceeds the maximum protocol limit of 50,000 URLs per sitemap file. Must be split into a sitemap index.`,
		});
	} else if (totalUrls > 0) {
		passes.push(`URL count (${totalUrls.toLocaleString()}) conforms to the 50,000 maximum URL limit.`);
	}

	if (totalUrls === 0 && !parseErrorMsg) {
		warnings.push({
			type: 'warning',
			code: 'NO_ENTRIES_FOUND',
			message: 'No <url> or <sitemap> entries detected in sitemap.',
		});
	}

	if (duplicateCount > 0) {
		warnings.push({
			type: 'warning',
			code: 'DUPLICATE_URLS_DETECTED',
			message: `Found ${duplicateCount} duplicate URL entries. Search engines disregard duplicate sitemap entries.`,
		});
	} else if (totalUrls > 1) {
		passes.push('All canonical URLs are distinct and unique.');
	}

	if (httpCount > 0 && httpsCount > 0) {
		warnings.push({
			type: 'warning',
			code: 'MIXED_PROTOCOLS',
			message: `Mixed protocols detected: ${httpsCount} HTTPS URLs vs ${httpCount} HTTP URLs. Sitemaps should consistently point to canonical HTTPS URLs.`,
		});
	}

	if (uniqueDomainsSet.size > 1 && !isIndex) {
		warnings.push({
			type: 'warning',
			code: 'MULTIPLE_HOSTNAMES',
			message: `Found URLs spanning ${uniqueDomainsSet.size} different hostnames. Sitemaps typically must only contain URLs matching the verified domain in Search Console.`,
		});
	}

	const isValid = errors.length === 0;

	return {
		isValid,
		isIndex,
		format: rootTagName === 'sitemapindex' ? 'sitemapindex' : rootTagName === 'urlset' ? 'urlset' : 'invalid',
		totalUrls,
		totalSitemaps: isIndex ? indexEntries.length : undefined,
		fileSizeBytes,
		errors,
		warnings,
		passes,
		entries,
		indexEntries,
		stats: {
			uniqueDomains: Array.from(uniqueDomainsSet),
			changefreqCounts,
			priorityCounts,
			hasLastmodCount,
			duplicateCount,
			httpsCount,
			httpCount,
		},
	};
}

function validateUrlEntry(
	entry: SitemapUrl,
	index: number,
	errors: SitemapIssue[],
	warnings: SitemapIssue[],
	uniqueDomainsSet: Set<string>,
	seenUrls: Set<string>,
	changefreqCounts: Record<string, number>,
	priorityCounts: Record<string, number>,
) {
	if (!entry.loc) {
		errors.push({
			type: 'error',
			code: 'MISSING_LOC',
			message: `URL #${index} is missing a required <loc> tag.`,
		});
		return;
	}

	const loc = entry.loc;

	// Check duplicates
	if (seenUrls.has(loc)) {
		warnings.push({
			type: 'warning',
			code: 'DUPLICATE_URL',
			message: `Duplicate URL detected: "${loc}"`,
			url: loc,
		});
	} else {
		seenUrls.add(loc);
	}

	validateUrlString(loc, `URL #${index}`, errors, warnings);

	try {
		const parsed = new URL(loc);
		uniqueDomainsSet.add(parsed.hostname);
	} catch {
		// already handled
	}

	// Priority validation
	if (entry.priority !== undefined && entry.priority !== '') {
		const num = parseFloat(entry.priority);
		if (isNaN(num) || num < 0.0 || num > 1.0) {
			warnings.push({
				type: 'warning',
				code: 'INVALID_PRIORITY',
				message: `URL #${index} has invalid priority "${entry.priority}". Priority must be a decimal between 0.0 and 1.0.`,
				url: loc,
			});
		} else {
			const formatted = num.toFixed(1);
			priorityCounts[formatted] = (priorityCounts[formatted] || 0) + 1;
		}
	}

	// Changefreq validation
	if (entry.changefreq !== undefined && entry.changefreq !== '') {
		const freqLower = entry.changefreq.toLowerCase();
		if (!VALID_CHANGEFREQS.has(freqLower)) {
			warnings.push({
				type: 'warning',
				code: 'INVALID_CHANGEFREQ',
				message: `URL #${index} has invalid changefreq "${entry.changefreq}". Expected: always, hourly, daily, weekly, monthly, yearly, never.`,
				url: loc,
			});
		} else {
			changefreqCounts[freqLower] = (changefreqCounts[freqLower] || 0) + 1;
		}
	}

	// Lastmod validation
	if (entry.lastmod !== undefined && entry.lastmod !== '') {
		validateDateString(entry.lastmod, loc || `URL #${index}`, warnings);
	}
}

function validateUrlString(
	urlStr: string,
	label: string,
	errors: SitemapIssue[],
	warnings: SitemapIssue[],
) {
	if (!urlStr.startsWith('http://') && !urlStr.startsWith('https://')) {
		errors.push({
			type: 'error',
			code: 'RELATIVE_OR_INVALID_PROTOCOL',
			message: `${label} "${urlStr}" is not an absolute URL with http:// or https:// protocol.`,
			url: urlStr,
		});
		return;
	}

	try {
		new URL(urlStr);
	} catch {
		errors.push({
			type: 'error',
			code: 'MALFORMED_URL',
			message: `${label} "${urlStr}" is malformed or contains invalid URL characters.`,
			url: urlStr,
		});
		return;
	}

	if (urlStr.includes(' ') || urlStr.includes('\n') || urlStr.includes('\t')) {
		errors.push({
			type: 'error',
			code: 'URL_CONTAINS_WHITESPACE',
			message: `${label} contains unencoded whitespace characters.`,
			url: urlStr,
		});
	}

	if (urlStr.includes('&') && !urlStr.includes('&amp;') && !urlStr.includes('?')) {
		warnings.push({
			type: 'warning',
			code: 'UNESCAPED_AMPERSAND',
			message: `${label} contains unescaped ampersand "&". Sitemaps require XML entity escaping (&amp;).`,
			url: urlStr,
		});
	}
}

function validateDateString(
	dateStr: string,
	urlOrLabel: string,
	warnings: SitemapIssue[],
) {
	// W3C Datetime: YYYY-MM-DD or YYYY-MM-DDThh:mm:ssTZD
	const isoDateRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|([+-]\d{2}:\d{2}))?)?$/;
	if (!isoDateRegex.test(dateStr)) {
		warnings.push({
			type: 'warning',
			code: 'INVALID_LASTMOD_FORMAT',
			message: `Invalid lastmod date "${dateStr}" for ${urlOrLabel}. Expected W3C format (e.g. YYYY-MM-DD or YYYY-MM-DDThh:mm:ssZ).`,
		});
		return;
	}

	const dateObj = new Date(dateStr);
	if (isNaN(dateObj.getTime())) {
		warnings.push({
			type: 'warning',
			code: 'UNPARSEABLE_DATE',
			message: `Unable to parse lastmod date "${dateStr}" for ${urlOrLabel}.`,
		});
	}
}

export function splitSitemapIntoChunks(
	xmlOrUrls: string | SitemapUrl[],
	options: SplitSitemapOptions,
): SplitResult {
	const maxUrls = Math.max(1, options.maxUrlsPerFile || 50000);
	const rawBaseUrl = (options.indexBaseUrl || 'https://example.com/sitemaps/').trim();
	const indexBaseUrl = rawBaseUrl.endsWith('/') ? rawBaseUrl : `${rawBaseUrl}/`;
	const childPrefix = (options.childPrefix || 'sitemap').trim();
	const indexFilename = (options.indexFilename || 'sitemap.xml').trim();

	let urls: SitemapUrl[] = [];

	if (typeof xmlOrUrls === 'string') {
		const parsed = validateSitemapXml(xmlOrUrls);
		if (parsed.entries.length > 0) {
			urls = parsed.entries;
		} else {
			urls = parseBulkUrls(xmlOrUrls);
		}
	} else {
		urls = xmlOrUrls;
	}

	const totalUrls = urls.length;
	const childFiles: SplitResultFile[] = [];
	const sitemapIndexEntries: { loc: string; lastmod?: string }[] = [];
	const today = new Date().toISOString().split('T')[0];

	if (totalUrls === 0) {
		const emptyChildXml = generateSitemapXml([]);
		childFiles.push({
			filename: `${childPrefix}-1.xml`,
			xml: emptyChildXml,
			urlCount: 0,
			sizeBytes: new Blob([emptyChildXml]).size,
		});
		sitemapIndexEntries.push({
			loc: `${indexBaseUrl}${childPrefix}-1.xml`,
			lastmod: today,
		});
	} else {
		for (let i = 0; i < totalUrls; i += maxUrls) {
			const chunk = urls.slice(i, i + maxUrls);
			const fileIndex = Math.floor(i / maxUrls) + 1;
			const filename = `${childPrefix}-${fileIndex}.xml`;
			const childXml = generateSitemapXml(chunk);

			// Compute latest lastmod in chunk
			let latestLastmod = today;
			chunk.forEach((c) => {
				if (c.lastmod && c.lastmod > latestLastmod) {
					latestLastmod = c.lastmod;
				}
			});

			childFiles.push({
				filename,
				xml: childXml,
				urlCount: chunk.length,
				sizeBytes: new Blob([childXml]).size,
			});

			sitemapIndexEntries.push({
				loc: `${indexBaseUrl}${filename}`,
				lastmod: latestLastmod,
			});
		}
	}

	const indexXml = generateSitemapIndexXml(sitemapIndexEntries);

	return {
		indexXml,
		indexFilename,
		childFiles,
		totalUrls,
		totalFiles: childFiles.length,
	};
}

export async function createSitemapsZipBlob(splitResult: SplitResult): Promise<Blob> {
	const zip = new JSZip();
	zip.file(splitResult.indexFilename, splitResult.indexXml);

	splitResult.childFiles.forEach((file) => {
		zip.file(file.filename, file.xml);
	});

	return await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
}
