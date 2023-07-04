import MarkDown from 'markdown-to-jsx';

import { Box, Stack } from '@mui/material';

import styles from './page.module.css';
import CurvesSection from '@/app/components/backgrounds/CurvesSection';
import getPostContent from '@/lib/getPostContent';
import getPostMetadata from '@/lib/getPostMetadata';

export const generateStaticParams = async () => {
	const posts = getPostMetadata();

	return posts.map((post) => ({
		slug: post.slug,
	}));
};

const page = async ({
	params,
}: {
	params: {
		slug: string;
	};
}) => {
	const content = getPostContent(params.slug);

	return (
		<main className={styles.main}>
			<CurvesSection />

			<article className={styles.content}>
				<MarkDown>{content}</MarkDown>
			</article>
		</main>
	);
};

export default page;
