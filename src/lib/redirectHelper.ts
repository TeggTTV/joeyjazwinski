export type RedirectPlatform =
	| 'nginx'
	| 'apache'
	| 'nextjs'
	| 'cloudflare'
	| 'caddy'
	| 'netlify'
	| 'iis';

export interface RedirectConfig {
	type: '301' | '302';
	platform: RedirectPlatform;
	source: string;
	destination: string;
	preserveQuery: boolean;
}

/**
 * Generates server redirect rule text based on platform.
 */
export function generateRedirectRule(cfg: RedirectConfig): string {
	const src = cfg.source.trim() || '/old-path';
	const dest = cfg.destination.trim() || 'https://example.com/new-path';
	const isPermanent = cfg.type === '301';
	const statusCode = isPermanent ? 301 : 302;

	switch (cfg.platform) {
		case 'nginx':
			if (src.includes('*') || src.includes('(')) {
				return `# Nginx ${cfg.type} Regex Rewrite\nrewrite ^${src}$ ${dest} ${isPermanent ? 'permanent' : 'redirect'};`;
			}
			return `# Nginx ${cfg.type} Exact Return\nlocation = ${src} {\n    return ${statusCode} ${dest};\n}`;

		case 'apache':
			if (src.includes('(') || src.includes('*')) {
				return `# Apache .htaccess ${cfg.type} Rewrite\nRewriteEngine On\nRewriteRule ^${src.replace(/^\//, '')}$ ${dest} [R=${statusCode},L]`;
			}
			return `# Apache .htaccess ${cfg.type} Redirect\nRedirect ${statusCode} ${src} ${dest}`;

		case 'nextjs':
			return `// next.config.js redirects block
module.exports = {
  async redirects() {
    return [
      {
        source: '${src}',
        destination: '${dest}',
        permanent: ${isPermanent},
      },
    ];
  },
};`;

		case 'cloudflare':
			return `// Cloudflare Bulk Redirects JSON
[
  {
    "source_url": "${src}",
    "target_url": "${dest}",
    "status_code": ${statusCode},
    "preserve_query_string": ${cfg.preserveQuery},
    "include_subdomains": false,
    "subpath_matching": true
  }
]`;

		case 'caddy':
			if (src.includes('(') || src.includes('*')) {
				return `# Caddyfile Regex Redirect
@oldPath path_regexp old ${src}
redir @oldPath ${dest} ${statusCode}`;
			}
			return `# Caddyfile Direct Redirect\nredir ${src} ${dest} ${statusCode}`;

		case 'netlify':
			return `# Netlify _redirects file
${src}  ${dest}  ${statusCode}!`;

		case 'iis':
			const cleanMatch = src.replace(/^\//, '').replace(/\//g, '\\/');
			return `<!-- IIS web.config Redirect Rule -->
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="CustomRedirect" stopProcessing="true">
          <match url="^${cleanMatch}$" />
          <action type="Redirect" url="${dest}" redirectType="${isPermanent ? 'Permanent' : 'Found'}" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>`;

		default:
			return '';
	}
}

/**
 * Tests regex matching on a test path and resolves wildcard captures.
 */
export function testRegexMatch(
	sourcePattern: string,
	destinationPattern: string,
	testPath: string,
): { matches: boolean; resolvedUrl: string; error?: string } {
	if (!sourcePattern || !testPath) {
		return { matches: false, resolvedUrl: destinationPattern };
	}

	try {
		// Convert wildcards like /blog/:slug into regex
		let regexStr = sourcePattern;
		if (!sourcePattern.startsWith('^') && !sourcePattern.includes('(')) {
			// Simple wildcard replacement /path/* -> /path/(.*)
			regexStr = sourcePattern.replace(/\*/g, '(.*)').replace(/:([a-zA-Z0-9_]+)/g, '(?<$1>[^/]+)');
		}

		const regex = new RegExp(regexStr.startsWith('^') ? regexStr : `^${regexStr}$`);
		const match = testPath.match(regex);

		if (!match) {
			return { matches: false, resolvedUrl: destinationPattern };
		}

		let resolved = destinationPattern;

		// Replace indexed captures $1, $2, ...
		for (let i = 1; i < match.length; i++) {
			resolved = resolved.replace(new RegExp(`\\$${i}`, 'g'), match[i] || '');
		}

		// Replace named groups
		if (match.groups) {
			for (const [key, val] of Object.entries(match.groups)) {
				resolved = resolved.replace(new RegExp(`:${key}`, 'g'), val || '');
				resolved = resolved.replace(new RegExp(`\\$${key}`, 'g'), val || '');
			}
		}

		return { matches: true, resolvedUrl: resolved };
	} catch (err: any) {
		return { matches: false, resolvedUrl: destinationPattern, error: err.message };
	}
}
