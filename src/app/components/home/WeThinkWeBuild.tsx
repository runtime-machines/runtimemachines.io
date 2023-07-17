'use client';

import { Box, Stack, Typography, useMediaQuery } from '../mui/Components';
import Image from 'next/image';
import styles from './weThinkWeBuild.module.css';
import { CallToActionBTN } from '../buttons/CallToActionBTN';
import { ChevronRight } from '@mui/icons-material';

type TProps = {
	type: 'left' | 'right';
	title: string;
	subtitle: string | JSX.Element;
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
				<Box display="flex" alignItems="center" justifyContent="space-between" gap={20} className={styles.card}>
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

const WeThinkWeBuildSection = () => {
	return (
		<Stack direction="column" justifyContent="center" className={styles.cardsContainer} minHeight={700} spacing={8}>
			<Stack direction="column" justifyContent="center" className={styles.cardsContainer} minHeight={700} spacing={8}>
				<WeThinkWeBuild
					type="left"
					img={{ src: '/assets/illustrations/we_think.png', alt: 'img' }}
					key={1}
					title="What we think"
					subtitle={
						<p>
							Pioneering newest fields of Blockchain Technology and Advanced Cryptography.
							<br />
							We test, verify, and develop YOUR IDEAS.
						</p>
					}
				/>

				<WeThinkWeBuild
					type="right"
					img={{ src: '/assets/illustrations/we_build.png', alt: 'img' }}
					key={2}
					title="What we build"
					subtitle={
						<p>
							We build blockchain Protocols, ZK-tech, dApps, Infrastructure, DEXs, Tokenisation platforms, Dev Toolings,
							and Web3 UX / UI design.
							<br /> <br /> We are best at:
							<br /> Prototypes | MVPs | Full-Cycle Product Development
						</p>
					}
				/>
			</Stack>
		</Stack>
	);
};

export default WeThinkWeBuildSection;
