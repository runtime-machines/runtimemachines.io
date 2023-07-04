import { ArrowRightAlt } from '@mui/icons-material';

export type TypeIcon = typeof ArrowRightAlt;

export interface PostMetadata {
	title: string;
	excerpt: string;
	coverImage: string;
	date: string;
	author: {
		name: string;
		picture: string;
	};
	ogImage: {
		url: string;
	};
	slug: string;
}
