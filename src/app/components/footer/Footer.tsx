'use client';

import Link from 'next/link';
import styles from './footer.module.css';
import { Typography, Stack, Box, IconButton, Divider, useMediaQuery } from '@mui/material';
import { Twitter, LinkedIn, GitHub } from '@mui/icons-material';
import Image from 'next/image';

const Footer = () => {
	const matches = useMediaQuery('(max-width: 1100px)');

	return (
		<Stack direction="column" spacing={6} className={styles.footer}>
			<Box component="footer" display="flex" justifyContent="space-between" alignItems="center">
				<Box display="flex" flexDirection="column" className={styles.footerLeft}>
					<Link className={styles.logoContainer} href="/">
						<Image src="/RTM_Logo.svg" alt="RTM Logo" width={100} height={100} className={styles.logo} />
					</Link>
					<Box marginTop={6}>
						<Typography variant="body1">
							Address:
							<br /> Zahlerweg 5, 63000 Zug, Switzerland
						</Typography>
					</Box>
					<Box marginY={6}>
						<Typography variant="body1">
							Contact:
							<br />{' '}
							<a href="mailto:info@runtimemachines.io" className={styles.email}>
								info@runtimemachines.io
							</a>
						</Typography>
					</Box>
					<Box display="flex">
						<IconButton href="https://twitter.com/RunTimeMachines">
							<Twitter style={{ color: '#fff' }} />
						</IconButton>
						<IconButton href="https://github.com/runtime-machines">
							<GitHub style={{ color: '#fff' }} />
						</IconButton>

						<IconButton href="https://www.linkedin.com/company/runtime-machines">
							<LinkedIn style={{ color: '#fff' }} />
						</IconButton>
					</Box>
				</Box>
				<Box display="flex">
					<Box className={styles.footerLinks}>
						<Stack direction="column" spacing={3} /* paddingX={4} */>
							<Link href="/" className={styles.link}>
								Home
							</Link>
							<Link href="/about-us" className={styles.link}>
								The team
							</Link>
							<Link href="/blog" className={styles.link}>
								Blog
							</Link>
							<Link href="/contact-us" className={styles.link}>
								Contact us
							</Link>
						</Stack>
					</Box>
				</Box>
			</Box>
			<Box>
				<Divider className={styles.divider} />
				<Box display="flex" justifyContent="space-between" className={styles.bottom}>
					<Typography variant="body1" className={styles.copyRight}>
						© 2023 Runtime Machines. All rights reserved.
					</Typography>
					<Stack display="flex" direction="row" className={styles.bottomLinks}>
						<Link
							href="/assets/docs/privacy_policy.pdf"
							target="_blank"
							className={`${styles.link} ${styles.underline} ${styles.left}`}>
							Privacy policy
						</Link>
						{/* <Link href="/" className={`${styles.link} ${styles.underline} ${styles.right}`}>
							Terms of service
						</Link> */}
					</Stack>
				</Box>
			</Box>
		</Stack>
	);
};

export default Footer;
