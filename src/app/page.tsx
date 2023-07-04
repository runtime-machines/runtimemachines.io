'use client';

import Image from 'next/image';
import { CallToActionBTN } from './components/buttons/CallToActionBTN';
import styles from './page.module.css';
import './globals.css';
import { Typography, Stack, Box } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import Carousel from './components/carousel/Carousel';
import TestimonialCard from './components/carousel/TestimonialCard';
import { blogData, testimonialData } from '../../mockedData';
import BlogCard from './components/BlogCard';
import CurvesSection from './components/backgrounds/CurvesSection';

export default function Home() {
	const postMetadata = blogData; //getPostMetadata();

	return (
		<main className={styles.main}>
			<CurvesSection />
			<Stack className={styles.heroSection} spacing={5}>
				<h1 className={styles.heroTitle}>Lorem Ipsum dolot sit amet</h1>
				<p className={styles.heroSubtitle}>
					Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet
					odio mattis.
				</p>
				<CallToActionBTN text="Get in touch" />
			</Stack>

			<section className={styles.partners}>
				<p className={styles.partnersSubtitle}>Trusted by tech teams, developers, and marketeers worldwide.</p>
				<Stack direction="row" spacing={2} className={styles.partnersLogos}>
					<Image src="/webflow.svg" alt="webflow" width={100} height={100} className={styles.logo} />
					<Image src="/relume.svg" alt="relume" width={100} height={100} className={styles.logo} />
					<Image src="/webflow.svg" alt="webflow" width={100} height={100} className={styles.logo} />
					<Image src="/relume.svg" alt="relume" width={100} height={100} className={styles.logo} />
					<Image src="/webflow.svg" alt="webflow" width={100} height={100} className={styles.logo} />
					<Image src="/relume.svg" alt="relume" width={100} height={100} className={styles.logo} />
				</Stack>
			</section>

			<section className={styles.weThinkWeBuild}>
				{/* 	<Image
					src="/backgroundSVGs/Vector_3.svg"
					alt="webflow"
					width={0}
					height={0}
					sizes="100vw"
					className={styles.vectorBGtop}
				/>

				<Image
					src="/backgroundSVGs/Vector_4.svg"
					alt="webflow"
					width={0}
					height={0}
					sizes="100vw"
					className={styles.vectorBGbottom}
				/> */}

				<Stack direction="column" justifyContent="center" className={styles.cardsContainer} minHeight={700} spacing={8}>
					<Box display="flex" alignItems="center" gap={20} className={styles.card}>
						<Box className={styles.imgContainer}>
							<Image src="/lab021.png" alt="img" fill />
						</Box>

						<Stack display="flex" flexDirection="column" spacing={8}>
							<Box className="textBox">
								<h2 className="boxTitle">What we think</h2>

								<Typography variant="body1" className="boxSubtitle">
									Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac
									aliquet odio mattis.
								</Typography>
							</Box>

							<CallToActionBTN text="Learn more" Icon={ChevronRight} />
						</Stack>
					</Box>

					<Box display="flex" alignItems="center" gap={20} className={styles.card}>
						<Stack display="flex" flexDirection="column" spacing={8}>
							<Box className="textBox" alignItems="space-between">
								<h2 className="boxTitle">What we think</h2>

								<Typography variant="body1" className="boxSubtitle">
									Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac
									aliquet odio mattis.
								</Typography>
							</Box>

							<CallToActionBTN text="Learn more" Icon={ChevronRight} />
						</Stack>
						<Box className={styles.imgContainer}>
							<Image src="/tablesketchcolour2 1.png" alt="img" fill />
						</Box>
					</Box>
				</Stack>
			</section>

			<section className={styles.us}>
				<div className={`${styles.avatarContainer} ${styles.avatarLeft}`}>AVATAR 1</div>
				<div className={`${styles.avatarContainer} ${styles.avatarRight}`}>AVATAR 2</div>
				<Stack
					display="flex"
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
					spacing={6}
					maxWidth={928}>
					<Box>
						<h2 className="boxTitle">The hive mind behind RunTime Machines</h2>
						<Typography variant="body1" className="boxSubtitle">
							Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac
							aliquet odio mattis.
						</Typography>
					</Box>
					<CallToActionBTN text="More about us" Icon={ChevronRight} />
				</Stack>
			</section>

			<section className={styles.testimonials}>
				<Stack direction="column" justifyContent="center" alignItems="center" minHeight={700} spacing={6}>
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

					<CallToActionBTN text="Check our latest projects" Icon={ChevronRight} />
				</Stack>
			</section>

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

					<CallToActionBTN text="Read more" Icon={ChevronRight} />
				</Stack>
			</section>
		</main>
	);
}
