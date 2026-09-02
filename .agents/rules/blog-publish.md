# Master Blog Automation & Topic Cluster Workflow

## Daily Execution Workflow:
1. **Topic Selection & Queue Tracking**:
   - Inspect `tech_education_keyword_clusters.md` for the next unwritten topic idea.
   - Check existing published blog files in `content/blog/` to ensure no duplicate topics or slugs are written.
   - **When all topics in `tech_education_keyword_clusters.md` are exhausted**:
     - Automatically execute the `/keyword-research` skill on high-growth emerging niches (such as Distributed Systems, AI Engineering, Cloud Infrastructure, Developer Productivity, WebAssembly, Security).
     - Generate a new set of categorized keyword clusters and structured blog post ideas, appending/updating `tech_education_keyword_clusters.md`.
     - Pick the next fresh topic from the new list.

2. **Article Generation & MDX Standards**:
   - Run the `/blog-write` workflow following `C:\Users\josep\.gemini\config\skills\blog-write\SKILL.md`.
   - Incorporate the target keywords, unique angle, diagrams (Mermaid/SVG), code snippets, and structured takeaways.
   - **MDX Formatting Safety**: Avoid unescaped raw LaTeX math blocks (`$$...$$` or unescaped `<`/`>`) that break acorn/MDX JSX parsers; use code blocks or clean Markdown formatting.
   - Write the markdown file to `content/blog/<slug>.md`.

3. **MDX Compilation Verification, Database Upsert & IndexNow Ping**:
   - ALWAYS run:
     ```bash
     npx tsx scripts/blogDb.ts publish-file content/blog/<slug>.md
     ```
   - The script automatically verifies that the markdown can be successfully parsed and compiled by `next-mdx-remote` and `remark-gfm` before modifying the database.
   - Verify that the blog post is upserted to MongoDB and that IndexNow returns HTTP 200 from search engines (`api.indexnow.org`, `bing.com`, `yandex.com`).
