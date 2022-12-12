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
			backgroundColor: (theme) => ({
				...theme('colors'),
				orange: '#FF8855',
			}),
		},
	},
	extract: {
		include: ['./src/**/*.{vue,html,jsx,tsx,astro}'],
		exclude: ['node_modules', '.git'],
	},
	plugins: [require('windicss/plugin/typography')],
});
