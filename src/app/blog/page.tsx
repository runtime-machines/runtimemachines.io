'use client';

import { Box, Stack } from '@mui/material';
import CurvesSection from '../components/backgrounds/CurvesSection';
import styles from './page.module.css';
import BlogCard from '../components/BlogCard';
import { blogData } from '../../../mockedData';

import { CallToActionBTN } from '../components/buttons/CallToActionBTN';

const mainTitle =
	'Dmystifying Blockchain: A Comprehensive Guide to Understanding the Technology Behind Cryptocurrencies';
const body = 'Nostalgic YikYaking Instagram Employee. Consumer Social underground crypto newsletter.';

const page = () => {
	return (
		<main className={styles.main}>
			<CurvesSection />
			<Stack direction="column" spacing={4} width="100%" alignItems="center" className={styles.sectionContainer}>
				<h1 className={styles.pageTitle}>News from our blog</h1>
				<Box className={styles.blogCardsContainer} width="100%">
					<BlogCard
						slug={blogData[0].slug}
						readTime="5"
						body={blogData[0].excerpt}
						tag={blogData[0].tags[0]}
						title={blogData[0].title}
						key={1}
						image={{ src: blogData[0].coverImage, alt: blogData[0].title }}
						isMain
					/>
				</Box>
				<Box display="flex" gap="20px" flexWrap="wrap" justifyContent="center">
					{blogData.map((article, index) => (
						<BlogCard
							image={{ src: article.coverImage, alt: article.title }}
							title={article.title}
							body={article.excerpt}
							tag={article.tags[0]}
							key={index}
							slug={article.slug}
							readTime="4"
						/>
					))}
				</Box>

				<CallToActionBTN text="Load more" />
			</Stack>
		</main>
	);
};

export default page;
