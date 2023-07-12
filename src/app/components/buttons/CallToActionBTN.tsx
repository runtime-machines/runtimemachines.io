'use client';

import { TypeIcon } from '../../../../types';
import styles from './buttons.module.css';
import Button from '@mui/material/Button';

type TProps = {
	text: string;
	classNameProp?: string;
	Icon?: TypeIcon;
	clickHandler?: () => void;
};

export const CallToActionBTN = ({ text, Icon, classNameProp, clickHandler }: TProps) => {
	return (
		<Button variant="contained" className={styles.callToActionBTN + ' ' + classNameProp} onClick={clickHandler}>
			<span>{text}</span>
			{Icon && <Icon className={styles.iconBtn} />}
		</Button>
	);
};
