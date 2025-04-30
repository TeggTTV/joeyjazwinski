'use client';

import Link from 'next/link';

//? Tutorial removed for now
const links = ['Blogs', 'Courses', 'Contact'];

export default function NavLinks() {
	return (
		<ul className="flex items-center space-x-6">
			<li>
				<Link
					href={`/`}
					className="text-text hover:text-blue-600"
				>
					Home
				</Link>
			</li>
			{links.map((item) => (
				<li key={item}>
					<Link
						href={`/${item.toLowerCase()}`}
						className="text-text hover:text-blue-600"
					>
						{item}
					</Link>
				</li>
			))}
		</ul>
	);
}
