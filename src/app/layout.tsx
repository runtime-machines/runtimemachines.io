import Image from 'next/image';
import './globals.css';
import { Poppins } from 'next/font/google';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { Providers } from './components/Providers';
import CookieBanner from './components/CookieBanner';
import { Metadata } from 'next';
import getURL from '@/utils/getUrl';

const poppins = Poppins({
	subsets: ['devanagari', 'latin'],
	weight: ['400', '500', '700', '800', '900'],
});

const URLBase = new URL(getURL(''));
const metatagTitle = 'Blockchain Engineering & Consulting | RunTime Machines';
const metatagDescription =
	'Specializing in blockchain consulting and development, we offer tailored services for harnessing the transformative power of blockchain technology through strategic advice and innovative solution development.';

export const metadata: Metadata = {
	metadataBase: URLBase,
	title: 'RunTime Machines: Blockchain Engineering & Consulting',
	description:
		'Specializing in blockchain consulting and development, we offer tailored services for harnessing the transformative power of blockchain technology through strategic advice and innovative solution development.',
	openGraph: {
		type: 'website',
		url: URLBase,
		title: metatagTitle,
		description: metatagDescription,
		images: {
			url: '/metatag-image.jpg',
			alt: 'RunTime Machines website',
		},
	},
	twitter: {
		card: 'summary_large_image',
		site: URLBase.toString(),
		title: metatagTitle,
		description: metatagDescription,
		images: {
			url: '/metatag-image.jpg',
			alt: 'RunTime Machines website',
		},
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<Providers>
			<html lang="en">
				<body className={poppins.className}>
					<div className="ellipse1-continaer">
						<Image
							src="/assets/backgroundSVGs/Ellipse_1.svg"
							alt="bg svg"
							fill
							className="ellipse1"
							sizes="(max-width: 768px) 700px, (max-width: 1200px) 900px, 900px"
							loading="eager"
						/>
					</div>

					<div className="ellipse2-continaer">
						<Image
							src="/assets/backgroundSVGs/Ellipse_2.svg"
							alt="bg svg"
							fill
							sizes="(max-width: 768px) 700px, (max-width: 1200px) 900px, 900px"
							loading="eager"
						/>
					</div>
					<Header />
					{children}
					<Footer />
					<CookieBanner />
				</body>
			</html>
		</Providers>
	);
}
