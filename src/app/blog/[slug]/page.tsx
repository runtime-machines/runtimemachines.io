import MarkDown from 'markdown-to-jsx';

import styles from './page.module.css';
import CurvesSection from '@/app/components/backgrounds/CurvesSection';
import getPostContent from '@/lib/getPostContent';
import getPostMetadata from '@/lib/getPostMetadata';
import Image from 'next/image';
import { Article } from '@mui/icons-material';
import ArticleHeader from '@/app/components/blog/ArticleHeader';
import RelatedArticles from '@/app/components/blog/RelatedArticles';
import { blogData } from '../../../../mockedData';

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
	const { content, title, coverImage, tags, readTime } = getPostContent(params.slug);

	return (
		<main className={styles.main}>
			<CurvesSection />

			<div className={styles.container}>
				<ArticleHeader title={title} coverImage={coverImage} tags={tags} readTime={readTime} />

				<article className={styles.content}>
					<MarkDown>{content}</MarkDown>
				</article>

				<RelatedArticles relatedArticles={blogData.slice(0, 2)} />
			</div>
		</main>
	);
};

export default page;
