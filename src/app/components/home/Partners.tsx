import { Stack } from '../mui/Components';
import Image from 'next/image';
import styles from './partners.module.css';

const PartnersLogos = [
	{
		src: '/assets/partners/1674129111794-2-removebg-preview.png',
		alt: 'Agire Foundation',
	},
	{
		src: '/assets/partners/arbitri.png',
		alt: 'Arbitri',
	},
	{
		src: '/assets/partners/chainstack-white 1.png',
		alt: 'Chainstack',
	},
	{
		src: '/assets/partners/cryptnox.png',
		alt: 'Cryptnox',
	},
	{
		src: '/assets/partners/CVA-logo-white.png',
		alt: 'CVA',
	},
	{
		src: '/assets/partners/Hylabs.png',
		alt: 'Hylabs',
	},
	{
		src: '/assets/partners/Metaroom.png',
		alt: 'Metaroom',
	},
	{
		src: '/assets/partners/swissDAO.png',
		alt: 'SwissDAO',
	},
	{
		src: '/assets/partners/trustsquare_negativ_rgb_quer_atlassian.png',
		alt: 'Trust Square',
	},
];

const Partners = () => {
	return (
		<>
			<p className={styles.partnersSubtitle}>Trusted by tech teams, developers, and marketeers worldwide.</p>
			<Stack gap="10px" className={styles.partnersLogos}>
				{PartnersLogos.map((logo, i) => (
					<div key={i} className={styles.logo}>
						<Image src={logo.src} alt={logo.alt} fill />
					</div>
				))}
			</Stack>
		</>
	);
};

export default Partners;
