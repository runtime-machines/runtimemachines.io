'use client';

import { Box, Stack, Typography } from '../mui/Components';
import styles from './testimonials.module.css';
import Carousel from '../carousel/Carousel';
import { testimonialData } from '../../../../mockedData';
import TestimonialCard from '../carousel/TestimonialCard';
import { CallToActionBTN } from '../buttons/CallToActionBTN';
import { ChevronRight } from '@mui/icons-material';

type TProps = {
	clickHandler: () => void;
};

const Testimonials = () => {
	const clickHandler = () => {
		console.log('clicked');
	};
	return (
		<Stack direction="column" justifyContent="center" alignItems="center" minHeight={700} spacing={4}>
			<Box maxWidth={928}>
				<h2 className="boxTitle">What people say</h2>
				<Typography variant="body1" className="boxSubtitle">
					Our expertise lies in assisting corporate clients, institutions, and startups in the development of secure,
					trusted, and decentralized products through advanced cryptography and blockchain technology.
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

			<CallToActionBTN text="Let's have a chat" Icon={ChevronRight} path="/contact-us" />
		</Stack>
	);
};

export default Testimonials;
