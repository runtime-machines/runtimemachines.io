import { Stack } from '../mui/Components';
import Image from 'next/image';
import styles from './partners.module.css';

const Partners = () => {
	return (
		<>
			<p className={styles.partnersSubtitle}>Trusted by tech teams, developers, and marketeers worldwide.</p>
			<Stack gap="10px" className={styles.partnersLogos}>
				<div className={styles.logo}>
					<Image src="/webflow.svg" alt="webflow" fill />
				</div>
				<div className={styles.logo}>
					<Image src="/relume.svg" alt="webflow" fill />
				</div>
				<div className={styles.logo}>
					<Image src="/webflow.svg" alt="webflow" fill />
				</div>
				<div className={styles.logo}>
					<Image src="/relume.svg" alt="webflow" fill />
				</div>
				<div className={styles.logo}>
					<Image src="/webflow.svg" alt="webflow" fill />
				</div>
				<div className={styles.logo}>
					<Image src="/relume.svg" alt="webflow" fill />
				</div>
			</Stack>
		</>
	);
};

export default Partners;
