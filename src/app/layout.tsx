import Image from 'next/image';
import './globals.css';
import { Poppins } from 'next/font/google';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { Providers } from './components/Providers';
import CookieBanner from './components/CookieBanner';

const poppins = Poppins({
	subsets: ['devanagari', 'latin'],
	weight: ['400', '500', '700', '800', '900'],
});

export const metadata = {
	title: 'RunTime Machines: Blockchain Engineering & Consulting',
	description:
		'Specializing in blockchain consulting and development, we offer tailored services for harnessing the transformative power of blockchain technology through strategic advice and innovative solution development.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<Providers>
			<html lang="en">
				<body className={poppins.className}>
					<div className="ellipse1-continaer">
						<Image src="/assets/backgroundSVGs/Ellipse_1.svg" alt="Next.js Logo" fill className="ellipse1" />
					</div>

					<div className="ellipse2-continaer">
						<Image src="/assets/backgroundSVGs/Ellipse_2.svg" alt="Next.js Logo" fill />
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
