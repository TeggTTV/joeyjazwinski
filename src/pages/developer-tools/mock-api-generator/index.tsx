import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { Shield } from 'lucide-react';

export default function MockApiGenerator() {
	const [status, setStatus] = useState(200);
	const [payload, setPayload] = useState('{"message": "Success"}');
	const [endpoint, setEndpoint] = useState('');

	const handleCreate = () => {
		setEndpoint(`https://joeyjazwinski.com/api/mock?status=${status}&delay=500`);
	};

	return (
		<>
			<NextSeo
				title="Mock API Response Generator - Joey Jazwinski"
				description="Build mock HTTP endpoints with selectable status codes, payloads, and simulated latencies client-side."
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-4xl mx-auto space-y-8">
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Shield className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-rose-500 bg-clip-text text-transparent">
							Mock API Response Generator
						</h1>
						<p className="text-muted-foreground text-lg">
							Create endpoint mocks for testing local server latency and network errors.
						</p>
					</div>

					<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
						<h2 className="text-lg font-bold">API Specifications</h2>
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-1">
								<label htmlFor="status-select" className="text-xs font-semibold text-muted-foreground">HTTP Status</label>
								<select id="status-select" className="w-full px-3 py-2 rounded-lg border bg-background" value={status} onChange={(e) => setStatus(Number(e.target.value))}>
									<option value={200}>200 OK</option>
									<option value={400}>400 Bad Request</option>
									<option value={404}>404 Not Found</option>
									<option value={500}>500 Internal Error</option>
								</select>
							</div>
						</div>
						<button onClick={handleCreate} className="w-full py-2.5 px-4 bg-primary text-primary-foreground font-semibold rounded-xl text-sm">
							Generate Mock Endpoint
						</button>
						{endpoint && (
							<div className="p-4 bg-background border rounded-xl space-y-2">
								<span className="text-xs font-bold text-muted-foreground">Mock Target:</span>
								<pre className="p-2 text-xs font-mono bg-card border rounded break-all">{endpoint}</pre>
							</div>
						)}
					</div>
				</div>
			</main>
		</>
	);
}