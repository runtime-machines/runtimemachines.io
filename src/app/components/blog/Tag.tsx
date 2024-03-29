import { Chip } from '@mui/material';
import styles from './tag.module.css';

type TProps = {
	tag: string;
};

const Tag = ({ tag }: TProps) => {
	return <Chip label={'#' + tag.toUpperCase()} className={styles.tag} />;
};

export default Tag;
