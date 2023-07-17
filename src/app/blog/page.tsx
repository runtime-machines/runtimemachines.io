import { Box, Stack } from '../components/mui/Components';
import CurvesSection from '../components/backgrounds/CurvesSection';
import styles from './page.module.css';
import BlogCard from '../components/blog/BlogCard';

import { CallToActionBTN } from '../components/buttons/CallToActionBTN';
import getPostMetadata from '@/lib/getPostMetadata';
import { BTNTest } from '../components/buttons/BTNTest';
import Posts from '../components/blog/Posts';

const page = () => {
	const posts = getPostMetadata();
	return (
		<main className={styles.main}>
			<CurvesSection />
			<Stack direction="column" spacing={4} width="100%" alignItems="center" className={styles.sectionContainer}>
				<h1 className={styles.pageTitle}>News from our blog</h1>
				<Box className={styles.blogCardsContainer} width="100%">
					<BlogCard
						slug={posts[0].slug}
						readTime={posts[0].readTime}
						body={posts[0].excerpt}
						tag={posts[0].tags[0]}
						title={posts[0].title}
						key={1}
						image={{ src: posts[0].coverImage, alt: posts[0].title }}
						isMain
					/>
				</Box>
				<Posts posts={posts} />
			</Stack>
		</main>
	);
};

export default page;
