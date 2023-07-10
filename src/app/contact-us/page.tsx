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
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						</Typography>
					</Stack>
					<Stack direction="column" spacing={1}>
						<Typography variant="body1" className={styles.infoBox}>
							<span className={styles.iconContainer}>
								<Mail className={styles.icon} />
							</span>
							info@runtimemachines.io
						</Typography>
						<Typography variant="body1" className={styles.infoBox}>
							<span className={styles.iconContainer}>
								<Phone className={styles.icon} />
							</span>
							info@runtimemachines.io
						</Typography>
						<Typography variant="body1" className={styles.infoBox}>
							<span className={styles.iconContainer}>
								<Place className={styles.icon} />
							</span>
							info@runtimemachines.io
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
