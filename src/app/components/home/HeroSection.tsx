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
			<h1 className={styles.heroTitle}>The Swiss blockchain firm</h1>
			<p className={styles.heroSubtitle}>
				Blockchain Consulting | Development | Cryptography <br /> Engineering | Infrastructure | Research | Web3 <br />{' '}
				Zero-Knowledge | Verifiable Analytics
			</p>
			<CallToActionBTN text="Let's talk" path="/" />
		</Stack>
	);
};

export default HeroSection;
