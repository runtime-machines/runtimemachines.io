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

export default function Home() {
	return (
		<main className={styles.main}>
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
				<Image
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
				/>

				<Stack direction="column" justifyContent="center" className={styles.cardsContainer} minHeight={700} spacing={8}>
					<Box display="flex" alignItems="center" className={styles.card}>
						<Image src="/lab021.png" alt="img" width={80} height={120} className={styles.img} />

						<Stack display="flex" flexDirection="column" className={styles.cardText} paddingX={10} spacing={8}>
							<Box>
								<h2 className={styles.cardTitle}>What we think</h2>

								<Typography variant="body1" className={styles.cardSubtitle}>
									Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac
									aliquet odio mattis.
								</Typography>
							</Box>

							<CallToActionBTN text="Learn more" Icon={ChevronRight} />
						</Stack>
					</Box>

					<Box display="flex" alignItems="center" className={styles.card}>
						<Stack display="flex" flexDirection="column" className={styles.cardText} paddingX={10} spacing={8}>
							<Box>
								<h2 className={styles.cardTitle}>What we think</h2>

								<Typography variant="body1" className={styles.cardSubtitle}>
									Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac
									aliquet odio mattis.
								</Typography>
							</Box>

							<CallToActionBTN text="Learn more" Icon={ChevronRight} />
						</Stack>
						<Image src="/tablesketchcolour2 1.png" alt="img" width={80} height={120} className={styles.img} />
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
						<h2 className={styles.cardTitle}>The hive mind behind RunTime Machines</h2>
						<Typography variant="body1" className={styles.cardSubtitle}>
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
						<h2 className={styles.cardTitle}>Don’t take our word for it</h2>
						<Typography variant="body1" className={styles.cardSubtitle}>
							Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac
							aliquet odio mattis.
						</Typography>
					</Box>

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

					<CallToActionBTN text="Check our latest projects" Icon={ChevronRight} />
				</Stack>
			</section>

			<section className={styles.blog}>
				<Stack direction="column" alignItems="center" minHeight={700} spacing={6}>
					<Box maxWidth={928}>
						<h2 className={styles.cardTitle}>Latest from out blog</h2>
					</Box>
					<Box display="flex" gap={4}>
						{blogData.map((article, index) => (
							<BlogCard image={article.image} title={article.title} body={article.body} tag={article.tag} key={index} />
						))}
					</Box>

					<CallToActionBTN text="Read more" Icon={ChevronRight} />
				</Stack>
			</section>
		</main>
	);
}
