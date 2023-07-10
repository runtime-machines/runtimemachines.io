import { Avatar, Card, CardContent, CardMedia, Typography } from '@mui/material';
import styles from './memberCard.module.css';

type TProps = {
	image: {
		src: string;
		alt: string;
	};
	name: string;
	role: string;
};

const MemberCard = ({ image, name, role }: TProps) => {
	return (
		<Card className={styles.card}>
			<Avatar src={image.src} alt={image.alt} className={styles.avatar} />
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
};

export default MemberCard;
