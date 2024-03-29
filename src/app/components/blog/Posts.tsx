'use client';

import { useState } from 'react';
import styles from './posts.module.css';
import { PostMetadata } from '../../../../types';
import BlogCard from './BlogCard';
import { BTNTest } from '../buttons/BTNTest';
import { Box } from '../mui/Components';

type TProps = {
	posts: PostMetadata[];
};

const Posts = ({ posts }: TProps) => {
	const [loadCount, setLoadCount] = useState(4);

	const clickHandler = () => {
		setLoadCount(loadCount + 3);
	};

	return (
		<>
			<Box display="flex" gap="20px" flexWrap="wrap" className={styles.postsContainer}>
				{posts.slice(1, loadCount).map((article, index) => (
					<BlogCard
						isMain={false}
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

			{loadCount < posts.length && <BTNTest text="Load more" clickHandler={clickHandler} />}
		</>
	);
};

export default Posts;
