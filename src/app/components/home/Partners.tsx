'use client';

import { Stack, useMediaQuery } from '../mui/Components';
import Image from 'next/image';
import styles from './partners.module.css';

const PartnersLogos = [
	{
		src: '/assets/partners/swissDAO.png',
		alt: 'SwissDAO',
		width: 190,
		height: 48,
		mobileWidth: 143,
		mobileHeight: 36,
	},
	{
		src: '/assets/partners/chainstack-white 1.png',
		alt: 'Chainstack',
		width: 297,
		height: 48,
		mobileWidth: 223,
		mobileHeight: 36,
	},
	{
		src: '/assets/partners/Hylabs.png',
		alt: 'Hylabs',
		width: 166,
		height: 48,
		mobileWidth: 125,
		mobileHeight: 36,
	},
	{
		src: '/assets/partners/trustsquare_negativ_rgb_quer_atlassian.png',
		alt: 'Trust Square',
		width: 235,
		height: 48,
		mobileWidth: 176,
		mobileHeight: 36,
	},
	{
		src: '/assets/partners/arbitri.png',
		alt: 'Arbitri',
		width: 99,
		height: 48,
		mobileWidth: 75,
		mobileHeight: 36,
	},
	{
		src: '/assets/partners/CVA-logo-white.png',
		alt: 'CVA',
		width: 245,
		height: 48,
		mobileWidth: 184,
		mobileHeight: 36,
	},
	{
		src: '/assets/partners/1674129111794-2-removebg-preview.png',
		alt: 'Agire Foundation',
		width: 136,
		height: 88,
		mobileWidth: 102,
		mobileHeight: 66,
	},

	{
		src: '/assets/partners/cryptnox.png',
		alt: 'Cryptnox',
		width: 103,
		height: 48,
		mobileWidth: 77,
		mobileHeight: 36,
	},

	{
		src: '/assets/partners/Metaroom.png',
		alt: 'Metaroom',
		width: 43,
		height: 48,
		mobileWidth: 32,
		mobileHeight: 36,
	},
];

const Partners = () => {
	const matches = useMediaQuery('(max-width:1100px)');

	return (
		<>
			<p className={styles.partnersSubtitle}>Trusted by tech teams, developers, and marketeers worldwide.</p>
			<Stack className={styles.partnersLogos}>
				{PartnersLogos.map((logo, i) => (
					<div
						key={i}
						className={styles.logo}
						style={{
							width: matches ? logo.mobileWidth : logo.width,
							height: matches ? logo.mobileHeight : logo.height,
						}}>
						<Image src={logo.src} alt={logo.alt} fill />
					</div>
				))}
			</Stack>
		</>
	);
};

export default Partners;
