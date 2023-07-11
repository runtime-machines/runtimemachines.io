'use client';

import Image from 'next/image';
import { CallToActionBTN } from './components/buttons/CallToActionBTN';
import styles from './page.module.css';
import './globals.css';
import { Typography, Stack, Box, useMediaQuery } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import Carousel from './components/carousel/Carousel';
import TestimonialCard from './components/carousel/TestimonialCard';
import { blogData, testimonialData } from '../../mockedData';
import BlogCard from './components/BlogCard';
import CurvesSection from './components/backgrounds/CurvesSection';
import WeThinkWeBuild from './components/home/WeThinkWeBuild';
import Team from './components/home/Team';
import { useRouter } from 'next/navigation';

export default function Home() {
	const postMetadata = blogData; //getPostMetadata();
	const router = useRouter();
	const matches = useMediaQuery('(max-width: 1100px)');

	return (
		<main className={styles.main}>
			<CurvesSection />
			<Stack className={styles.heroSection} spacing={5}>
				<h1 className={styles.heroTitle}>Lorem Ipsum dolot sit amet</h1>
				<p className={styles.heroSubtitle}>
					Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet
					odio mattis.
				</p>
				<CallToActionBTN text="Get in touch" clickHandler={() => router.push('/contact-us')} />
			</Stack>

			<section className={styles.partners}>
				<p className={styles.partnersSubtitle}>Trusted by tech teams, developers, and marketeers worldwide.</p>
				<Stack gap="10px" className={styles.partnersLogos}>
					<div className={styles.logo}>
						<Image src="/webflow.svg" alt="webflow" fill />
					</div>
					<div className={styles.logo}>
						<Image src="/relume.svg" alt="webflow" fill />
					</div>
					<div className={styles.logo}>
						<Image src="/webflow.svg" alt="webflow" fill />
					</div>
					<div className={styles.logo}>
						<Image src="/relume.svg" alt="webflow" fill />
					</div>
					<div className={styles.logo}>
						<Image src="/webflow.svg" alt="webflow" fill />
					</div>
					<div className={styles.logo}>
						<Image src="/relume.svg" alt="webflow" fill />
					</div>
				</Stack>
			</section>

			<section className={styles.weThinkWeBuild}>
				<Stack direction="column" justifyContent="center" className={styles.cardsContainer} minHeight={700} spacing={8}>
					<Stack
						direction="column"
						justifyContent="center"
						className={styles.cardsContainer}
						minHeight={700}
						spacing={8}>
						<WeThinkWeBuild
							type="left"
							img={{ src: '/lab021.png', alt: 'img' }}
							key={1}
							title="What we think"
							subtitle="Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac
									aliquet odio mattis."
						/>

						<WeThinkWeBuild
							type="right"
							img={{ src: '/tablesketchcolour2 1.png', alt: 'img' }}
							key={1}
							title="What we build"
							subtitle="Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac
									aliquet odio mattis."
						/>
					</Stack>
				</Stack>
			</section>

			<section className={styles.us}>
				<Team />
			</section>

			<section className={styles.testimonials}>
				<Stack direction="column" justifyContent="center" alignItems="center" minHeight={700} spacing={4}>
					<Box maxWidth={928}>
						<h2 className="boxTitle">Don’t take our word for it</h2>
						<Typography variant="body1" className="boxSubtitle">
							Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac
							aliquet odio mattis.
						</Typography>
					</Box>

					<Box className={styles.carouselContainer}>
						<Carousel
							items={testimonialData.map((testimonial, index) => (
								<TestimonialCard
									key={index}
									review={testimonial.review}
									avatarImg={testimonial.avatarImg}
									name={testimonial.name}
									position={testimonial.position}
									company={testimonial.company}
								/>
							))}
						/>
					</Box>

					<CallToActionBTN text="Let's have a chat" Icon={ChevronRight} />
				</Stack>
			</section>

			{!matches ? (
				<section className={styles.blog}>
					<Stack direction="column" alignItems="center" minHeight={700} spacing={6}>
						<Box textAlign="center">
							<h2 className="boxTitle">Latest from our blog</h2>
						</Box>
						<Box display="flex" justifyContent="center" gap={4} padding="0 60px">
							{postMetadata.slice(0, 3).map((article, index) => (
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

						<CallToActionBTN text="Read more" Icon={ChevronRight} clickHandler={() => router.push('/blog')} />
					</Stack>
				</section>
			) : null}
		</main>
	);
}
