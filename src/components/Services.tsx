// const ReviewCard = ({
// 	img,
// 	name,
// 	username,
// 	body,
// }: {
// 	img: string;
// 	name: string;
// 	username: string;
// 	body: string;
// }) => {
// 	return (
// 		<figure
// 			className={cn(
// 				'relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4',
// 				// light styles
// 				'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
// 				// dark styles
// 				'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]'
// 			)}
// 		>
// 			<div className="flex flex-row items-center gap-2">
// 				<img
// 					className="rounded-full"
// 					width="32"
// 					height="32"
// 					alt=""
// 					src={img}
// 				/>
// 				<div className="flex flex-col">
// 					<figcaption className="text-sm font-medium dark:text-white">
// 						{name}
// 					</figcaption>
// 					<p className="text-xs font-medium dark:text-white/40">
// 						{username}
// 					</p>
// 				</div>
// 			</div>
// 			<blockquote className="mt-2 text-sm">{body}</blockquote>
// 		</figure>
// 	);
// };

import { MagicCard } from './magicui/magic-card';

function Services() {
	return (
		<section className="w-full h-screen bg-black flex justify-center">
			<div className="max-w-7xl w-full relative">
				<div
					className="
					text-4xl font-extrabold tracking-tight leading-none text-white
					md:text-5xl lg:text-6xl dark:text-white w-[10ch]
				"
				>
					The{' '}
					<div
						className="
						relative inline-block text-transparent bg-gradient-to-r from-blue-400 to-primary
						bg-clip-text
					"
					>
						Services
					</div>{' '}
					We're Offering
				</div>
				<div className="my-10"></div>
				<div className="w-full flex gap-10">
					{[
						{
							title: 'Games 🎮',
							desc: 'We create games that are fun and educational for kids of all ages.',
						},
						{
							title: 'Payment Plans 💸',
							desc: 'We offer flexible payment plans to fit your budget. We also offer a free plan for those who want to try out our services.',
						},
						{
							title: 'Support Team 📞',
							desc: 'Our customer support team is available 24/7 to help you with any questions or concerns you may have.',
						},
					].map((service, index) => (
						<MagicCard
							key={index}
							className="
								p-8 bg-white rounded-md shadow-lg h-96 
								"
						>
							<div className="text-4xl font-bold text-gray-900 dark:text-white">
								{service.title}
							</div>
							<div className="my-4"></div>
							<div className="text-gray-500 dark:text-gray-400 leading-7">
								{service.desc}
							</div>
						</MagicCard>
					))}
				</div>
				{/* <Marquee pauseOnHover className="[--duration:20s]">
					{[
						{
							title: 'Games 🎮',
							desc: 'We create games that are fun and educational for kids of all ages.',
						},
						{
							title: 'Payment Plans 💸',
							desc: 'We offer flexible payment plans to fit your budget. We also offer a free plan for those who want to try out our services.',
						},
						{
							title: 'Support Team 📞',
							desc: 'Our customer support team is available 24/7 to help you with any questions or concerns you may have.',
						},
					].map((service, index) => (
						<ReviewCard
							key={index}
							{...service}
							body={service.desc}
							name={service.title}
							username="beans"
							img=""
						/>
					))}
				</Marquee> */}
			</div>
		</section>
	);
}

export default Services;
