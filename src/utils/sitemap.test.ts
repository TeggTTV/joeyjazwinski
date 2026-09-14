import {
	validateSitemapXml,
	splitSitemapIntoChunks,
	generateSitemapXml,
	generateSitemapIndexXml,
	parseBulkUrls,
} from './sitemap';

function runTests() {
	console.log('--- Running Sitemap Unit Tests ---');

	// Test 1: Generate valid sitemap XML
	const sampleUrls = [
		{ id: '1', loc: 'https://example.com/', lastmod: '2026-09-13', changefreq: 'daily', priority: '1.0' },
		{ id: '2', loc: 'https://example.com/about', lastmod: '2026-09-10', changefreq: 'monthly', priority: '0.8' },
	];
	const generatedXml = generateSitemapXml(sampleUrls);
	console.assert(generatedXml.includes('<loc>https://example.com/</loc>'), 'Test 1: loc tag present');
	console.assert(generatedXml.includes('<changefreq>daily</changefreq>'), 'Test 1: changefreq present');
	console.assert(generatedXml.includes('<priority>1.0</priority>'), 'Test 1: priority present');
	console.log('Test 1 (Generate XML): PASSED');

	// Test 2: Validate generated sitemap
	const validation1 = validateSitemapXml(generatedXml);
	console.assert(validation1.isValid === true, 'Test 2: isValid should be true');
	console.assert(validation1.totalUrls === 2, 'Test 2: totalUrls should be 2');
	console.assert(validation1.errors.length === 0, 'Test 2: errors length should be 0');
	console.log('Test 2 (Validate Standard Sitemap): PASSED');

	// Test 3: Detect invalid URLs & bad changefreq
	const invalidXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>relative/path/page</loc>
    <priority>5.5</priority>
    <changefreq>superfrequent</changefreq>
    <lastmod>invalid-date-format</lastmod>
  </url>
  <url>
    <loc>https://example.com/spaced path</loc>
  </url>
</urlset>`;

	const validation2 = validateSitemapXml(invalidXml);
	console.assert(validation2.isValid === false, 'Test 3: isValid should be false due to relative/spaced URLs');
	console.assert(validation2.errors.length > 0, 'Test 3: should catch errors');
	console.assert(validation2.warnings.length > 0, 'Test 3: should catch warnings');
	console.log('Test 3 (Detect Invalid Syntax / Attributes): PASSED');

	// Test 4: Parse bulk text / CSV URLs
	const bulkText = `https://example.com/
https://example.com/pricing,2026-09-12,weekly,0.9
https://example.com/contact\t2026-09-11\tmonthly\t0.5`;

	const parsedUrls = parseBulkUrls(bulkText);
	console.assert(parsedUrls.length === 3, `Test 4: Expected 3 parsed URLs, got ${parsedUrls.length}`);
	console.assert(parsedUrls[1].loc === 'https://example.com/pricing', 'Test 4: Correct URL 2');
	console.assert(parsedUrls[1].priority === '0.9', 'Test 4: Correct priority 2');
	console.assert(parsedUrls[2].changefreq === 'monthly', 'Test 4: Correct changefreq 3');
	console.log('Test 4 (Bulk URL Parsing): PASSED');

	// Test 5: Split sitemap into chunks
	const manyUrls = Array.from({ length: 25 }, (_, i) => ({
		loc: `https://example.com/item-${i + 1}`,
		lastmod: '2026-09-13',
		changefreq: 'weekly',
		priority: '0.6',
	}));

	const splitRes = splitSitemapIntoChunks(manyUrls, {
		maxUrlsPerFile: 10,
		indexBaseUrl: 'https://example.com/sitemaps/',
		childPrefix: 'chunk',
	});

	console.assert(splitRes.totalFiles === 3, `Test 5: Expected 3 child files, got ${splitRes.totalFiles}`);
	console.assert(splitRes.childFiles[0].urlCount === 10, 'Test 5: Chunk 1 should have 10 URLs');
	console.assert(splitRes.childFiles[1].urlCount === 10, 'Test 5: Chunk 2 should have 10 URLs');
	console.assert(splitRes.childFiles[2].urlCount === 5, 'Test 5: Chunk 3 should have 5 URLs');
	console.assert(splitRes.childFiles[0].filename === 'chunk-1.xml', 'Test 5: Filename check');
	console.assert(splitRes.indexXml.includes('https://example.com/sitemaps/chunk-1.xml'), 'Test 5: Index XML check');
	console.log('Test 5 (Sitemap Splitting & Index Creation): PASSED');

	// Test 6: Validate Sitemap Index file
	const validation3 = validateSitemapXml(splitRes.indexXml);
	console.assert(validation3.isValid === true, 'Test 6: Sitemap index should be valid');
	console.assert(validation3.isIndex === true, 'Test 6: isIndex should be true');
	console.assert(validation3.totalUrls === 3, 'Test 6: total child sitemaps in index should be 3');
	console.log('Test 6 (Validate Sitemap Index): PASSED');

	console.log('\nAll sitemap tests completed successfully! ✨');
}

runTests();
