# Blog Post Publishing Rules

Whenever a new blog post markdown file is created or updated in `content/blog/`:
1. Always run the MongoDB update and IndexNow submission script:
   ```bash
   npx tsx scripts/blogDb.ts publish-file content/blog/<post-file-name>.md
   ```
2. Verify that:
   - The database upsert completes successfully.
   - IndexNow receives HTTP 200 responses from search engines (`api.indexnow.org`, `bing.com`, `yandex.com`).
