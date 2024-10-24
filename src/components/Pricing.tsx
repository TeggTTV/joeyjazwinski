function Pricing() {
	return (
		<section className="xl:h-screen dark:bg-black flex justify-center">
			<div className="max-w-7xl w-full relative">
				<div
					className="z-10 relative text-4xl font-extrabold tracking-tight leading-none text-white
					md:text-5xl lg:text-6xl dark:text-white xl:w-[30ch] mb-10 text-center md:text-center xl:text-left lg:ml-10"
				>
					Our{' '}
					<div
						className="relative inline-block text-transparent bg-gradient-to-r from-blue-400 to-primary
						bg-clip-text h-20"
					>
						Pricing
					</div>{' '}
					Plans
				</div>
				<div className="py-10 w-full bg-red flex gap-10 relative justify-center flex-col sm:flex-row flex-wrap items-center">
					{[
						{
							name: 'Free Plan',
							price: '$0',
							monthly: '/Month',
							essential: 'Everything Nessecary to get started.',
							perks: [
								'Access to 2 of the most Popular Games',
								'Choice of up to 4 themes for each game',
								'Maximum of 10 Saved Games',
								'Customer Support',
							],
						},
						{
							name: 'Basic Plan',
							price: '$15',
							monthly: '/Month',
							essential:
								'All the features of our Free Plan + More fun.',
							perks: [
								'Access to all of our games',
								'Choice of all themes and the ability to make your own themes',
								'Unlimited Saved Games',
								'Enhanced Customer Support',
							],
						},
						{
							name: 'Premium Plan',
							price: '$25',
							monthly: '/Month',
							essential:
								'Everything you could ever need for maxmium fun and enjoyment.',
							perks: [
								'All Basic Plan Features',
								'Priority Customer Support',
								'Early Access to New Games',
							],
						},
					].map((plan, index) => (
						<div
							className="flex flex-col p-12 border-2 border-primary/30 max-w-[23rem] min-h-[700px]"
							key={index}
						>
							<div className="text-2xl mb-10">{plan.name}</div>
							<div className="flex mb-10">
								<div className="text-6xl">{plan.price}</div>
								<div className="self-end">{plan.monthly}</div>
							</div>
							{/* <div className="mb-5">12$ per month if paid annually</div> */}
							<div className="bg-primary px-4 py-2 rounded cursor-pointer mb-10">
								{index > 0 ? 'Get Plan' : 'Get Started'}
							</div>
							<div className="text-lg font-bold">
								{plan.essential}
							</div>
							<li className="leading-6 mt-6 list-none m-0 p-0 space-y-4">
								{plan.perks.map((perk, index) => (
									<ul className="flex gap-x-3" key={index}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
											className="flex-none w-5 h-6 text-primary block align-middle"
										>
											<path
												fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
												clipRule="evenodd"
											></path>
										</svg>
										{perk}
									</ul>
								))}
							</li>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default Pricing;
