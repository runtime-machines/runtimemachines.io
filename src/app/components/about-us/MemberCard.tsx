import { Card, CardContent, Typography } from '@mui/material';
import styles from './memberCard.module.css';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { TeamMemberProps } from '../../../lib/teamMembers';

const MemberCard = ({ img, name, role, linkedin }: TeamMemberProps) => {
	const inner = (
		<Card className={styles.card}>
			<div className={styles.avatar}>
				<Image src={img.src} alt={img.alt} fill />
			</div>
			<CardContent className={styles.content}>
				<Typography gutterBottom variant="h5" component="div" className={styles.name}>
					{name}
				</Typography>
				<Typography variant="body2" className={styles.role}>
					{role}
				</Typography>
			</CardContent>
		</Card>
	);

	return (
		<>
			{linkedin ? (
				<Link href={linkedin} target="_blank">
					{inner}
				</Link>
			) : (
				<>{inner}</>
			)}
		</>
	);
};

export default MemberCard;
