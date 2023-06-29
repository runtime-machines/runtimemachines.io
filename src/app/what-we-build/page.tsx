import CurvesSection from '../components/backgrounds/CurvesSection';
import styles from './page.module.css';
import '../globals.css';

const page = () => {
	return (
		<main className={styles.main}>
			WHAT WE BUILD
			<div className="sectionContainer">
				<h1>My SEction TIle</h1>
				<p>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero, laboriosam earum recusandae provident dicta
					consectetur temporibus quas. Eaque provident atque laboriosam totam minima, autem, culpa tenetur tempora illo
					error eos?
				</p>
				<CurvesSection />
			</div>
		</main>
	);
};

export default page;
