import { TypeIcon } from '../../../../types';
import styles from './buttons.module.css';
import { Button } from '../../components/mui/Components';

type TProps = {
	text: string;
	classNameProp?: string;
	Icon?: TypeIcon;
	clickHandler?: () => void;
};

export const BTNTest = ({ text, Icon, classNameProp, clickHandler }: TProps) => {
	const handler = () => {
		if (clickHandler) {
			clickHandler();
		}
	};

	return (
		<Button variant="contained" className={styles.callToActionBTN + ' ' + classNameProp} onClick={handler}>
			<span>{text}</span>
			{Icon && <Icon className={styles.iconBtn} />}
		</Button>
	);
};
