import fs from 'fs';
import matter from 'gray-matter';

const getPostContent = (slug: string) => {
	const postPath = `src/_posts/`;
	const file = `${postPath}${slug}.md`;
	const fileContent = fs.readFileSync(file, 'utf8');
	const matterResult = matter(fileContent);

	return matterResult.content;
};

export default getPostContent;
