# Master Blog Automation & Tool-Integrated Commentary Workflow

## Execution Cadence

Runs twice a week on **Tuesday and Thursday at 9:00 AM**.

---

## Step 1: Timely Tech Outage Research & Tool Mapping

Before selecting a topic or drafting content, run a targeted web search on notable tech news, infrastructure outages, security incidents, or developer pain points from the past 7 days (e.g., major cloud outages, DNS/BGP breakdowns, legacy system crashes, data leaks from third-party converter sites, broken developer workflows, or expired certificates).

1. **Research & Incident Mapping**:
    - Query recent developer news or infrastructure incidents across search/news sources.
    - Connect the real-world failure directly to an engineering lesson and a matching browser-based tool on Joey's site:
        - Invalid JSON, YAML, or XML configs bringing down services -> `/developer-tools/json-formatter` or `/developer-tools/xml-formatter`
        - Expired tokens, malformed auth headers, or signing issues -> `/developer-tools/jwt-debugger`
        - Broken cron jobs, cascading queue pileups, or scheduling drift -> `/developer-tools/cron-visualizer`
        - Catastrophic regex denial of service (ReDoS) or broken routing rules -> `/developer-tools/regex-tester`
        - Accidental secret leaks, exposed credentials, or weak keys -> `/developer-tools/password-generator`
        - Unintended regressions in deployment configs or env vars -> `/developer-tools/diff-checker`
        - Sitemap or robots.txt indexing errors dropping search traffic -> `/developer-tools/sitemap-generator` or `/developer-tools/robots-txt-generator`
        - Third-party site privacy breaches when staff upload sensitive documents -> `/developer-tools/pdf-decrypter` or `/developer-tools/svg-optimizer` (highlighting zero server uploads)

2. **Deduplication Check**:
    - Inspect existing markdown files in `content/blog/` to ensure no duplicate slugs or redundant coverage.

3. **Fallback Plan**:
    - If no major tech incident from the past week fits cleanly, pick an unwritten tool from `src/config/tools.ts`.
    - Focus on developer frustration with existing online utilities (bloated ad-heavy sites, paywalls, and privacy risks of transmitting sensitive production data to unknown servers).

---

## Step 2: Opinionated, Practical Blog Generation & Visuals

Write the blog post directly to `content/blog/<slug>.md`. Do not invoke external blog writing skills.

### Structure & Content Rules

1. **Frontmatter**:

    ```yaml
    ---
    title: 'Clear, High-Signal Headline'
    description: '1-2 concise sentences outlining the failure, technical breakdown, and client-side solution.'
    slug: '<slug>'
    tags: ['DevOps', 'Infrastructure', 'Developer Tools', 'Web Security']
    thumbnail: '/images/blogs/<slug>.jpg'
    isAI: true
    createdAt: 'YYYY-MM-DDTHH:mm:ss.000Z'
    updatedAt: 'YYYY-MM-DDTHH:mm:ss.000Z'
    ---
    ```

2. **No Textbook Filler**:
    - Do not write encyclopedia introductions or "What is X?" definitions.
    - Open immediately with the incident, outage post-mortem, or real-world developer frustration.

3. **Above-the-Fold Tool Callout**:
    - Place a clean callout right after the opening hook linking to the relevant tool on `joeyjazwinski.com`:

    ```markdown
    > **Free Client-Side Tool**: Validate and inspect payloads instantly with the [Tool Name](https://joeyjazwinski.com/developer-tools/<tool-slug>). Runs 100% locally in your browser with zero server uploads, data collection, or telemetry.
    ```

4. **The Technical Breakdown (400–700 words)**:
    - Detail what failed technically: root causes, edge cases, silent bugs, or architectural weaknesses.
    - Include a concrete, copy-pasteable code snippet or valid/invalid configuration sample showing the failure and the fix.
    - **Do not use Mermaid diagrams in every post**: Stop defaulting to diagrams. Only include a diagram when complex multi-service consensus or state transitions truly need one. For almost all posts, use clean code snippets, tables, or config comparisons instead.
    - Provide concrete prevention steps and engineering takeaways.

5. **Hero Image Generation Rules (`public/images/blogs/<slug>.jpg`)**:
    - **Visual Metaphor First (Before Prompting)**:
      - Before calling image generation, define ONE concrete, non-cliché physical or UI-inspired visual metaphor representing the specific post or outage (e.g., for an outage: a minimalist unplugged ethernet cable or a tilted server switch; for a regex/diff tool: two clean overlapping paper sheets with highlighted color bars; for a cron/timer issue: a minimalist geometric clock dial).
      - Never use abstract glowing nodes, circuit boards, brains, locks floating in space, or isometric city/server grids.
    - **Mandatory Style & Composition Template**:
      - **Aspect Ratio**: 16:9 (`public/images/blogs/<slug>.jpg`).
      - **Art Direction**: Flat 2D Swiss editorial vector illustration on a clean, bright off-white/alabaster background (`#F8FAFC`), inspired by Stripe Press, Linear, and modern architectural diagrams.
      - **Composition**: Centered single hero object or simple two-element comparison surrounded by generous negative space (at least 40% empty background) and ultra-subtle light gray architectural grid lines. Crisp vector edges, subtle flat drop shadows (no gradients or glow), and zero text, letters, numbers, or UI gibberish.
      - **Color System (Strict 3-Color Limit)**:
        - Background: Clean off-white (`#F8FAFC`) or warm cream (`#FAF9F6`).
        - Primary Anchor: Deep Slate (`#0F172A`) for crisp structural outlines and geometric blocks.
        - Rotating Accent Pair (pick ONE pair per post, rotating sequentially so consecutive posts never share a palette):
          1. Cobalt Blue (`#2563EB`) + Soft Sky (`#DBEAFE`)
          2. Amber Gold (`#D97706`) + Warm Sand (`#FEF3C7`)
          3. Emerald Teal (`#059669`) + Mint Tint (`#D1FAE5`)
          4. Coral Red (`#E11D48`) + Blush Tint (`#FFE4E6`)
          5. Indigo Violet (`#4F46E5`) + Lavender Tint (`#E0E7FF`)
    - **Strict Negative Prompt / Prohibitions**:
      - Explicitly forbid in the prompt: `isometric, 3D render, dark background, black background, neon, glowing lines, circuit board, cyber, futuristic, hologram, gradients, photorealistic, text, words, letters, watermark, complex clutter`.
    - **Verification Step**:
      - After generating `public/images/blogs/<slug>.jpg`, inspect the image using your vision capability before proceeding to `scripts/blogDb.ts`. If the image has a dark background, isometric glowing circuits, or garbled text, regenerate it once with a simpler geometric prompt before publishing.
    - Save the image to `public/images/blogs/<slug>.jpg`.

6. **MDX Formatting Safety**:
    - Do not include unescaped raw math blocks (`$$...$$`) or bare `<`/`>` characters outside code blocks that trip up MDX/acorn parsing.
    - Always quote node text containing parentheses, slashes, or special characters inside Mermaid diagrams (e.g., `id["Label (Context)"]`).

---

## Step 3: MDX Build, DB Upsert, IndexNow Ping & Git Push

Execute the automated build and deployment script:

```bash
npx tsx scripts/blogDb.ts publish-file content/blog/<slug>.md
```

The script performs the following operations:

1. Validates MDX compilation with `next-mdx-remote` and `remark-gfm`.
2. Upserts post metadata and content into MongoDB.
3. Syncs `public/llms.txt` with the complete catalog.
4. Pings IndexNow endpoints (`api.indexnow.org`, `bing.com`, `yandex.com`).
5. Commits and pushes the blog post, generated image, and updated `llms.txt` to `origin/main`.

> **Strict Isolation**: Never edit repository scripts or code files for Publora. Keep all Publora interactions strictly inside agent tool calls.

---

## Step 4: Direct LinkedIn Publishing via Publora MCP

Draft and schedule the LinkedIn announcement directly via Publora MCP tool calls:

### Post Copy Guidelines

1. **Hook**: Punchy opening within the first 210 characters (prior to mobile "...see more"). Start with the incident or outage lesson.
2. **Body**: 900–1,300 characters. Explain the engineering lesson plainly with short paragraphs and double line breaks.
3. **Tool Reference**: Mention the tool on `joeyjazwinski.com`, highlighting that it runs 100% in-browser with zero data uploads.
4. **Hashtags**: End with 1–2 relevant tags (e.g., `#SoftwareEngineering #DevOps`).
5. **Tone**:
    - Vary sentence lengths.
    - Use contractions.
    - Say things plainly without buzzwords or fluff.
    - Cut out em dashes (`—`), binary setups ("It's not X, it's Y"), and generic recaps.

### Publora Tool Execution

Call `publora.create_post` (or `call_mcp_tool` with `ServerName: "publora"`, `ToolName: "create_post"`) with:

- `platforms`: `["linkedin-VfNeL_Lk6J"]`
- `mediaUrls`: `["https://raw.githubusercontent.com/TeggTTV/joeyjazwinski/main/public/images/blogs/<slug>.jpg"]`
- `scheduledTime`: ISO 8601 UTC timestamp scheduled 5 minutes after publication (e.g., `new Date(Date.now() + 5 * 60 * 1000).toISOString()`).
- `content`: The crafted LinkedIn text.
