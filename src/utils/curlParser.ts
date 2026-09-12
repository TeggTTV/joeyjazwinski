export interface ParsedCurl {
	raw: string;
	url: string;
	method: string;
	headers: Record<string, string>;
	data: string | null;
	auth: { user?: string; pass?: string; bearer?: string } | null;
	isJson: boolean;
	parsedJson: any | null;
	insecure: boolean;
	followRedirects: boolean;
}

/**
 * Tokenizes a command line string respecting single/double quotes and backslash escapes.
 */
export function tokenizeCommandLine(cmd: string): string[] {
	// Normalize newlines and bash line-continuation backslashes
	const cleanCmd = cmd
		.replace(/\\\r?\n/g, ' ')
		.replace(/\r?\n/g, ' ')
		.trim();

	const tokens: string[] = [];
	let current = '';
	let inSingle = false;
	let inDouble = false;
	let escaped = false;

	for (let i = 0; i < cleanCmd.length; i++) {
		const char = cleanCmd[i];

		if (escaped) {
			current += char;
			escaped = false;
			continue;
		}

		if (char === '\\' && !inSingle) {
			escaped = true;
			continue;
		}

		if (char === "'" && !inDouble) {
			inSingle = !inSingle;
			continue;
		}

		if (char === '"' && !inSingle) {
			inDouble = !inDouble;
			continue;
		}

		if (/\s/.test(char) && !inSingle && !inDouble) {
			if (current.length > 0) {
				tokens.push(current);
				current = '';
			}
			continue;
		}

		current += char;
	}

	if (current.length > 0) {
		tokens.push(current);
	}

	return tokens;
}

/**
 * Parses raw cURL command tokens into a structured representation.
 */
export function parseCurl(rawInput: string): ParsedCurl {
	const tokens = tokenizeCommandLine(rawInput);
	let url = '';
	let method = '';
	const headers: Record<string, string> = {};
	let data: string | null = null;
	let auth: { user?: string; pass?: string; bearer?: string } | null = null;
	let insecure = false;
	let followRedirects = false;

	let i = 0;
	// Skip leading 'curl' if present
	if (tokens.length > 0 && tokens[0].toLowerCase() === 'curl') {
		i = 1;
	}

	while (i < tokens.length) {
		const token = tokens[i];

		if (token === '-X' || token === '--request') {
			i++;
			if (i < tokens.length) method = tokens[i].toUpperCase();
		} else if (token === '-H' || token === '--header') {
			i++;
			if (i < tokens.length) {
				const headerStr = tokens[i];
				const colonIdx = headerStr.indexOf(':');
				if (colonIdx > 0) {
					const key = headerStr.slice(0, colonIdx).trim();
					const val = headerStr.slice(colonIdx + 1).trim();
					headers[key] = val;
				}
			}
		} else if (
			token === '-d' ||
			token === '--data' ||
			token === '--data-raw' ||
			token === '--data-binary' ||
			token === '--data-ascii'
		) {
			i++;
			if (i < tokens.length) {
				data = (data ? data + '&' : '') + tokens[i];
			}
		} else if (token === '--data-urlencode') {
			i++;
			if (i < tokens.length) {
				data = (data ? data + '&' : '') + encodeURIComponent(tokens[i]);
			}
		} else if (token === '-u' || token === '--user') {
			i++;
			if (i < tokens.length) {
				const [u, ...pParts] = tokens[i].split(':');
				auth = { user: u, pass: pParts.join(':') };
			}
		} else if (token === '-k' || token === '--insecure') {
			insecure = true;
		} else if (token === '-L' || token === '--location') {
			followRedirects = true;
		} else if (token === '-A' || token === '--user-agent') {
			i++;
			if (i < tokens.length) {
				headers['User-Agent'] = tokens[i];
			}
		} else if (token === '-b' || token === '--cookie') {
			i++;
			if (i < tokens.length) {
				headers['Cookie'] = tokens[i];
			}
		} else if (token === '--url') {
			i++;
			if (i < tokens.length) url = tokens[i];
		} else if (!token.startsWith('-') && !url) {
			url = token;
		}
		i++;
	}

	// Default method logic
	if (!method) {
		method = data !== null ? 'POST' : 'GET';
	}

	// Check Authorization header for Bearer
	for (const [key, val] of Object.entries(headers)) {
		if (key.toLowerCase() === 'authorization' && val.toLowerCase().startsWith('bearer ')) {
			auth = { ...(auth || {}), bearer: val.slice(7).trim() };
		}
	}

	// Check if JSON body
	let isJson = false;
	let parsedJson: any = null;
	if (data) {
		const trimmed = data.trim();
		if (
			(trimmed.startsWith('{') && trimmed.endsWith('}')) ||
			(trimmed.startsWith('[') && trimmed.endsWith(']'))
		) {
			try {
				parsedJson = JSON.parse(trimmed);
				isJson = true;
			} catch {
				isJson = false;
			}
		}
	}

	return {
		raw: rawInput,
		url: url || 'https://api.example.com',
		method,
		headers,
		data,
		auth,
		isJson,
		parsedJson,
		insecure,
		followRedirects,
	};
}

export type TargetLanguage =
	| 'fetch'
	| 'axios'
	| 'powershell_rest'
	| 'powershell_webrequest'
	| 'python_requests'
	| 'python_httpx'
	| 'go'
	| 'nodejs_https'
	| 'php_curl'
	| 'rust_reqwest'
	| 'csharp_httpclient'
	| 'curl_formatted';

export interface TargetOption {
	id: TargetLanguage;
	label: string;
	category: 'JavaScript' | 'Shell' | 'Python' | 'Backend' | 'Compiled';
	highlighterLang: string;
}

export const TARGET_OPTIONS: TargetOption[] = [
	{ id: 'fetch', label: 'JavaScript (Fetch)', category: 'JavaScript', highlighterLang: 'javascript' },
	{ id: 'axios', label: 'JavaScript (Axios)', category: 'JavaScript', highlighterLang: 'javascript' },
	{ id: 'nodejs_https', label: 'Node.js (native https)', category: 'JavaScript', highlighterLang: 'javascript' },
	{ id: 'powershell_rest', label: 'PowerShell (Invoke-RestMethod)', category: 'Shell', highlighterLang: 'powershell' },
	{ id: 'powershell_webrequest', label: 'PowerShell (Invoke-WebRequest)', category: 'Shell', highlighterLang: 'powershell' },
	{ id: 'curl_formatted', label: 'cURL (Formatted CLI)', category: 'Shell', highlighterLang: 'bash' },
	{ id: 'python_requests', label: 'Python (requests)', category: 'Python', highlighterLang: 'python' },
	{ id: 'python_httpx', label: 'Python (httpx)', category: 'Python', highlighterLang: 'python' },
	{ id: 'go', label: 'Go (net/http)', category: 'Backend', highlighterLang: 'go' },
	{ id: 'php_curl', label: 'PHP (cURL)', category: 'Backend', highlighterLang: 'php' },
	{ id: 'rust_reqwest', label: 'Rust (reqwest)', category: 'Compiled', highlighterLang: 'rust' },
	{ id: 'csharp_httpclient', label: 'C# (HttpClient)', category: 'Compiled', highlighterLang: 'csharp' },
];

/**
 * Generators for each target
 */

function generateFetch(req: ParsedCurl): string {
	const options: string[] = [];
	options.push(`  method: '${req.method}',`);

	const hasHeaders = Object.keys(req.headers).length > 0 || (req.auth && req.auth.user);
	if (hasHeaders) {
		const headerObj: Record<string, string> = { ...req.headers };
		if (req.auth && req.auth.user && !req.headers['Authorization']) {
			headerObj['Authorization'] = `Basic \${btoa('${req.auth.user}:${req.auth.pass || ''}')}`;
		}
		options.push(`  headers: ${JSON.stringify(headerObj, null, 4).replace(/\n/g, '\n  ')},`);
	}

	if (req.data !== null && req.method !== 'GET' && req.method !== 'HEAD') {
		if (req.isJson && req.parsedJson !== null) {
			options.push(`  body: JSON.stringify(${JSON.stringify(req.parsedJson, null, 4).replace(/\n/g, '\n  ')}),`);
		} else {
			options.push(`  body: ${JSON.stringify(req.data)},`);
		}
	}

	return `// Modern Fetch Request
const response = await fetch('${req.url}', {
${options.join('\n')}
});

const data = await response.json();
console.log(data);`;
}

function generateAxios(req: ParsedCurl): string {
	const lines: string[] = [`import axios from 'axios';\n`];
	const hasHeaders = Object.keys(req.headers).length > 0;
	const configProps: string[] = [];

	if (hasHeaders) {
		configProps.push(`  headers: ${JSON.stringify(req.headers, null, 4).replace(/\n/g, '\n  ')}`);
	}

	if (req.auth && req.auth.user) {
		configProps.push(`  auth: {\n    username: '${req.auth.user}',\n    password: '${req.auth.pass || ''}'\n  }`);
	}

	const configStr = configProps.length > 0 ? `, {\n${configProps.join(',\n')}\n}` : '';

	const methodLower = req.method.toLowerCase();
	const hasBody = req.data !== null && req.method !== 'GET' && req.method !== 'HEAD';

	if (['post', 'put', 'patch'].includes(methodLower)) {
		let bodyData = 'null';
		if (hasBody) {
			bodyData = req.isJson && req.parsedJson !== null
				? JSON.stringify(req.parsedJson, null, 2)
				: JSON.stringify(req.data);
		}
		lines.push(`const response = await axios.${methodLower}(\n  '${req.url}',\n  ${bodyData.replace(/\n/g, '\n  ')}${configStr}\n);`);
	} else if (methodLower === 'get' || methodLower === 'delete' || methodLower === 'head') {
		lines.push(`const response = await axios.${methodLower}('${req.url}'${configStr});`);
	} else {
		// Generic request
		lines.push(`const response = await axios({\n  method: '${req.method}',\n  url: '${req.url}',\n${hasBody ? `  data: ${req.isJson ? JSON.stringify(req.parsedJson, null, 2).replace(/\n/g, '\n  ') : JSON.stringify(req.data)},\n` : ''}${hasHeaders ? `  headers: ${JSON.stringify(req.headers, null, 4).replace(/\n/g, '\n  ')}\n` : ''}});`);
	}

	lines.push(`\nconsole.log(response.data);`);
	return lines.join('\n');
}

function generatePowerShellRest(req: ParsedCurl): string {
	const lines: string[] = [];

	// Headers hash table
	const headerKeys = Object.keys(req.headers);
	if (headerKeys.length > 0) {
		lines.push('$headers = @{');
		for (const [k, v] of Object.entries(req.headers)) {
			// Escape PowerShell string interpolation
			const escapedVal = v.replace(/'/g, "''");
			lines.push(`    "${k}" = '${escapedVal}'`);
		}
		lines.push('}');
		lines.push('');
	}

	// Body handling
	let hasBody = false;
	if (req.data !== null && req.method !== 'GET' && req.method !== 'HEAD') {
		hasBody = true;
		if (req.isJson && req.parsedJson !== null) {
			const jsonPretty = JSON.stringify(req.parsedJson, null, 4).replace(/'/g, "''");
			lines.push(`$body = @'\n${jsonPretty}\n'@`);
		} else {
			lines.push(`$body = '${req.data.replace(/'/g, "''")}'`);
		}
		lines.push('');
	}

	// Command
	let cmd = `Invoke-RestMethod -Uri "${req.url}" -Method ${req.method}`;
	if (headerKeys.length > 0) {
		cmd += ' -Headers $headers';
	}
	if (hasBody) {
		cmd += ' -Body $body';
		if (req.isJson || req.headers['Content-Type']?.includes('json')) {
			cmd += ' -ContentType "application/json"';
		}
	}
	if (req.insecure) {
		cmd += ' -SkipCertificateCheck';
	}

	lines.push(`$response = ${cmd}`);
	lines.push('$response | ConvertTo-Json -Depth 5');

	return lines.join('\n');
}

function generatePowerShellWebRequest(req: ParsedCurl): string {
	const lines: string[] = [];

	const headerKeys = Object.keys(req.headers);
	if (headerKeys.length > 0) {
		lines.push('$headers = @{');
		for (const [k, v] of Object.entries(req.headers)) {
			lines.push(`    "${k}" = '${v.replace(/'/g, "''")}'`);
		}
		lines.push('}');
		lines.push('');
	}

	let hasBody = false;
	if (req.data !== null && req.method !== 'GET' && req.method !== 'HEAD') {
		hasBody = true;
		if (req.isJson && req.parsedJson !== null) {
			lines.push(`$body = @'\n${JSON.stringify(req.parsedJson, null, 4).replace(/'/g, "''")}\n'@`);
		} else {
			lines.push(`$body = '${req.data.replace(/'/g, "''")}'`);
		}
		lines.push('');
	}

	let cmd = `Invoke-WebRequest -Uri "${req.url}" -Method ${req.method}`;
	if (headerKeys.length > 0) {
		cmd += ' -Headers $headers';
	}
	if (hasBody) {
		cmd += ' -Body $body';
		if (req.isJson || req.headers['Content-Type']?.includes('json')) {
			cmd += ' -ContentType "application/json"';
		}
	}
	if (req.insecure) {
		cmd += ' -SkipCertificateCheck';
	}

	lines.push(`$response = ${cmd}`);
	lines.push('$response.Content');

	return lines.join('\n');
}

function generatePythonRequests(req: ParsedCurl): string {
	const lines: string[] = ['import requests\n'];

	const hasHeaders = Object.keys(req.headers).length > 0;
	if (hasHeaders) {
		lines.push(`headers = ${JSON.stringify(req.headers, null, 4)}\n`);
	}

	const hasBody = req.data !== null && req.method !== 'GET' && req.method !== 'HEAD';
	if (hasBody) {
		if (req.isJson && req.parsedJson !== null) {
			lines.push(`json_data = ${JSON.stringify(req.parsedJson, null, 4)}\n`);
		} else {
			lines.push(`data = ${JSON.stringify(req.data)}\n`);
		}
	}

	const args: string[] = [`"${req.url}"`];
	if (hasHeaders) args.push('headers=headers');
	if (hasBody) {
		if (req.isJson && req.parsedJson !== null) {
			args.push('json=json_data');
		} else {
			args.push('data=data');
		}
	}
	if (req.auth && req.auth.user) {
		args.push(`auth=("${req.auth.user}", "${req.auth.pass || ''}")`);
	}
	if (req.insecure) {
		args.push('verify=False');
	}

	const method = req.method.toLowerCase();
	lines.push(`response = requests.${method}(${args.join(', ')})`);
	lines.push('print(response.status_code)');
	lines.push('print(response.text)');

	return lines.join('\n');
}

function generatePythonHttpx(req: ParsedCurl): string {
	const lines: string[] = ['import httpx\n'];

	const hasHeaders = Object.keys(req.headers).length > 0;
	if (hasHeaders) {
		lines.push(`headers = ${JSON.stringify(req.headers, null, 4)}\n`);
	}

	const hasBody = req.data !== null && req.method !== 'GET' && req.method !== 'HEAD';
	if (hasBody) {
		if (req.isJson && req.parsedJson !== null) {
			lines.push(`json_data = ${JSON.stringify(req.parsedJson, null, 4)}\n`);
		} else {
			lines.push(`content = ${JSON.stringify(req.data)}\n`);
		}
	}

	const args: string[] = [`"${req.url}"`];
	if (hasHeaders) args.push('headers=headers');
	if (hasBody) {
		if (req.isJson && req.parsedJson !== null) {
			args.push('json=json_data');
		} else {
			args.push('content=content');
		}
	}
	if (req.insecure) {
		args.push('verify=False');
	}

	const method = req.method.toLowerCase();
	lines.push(`with httpx.Client() as client:`);
	lines.push(`    response = client.${method}(${args.join(', ')})`);
	lines.push('    print(response.status_code)');
	lines.push('    print(response.text)');

	return lines.join('\n');
}

function generateNodeHttps(req: ParsedCurl): string {
	let urlObj: URL;
	try {
		urlObj = new URL(req.url);
	} catch {
		urlObj = new URL('https://api.example.com');
	}

	const isHttps = urlObj.protocol === 'https:';
	const mod = isHttps ? 'https' : 'http';

	const options: Record<string, any> = {
		hostname: urlObj.hostname,
		port: urlObj.port ? parseInt(urlObj.port) : isHttps ? 443 : 80,
		path: urlObj.pathname + urlObj.search,
		method: req.method,
		headers: { ...req.headers },
	};

	if (req.auth && req.auth.user) {
		options.auth = `${req.auth.user}:${req.auth.pass || ''}`;
	}

	const hasBody = req.data !== null && req.method !== 'GET' && req.method !== 'HEAD';
	const bodyPayload = req.isJson && req.parsedJson !== null
		? JSON.stringify(req.parsedJson)
		: req.data || '';

	return `const ${mod} = require('${mod}');

const options = ${JSON.stringify(options, null, 2)};

const req = ${mod}.request(options, (res) => {
  let chunks = [];

  res.on('data', (chunk) => {
    chunks.push(chunk);
  });

  res.on('end', () => {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.on('error', (error) => {
  console.error(error);
});
${hasBody ? `\nconst postData = ${JSON.stringify(bodyPayload)};\nreq.write(postData);\n` : ''}
req.end();`;
}

function generateGo(req: ParsedCurl): string {
	const hasBody = req.data !== null && req.method !== 'GET' && req.method !== 'HEAD';
	const bodyCode = hasBody
		? `var data = []byte(${JSON.stringify(req.data)})\n\treq, err := http.NewRequest("${req.method}", "${req.url}", bytes.NewBuffer(data))`
		: `req, err := http.NewRequest("${req.method}", "${req.url}", nil)`;

	const headerLines: string[] = [];
	for (const [k, v] of Object.entries(req.headers)) {
		headerLines.push(`\treq.Header.Set("${k}", "${v}")`);
	}

	return `package main

import (
\t"bytes"
\t"fmt"
\t"io"
\t"net/http"
)

func main() {
\tclient := &http.Client{}
\t${bodyCode}
\tif err != nil {
\t\tpanic(err)
\t}

${headerLines.length > 0 ? headerLines.join('\n') + '\n' : ''}\tres, err := client.Do(req)
\tif err != nil {
\t\tpanic(err)
\t}
\tdefer res.Body.Close()

\tbody, err := io.ReadAll(res.Body)
\tif err != nil {
\t\tpanic(err)
\t}
\tfmt.Println(string(body))
}`;
}

function generatePhpCurl(req: ParsedCurl): string {
	const lines: string[] = ['<?php', '$curl = curl_init();\n'];

	const curlOpts: string[] = [
		`    CURLOPT_URL => '${req.url}',`,
		`    CURLOPT_RETURNTRANSFER => true,`,
		`    CURLOPT_CUSTOMREQUEST => '${req.method}',`,
	];

	if (req.insecure) {
		curlOpts.push(`    CURLOPT_SSL_VERIFYPEER => false,`);
	}

	if (req.followRedirects) {
		curlOpts.push(`    CURLOPT_FOLLOWLOCATION => true,`);
	}

	const hasBody = req.data !== null && req.method !== 'GET' && req.method !== 'HEAD';
	if (hasBody) {
		curlOpts.push(`    CURLOPT_POSTFIELDS => ${JSON.stringify(req.data)},`);
	}

	const headerList: string[] = [];
	for (const [k, v] of Object.entries(req.headers)) {
		headerList.push(`        '${k}: ${v}',`);
	}

	if (headerList.length > 0) {
		curlOpts.push(`    CURLOPT_HTTPHEADER => [\n${headerList.join('\n')}\n    ],`);
	}

	lines.push(`curl_setopt_array($curl, [\n${curlOpts.join('\n')}\n]);\n`);
	lines.push(`$response = curl_exec($curl);`);
	lines.push(`$err = curl_error($curl);\n`);
	lines.push(`curl_close($curl);\n`);
	lines.push(`if ($err) {\n    echo "cURL Error #:" . $err;\n} else {\n    echo $response;\n}`);

	return lines.join('\n');
}

function generateRustReqwest(req: ParsedCurl): string {
	const method = req.method.toLowerCase();
	const hasBody = req.data !== null && req.method !== 'GET' && req.method !== 'HEAD';

	const headerLines: string[] = [];
	for (const [k, v] of Object.entries(req.headers)) {
		headerLines.push(`        .header("${k}", "${v}")`);
	}

	let bodyLine = '';
	if (hasBody) {
		if (req.isJson && req.parsedJson !== null) {
			bodyLine = `\n        .body(r#"${JSON.stringify(req.parsedJson)}"#)`;
		} else {
			bodyLine = `\n        .body("${req.data?.replace(/"/g, '\\"')}")`;
		}
	}

	return `// Cargo.toml: reqwest = { version = "0.12", features = ["json"] }, tokio = { version = "1", features = ["full"] }
use reqwest::Client;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std.error.Error>> {
    let client = Client::new();
    let res = client
        .${method}("${req.url}")${headerLines.length > 0 ? '\n' + headerLines.join('\n') : ''}${bodyLine}
        .send()
        .await?;

    let body = res.text().await?;
    println!("{}", body);

    Ok(())
}`;
}

function generateCSharpHttpClient(req: ParsedCurl): string {
	const lines: string[] = [
		'using System;',
		'using System.Net.Http;',
		'using System.Text;',
		'using System.Threading.Tasks;\n',
		'class Program',
		'{',
		'    static async Task Main()',
		'    {',
		'        using var client = new HttpClient();',
	];

	const hasBody = req.data !== null && req.method !== 'GET' && req.method !== 'HEAD';
	lines.push(`        var request = new HttpRequestMessage(HttpMethod.${req.method.charAt(0) + req.method.slice(1).toLowerCase()}, "${req.url}");`);

	for (const [k, v] of Object.entries(req.headers)) {
		if (k.toLowerCase() === 'content-type') continue; // handled by content
		lines.push(`        request.Headers.TryAddWithoutValidation("${k}", "${v}");`);
	}

	if (hasBody) {
		const contentType = req.headers['Content-Type'] || (req.isJson ? 'application/json' : 'text/plain');
		const escapedData = req.data?.replace(/"/g, '""');
		lines.push(`        request.Content = new StringContent(@"${escapedData}", Encoding.UTF8, "${contentType}");`);
	}

	lines.push('        var response = await client.SendAsync(request);');
	lines.push('        response.EnsureSuccessStatusCode();');
	lines.push('        var result = await response.Content.ReadAsStringAsync();');
	lines.push('        Console.WriteLine(result);');
	lines.push('    }');
	lines.push('}');

	return lines.join('\n');
}

function generateFormattedCurl(req: ParsedCurl): string {
	const parts: string[] = [`curl -X ${req.method} "${req.url}"`];

	for (const [k, v] of Object.entries(req.headers)) {
		parts.push(`  -H "${k}: ${v}"`);
	}

	if (req.auth && req.auth.user) {
		parts.push(`  -u "${req.auth.user}:${req.auth.pass || ''}"`);
	}

	if (req.insecure) {
		parts.push('  --insecure');
	}

	if (req.followRedirects) {
		parts.push('  --location');
	}

	if (req.data !== null && req.method !== 'GET' && req.method !== 'HEAD') {
		if (req.isJson && req.parsedJson !== null) {
			const compact = JSON.stringify(req.parsedJson);
			parts.push(`  -d '${compact}'`);
		} else {
			parts.push(`  -d '${req.data}'`);
		}
	}

	return parts.join(' \\\n');
}

/**
 * Main conversion entrypoint
 */
export function convertCurl(rawCurl: string, target: TargetLanguage): string {
	if (!rawCurl.trim()) {
		return '// Paste a cURL command above to generate code';
	}

	try {
		const parsed = parseCurl(rawCurl);

		switch (target) {
			case 'fetch':
				return generateFetch(parsed);
			case 'axios':
				return generateAxios(parsed);
			case 'powershell_rest':
				return generatePowerShellRest(parsed);
			case 'powershell_webrequest':
				return generatePowerShellWebRequest(parsed);
			case 'python_requests':
				return generatePythonRequests(parsed);
			case 'python_httpx':
				return generatePythonHttpx(parsed);
			case 'nodejs_https':
				return generateNodeHttps(parsed);
			case 'go':
				return generateGo(parsed);
			case 'php_curl':
				return generatePhpCurl(parsed);
			case 'rust_reqwest':
				return generateRustReqwest(parsed);
			case 'csharp_httpclient':
				return generateCSharpHttpClient(parsed);
			case 'curl_formatted':
				return generateFormattedCurl(parsed);
			default:
				return generateFetch(parsed);
		}
	} catch (err: any) {
		return `// Error parsing cURL command: ${err.message || 'Unknown error'}\n// Please check command syntax and quotes.`;
	}
}

export const CURL_TEMPLATES = [
	{
		label: 'POST JSON with Bearer Auth',
		curl: `curl -X POST "https://api.example.com/v1/users" \\
  -H "Authorization: Bearer sec_tok_99182a" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Joey Jazwinski", "role": "engineer", "active": true}'`,
	},
	{
		label: 'GET with Query Parameters',
		curl: `curl -X GET "https://api.example.com/v1/search?query=antigravity&page=1&limit=20" \\
  -H "Accept: application/json" \\
  -H "User-Agent: JoeyJazwinski-Tools/1.0"`,
	},
	{
		label: 'POST Form URL-Encoded',
		curl: `curl -X POST "https://api.example.com/oauth/token" \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -d "grant_type=client_credentials&client_id=my_client&client_secret=top_secret"`,
	},
	{
		label: 'PUT Request with Basic Auth',
		curl: `curl -X PUT "https://api.example.com/v1/items/42" \\
  -u "admin:hunter2" \\
  -H "Content-Type: application/json" \\
  -d '{"status": "published", "priority": 1}'`,
	},
	{
		label: 'DELETE Resource',
		curl: `curl -X DELETE "https://api.example.com/v1/sessions/session_xyz" \\
  -H "Authorization: Bearer sec_tok_99182a"`,
	},
];
