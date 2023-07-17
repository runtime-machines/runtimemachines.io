import transformObjectToParams from './transformObjectToParams';

// Credits: https://github.com/Bunlong/next-share
export default function linkedinLink(url: string, title?: string, summary?: string, source?: string) {
	return (
		'https://linkedin.com/sharing/share-offsite' +
		transformObjectToParams({ url, mini: 'true', title, summary, source })
	);
}
