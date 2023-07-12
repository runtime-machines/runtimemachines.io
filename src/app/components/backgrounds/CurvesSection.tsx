import Image from 'next/image';
import styles from './curvesSection.module.css';
import { Children, ReactElement, ReactNode } from 'react';

const CurvesSection = () => {
	return (
		<div className={styles.block}>
			<div className={styles.SVGsContainer}>
				<Image
					src="/assets/backgroundSVGs/Vector_3.svg"
					alt="webflow"
					width={0}
					height={0}
					sizes="100vw"
					className={`${styles.base} ${styles.waveTop}`}
				/>
				<Image
					src="/assets/backgroundSVGs/Rectangle.svg"
					alt="webflow"
					width={0}
					height={0}
					sizes="100vw"
					className={`${styles.base} ${styles.rectangle}`}
				/>

				<Image
					src="/assets/backgroundSVGs/Vector_4.svg"
					alt="webflow"
					width={0}
					height={0}
					sizes="100vw"
					className={`${styles.base} ${styles.waveBottom}`}
				/>
			</div>
		</div>
	);
};

export default CurvesSection;
