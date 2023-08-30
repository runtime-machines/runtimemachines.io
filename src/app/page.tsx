import styles from './page.module.css';
import './globals.css';

import CurvesSection from './components/backgrounds/CurvesSection';
import Team from './components/home/Team';
import getPostMetadata from '@/lib/getPostMetadata';
import PostsPreview from './components/home/PostsPreview';
import Testimonials from './components/home/Testimonials';
import WeThinkWeBuildSection from './components/home/WeThinkWeBuild';
import Partners from './components/home/Partners';
import HeroSection from './components/home/HeroSection';
import EndingSection from './components/home/EndingSection';

export default function Home() {
	/* const posts = getPostMetadata(); */

	return (
		<main className={styles.main}>
			<CurvesSection />
			<EndingSection />
			<HeroSection />

			<section className={styles.partners}>
				<Partners />
			</section>

			<section className={styles.weThinkWeBuild}>
				<WeThinkWeBuildSection />
			</section>

			<section className={styles.us}>
				<Team />
			</section>

			{/* 		<section className={styles.testimonials}>
				<Testimonials />
			</section> */}

			{/* 	<section className={styles.blog}>
				<PostsPreview posts={posts} />
			</section> */}
		</main>
	);
}
