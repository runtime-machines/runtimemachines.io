'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './articleHeader.module.css';
import { Box, IconButton, Stack } from '@mui/material';
import { LinkedIn, Twitter, GitHub } from '@mui/icons-material';
import Tag from './Tag';
import getURL from '@/utils/getUrl';

type TProps = {
	title: string;
	coverImage: string;
	tags: string[];
	readTime: string;
};

const ArticleHeader = ({ title, coverImage, tags, readTime }: TProps) => {
	const pathName = usePathname();
	const currentUrl = getURL(pathName);

	return (
		<Stack display="flex" direction="column" spacing={3} className={styles.container}>
			<h1 className={styles.title}>{title} </h1>

			<Box>
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					marginBottom="20px"
					className={styles.infoContainer}>
					<Box display="flex" alignItems="center" flexWrap="wrap">
						<Stack direction="row" alignItems="center" className={styles.tagsContainer}>
							<Tag tag={tags[0]} />
							<Tag tag={tags[1]} />
							<Tag tag={tags[2]} />
						</Stack>
						<span className={styles.readTime}>{'5 min read'}</span>
					</Box>
					<Box display="flex">
						<IconButton href={`https://twitter.com/intent/tweet?text=${currentUrl}`}>
							<Twitter style={{ color: '#fff' }} />
						</IconButton>
						<IconButton href="https://github.com/runtime-machines">
							<GitHub style={{ color: '#fff' }} />
						</IconButton>

						<IconButton href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}>
							<LinkedIn style={{ color: '#fff' }} />
						</IconButton>
					</Box>
				</Box>
				<Box className={styles.coverImage}>
					<Image src={coverImage} alt={title} fill className={styles.coverImage} />
				</Box>
			</Box>
		</Stack>
	);
};

export default ArticleHeader;
