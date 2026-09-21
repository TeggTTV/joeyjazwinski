# Master Blog Automation & Tool-Integrated Tutorial Workflow

## Daily Execution Workflow:
1. **Topic Selection & Queue Tracking**:
   - Inspect `tech_education_keyword_clusters.md` for the next unwritten topic idea, or select high-impact educational tutorial topics that naturally connect to the 30+ interactive tools on Joey's [Developer Tools Hub](https://joeyjazwinski.com/developer-tools) or featured projects (e.g. XML Sitemaps, Robots.txt, RegEx, JWTs, Cron, Diff Checking, Schema Markup, QR Codes).
   - Check existing published blog files in `content/blog/` to ensure no duplicate topics or slugs are written.
   - **When all topics in `tech_education_keyword_clusters.md` are exhausted**:
     - Automatically execute the `/keyword-research` skill on high-growth emerging niches (such as Distributed Systems, AI Engineering, Cloud Infrastructure, Developer Productivity, WebAssembly, Security).
     - Generate a new set of categorized keyword clusters and structured blog post ideas, appending/updating `tech_education_keyword_clusters.md`.
     - Pick the next fresh topic from the new list.

2. **Article Generation, Image Creation & Educational Tool Integration**:
   - Run the `/blog-write` workflow following `C:\Users\josep\.gemini\config\skills\blog-write\SKILL.md`.
   - **Hero Image Generation**:
     - Generate a clean 16:9 hero image using `generate_image` strictly in a **minimalist clean 2D vector editorial illustration** style (like the text diff and cryptographic hash posts).
     - Style requirements:
       - Flat design graphic style with bold minimalist color-block geometric shapes and clean layout lines.
       - Harmonious curated palette (e.g. sage green, terracotta, soft violet, muted navy, or warm duotone accents) on a warm cream or off-white background.
       - Prohibited: No 3D renders, no cyberpunk neon circuits, no holographic effects, no complex glow, no text, and no photorealism.
     - Save the image to `public/images/blogs/<slug>.jpg`.
     - Add `thumbnail: "/images/blogs/<slug>.jpg"` to the markdown frontmatter.
   - **Educational Tutorial Structure**:
     - Teach the core concept clearly (what it is, how it works under the hood, why it matters).
     - Include practical examples, architecture diagrams (Mermaid), and code snippets.
     - **Interactive Tool Callout**: Integrate a prominent, organic callout card linking directly to the relevant live tool or app on `joeyjazwinski.com` (e.g. `/developer-tools/sitemap-generator`, `/developer-tools/regex-tester`, `/developer-tools/jwt-debugger`, `/developer-tools/cron-visualizer`, `/developer-tools/schema-generator`).
   - **MDX Formatting Safety**: Avoid unescaped raw LaTeX math blocks (`$$...$$` or unescaped `<`/`>`) that break acorn/MDX JSX parsers; quote Mermaid node text containing parentheses or special characters.
   - Write the markdown file to `content/blog/<slug>.md`.

3. **MDX Compilation Verification, Database Upsert, IndexNow Ping & Git Push**:
   - ALWAYS run:
     ```bash
     npx tsx scripts/blogDb.ts publish-file content/blog/<slug>.md
     ```
   - **Strict Publora Isolation Rule**: Do not modify repository scripts (like `scripts/blogDb.ts`) or source files for Publora. All Publora logic stays entirely in agent customizations and agent tool calls.
   - The script automatically:
     - Verifies that the markdown can be successfully parsed and compiled by `next-mdx-remote` and `remark-gfm` before modifying the database.
     - Upserts the post into MongoDB.
     - Synchronizes `public/llms.txt` with the full updated catalog.
     - Pings IndexNow search engine endpoints (`api.indexnow.org`, `bing.com`, `yandex.com`).
     - Stages, commits, and pushes the newly generated image (`public/images/blogs/...`), the blog markdown file, and `public/llms.txt` to GitHub (`origin/main`).

4. **LinkedIn Post via Publora MCP (Applying `/linkedin-marketing` & `/no-ai-slop`)**:
   - Apply the `/linkedin-marketing` strategy rules:
     - Hook within the first 210 characters (before the mobile "...see more" cutoff).
     - Target length 900–1,300 characters.
     - Double line breaks between ideas for mobile scannability.
     - Natural, direct voice with 1-2 relevant hashtags at the end.
   - Run the `/no-ai-slop` scrub filter:
     - No em dashes (`—`), double dashes, or fake colons.
     - Cut AI buzzwords (`delve`, `leverage`, `seamless`, `robust`, `game-changer`, `streamline`, `harness`, `tapestry`, `realm`, etc.).
     - Cut binary setups ("It's not X, it's Y"), rhetorical self-answered questions, and summary recaps ("In conclusion").
   - Post directly to LinkedIn using the Publora MCP tool:
     - `call_mcp_tool(ServerName: "publora", ToolName: "create_post")` with:
       - `platforms: ["linkedin-VfNeL_Lk6J"]`
       - `mediaUrls`: `["https://joeyjazwinski.com/images/blogs/<slug>.jpg"]` (attaches the high-res cover image directly to the LinkedIn feed post)
       - `scheduledTime`: ISO 8601 UTC timestamp set to **5 minutes after blog publication** (e.g. `new Date(Date.now() + 5 * 60 * 1000).toISOString()`).
