'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './header.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery, IconButton, Stack, SwipeableDrawer } from '@mui/material';
import { useState } from 'react';
import { CallToActionBTN } from '../buttons/CallToActionBTN';

const Header = () => {
	const matches = useMediaQuery('(max-width: 1130px)');
	const [isOpen, setIsOpen] = useState(false);

	console.log(matches);

	const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
		if (
			event &&
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
		) {
			return;
		}

		setIsOpen(open);
	};

	return (
		<header className={styles.header}>
			<SwipeableDrawer anchor="top" open={isOpen} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
				<Stack direction="column" spacing={3} className={styles.mobileMenu}>
					<Link href="/what-we-think" className={styles.link} onClick={() => setIsOpen(false)}>
						What we think
					</Link>
					<Link href="/what-we-build" className={styles.link} onClick={() => setIsOpen(false)}>
						What we build
					</Link>
					<Link href="/about-us" className={styles.link} onClick={() => setIsOpen(false)}>
						About us
					</Link>
					<Link href="/blog" className={styles.link}>
						Blog
					</Link>
				</Stack>
			</SwipeableDrawer>
			<Link className={styles.logoContainer} href="/">
				<Image src="/RTM_Logo.svg" alt="RTM Logo" width={100} height={100} className={styles.logo} />
			</Link>

			{matches ? (
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={() => setIsOpen(true)}
					edge="start"
					/* sx={{
						marginRight: 5,
						...(isOpen && { display: 'none' }),
					}} */
				>
					<MenuIcon />
				</IconButton>
			) : (
				<Stack direction="row" spacing={6} alignItems="center">
					<Link href="/" className={styles.link}>
						Home
					</Link>
					<Link href="/about-us" className={styles.link}>
						Team
					</Link>
					<Link href="/contact-us" className={styles.buttonLink}>
						Get in touch
					</Link>
				</Stack>
			)}
		</header>
	);
};

export default Header;
