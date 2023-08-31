import { Stack } from '../mui/Components';
import styles from './endingSection.module.css';

type TProps = {};

const EndingSection = ({}: TProps) => {
	const clickHandler = () => {
		console.log('clicked');
	};

	return (
		<Stack className={styles.endingSection} spacing={5}>
			<p className={styles.endingTitle}>
				Dear Community and Partners!
				<br />
				The RunTime Machines team has chosen to pursue new opportunities individually
				and pursue new ventures. We are immensely grateful for your support and collaboration in our journey to innovate
				in blockchain technology and cryptography. For any pending matters, please contact us by 7th September at
				info@runtimemachines.io. Thank you for being part of our story. We are excited to see what the future holds for
				all of us.
				<br />
				<br />
				Best,
				<br />
				The Team at RunTime Machines
			</p>
		</Stack>
	);
};

export default EndingSection;
