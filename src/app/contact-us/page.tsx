'use client';

import { Box, Stack, Typography, useMediaQuery } from '@mui/material';
import CurvesSection from '../components/backgrounds/CurvesSection';
import styles from './page.module.css';
import { Mail, Phone, Place } from '@mui/icons-material';
import HubspotForm from '../components/HubspotForm';

const ContactUs = () => {
	const matches = useMediaQuery('(max-width: 1100px)');
	const direction = matches ? 'column' : 'row';
	return (
		<main className={styles.main}>
			<Stack spacing={4} width="100%" className={styles.sectionContainer} direction={direction}>
				<Box className={styles.flexItem}>
					<Stack direction="column" spacing={2} marginBottom="50px">
						<h1 className={styles.pageTitle}>Contact us</h1>
						<Typography variant="body1" className={styles.pageSubtitle}>
							If you are interested in any of our solutions or would like to get more information on our services,
							kindly complete the form, and we will reach out to you promptly.
						</Typography>
					</Stack>
					<Stack direction="column" /* spacing={1} */>
						<Typography variant="body1" className={styles.infoBox}>
							<span className={styles.iconContainer}>
								<Mail className={styles.icon} />
							</span>
							<a href="mailto:info@runtimemachines.io">info@runtimemachines.io</a>
						</Typography>
						<Typography variant="body1" className={styles.infoBox}>
							<span className={styles.iconContainer}>
								<Phone className={styles.icon} />
							</span>
							+41 76 569 zero-zero one-seven
						</Typography>
						<Typography variant="body1" className={styles.infoBox}>
							<span className={styles.iconContainer}>
								<Place className={styles.icon} />
							</span>
							Baarerstrasse 52, 6300 Zug, Switzerland
						</Typography>
						<Typography variant="body1" className={styles.infoBox}>
							<span className={styles.iconContainer}>
								<Place className={styles.icon} />
							</span>
							Crocicchio Cortogna 6, 6900 Lugano, Switzerland
						</Typography>
					</Stack>
				</Box>
				<Box className={styles.flexItem}>
					<HubspotForm />
				</Box>
			</Stack>
		</main>
	);
};

export default ContactUs;
