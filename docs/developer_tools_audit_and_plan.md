# Developer & Designer Tools Audit

Comprehensive overview of all 34 tools currently live under `/developer-tools`, documenting their current feature set, proposed feature enhancements, and actionable roadmap.

---

## 1. Current Tools & Existing Features

### Security Tools

1. **Password Generator** (`/developer-tools/password-generator`)
    - **Current Features**: Length adjustment, character set toggles (uppercase, lowercase, numbers, symbols), avoid ambiguous characters, live crack-time estimation, entropy score bar, copy to clipboard, bulk password generation.
2. **Hash & HMAC Generator** (`/developer-tools/hash-generator`)
    - **Current Features**: Client-side cryptographic hashing (SHA-1, SHA-256, SHA-512, MD5), HMAC keyed generation with custom secret keys, uppercase/hex toggle, instant copy button.

### Formatting & Data Transformation

3. **Word & Character Counter** (`/developer-tools/word-counter`)
    - **Current Features**: Real-time word, character (with/without spaces), sentence, and paragraph counts; estimated reading and speaking duration; Flesch-Kincaid readability scoring; top keyword occurrences.
4. **JSON Formatter & Validator** (`/developer-tools/json-formatter`)
    - **Current Features**: Syntax validation with error callouts/line markers, indent spacing customization (2 spaces, 4 spaces, tabs), minify/compact mode, copy formatted result, clear input.
5. **SQL to Prisma Schema** (`/developer-tools/sql-to-prisma`)
    - **Current Features**: Parses raw SQL `CREATE TABLE` statements, generates Prisma model definitions with standard type mappings, primary keys, and relations.
6. **JSON to SQL Inserts** (`/developer-tools/json-to-sql-insert`)
    - **Current Features**: Converts arrays of JSON objects into SQL `INSERT INTO [table] (cols) VALUES (...)` queries, supports table name input, batch inserts.
7. **CSV to Markdown Table** (`/developer-tools/csv-to-markdown`)
    - **Current Features**: Parses CSV/TSV data, generates aligned Markdown tables, header row toggling, delimiter configuration.

### Developer Utilities

8. **Base64 & URL Encoder / Decoder** (`/developer-tools/encoder-decoder`)
    - **Current Features**: Text to Base64 encode/decode, URL encode/decode, Hex encode/decode, live output with swap button and copy action.
9. **Text Diff Checker** (`/developer-tools/diff-checker`)
    - **Current Features**: Side-by-side and inline diff views, syntax highlight for additions/deletions, ignore whitespace toggle, character-level diff highlighting.
10. **RegEx Tester** (`/developer-tools/regex-tester`)
    - **Current Features**: Live regular expression execution with pattern and flags (`g`, `i`, `m`, `s`, `u`), visual match highlights, capture group breakdown, match index tracking.
11. **JWT Debugger** (`/developer-tools/jwt-debugger`)
    - **Current Features**: Local client-side decoding of JWT header, payload, and signature; token expiry status badge (`exp`), issued at (`iat`), time-to-live visualizer.
12. **Code Sandbox** (`/developer-tools/code-sandbox`)
    - **Current Features**: Live side-by-side HTML, CSS, and JS editor, sandboxed `<iframe>` live preview, run/reset buttons, template starters.
13. **JSON to Zod & TypeScript** (`/developer-tools/json-to-zod-ts`)
    - **Current Features**: Automatic schema inference from raw JSON, outputs TypeScript `interface`/`type` and Zod `z.object({...})` validation schemas.
14. **Git Scenario / Command Builder** (`/developer-tools/git-command-builder`)
    - **Current Features**: Common Git scenario picker (undo commit, force push safely, squash branches, stash, rebase), branch/remote inputs, outputs ready-to-run CLI commands.
15. **PEM to JWK Converter** (`/developer-tools/pem-jwk-converter`)
    - **Current Features**: Converts RSA/EC public and private keys in PEM format to JSON Web Key (JWK) sets locally in the browser using Web Crypto APIs.
16. **cURL Command Converter** (`/developer-tools/curl-converter`)
    - **Current Features**: Converts CLI `curl` commands into JavaScript `fetch`, `axios`, Python `requests`, Node.js, Go, or PHP code snippets with headers and body parsed.
17. **MongoDB URI Builder** (`/developer-tools/mongodb-uri-builder`)
    - **Current Features**: Visual form to build standard or SRV connection strings (`mongodb://` or `mongodb+srv://`), auth options, replica sets, connection options, copy button.
18. **Client Header & User Agent Inspector** (`/developer-tools/user-agent-inspector`)
    - **Current Features**: Displays parsed User-Agent (browser, OS, device, engine), screen resolution, viewport size, color depth, pixel ratio, request headers.
19. **Cron Pattern Visualizer** (`/developer-tools/cron-visualizer`)
    - **Current Features**: Translates 5-part or 6-part cron expressions into plain English schedules, lists upcoming execution timestamps, quick preset selector.

### Design & Media Tools

20. **QR Code Generator** (`/developer-tools/qrcode-generator`)
    - **Current Features**: URL/text input, size adjustment, foreground and background color pickers, error correction level (L, M, Q, H), SVG and PNG download.
21. **WCAG Contrast Checker** (`/developer-tools/contrast-checker`)
    - **Current Features**: Foreground and background hex pickers, real-time contrast ratio calculation, WCAG 2.1 AA/AAA compliance ratings for normal text, large text, and UI components.
22. **SVG Optimizer & Exporter** (`/developer-tools/svg-optimizer`)
    - **Current Features**: Removes unused XML namespaces, comments, and metadata; live preview rendering; SVG code minification; PNG export option.
23. **Image Compressor** (`/developer-tools/image-compressor`)
    - **Current Features**: Client-side canvas/blob compression, file size reduction preview, quality slider, format conversion (JPEG, WebP, PNG), download compressed asset.
24. **GIF Generator** (`/developer-tools/gif-generator`)
    - **Current Features**: Converts MP4/WebM/OGG videos into animated GIFs in the browser, frame rate and dimension adjustments, start/end time trimming, GIF download.
25. **Tailwind Config Maker** (`/developer-tools/tailwind-config-generator`)
    - **Current Features**: Visual picker for color shades, font families, custom spacing, breakpoints, generates copyable `tailwind.config.js` `theme.extend` snippet.

### SEO Tools

26. **Robots.txt Generator** (`/developer-tools/robots-generator`)
    - **Current Features**: User-agent rule builder (allow/disallow directives), crawl-delay, sitemap URL declaration, copy/download `robots.txt`.
27. **XML Sitemap Generator** (`/developer-tools/sitemap-generator`)
    - **Current Features**: Manual or batch URL input with `changefreq`, `priority`, and `lastmod` settings; XML validation; index file generation; download `.xml`.
28. **Meta Tag Generator** (`/developer-tools/meta-tag-generator`)
    - **Current Features**: Configures title, meta description, OpenGraph (`og:*`), and Twitter card (`twitter:*`) tags; live preview card; generates `<head>` HTML code.
29. **JSON-LD Schema Generator** (`/developer-tools/schema-generator`)
    - **Current Features**: Structured data builder for Article, FAQ, LocalBusiness, Product, and BreadcrumbList schema types; outputs validated JSON-LD script blocks.
30. **URL Slug Generator** (`/developer-tools/url-slug-generator`)
    - **Current Features**: Transforms strings into URL-safe slugs, casing toggles (lowercase, uppercase, kebab-case, snake_case), stopword filtering, special character removal.
31. **Redirect Rules Generator** (`/developer-tools/redirect-rules`)
    - **Current Features**: Formulates 301/302 redirects for Nginx (`rewrite`/`return`), Apache (`RewriteRule`), Next.js (`next.config.js`), and IIS (`web.config`).
32. **HTML Head SEO Analyzer** (`/developer-tools/html-head-analyzer`)
    - **Current Features**: Audits raw HTML markup for crucial tags (title length, meta description length, canonical tags, viewport, robots, OpenGraph presence).
33. **Keyword Density Analyzer** (`/developer-tools/keyword-density`)
    - **Current Features**: Scans text for 1-word, 2-word, and 3-word phrase frequency; keyword density percentages; custom stopword exclusions.
34. **SERP Snippet Preview** (`/developer-tools/serp-preview`)
    - **Current Features**: Desktop and mobile Google search result snippet previews with live character count gauges, pixel width indicators, favicon preview.

---

## 2. Proposed New Features for Existing Tools

### Security & Cryptography

- **Password Generator**:
    - Add _Passphrase Mode_ (EFF Diceware wordlists with word count & separators like hyphens/dots).
    - Add _Export/Share_ options (QR code for instant mobile transfer without logging).
- **Hash & HMAC Generator**:
    - Add file checksum generator (drag-and-drop file to calculate hash client-side without uploading).
    - Add CRC32, SHA-3, and Keccak-256 algorithm support.
- **JWT Debugger**:
    - Add signature verification toggle with public key/secret input.
    - Add claims editor to modify payload and re-sign tokens with a local test secret.

### Formatting & Data Transformation

- **JSON Formatter & Validator**:
    - Add JSON Fixer / Linter (auto-repair trailing commas, unquoted keys, single quotes).
    - Add Tree View / Visual Inspector mode with node collapsing and path-to-key copy.
- **CSV to Markdown Table**:
    - Add column alignment options (left, center, right per column).
    - Add two-way conversion (Markdown table back to CSV/TSV/JSON).
- **SQL to Prisma / JSON to SQL**:
    - Add dialect switcher (PostgreSQL, MySQL, SQLite, MSSQL syntax nuances).
    - Add reverse SQL table generator from Prisma schema.
- **Word Counter**:
    - Add speaking time pacing presets (slow/presentation, average, fast).
    - Add text cleanup buttons (strip HTML tags, normalize whitespace, remove duplicate lines).

### Developer & System Tools

- **cURL Converter**:
    - Add Rust (reqwest), Ruby (net/http), and C# (HttpClient) target languages.
    - Add HAR (HTTP Archive) import to convert browser network traces into code snippets.
- **Git Command Builder**:
    - Add interactive Git branch graph visualizer for selected commands.
    - Add common submodule and worktree workflow templates.
- **Cron Visualizer**:
    - Add interactive schedule builder (click days of week, intervals, and hours to generate cron).
    - Add timezone selector to calculate runtimes in UTC vs user local time.
- **Code Sandbox**:
    - Add CDN package search (automatically insert unpkg/cdnjs `<script>` / `<link>` tags).
    - Add export to standalone HTML file / Codepen link.
    - Modify code editing winodws to be larger for a better coding experience.
    - Add settings to control window size and fullscreen mode.
- **Base64 / URL Encoder**:
    - Add Image/File to Base64 data URI converter with image preview.

### Design & Asset Tools

- **QR Code Generator**:
    - Add logo embedding in center of QR code.
    - Add Wi-Fi network and vCard / Contact info presets with structured payload formatting.
- **WCAG Contrast Checker**:
    - Add color suggestion generator (finds the nearest compliant color with minimal delta-E).
    - Add colorblindness simulation filters (Protanopia, Deuteranopia, Tritanopia).
- **SVG Optimizer**:
    - Add SVGO preset toggles (strip IDs, merge paths, round coordinates).
    - Add React JSX / React Native component export toggle (`<svg>` to `<SvgComponent />`).
- **Image Compressor**:
    - Add batch image upload and bulk ZIP download.
    - Add auto-resize aspect ratio lock presets (e.g. Social 1200x630, 1080x1080, Avatar 256x256).

### SEO & Web Optimization

- **SERP Snippet Preview**:
    - Add Rich Snippet toggles (star ratings, price, date, sitelinks simulation).
    - Add Google Search Console pixel width boundary rulers for title (600px) and description (960px).
- **JSON-LD Schema Generator**:
    - Add validation against official Schema.org specs with real-time error flags.
    - Add Recipe, Event, and HowTo schema templates.
- **Meta Tag Generator**:
    - Add Apple Touch Icon, Favicon, and theme-color tags.
    - Add live preview card for LinkedIn and Discord.
- **Redirect Rules Generator**:
    - Add Cloudflare Bulk Redirects JSON and Caddyfile format exports.
    - Add regex wildcard testing helper with sample paths.

---
