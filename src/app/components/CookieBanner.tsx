'use client';

import { useState } from 'react';
import styles from './cookieBanner.module.css';
import { Box, Button, Stack } from '@mui/material';
import Link from 'next/link';

const CookieBanner = () => {
	const [accepted, setAccepted] = useState(false);

	const handleAccept = () => {
		setAccepted(true);
		document.cookie = 'cookies_accepted=true; max-age=31536000';
	};

	const cookieAccepted =
		(typeof document !== 'undefined' &&
			document.cookie.split(';').some((cookie) => {
				return cookie.trim().startsWith('cookies_accepted=');
			})) ||
		accepted;

	if (!cookieAccepted) {
		return (
			<Stack className={styles.cookieBanner}>
				<h6 className={styles.title}>This Website uses cookies!</h6>
				<Box display="flex" gap="15px" alignItems="center">
					<p className={styles.text}>
						We use only strictly necessary cookies. If you disable or refuse cookies, please note that some parts of our
						website may become inaccessible or not function properly. Read our{' '}
						<Link href={'/files/privacyCookiePolicy.pdf'} target="_blank" className={styles.link}>
							Privacy Policy
						</Link>{' '}
						for more information.
					</p>
					<Button variant="outlined" onClick={handleAccept} className={styles.button}>
						Accept
					</Button>
				</Box>
			</Stack>
		);
	} else {
		return null;
	}
};

export default CookieBanner;
