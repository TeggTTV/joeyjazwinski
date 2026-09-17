import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import ToolFaqSection from '@/components/tools/ToolFaqSection';
import {
	Terminal,
	Copy,
	Check,
	ArrowRight,
	Table,
	ArrowLeftRight,
	Sparkles,
	AlignLeft,
	AlignCenter,
	AlignRight,
	Eye,
	Code2,
} from 'lucide-react';
import {
	parseDelimitedText,
	matrixToMarkdown,
	markdownToMatrix,
	matrixToCsv,
	matrixToJson,
	Alignment,
} from '@/lib/csvHelper';

const CSV_FAQS = [
	{
		question: 'How do I convert CSV to a Markdown table?',
		answer:
			'Paste your comma-separated or tab-separated text into the input box. The converter formats headers, aligns data columns, and generates standard GitHub Flavored Markdown table syntax.',
	},
	{
		question: 'Does it support quotes and multiline CSV values?',
		answer:
			'Yes. The parser follows standard RFC 4180 rules, correctly preserving escaped quotes, commas inside quoted strings, and multiline table rows.',
	},
	{
		question: 'Can I convert Markdown tables back into CSV or JSON?',
		answer:
			'Yes. Switch the direction mode to Markdown → CSV/TSV/JSON to parse Markdown tables into spreadsheet or structured JSON array formats.',
	},
];

const SAMPLE_CSV = `Product,Category,Price,Rating,In Stock
"MacBook Pro 16""",Hardware,$2499.00,4.9,Yes
"Keychron Q1 Pro, Wireless",Peripherals,$199.99,4.7,Yes
"LG UltraFine 4K, 32""",Displays,$799.50,4.6,No
"Sony WH-1000XM5",Audio,$398.00,4.8,Yes`;

export default function CsvToMarkdown() {
	const [direction, setDirection] = useState<'csv-to-md' | 'md-to-csv'>(
		'csv-to-md',
	);
	const [inputContent, setInputContent] = useState(SAMPLE_CSV);
	const [delimiter, setDelimiter] = useState<string>('auto');
	const [detectedDelim, setDetectedDelim] = useState(',');
	const [alignments, setAlignments] = useState<Alignment[]>([]);
	const [prettyPadding, setPrettyPadding] = useState(true);
	const [viewMode, setViewMode] = useState<'markdown' | 'preview'>(
		'markdown',
	);
	const [exportFormat, setExportFormat] = useState<'csv' | 'tsv' | 'json'>(
		'csv',
	);

	const [outputMarkdown, setOutputMarkdown] = useState('');
	const [outputReversed, setOutputReversed] = useState('');
	const [parsedMatrix, setParsedMatrix] = useState<string[][]>([]);
	const [copied, setCopied] = useState(false);

	// Process CSV -> Matrix -> Markdown
	useEffect(() => {
		if (direction === 'csv-to-md') {
			const { data, detectedDelimiter } = parseDelimitedText(
				inputContent,
				delimiter === 'auto' ? undefined : delimiter,
			);
			setDetectedDelim(detectedDelimiter);
			setParsedMatrix(data);

			if (data.length > 0) {
				const colCount = Math.max(...data.map((r) => r.length));
				// Ensure alignments array matches column count
				setAlignments((prev) => {
					if (prev.length === colCount) return prev;
					const next = [...prev];
					while (next.length < colCount) next.push('left');
					return next.slice(0, colCount);
				});

				const md = matrixToMarkdown(data, alignments, prettyPadding);
				setOutputMarkdown(md);
			} else {
				setOutputMarkdown('');
			}
		} else {
			// Markdown -> Matrix -> CSV / TSV / JSON
			const matrix = markdownToMatrix(inputContent);
			setParsedMatrix(matrix);
			if (matrix.length > 0) {
				if (exportFormat === 'csv') {
					setOutputReversed(matrixToCsv(matrix, ','));
				} else if (exportFormat === 'tsv') {
					setOutputReversed(matrixToCsv(matrix, '\t'));
				} else {
					setOutputReversed(matrixToJson(matrix));
				}
			} else {
				setOutputReversed('');
			}
		}
	}, [
		inputContent,
		direction,
		delimiter,
		alignments,
		prettyPadding,
		exportFormat,
	]);

	const updateColumnAlignment = (colIndex: number, align: Alignment) => {
		setAlignments((prev) => {
			const copy = [...prev];
			copy[colIndex] = align;
			return copy;
		});
	};

	const setAllAlignments = (align: Alignment) => {
		if (parsedMatrix.length === 0) return;
		const colCount = Math.max(...parsedMatrix.map((r) => r.length));
		setAlignments(Array(colCount).fill(align));
	};

	const handleCopy = () => {
		const target =
			direction === 'csv-to-md' ? outputMarkdown : outputReversed;
		if (!target) return;
		navigator.clipboard.writeText(target);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const swapDirection = () => {
		if (direction === 'csv-to-md') {
			if (outputMarkdown) {
				setInputContent(outputMarkdown);
			}
			setDirection('md-to-csv');
		} else {
			if (outputReversed) {
				setInputContent(outputReversed);
			}
			setDirection('csv-to-md');
		}
	};

	return (
		<>
			<NextSeo
				title="CSV to Markdown Table Converter | TSV & JSON - Joey Jazwinski"
				description="Convert CSV, TSV, and delimited spreadsheets into clean GitHub-flavored Markdown tables with column alignment controls."
				canonical="https://joeyjazwinski.com/developer-tools/csv-to-markdown"
				openGraph={{
					title: 'CSV to Markdown Table Converter | TSV & JSON - Joey Jazwinski',
					description:
						'Convert CSV, TSV, and delimited spreadsheets into clean GitHub-flavored Markdown tables with column alignment controls.',
					url: 'https://joeyjazwinski.com/developer-tools/csv-to-markdown',
					type: 'website',
					images: [
						{
							url: 'https://joeyjazwinski.com/ogimage.png',
							width: 1200,
							height: 630,
							alt: 'CSV to Markdown Table Converter',
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
				name="CSV to Markdown Table Converter"
				description="Convert CSV, TSV, and delimited spreadsheets into clean GitHub-flavored Markdown tables with column alignment controls."
				url="https://joeyjazwinski.com/developer-tools/csv-to-markdown"
				category="DeveloperApplication"
				faqs={CSV_FAQS}
			/>
			<main className="bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-6xl mx-auto space-y-10">
					<div className="mb-2">
						<Link
							href="/developer-tools"
							className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-primary transition"
						>
							← Back to all developer tools
						</Link>
					</div>

					{/* Header */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Terminal className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-amber-500 bg-clip-text text-transparent">
							CSV to Markdown Table Converter
						</h1>
						<p className="text-muted-foreground text-lg">
							Convert spreadsheet layouts into GitHub-flavored Markdown tables with per-column alignment, RFC 4180 quote parsing, and two-way conversion.
						</p>
					</div>

					{/* Workspace Container */}
					<div className="bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
						{/* Top Controls */}
						<div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border/50">
							<div className="flex items-center gap-2">
								<div className="inline-flex p-0.5 rounded-xl bg-secondary border border-border">
									<button
										onClick={() =>
											setDirection('csv-to-md')
										}
										className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
											direction === 'csv-to-md'
												? 'bg-background text-foreground shadow-xs'
												: 'text-muted-foreground hover:text-foreground'
										}`}
									>
										CSV / TSV → Markdown
									</button>
									<button
										onClick={() =>
											setDirection('md-to-csv')
										}
										className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
											direction === 'md-to-csv'
												? 'bg-background text-foreground shadow-xs'
												: 'text-muted-foreground hover:text-foreground'
										}`}
									>
										Markdown → CSV / JSON
									</button>
								</div>

								<button
									onClick={swapDirection}
									className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 border border-border text-muted-foreground hover:text-foreground transition cursor-pointer"
									title="Swap Direction"
								>
									<ArrowLeftRight className="w-3.5 h-3.5" />
								</button>
							</div>

							{direction === 'csv-to-md' ? (
								<div className="flex flex-wrap items-center gap-3 text-xs">
									{/* Delimiter */}
									<div className="flex items-center gap-1.5 text-muted-foreground">
										<label htmlFor="delim-select">
											Delimiter:
										</label>
										<select
											id="delim-select"
											value={delimiter}
											onChange={(e) =>
												setDelimiter(e.target.value)
											}
											className="bg-background border border-border rounded px-2 py-1 text-xs focus:ring-1 focus:ring-primary cursor-pointer"
										>
											<option value="auto">
												Auto-detect (
												{detectedDelim === '\t'
													? 'Tab'
													: detectedDelim}
												)
											</option>
											<option value=",">Comma (,)</option>
											<option value="&#9;">
												Tab (\t)
											</option>
											<option value=";">
												Semicolon (;)
											</option>
											<option value="|">Pipe (|)</option>
										</select>
									</div>

									{/* Pretty Padding */}
									<label className="flex items-center gap-1.5 cursor-pointer text-muted-foreground">
										<input
											type="checkbox"
											checked={prettyPadding}
											onChange={(e) =>
												setPrettyPadding(
													e.target.checked,
												)
											}
											className="rounded text-primary focus:ring-primary"
										/>
										<span>Pad Columns</span>
									</label>
								</div>
							) : (
								<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
									<span>Export Format:</span>
									<select
										value={exportFormat}
										onChange={(e) =>
											setExportFormat(
												e.target.value as
													| 'csv'
													| 'tsv'
													| 'json',
											)
										}
										className="bg-background border border-border rounded px-2 py-1 text-xs focus:ring-1 focus:ring-primary cursor-pointer"
									>
										<option value="csv">
											CSV (Comma-separated)
										</option>
										<option value="tsv">
											TSV (Tab-separated)
										</option>
										<option value="json">JSON Array</option>
									</select>
								</div>
							)}
						</div>

						{/* Column Alignment Bar (when converting to Markdown) */}
						{direction === 'csv-to-md' &&
							parsedMatrix.length > 0 && (
								<div className="space-y-2 p-3.5 bg-secondary/30 rounded-xl border border-border/70 text-xs">
									<div className="flex flex-wrap items-center justify-between gap-2">
										<span className="font-semibold text-muted-foreground flex items-center gap-1">
											<Sparkles className="w-3.5 h-3.5 text-primary" />
											Column Alignments:
										</span>
										<div className="flex items-center gap-1 text-[11px]">
											<span className="text-muted-foreground">
												Set All:
											</span>
											<button
												onClick={() =>
													setAllAlignments('left')
												}
												className="px-2 py-0.5 rounded bg-secondary hover:bg-secondary/80 border border-border cursor-pointer transition"
											>
												Left
											</button>
											<button
												onClick={() =>
													setAllAlignments('center')
												}
												className="px-2 py-0.5 rounded bg-secondary hover:bg-secondary/80 border border-border cursor-pointer transition"
											>
												Center
											</button>
											<button
												onClick={() =>
													setAllAlignments('right')
												}
												className="px-2 py-0.5 rounded bg-secondary hover:bg-secondary/80 border border-border cursor-pointer transition"
											>
												Right
											</button>
										</div>
									</div>

									<div className="flex flex-wrap gap-2 pt-1">
										{parsedMatrix[0]?.map((header, idx) => {
											const currentAlign =
												alignments[idx] || 'left';
											return (
												<div
													key={idx}
													className="flex items-center gap-1 px-2.5 py-1 bg-background rounded-lg border border-border shadow-xs"
												>
													<span className="font-mono font-medium truncate max-w-30">
														{header ||
															`Col ${idx + 1}`}
													</span>
													<div className="flex items-center ml-1 border-l border-border pl-1">
														<button
															onClick={() =>
																updateColumnAlignment(
																	idx,
																	'left',
																)
															}
															className={`p-0.5 rounded transition cursor-pointer ${
																currentAlign ===
																'left'
																	? 'text-primary bg-primary/10'
																	: 'text-muted-foreground hover:text-foreground'
															}`}
															title="Align Left"
														>
															<AlignLeft className="w-3 h-3" />
														</button>
														<button
															onClick={() =>
																updateColumnAlignment(
																	idx,
																	'center',
																)
															}
															className={`p-0.5 rounded transition cursor-pointer ${
																currentAlign ===
																'center'
																	? 'text-primary bg-primary/10'
																	: 'text-muted-foreground hover:text-foreground'
															}`}
															title="Align Center"
														>
															<AlignCenter className="w-3 h-3" />
														</button>
														<button
															onClick={() =>
																updateColumnAlignment(
																	idx,
																	'right',
																)
															}
															className={`p-0.5 rounded transition cursor-pointer ${
																currentAlign ===
																'right'
																	? 'text-primary bg-primary/10'
																	: 'text-muted-foreground hover:text-foreground'
															}`}
															title="Align Right"
														>
															<AlignRight className="w-3 h-3" />
														</button>
													</div>
												</div>
											);
										})}
									</div>
								</div>
							)}

						{/* Main Text Areas */}
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
							{/* Input Column */}
							<div className="space-y-2 flex flex-col justify-between">
								<div className="flex justify-between items-center text-xs font-semibold text-muted-foreground">
									<span>
										{direction === 'csv-to-md'
											? 'Raw CSV / Spreadsheet Data'
											: 'Markdown Table'}
									</span>
									<button
										onClick={() => setInputContent('')}
										className="text-muted-foreground hover:text-foreground underline cursor-pointer"
									>
										Clear
									</button>
								</div>
								<textarea
									rows={14}
									className="w-full p-4 rounded-xl border border-border bg-background text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary resize-none shadow-inner flex-1 min-h-75"
									value={inputContent}
									onChange={(e) =>
										setInputContent(e.target.value)
									}
									placeholder={
										direction === 'csv-to-md'
											? 'Paste CSV or TSV rows here...'
											: '| Header 1 | Header 2 |\n| :--- | :--- |\n| Cell 1 | Cell 2 |'
									}
								/>
							</div>

							{/* Output Column */}
							<div className="space-y-2 flex flex-col justify-between">
								<div className="flex justify-between items-center text-xs font-semibold text-muted-foreground">
									{direction === 'csv-to-md' ? (
										<div className="inline-flex p-0.5 rounded-lg bg-secondary border border-border">
											<button
												onClick={() =>
													setViewMode('markdown')
												}
												className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs transition cursor-pointer ${
													viewMode === 'markdown'
														? 'bg-background text-foreground shadow-xs font-bold'
														: 'text-muted-foreground hover:text-foreground'
												}`}
											>
												<Code2 className="w-3 h-3" />
												Markdown
											</button>
											<button
												onClick={() =>
													setViewMode('preview')
												}
												className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs transition cursor-pointer ${
													viewMode === 'preview'
														? 'bg-background text-foreground shadow-xs font-bold'
														: 'text-muted-foreground hover:text-foreground'
												}`}
											>
												<Eye className="w-3 h-3" />
												Table Preview
											</button>
										</div>
									) : (
										<span>
											Converted{' '}
											{exportFormat.toUpperCase()} Output
										</span>
									)}

									{(direction === 'csv-to-md'
										? outputMarkdown
										: outputReversed) && (
										<button
											onClick={handleCopy}
											className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-secondary hover:bg-secondary/80 border border-border text-muted-foreground hover:text-foreground transition cursor-pointer"
											title="Copy to Clipboard"
										>
											{copied ? (
												<Check className="w-3.5 h-3.5 text-emerald-500" />
											) : (
												<Copy className="w-3.5 h-3.5" />
											)}
											<span>Copy</span>
										</button>
									)}
								</div>

								{/* Output Content */}
								{direction === 'csv-to-md' &&
								viewMode === 'preview' ? (
									<div className="w-full min-h-75 flex-1 overflow-auto rounded-xl border border-border bg-background/50 p-3 shadow-inner">
										{parsedMatrix.length > 0 ? (
											<table className="w-full text-left text-xs border-collapse">
												<thead>
													<tr className="border-b border-border bg-secondary/40 font-semibold">
														{parsedMatrix[0]?.map(
															(head, i) => (
																<th
																	key={i}
																	className={`p-2.5 border-r border-border/50 last:border-r-0 ${
																		alignments[
																			i
																		] ===
																		'center'
																			? 'text-center'
																			: alignments[
																						i
																				  ] ===
																				  'right'
																				? 'text-right'
																				: 'text-left'
																	}`}
																>
																	{head}
																</th>
															),
														)}
													</tr>
												</thead>
												<tbody className="divide-y divide-border/60">
													{parsedMatrix
														.slice(1)
														.map((row, rIdx) => (
															<tr
																key={rIdx}
																className="hover:bg-muted/40 transition-colors"
															>
																{row.map(
																	(
																		cell,
																		cIdx,
																	) => (
																		<td
																			key={
																				cIdx
																			}
																			className={`p-2.5 border-r border-border/40 last:border-r-0 font-mono text-muted-foreground ${
																				alignments[
																					cIdx
																				] ===
																				'center'
																					? 'text-center'
																					: alignments[
																								cIdx
																						  ] ===
																						  'right'
																						? 'text-right'
																						: 'text-left'
																			}`}
																		>
																			{
																				cell
																			}
																		</td>
																	),
																)}
															</tr>
														))}
												</tbody>
											</table>
										) : (
											<div className="h-full flex items-center justify-center text-muted-foreground text-xs">
												Enter CSV data to preview the
												table
											</div>
										)}
									</div>
								) : (
									<textarea
										rows={14}
										readOnly
										className="w-full p-4 rounded-xl border border-border bg-background/50 text-xs font-mono focus:outline-none resize-none shadow-inner flex-1 min-h-75"
										value={
											direction === 'csv-to-md'
												? outputMarkdown ||
													'// Converted Markdown table will appear here'
												: outputReversed ||
													'// Converted spreadsheet output will appear here'
										}
									/>
								)}
							</div>
						</div>
					</div>

					{/* Information Section */}
					<div className="pt-8 border-t border-border/40 space-y-6">
						<div className="text-center space-y-2 max-w-2xl mx-auto">
							<h2 className="text-2xl font-black tracking-tight">
								CSV to Markdown Reference
							</h2>
							<p className="text-sm text-muted-foreground">
								Formatting specifications and alignment
								syntaxes.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground">
									Left Alignment (:---)
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Standard alignment for textual data,
									descriptions, and categories. A single colon
									is placed at the leading edge of the
									separator hyphens.
								</p>
							</div>
							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground">
									Center Alignment (:---:)
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Ideal for status badges, IDs, boolean flags,
									dates, and short codes. Colons flank both
									sides of the hyphen divider.
								</p>
							</div>
							<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-2">
								<h3 className="text-sm font-bold text-foreground">
									Right Alignment (---:)
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Recommended for numerical values, financial
									prices, percentages, and quantities so
									decimal points align vertically.
								</p>
							</div>
						</div>

						{/* Related Tool Link */}
						<div className="p-5 rounded-2xl bg-secondary/30 border border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
							<div className="flex items-center gap-3">
								<div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
									<Table className="w-5 h-5" />
								</div>
								<div>
									<div className="text-sm font-bold text-foreground">
										Converting CSV to SQL Database Tables?
									</div>
									<div className="text-xs text-muted-foreground">
										Generate PostgreSQL, MySQL, and SQLite
										INSERT INTO queries instantly.
									</div>
								</div>
							</div>
							<Link
								href="/developer-tools/json-to-sql-insert"
								className="px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold flex items-center gap-1.5 transition shrink-0"
							>
								<span>SQL Query Generator</span>
								<ArrowRight className="w-3.5 h-3.5" />
							</Link>
						</div>
					</div>

					<ToolFaqSection faqs={CSV_FAQS} />
				</div>
			</main>
		</>
	);
}
