'use client';

import { Box, Stack, useMediaQuery } from '../mui/Components';
import { CallToActionBTN } from '../buttons/CallToActionBTN';
import { ChevronRight } from '@mui/icons-material';
import BlogCard from '../blog/BlogCard';
import { blogData } from '../../../../mockedData';
import { use } from 'react';

type TProps = {
	posts: any[];
};

const PostsPreview = ({ posts }: TProps) => {
	const matches = useMediaQuery('(max-width: 1100px)');
	const sliceEnd = matches ? 1 : 3;
	const clickHandler = () => {
		console.log('clicked');
	};
	return (
		<Stack direction="column" alignItems="center" minHeight={700} spacing={6}>
			<Box textAlign="center">
				<h2 className="boxTitle">Latest from our blog</h2>
			</Box>
			<Box display="flex" justifyContent="center" gap={4} padding="0 60px">
				{posts.slice(0, sliceEnd).map((article, index) => (
					<BlogCard
						image={{ src: article.coverImage, alt: article.title }}
						title={article.title}
						body={article.excerpt}
						tag={article.tags[0]}
						key={index}
						slug={article.slug}
					/>
				))}
			</Box>

			<CallToActionBTN text="Read more" Icon={ChevronRight} path="/blog" />
		</Stack>
	);
};

export default PostsPreview;
