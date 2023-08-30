'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './header.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
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
					'& .MuiModal-backdrop': {
						backgroundColor: 'rgba(0, 0, 0, 0)',
					},
					'& .MuiDrawer-paperAnchorTop': {
						top: '4rem',
						borderTop: '2px',
						borderBottom: '2px',
						borderRight: '0px',
						borderLeft: '0px',
						borderStyle: 'solid',
						borderColor: ' #000000',
					},
				}}>
				<Stack direction="column" spacing={3} className={styles.mobileMenu}>
					<Link href="/" className={styles.link} onClick={() => setIsOpen(false)}>
						Home
					</Link>
					<Link href="/" className={styles.link} onClick={() => setIsOpen(false)}>
						The team
					</Link>
					<Link href="/" className={styles.link} onClick={() => setIsOpen(false)}>
						Blog
					</Link>
					<Link href="/" className={styles.buttonLink} onClick={() => setIsOpen(false)}>
						Get in touch
					</Link>
				</Stack>
			</SwipeableDrawer>
			<Link className={styles.logoContainer} href="/">
				<Image src="/RTM_Logo.svg" alt="RTM Logo" width={100} height={100} className={styles.logo} />
			</Link>

			{matches ? (
				isOpen ? (
					<IconButton
						color="inherit"
						aria-label="close drawer"
						onClick={() => setIsOpen(false)}
						edge="start"
						/* sx={{
							marginRight: 5,
							...(isOpen && { display: 'none' }),
						}} */
					>
						<CloseIcon />
					</IconButton>
				) : (
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
				)
			) : (
				<Stack direction="row" spacing={6} alignItems="center">
					<Link href="/" className={styles.link}>
						Home
					</Link>
					<Link href="/" className={styles.link}>
						The team
					</Link>
					<Link href="/" className={styles.link}>
						Blog
					</Link>
					<Link href="/" className={styles.buttonLink}>
						Get in touch
					</Link>
				</Stack>
			)}
		</header>
	);
};

export default Header;
