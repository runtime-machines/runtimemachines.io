'use client';

import { useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { East, West } from '@mui/icons-material';
import styles from './carousel.module.css';
import '../../globals.css';

type TProps = {
	items: JSX.Element[];
};

type TDotsProps = {
	n: number;
	currentBlock: number;
	handleClick: (pageNumber: number) => void;
};

const Dots = ({ n, currentBlock, handleClick }: TDotsProps) => {
	const components = [];

	for (let i = 0; i < n; i++) {
		components.push(
			<span
				key={i}
				className={`${styles.dot} ${i + 1 === currentBlock ? styles.active : ''}`}
				onClick={() => handleClick(i + 1)}
			/>
		);
	}

	return <div className={styles.dots}>{components}</div>;
};

const Carousel = ({ items }: TProps) => {
	const matches = useMediaQuery('(max-width: 1100px)');
	const [currentBlock, setCurrentBlock] = useState(1);

	const itemsPerPage = matches ? 1 : 3;
	const totalBlocks = Math.ceil(items.length / itemsPerPage);

	const incrementBlock = () => {
		if (currentBlock < totalBlocks) {
			setCurrentBlock(currentBlock + 1);
		}
	};

	const decrementBlock = () => {
		if (currentBlock > 1) {
			setCurrentBlock(currentBlock - 1);
		}
	};

	const handleDotClick = (pageNumber: number) => {
		setCurrentBlock(pageNumber);
	};

	const startIndex = (currentBlock - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentItems = items.slice(startIndex, endIndex);

	return (
		<Box className={styles.carousel}>
			<div className={styles.itemsContainer}>{currentItems.map((item) => item)}</div>
			<div className={styles.dots}>
				<Dots n={totalBlocks} currentBlock={currentBlock} handleClick={handleDotClick} />
			</div>
			<div className={styles.arrows}>
				<div className={styles.arrowContainer} onClick={decrementBlock}>
					<West className={styles.arrow} />
				</div>
				<div className={styles.arrowContainer} onClick={incrementBlock}>
					<East className={styles.arrow} />
				</div>
			</div>
		</Box>
	);
};

export default Carousel;
