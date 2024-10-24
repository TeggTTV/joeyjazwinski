import Hero from './Hero';
import Navbar from './Navbar';
import Pricing from './Pricing';

function Landing() {
	const theme: string = 'dark';

	return (
		<>
			<Hero theme={theme} />
			<Pricing />
		</>
	);
}

export default Landing;
