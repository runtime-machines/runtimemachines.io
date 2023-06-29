'use client';

import { Avatar, Stack, Box } from '@mui/material';
import styles from './testimonialCard.module.css';

type TProps = {
	review: string;
	avatarImg: string;
	name: string;
	position: string;
	company: string;
};

const TestimonialCard = ({ review, avatarImg, company, name, position }: TProps) => {
	return (
		<Stack className={styles.card} display="flex" direction="column" justifyContent="space-between">
			<Box className={styles.review}>{review}</Box>
			<Box className={styles.avatarContainer}>
				<Avatar src={avatarImg} className={styles.avatar} />
				<Box padding="0 20px">
					<div className={styles.name}>{name}</div>
					<p className={styles.info}>
						{position}, {company}
					</p>
				</Box>
			</Box>
		</Stack>
	);
};

export default TestimonialCard;
