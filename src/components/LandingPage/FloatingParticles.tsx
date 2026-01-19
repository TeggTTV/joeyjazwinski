import React from 'react';

const FloatingParticles: React.FC = () => {
	return (
		<>
			{/* Full-screen animated background orbs */}
			<div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
				{/* Large gradient orbs */}
				<div
					className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full blur-3xl animate-blob opacity-60"
					style={{
						background:
							'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0.1) 50%, transparent 70%)',
						top: '-20%',
						left: '-10%',
					}}
				/>
				<div
					className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full blur-3xl animate-blob opacity-50"
					style={{
						background:
							'radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(236,72,153,0.08) 50%, transparent 70%)',
						top: '10%',
						right: '-15%',
						animationDelay: '2s',
					}}
				/>
				<div
					className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full blur-3xl animate-blob opacity-40"
					style={{
						background:
							'radial-gradient(circle, rgba(6,182,212,0.1) 0%, rgba(59,130,246,0.08) 50%, transparent 70%)',
						bottom: '0%',
						left: '20%',
						animationDelay: '4s',
					}}
				/>

				{/* Smaller floating particles */}
				<div
					className="absolute w-3 h-3 bg-blue-500/30 rounded-full blur-sm animate-float-slow"
					style={{ top: '20%', left: '15%' }}
				/>
				<div
					className="absolute w-2 h-2 bg-purple-500/40 rounded-full blur-sm animate-float-medium"
					style={{ top: '35%', right: '20%', animationDelay: '1s' }}
				/>
				<div
					className="absolute w-4 h-4 bg-cyan-500/25 rounded-full blur-sm animate-float-slow"
					style={{ bottom: '30%', left: '10%', animationDelay: '2s' }}
				/>
				<div
					className="absolute w-2 h-2 bg-pink-500/35 rounded-full animate-float-fast"
					style={{ top: '60%', right: '25%', animationDelay: '0.5s' }}
				/>
				<div
					className="absolute w-3 h-3 bg-blue-400/30 rounded-full blur-sm animate-float-medium"
					style={{ top: '75%', left: '30%', animationDelay: '3s' }}
				/>

				{/* Decorative geometric shapes */}
				<div
					className="absolute w-16 h-16 md:w-24 md:h-24 border border-primary/10 rounded-lg animate-spin-slow"
					style={{
						top: '15%',
						right: '10%',
						transform: 'rotate(45deg)',
					}}
				/>
				<div
					className="absolute w-12 h-12 md:w-16 md:h-16 border border-purple-500/10 rounded-full animate-spin-slow"
					style={{
						bottom: '25%',
						right: '15%',
						animationDelay: '5s',
					}}
				/>
				<div
					className="absolute w-20 h-20 md:w-28 md:h-28 border border-cyan-500/5 rounded-lg animate-spin-slow"
					style={{
						top: '50%',
						left: '5%',
						transform: 'rotate(12deg)',
						animationDelay: '10s',
					}}
				/>
			</div>
		</>
	);
};

export default FloatingParticles;
