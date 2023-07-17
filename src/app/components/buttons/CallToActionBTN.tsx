'use client';

import { useRouter } from 'next/navigation';
import { TypeIcon } from '../../../../types';
import styles from './buttons.module.css';
import Button from '@mui/material/Button';

type TProps = {
	text: string;
	classNameProp?: string;
	Icon?: TypeIcon;
	path?: string;
};

export const CallToActionBTN = ({ text, Icon, classNameProp, path }: TProps) => {
	const router = useRouter();
	const clickHandler = () => {
		path && router.push(path);
	};
	return (
		<Button variant="contained" className={styles.callToActionBTN + ' ' + classNameProp} onClick={clickHandler}>
			<span>{text}</span>
			{Icon && <Icon className={styles.iconBtn} />}
		</Button>
	);
};
