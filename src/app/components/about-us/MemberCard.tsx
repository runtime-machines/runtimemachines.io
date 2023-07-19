'use client';

import { Card, CardContent, Typography } from '@mui/material';
import styles from './memberCard.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { LinkedIn } from '@mui/icons-material';
import { TeamMemberProps } from '../../../lib/teamMembers';

const MemberCard = ({ img, name, role, subRule, linkedin }: TeamMemberProps) => {
	const inner = (
		<Card className={styles.card}>
			{linkedin && <LinkedIn className={styles.icon} />}
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
				{subRule && (
					<Typography variant="body2" className={styles.role}>
						{subRule}
					</Typography>
				)}
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
