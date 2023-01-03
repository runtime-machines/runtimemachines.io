import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import image from '@astrojs/image';
// import mdx from '@astrojs/mdx';
// import partytown from '@astrojs/partytown';
import WindiCSS from 'vite-plugin-windicss';
import { SITE } from './src/config.mjs';
import vercel from '@astrojs/vercel/serverless';
// import { astroImageTools } from 'astro-imagetools';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config

export default defineConfig({
	// Astro uses this full URL to generate your sitemap and canonical URLs in your final build
	site: SITE.origin,
	base: SITE.basePathname,
	output: 'server',
	integrations: [
		// astroImageTools,
		sitemap({
			customPages: ['https://runtimemachines.io', 'https://runtimemachines.com'],
		}),
		image({
			logLevel: 'debug',
			cacheDir: '.cache/image',
		}),
		// mdx() /* Disable this integration if you don't use Google Analytics (or other external script). */,
		// partytown({
		// 	config: {
		// 		forward: ['dataLayer.push'],
		// 	},
		// }),
	],

	vite: {
		plugins: [WindiCSS()],
		resolve: {
			alias: {
				'~': path.resolve(__dirname, './src'),
			},
		},
	},
	adapter: vercel(),
});
