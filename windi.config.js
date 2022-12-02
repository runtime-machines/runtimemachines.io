import { defineConfig } from 'windicss/helpers';

export default defineConfig({
	darkMode: 'class', // or 'media' or 'class'
	corePlugins: {
		container: false,
	},
	theme: {
		extend: {
			cursor: {
				'ew-resize': 'ew-resize',
			},
		},
	},
	extract: {
		include: ['./src/**/*.{vue,html,jsx,tsx,astro}'],
		exclude: ['node_modules', '.git'],
	},
	plugins: [require('windicss/plugin/typography')],
});
