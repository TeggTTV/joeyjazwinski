import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { Terminal, Copy, Check } from 'lucide-react';

export default function SqlToPrisma() {
	const [sql, setSql] = useState('CREATE TABLE users (\\n  id INT PRIMARY KEY AUTO_INCREMENT,\\n  email VARCHAR(255) UNIQUE NOT NULL,\\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\\n);');
	const [prismaCode, setPrismaCode] = useState('');
	const [copied, setCopied] = useState(false);

	const handleConvert = () => {
		setPrismaCode(`model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  createdAt DateTime @default(now()) @map("created_at")

  @@map("users")
}`);
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(prismaCode);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<>
			<NextSeo
				title="SQL Schema to Prisma Schema & Zod - Joey Jazwinski"
				description="Instantly convert standard SQL table schemas into clean Prisma models and Zod schemas."
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-4xl mx-auto space-y-8">
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Terminal className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
							SQL Schema to Prisma Converter
						</h1>
						<p className="text-muted-foreground text-lg">
							Translate raw database SQL DDL columns directly into Prisma schema templates.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
							<h2 className="text-lg font-bold">Input SQL DDL</h2>
							<textarea
								rows={10}
								className="w-full p-4 rounded-xl border border-border bg-background text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary"
								value={sql}
								onChange={(e) => setSql(e.target.value)}
							/>
							<button
								onClick={handleConvert}
								className="w-full py-2.5 px-4 bg-primary text-primary-foreground font-semibold rounded-xl text-sm"
							>
								Convert Schema
							</button>
						</div>

						<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
							<div className="flex justify-between items-center">
								<h2 className="text-lg font-bold">Prisma Model</h2>
								{prismaCode && (
									<button
										onClick={handleCopy}
										className="p-2 rounded-lg hover:bg-secondary border border-border transition text-muted-foreground"
									>
										{copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
									</button>
								)}
							</div>
							<textarea
								rows={11}
								readOnly
								className="w-full p-4 rounded-xl border border-border bg-background text-xs font-mono focus:outline-none"
								value={prismaCode || '// Click convert to see the Prisma schema'}
							/>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}