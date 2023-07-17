'use client';

import { Box, Divider, Stack, Typography } from '@mui/material';
import styles from './relatedArticles.module.css';
import BlogCard from './BlogCard';

type TProps = {
	relatedArticles: any[];
};

const RelatedArticles = ({ relatedArticles }: TProps) => {
	return (
		<Box className={styles.container}>
			<Divider className={styles.divider} />
			<Stack>
				<h3 className={styles.title}>Related articles</h3>
				<Box display="flex" gap="20px" flexWrap="wrap" justifyContent="flex-start">
					{relatedArticles.map((article, index) => (
						<BlogCard
							image={{ src: article.coverImage, alt: article.title }}
							title={article.title}
							body={article.excerpt}
							tag={article.tags[0]}
							key={index}
							slug={article.slug}
							readTime={article.readTime}
						/>
					))}
				</Box>
			</Stack>
		</Box>
	);
};

export default RelatedArticles;
