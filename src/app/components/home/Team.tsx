'use client';

import { Box, Stack, Typography, useMediaQuery } from '../mui/Components';
import { ChevronRight } from '@mui/icons-material';
import styles from './team.module.css';
import { CallToActionBTN } from '../buttons/CallToActionBTN';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Team = () => {
	const matches = useMediaQuery('(max-width: 1180px)');
	const router = useRouter();

	const clickHandler = () => {
		router.push('/about-us');
	};
	return (
		<>
			{!matches ? (
				<>
					<div className={`${styles.avatarContainer} ${styles.avatarLeft}`}>
						<Image src="/assets/avatars/shyam_duraiswami.png" alt="avatar1" fill />
					</div>
					<div className={`${styles.avatarContainer} ${styles.avatarRight}`}>
						<Image src="/assets/avatars/nadia_fabrizio.png" alt="avatar1" fill />
					</div>
				</>
			) : null}

			<Stack
				display="flex"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				spacing={6}
				maxWidth={928}>
				<Box>
					<h2 className="boxTitle">The hive mind behind RunTime Machines</h2>
					<Typography variant="body1" className="boxSubtitle">
						A highly educated team of researchers and developers for disruptive technologies.
					</Typography>
				</Box>
				<CallToActionBTN text="More about us" Icon={ChevronRight} path="/" />
			</Stack>
		</>
	);
};

export default Team;
