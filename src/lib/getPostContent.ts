import fs from 'fs';
import matter from 'gray-matter';

const getPostContent = (slug: string) => {
	const postPath = `src/_posts/`;
	const file = `${postPath}${slug}.md`;
	const fileContent = fs.readFileSync(file, 'utf8');
	const matterResult = matter(fileContent);

	return {
		content: matterResult.content,
		title: matterResult.data.title,
		coverImage: matterResult.data.coverImage,
		tags: matterResult.data.tags,
		readTime: matterResult.data.readTime,
	};
};

export default getPostContent;
