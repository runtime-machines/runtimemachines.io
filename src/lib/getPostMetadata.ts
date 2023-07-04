import { PostMetadata } from './../../types.d';
import fs from 'fs';
import matter from 'gray-matter';

const getPostMetadata = (): PostMetadata[] => {
	const postPath = `src/_posts/`;
	const files = fs.readdirSync(postPath);
	const markdownFiles = files.filter((file) => file.endsWith('.md'));
	const posts = markdownFiles.map((file) => {
		const fileContent = fs.readFileSync(`${postPath}${file}`, 'utf8');
		const matterResult = matter(fileContent);

		return {
			title: matterResult.data.title,
			excerpt: matterResult.data.excerpt,
			coverImage: matterResult.data.coverImage,
			date: matterResult.data.date,
			author: {
				name: matterResult.data.author.name,
				picture: matterResult.data.author.picture,
			},
			ogImage: {
				url: matterResult.data.ogImage.url,
			},
			slug: file.replace('.md', ''),
		};
	});

	return posts;
};

export default getPostMetadata;
