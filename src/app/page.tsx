'use client';
import { useEffect, useState } from 'react';

// Define TypeScript's types
interface HashResult {
	block: number;
	hash: string;
	sample: string;
	attempts: number;
	earned: number;
}

class Miner {
	blockNumber: number;
	attempts: number;
	hashSolved: boolean;
	earnings: number;
	currentHash: string;
	hashes: HashResult[];

	constructor() {
		this.blockNumber = 0;
		this.attempts = 0;
		this.hashSolved = true;
		this.earnings = 0;
		this.currentHash = '';
		this.hashes = [];
	}

	async calculate(hash: string) {
		let randomHash = await crypto.subtle.digest(
			'SHA-256',
			new TextEncoder().encode(
				(
					hash +
					this.blockNumber +
					this.attempts +
					new Date().getTime()
				).toString()
			)
		);

		const hashArray = Array.from(new Uint8Array(randomHash));
		const hashHex = hashArray
			.map((byte) => byte.toString(16).padStart(2, '0'))
			.join('');

		let count = 0;
		for (let i = 0; i < hash.length; i++) {
			if (hash[i] === hashHex[i]) {
				count++;
			} else break;
		}

		if (count <= 1) return { sample: hashHex, result: false, maxChars: 0 };

		const original = hash.substring(0, count);
		const sample = hashHex.substring(0, count);

		if (original === sample) {
			return { sample: hashHex, result: true, maxChars: count };
		} else return { sample: hashHex, result: false, maxChars: 0 };
	}

	async generateHash(attempt: number): Promise<string> {
		let hashBuffer = await crypto.subtle.digest(
			'SHA-256',
			new TextEncoder().encode(attempt + new Date().getTime().toString())
		);
		const hashArray = Array.from(new Uint8Array(hashBuffer));
		const hashHex = hashArray
			.map((byte) => byte.toString(16).padStart(2, '0'))
			.join('');
		return hashHex;
	}

	async mineBlock() {
		this.attempts += 1;

		let newHash = '';
		if (this.hashSolved) {
			newHash = await this.generateHash(this.attempts);
			this.currentHash = newHash;
			this.hashSolved = false;
		} else {
			newHash = this.currentHash;
		}

		const result = await this.calculate(newHash);

		if (result.result) {
			this.hashSolved = true;
			let earned = (this.attempts / 100) * result.maxChars;
			this.hashes.push({
				block: this.blockNumber + 1,
				hash: newHash,
				sample: result.sample,
				attempts: this.attempts,
				earned: earned / 10000000000,
			});
			this.blockNumber += 1;
			this.attempts = 0;
			this.earnings += earned / 10000000000;
		}

		return {
			blockNumber: this.blockNumber,
			currentHash: this.currentHash,
			attempts: this.attempts,
			earnings: this.earnings,
			hashes: this.hashes,
		};
	}
}

export default function Home() {
	const [miners, setMiners] = useState<Miner[]>([]);
	const [isMining, setIsMining] = useState<boolean>(false);
	const [miningData, setMiningData] = useState<
		{
			blockNumber: number;
			currentHash: string;
			attempts: number;
			earnings: number;
			hashes: HashResult[];
		}[]
	>([]);

	const startMining = () => {
		if (miners.length === 0) {
			const newMiners = [new Miner(), new Miner()]; // Two miners
			setMiners(newMiners);
		}
		setIsMining(true);
	};

	useEffect(() => {
		let intervalId: NodeJS.Timeout;

		if (isMining && miners.length) {
			intervalId = setInterval(async () => {
				const updatedMiningData = await Promise.all(
					miners.map((miner) => miner.mineBlock())
				);
				setMiningData(updatedMiningData);
			}, 1);
		}

		return () => clearInterval(intervalId);
	}, [isMining, miners]);

	return (
		<>
			<div className="mining-container">
				<h1>Crypto Mining Simulator</h1>

				{!isMining ? (
					<button onClick={startMining}>Start Mining</button>
				) : (
					<button onClick={() => setIsMining(false)}>
						Stop Mining
					</button>
				)}

				<div className="flex gap-2 p-4">
					{miningData.map((data, minerIndex) => (
						<div key={minerIndex} className="miner">
							<h2>Miner {minerIndex + 1}</h2>
							<p>Mining Block: {data.blockNumber}</p>
							<p>Current Hash: {data.currentHash}</p>
							<p>Attempts for this block: {data.attempts}</p>
							<p>Earned: {data.earnings.toFixed(10)}</p>

							<div>
								<h3>Mined Hashes:</h3>
								<ul>
									{data.hashes.map((hash, index) => (
										<li key={index}>
											Block {hash.block}: {hash.sample}{' '}
											-&gt; {hash.hash} | Attempts:{' '}
											{hash.attempts} | Earned:{' '}
											{hash.earned.toFixed(10)}
										</li>
									))}
								</ul>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
