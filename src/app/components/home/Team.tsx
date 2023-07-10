import { Box, Stack, Typography, useMediaQuery } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import styles from './team.module.css';
import { CallToActionBTN } from '../buttons/CallToActionBTN';

const Team = () => {
	const matches = useMediaQuery('(max-width: 1470px)');
	return (
		<>
			{!matches ? (
				<>
					<div className={`${styles.avatarContainer} ${styles.avatarLeft}`}>AVATAR 1</div>
					<div className={`${styles.avatarContainer} ${styles.avatarRight}`}>AVATAR 2</div>
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
						Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet
						odio mattis.
					</Typography>
				</Box>
				<CallToActionBTN text="More about us" Icon={ChevronRight} />
			</Stack>
		</>
	);
};

export default Team;
