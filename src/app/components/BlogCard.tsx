import { Card, CardMedia, CardContent, Chip, Typography } from '@mui/material';
import styles from './blogCard.module.css';

type TProps = {
	image: {
		src: string;
		alt: string;
	};
	title: string;
	body: string;
	tag: string;
};

const BlogCard = ({ image, title, body, tag }: TProps) => {
	return (
		<Card className={styles.card}>
			<CardMedia image={image.src} title={image.alt} className={styles.imageContainer} />
			<CardContent className={styles.content}>
				<Chip label={'#' + tag} className={styles.chip} />
				<Typography gutterBottom variant="h5" component="div" className={styles.title}>
					{title}
				</Typography>
				<Typography variant="body2" className={styles.body}>
					{body}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default BlogCard;
