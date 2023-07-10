import { Box, Stack, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import styles from './weThinkWeBuild.module.css';
import { CallToActionBTN } from '../buttons/CallToActionBTN';
import { ChevronRight } from '@mui/icons-material';

type TProps = {
	type: 'left' | 'right';
	title: string;
	subtitle: string;
	img: {
		src: string;
		alt: string;
	};
};

const WeThinkWeBuild = ({ type, title, subtitle, img }: TProps) => {
	const matches = useMediaQuery('(max-width: 1100px)');
	return (
		<>
			{matches ? (
				<Stack direction="column" justifyContent="center" className={styles.cardsContainer} minHeight={700} spacing={8}>
					<Box display="flex" flexDirection="column" alignItems="center" gap={5} className={styles.card}>
						<Box className={styles.imgContainer}>
							<Image src={img.src} alt={img.alt} fill />
						</Box>

						<Stack display="flex" flexDirection="column" spacing={8} alignItems="center">
							<Box className="textBox">
								<h2 className="boxTitle">{title}</h2>

								<Typography variant="body1" className="boxSubtitle">
									{subtitle}
								</Typography>
							</Box>

							<CallToActionBTN text="Learn more" Icon={ChevronRight} />
						</Stack>
					</Box>
				</Stack>
			) : type === 'left' ? (
				<Stack direction="column" justifyContent="center" className={styles.cardsContainer} minHeight={700} spacing={8}>
					<Box display="flex" alignItems="center" gap={20} className={styles.card}>
						<Box className={styles.imgContainer}>
							<Image src={img.src} alt={img.alt} fill />
						</Box>

						<Stack display="flex" flexDirection="column" spacing={8}>
							<Box className="textBox" textAlign="left">
								<h2 className="boxTitle">{title}</h2>

								<Typography variant="body1" className="boxSubtitle">
									{subtitle}
								</Typography>
							</Box>

							<CallToActionBTN text="Learn more" Icon={ChevronRight} />
						</Stack>
					</Box>
				</Stack>
			) : (
				<Box display="flex" alignItems="center" gap={20} className={styles.card}>
					<Stack display="flex" flexDirection="column" spacing={8}>
						<Box className="textBox" alignItems="space-between" textAlign="left">
							<h2 className="boxTitle">{title}</h2>

							<Typography variant="body1" className="boxSubtitle">
								{subtitle}
							</Typography>
						</Box>

						<CallToActionBTN text="Learn more" Icon={ChevronRight} />
					</Stack>
					<Box className={styles.imgContainer}>
						<Image src={img.src} alt={img.alt} fill />
					</Box>
				</Box>
			)}
		</>
	);
};

export default WeThinkWeBuild;
