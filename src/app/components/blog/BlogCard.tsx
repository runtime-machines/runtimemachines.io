'use client';

import { Box, Card, CardMedia, CardContent, Chip, Typography } from '@mui/material';
import styles from './blogCard.module.css';
import Link from 'next/link';
import Tag from './Tag';

type TProps = {
	slug: string;
	image: {
		src: string;
		alt: string;
	};
	title: string;
	body: string;
	tag: string;
	readTime?: string;
	isMain?: boolean;
	width?: number | string;
};

const BlogCard = ({ image, title, body, tag, readTime, isMain, slug, width }: TProps) => {
	return (
		<>
			{isMain ? (
				<Link href={`/blog/${slug}`}>
					<Card className={styles.mainCard}>
						<CardMedia image={image.src} title={image.alt} className={styles.mainImage} />
						<CardContent className={styles.content}>
							<Box>
								<Tag tag={tag} />
								{readTime ? <span className={styles.readTime}>{readTime} min read</span> : null}
							</Box>

							<Typography gutterBottom variant="h5" component="div" className={styles.mainTitle}>
								{title}
							</Typography>
							<Typography variant="body2" className={styles.body}>
								{body}
							</Typography>
						</CardContent>
					</Card>
				</Link>
			) : (
				<Link
					href={`/blog/${slug}`}
					className={styles.linkContainer}
					style={{ maxWidth: `${width ? width : 'calc(100% / 3 - 20px)'}` }}>
					<Card className={styles.card}>
						<CardMedia image={image.src} title={image.alt} className={styles.imageContainer} />
						<CardContent className={styles.content}>
							<Box>
								<Tag tag={tag} />
								{readTime ? <span className={styles.readTime}>{readTime} min read</span> : null}
							</Box>

							<Typography gutterBottom variant="h5" component="div" className={styles.title}>
								{title}
							</Typography>
							<Typography variant="body2" className={styles.body}>
								{body}
							</Typography>
						</CardContent>
					</Card>
				</Link>
			)}
		</>
	);
};

export default BlogCard;
