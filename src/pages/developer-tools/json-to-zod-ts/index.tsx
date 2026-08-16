import { useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { Braces, Copy, Check } from 'lucide-react';

export default function JsonToZodTs() {
	const [jsonInput, setJsonInput] = useState('{\n  "id": 1,\n  "name": "Leanne Graham",\n  "username": "Bret",\n  "email": "Sincere@april.biz",\n  "address": {\n    "street": "Kulas Light",\n    "suite": "Apt. 556",\n    "city": "Gwenborough",\n    "zipcode": "92998-3874"\n  },\n  "phone": "1-770-736-8031 x56442",\n  "website": "hildegard.org",\n  "active": true,\n  "tags": ["developer", "creator"]\n}');
	const [interfaceName, setInterfaceName] = useState('RootObject');
	const [tsOutput, setTsOutput] = useState('');
	const [zodOutput, setZodOutput] = useState('');
	const [error, setError] = useState('');
	const [copiedTs, setCopiedTs] = useState(false);
	const [copiedZod, setCopiedZod] = useState(false);

	useEffect(() => {
		if (!jsonInput.trim()) {
			setTsOutput('');
			setZodOutput('');
			setError('');
			return;
		}

		try {
			const parsed = JSON.parse(jsonInput);
			setError('');

			const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

			const generateTypes = (obj: any, name: string): { types: string; interfaces: string[] } => {
				if (obj === null) return { types: 'any', interfaces: [] };
				if (Array.isArray(obj)) {
					const itemTypes = new Set<string>();
					const subInterfaces: string[] = [];
					obj.forEach((item) => {
						const res = generateTypes(item, name + 'Item');
						itemTypes.add(res.types);
						subInterfaces.push(...res.interfaces);
					});
					const unionType = itemTypes.size > 0 ? Array.from(itemTypes).join(' | ') : 'any';
					return { types: `Array<${unionType}>`, interfaces: subInterfaces };
				}
				if (typeof obj === 'object') {
					const keys = Object.keys(obj);
					const lines: string[] = [];
					const subInterfaces: string[] = [];

					keys.forEach((key) => {
						const val = obj[key];
						const cleanKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
						const typeName = capitalize(key);
						const res = generateTypes(val, typeName);
						lines.push(`  ${cleanKey}: ${res.types};`);
						subInterfaces.push(...res.interfaces);
					});

					const currentInterface = `export interface ${name} {\n${lines.join('\n')}\n}`;
					return { types: name, interfaces: [...subInterfaces, currentInterface] };
				}
				return { types: typeof obj, interfaces: [] };
			};

			const generateZod = (obj: any, name: string): { zod: string; schemas: string[] } => {
				const schemaVarName = name.charAt(0).toLowerCase() + name.slice(1) + 'Schema';
				if (obj === null) return { zod: 'z.any()', schemas: [] };
				if (Array.isArray(obj)) {
					const itemSchemas = new Set<string>();
					const subSchemas: string[] = [];
					obj.forEach((item) => {
						const res = generateZod(item, name + 'Item');
						itemSchemas.add(res.zod);
						subSchemas.push(...res.schemas);
					});
					const baseSchema = itemSchemas.size > 0 ? Array.from(itemSchemas).join(' || ') : 'z.any()';
					return { zod: `z.array(${baseSchema})`, schemas: subSchemas };
				}
				if (typeof obj === 'object') {
					const keys = Object.keys(obj);
					const lines: string[] = [];
					const subSchemas: string[] = [];

					keys.forEach((key) => {
						const val = obj[key];
						const typeName = capitalize(key);
						const res = generateZod(val, typeName);
						lines.push(`  ${key}: ${res.zod}`);
						subSchemas.push(...res.schemas);
					});

					const currentSchema = `export const ${schemaVarName} = z.object({\n${lines.join(',\n')}\n});`;
					return { zod: schemaVarName, schemas: [...subSchemas, currentSchema] };
				}
				if (typeof obj === 'string') return { zod: 'z.string()', schemas: [] };
				if (typeof obj === 'number') return { zod: 'z.number()', schemas: [] };
				if (typeof obj === 'boolean') return { zod: 'z.boolean()', schemas: [] };
				return { zod: 'z.any()', schemas: [] };
			};

			const tsResult = generateTypes(parsed, capitalize(interfaceName));
			const uniqueInterfaces = Array.from(new Set(tsResult.interfaces));
			setTsOutput(uniqueInterfaces.join('\n\n'));

			const zodResult = generateZod(parsed, capitalize(interfaceName));
			const uniqueSchemas = Array.from(new Set(zodResult.schemas));
			setZodOutput(`import { z } from 'zod';\n\n` + uniqueSchemas.join('\n\n'));
		} catch (err: any) {
			setError(err.message);
		}
	}, [jsonInput, interfaceName]);

	const handleCopy = (text: string, isTs: boolean) => {
		navigator.clipboard.writeText(text);
		if (isTs) {
			setCopiedTs(true);
			setTimeout(() => setCopiedTs(false), 2000);
		} else {
			setCopiedZod(true);
			setTimeout(() => setCopiedZod(false), 2000);
		}
	};

	return (
		<>
			<NextSeo
				title="JSON to Zod & TypeScript Interface Generator - Joey Jazwinski"
				description="Convert JSON payloads into TypeScript interfaces and Zod validation schemas instantly. Completely client-side tool with clean styling."
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-6xl mx-auto space-y-8">
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Braces className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
							JSON to Zod & TypeScript Generator
						</h1>
						<p className="text-muted-foreground text-lg">
							Paste a JSON structure to instantly generate clean, type-safe Zod schemas and TypeScript interfaces.
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
						<div className="lg:col-span-5 space-y-4">
							<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
								<h2 className="text-lg font-bold">Input JSON</h2>
								<div className="space-y-2">
									<label htmlFor="interface-name" className="text-xs font-semibold text-muted-foreground">
										Root Type Name
									</label>
									<input
										id="interface-name"
										type="text"
										className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
										value={interfaceName}
										onChange={(e) => setInterfaceName(e.target.value)}
									/>
								</div>
								<div className="relative">
									<textarea
										rows={18}
										className="w-full p-4 rounded-xl border border-border bg-background text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary"
										value={jsonInput}
										onChange={(e) => setJsonInput(e.target.value)}
									/>
								</div>
								{error && (
									<div className="p-3 text-xs bg-rose-500/10 text-rose-500 rounded-lg border border-rose-500/20 font-mono">
										Error: {error}
									</div>
								)}
							</div>
						</div>

						<div className="lg:col-span-7 space-y-6">
							<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
								<div className="flex justify-between items-center">
									<h2 className="text-lg font-bold">TypeScript Interface</h2>
									<button
										onClick={() => handleCopy(tsOutput, true)}
										className="p-2 rounded-lg hover:bg-secondary border border-border transition text-muted-foreground hover:text-foreground"
									>
										{copiedTs ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
									</button>
								</div>
								<textarea
									rows={10}
									readOnly
									className="w-full p-4 rounded-xl border border-border bg-background text-xs font-mono focus:outline-none"
									value={tsOutput || '// Paste a valid JSON object on the left to generate types'}
								/>
							</div>

							<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
								<div className="flex justify-between items-center">
									<h2 className="text-lg font-bold">Zod Schema</h2>
									<button
										onClick={() => handleCopy(zodOutput, false)}
										className="p-2 rounded-lg hover:bg-secondary border border-border transition text-muted-foreground hover:text-foreground"
									>
										{copiedZod ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
									</button>
								</div>
								<textarea
									rows={10}
									readOnly
									className="w-full p-4 rounded-xl border border-border bg-background text-xs font-mono focus:outline-none"
									value={zodOutput || '// Paste a valid JSON object on the left to generate Zod schemas'}
								/>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
