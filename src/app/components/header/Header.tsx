'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './header.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery, IconButton, Stack, SwipeableDrawer } from '@mui/material';
import { useState } from 'react';

const Header = () => {
	const matches = useMediaQuery('(max-width: 1130px)');
	const [isOpen, setIsOpen] = useState(false);

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
			<SwipeableDrawer
				className={styles.drawer}
				disableScrollLock={true}
				anchor="top"
				open={isOpen}
				onClose={toggleDrawer(false)}
				onOpen={toggleDrawer(true)}
				sx={{
					'&.MuiPaper-root-MuiDrawer-paper': {
						border: '2px solid red',
					},
				}}>
				<Stack direction="column" spacing={3} className={styles.mobileMenu}>
					<Link href="/" className={styles.link} onClick={() => setIsOpen(false)}>
						Home
					</Link>
					<Link href="/about-us" className={styles.link} onClick={() => setIsOpen(false)}>
						The team
					</Link>
					<Link href="/blog" className={styles.link} onClick={() => setIsOpen(false)}>
						Blog
					</Link>
					<Link href="/contact-us" className={styles.buttonLink} onClick={() => setIsOpen(false)}>
						Get in touch
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
						The team
					</Link>
					<Link href="/blog" className={styles.link}>
						Blog
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
