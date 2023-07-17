import { PostMetadata } from '../../types';
import fs from 'fs';
import matter from 'gray-matter';

const getRelatedPostsMetadata = (relatedPosts: string[]): PostMetadata[] => {
	const postPath = `src/_posts/`;
	const files = fs.readdirSync(postPath);

	// Filter out the related posts from the list of all posts
	const filteredFiles = files.filter((file) => {
		const slug = file.replace('.md', '');
		return relatedPosts.includes(slug);
	});

	// Get the metadata for the related posts
	const markdownFiles = filteredFiles.filter((file) => file.endsWith('.md'));
	const posts = markdownFiles.map((file) => {
		const fileContent = fs.readFileSync(`${postPath}${file}`, 'utf8');
		const matterResult = matter(fileContent);

		return {
			title: matterResult.data.title,
			excerpt: matterResult.data.excerpt,
			coverImage: matterResult.data.coverImage,
			date: matterResult.data.date,
			tags: matterResult.data.tags,
			author: {
				name: matterResult.data.author.name,
				picture: matterResult.data.author.picture,
			},
			ogImage: {
				url: matterResult.data.ogImage.url,
			},
			readTime: matterResult.data.readTime,
			slug: file.replace('.md', ''),
		};
	});

	return posts;
};

export default getRelatedPostsMetadata;
