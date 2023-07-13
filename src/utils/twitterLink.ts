import transformObjectToParams from "./transformObjectToParams";

// Credits: https://github.com/Bunlong/next-share
export default function twitterLink(
	url: string,
	{ title, via, hashtags = [], related = [] }: { title?: string; via?: string; hashtags?: string[]; related?: string[] }
) {
	return (
		'https://twitter.com/intent/tweet' +
		transformObjectToParams({
			url,
			text: title,
			via,
			hashtags: hashtags.length > 0 ? hashtags.join(',') : undefined,
			related: related.length > 0 ? related.join(',') : undefined,
		})
	);
}
