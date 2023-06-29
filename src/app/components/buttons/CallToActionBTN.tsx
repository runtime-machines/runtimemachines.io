'use client';

import { TypeIcon } from '../../../../types';
import styles from './buttons.module.css';
import Button from '@mui/material/Button';

type TProps = {
	text: string;
	classNameProp?: string;
	Icon?: TypeIcon;
};

export const CallToActionBTN = ({ text, Icon, classNameProp }: TProps) => {
	return (
		<Button variant="contained" className={styles.callToActionBTN + ' ' + classNameProp}>
			<span>{text}</span>
			{Icon && <Icon className={styles.iconBtn} />}
		</Button>
	);
};
