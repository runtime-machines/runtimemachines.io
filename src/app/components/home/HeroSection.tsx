import { Stack } from '../mui/Components';
import styles from './heroSection.module.css';
import { CallToActionBTN } from '../buttons/CallToActionBTN';

type TProps = {};

const HeroSection = ({}: TProps) => {
	const clickHandler = () => {
		console.log('clicked');
	};

	return (
		<Stack className={styles.heroSection} spacing={5}>
			<h1 className={styles.heroTitle}>Lorem Ipsum dolot sit amet</h1>
			<p className={styles.heroSubtitle}>
				Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet
				odio mattis.
			</p>
			<CallToActionBTN text="Get in touch" path="/contact-us" />
		</Stack>
	);
};

export default HeroSection;
