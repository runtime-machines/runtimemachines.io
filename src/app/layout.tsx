import Image from 'next/image';
import './globals.css';
import { Poppins } from 'next/font/google';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

const poppins = Poppins({
	subsets: ['devanagari', 'latin'],
	weight: ['400', '500', '700', '800', '900'],
});

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={poppins.className}>
				<Image src="/backgroundSVGs/Ellipse_1.svg" alt="Next.js Logo" width={100} height={100} className="ellipse1" />
				<Image src="/backgroundSVGs/Ellipse_2.svg" alt="Next.js Logo" width={100} height={100} className="ellipse2" />
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
