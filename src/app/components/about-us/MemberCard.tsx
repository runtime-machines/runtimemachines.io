import { Avatar, Card, CardContent, CardMedia, Typography } from '@mui/material';
import styles from './memberCard.module.css';
import Image from 'next/image';
import Link from 'next/link';

type TProps = {
	image: {
		src: string;
		alt: string;
	};
	name: string;
	role: string;
	linkedIn?: string;
};

const MemberCard = ({ image, name, role, linkedIn }: TProps) => {
	return (
		<Link href={linkedIn ?? '/about-us'} target="_blank">
			<Card className={styles.card}>
				<div className={styles.avatar}>
					<Image src={image.src} alt={image.alt} fill />
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
		</Link>
	);
};

export default MemberCard;
