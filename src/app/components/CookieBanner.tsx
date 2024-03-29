'use client';

import { useEffect, useState } from 'react';
import { setCookie, getCookie } from 'cookies-next';
import styles from './cookieBanner.module.css';
import { Box, Button, Stack } from '@mui/material';
import Link from 'next/link';

const CookieBanner = () => {
	const [accepted, setAccepted] = useState(true);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const consentIsTue = getCookie('cookies_accepted') === true;

		setAccepted(consentIsTue);
		setIsLoaded(true);
	}, []);

	const handleAccept = () => {
		const d = new Date();
		d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days in milliseconds

		setCookie('cookies_accepted', 'true', { expires: d });
		setAccepted(true);
	};

	return !accepted && isLoaded ? (
		<Stack className={styles.cookieBanner}>
			<h6 className={styles.title}>This Website uses cookies!</h6>
			<Box display="flex" gap="15px" alignItems="center">
				<p className={styles.text}>
					We use only strictly necessary cookies. If you disable or refuse cookies, please note that some parts of our
					website may become inaccessible or not function properly. Read our{' '}
					<Link href={'/assets/docs/privacy_policy.pdf'} target="_blank" className={styles.link}>
						Privacy Policy
					</Link>{' '}
					for more information.
				</p>
				<Button variant="outlined" onClick={handleAccept} className={styles.button}>
					Accept
				</Button>
			</Box>
		</Stack>
	) : null;
};

export default CookieBanner;
