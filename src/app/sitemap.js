import getURL from '@/utils/getUrl';
import getPostMetadata from '@/lib/getPostMetadata';
const URL = getURL('');

export default async function sitemap() {
	const posts = getPostMetadata().map(({ slug, date }) => ({
		url: `${URL}blog/${slug}`,
		lastModified: date,
	}));

	const routes = ['', 'about-us', 'blog', 'contact-us'].map((route) => ({
		url: `${URL}${route}`,
		lastModified: new Date().toISOString(),
	}));

	return [...routes, ...posts];
}
