'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './header.module.css';
import Stack from '@mui/material/Stack';

const Header = () => {
	return (
		<header className={styles.header}>
			<Link className={styles.logoContainer} href="/">
				<Image src="/RTM_Logo.svg" alt="RTM Logo" width={100} height={100} className={styles.logo} />
			</Link>
			<Stack direction="row" spacing={6}>
				<Link href="/what-we-think" className={styles.link}>
					What we think
				</Link>
				<Link href="/what-we-build" className={styles.link}>
					What we build
				</Link>
				<Link href="/about-us" className={styles.link}>
					About us
				</Link>
				<Link href="/blog" className={styles.link}>
					Blog
				</Link>
			</Stack>
		</header>
	);
};

export default Header;
