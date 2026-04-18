import Link from 'next/link';

export default function Custom404() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-950 text-center p-6 transition-colors">
			<h1 className="text-7xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-4 drop-shadow-lg">
				404
			</h1>
			<h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
				Page Not Found
			</h2>
			<p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
				Oops! The page you are looking for doesn&apos;t exist or has been
				moved.
				<br />
				Let&apos;s get you back to somewhere safe.
			</p>
			<Link
				href="/"
				className="inline-block px-6 py-3 bg-indigo-600 dark:bg-indigo-700 text-white rounded-lg shadow-md hover:bg-indigo-700 dark:hover:bg-indigo-800 transition-colors font-medium text-lg"
			>
				Go Home
			</Link>
			<div className="mt-12 opacity-60">
				<svg width="120" height="120" fill="none" viewBox="0 0 120 120">
					<circle
						cx="60"
						cy="60"
						r="56"
						stroke="#6366F1"
						strokeWidth="8"
						fill="#EEF2FF"
						className="dark:fill-gray-900 dark:stroke-indigo-700"
					/>
					<ellipse
						cx="60"
						cy="80"
						rx="28"
						ry="8"
						fill="#6366F1"
						opacity=".15"
						className="dark:fill-indigo-700"
					/>
					<circle cx="45" cy="55" r="6" fill="#6366F1" className="dark:fill-indigo-500" />
					<circle cx="75" cy="55" r="6" fill="#6366F1" className="dark:fill-indigo-500" />
					<path
						d="M50 75 Q60 85 70 75"
						stroke="#6366F1"
						strokeWidth="3"
						fill="none"
						strokeLinecap="round"
						className="dark:stroke-indigo-400"
					/>
				</svg>
			</div>
		</div>
	);
}
