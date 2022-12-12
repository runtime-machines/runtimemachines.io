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
			width: {
				fit: 'fit-content',
			},
			backgroundColor: (theme) => ({
				...theme('colors'),
				orange: '#FF8855',
			}),
			width: {
				fit: 'fit-content',
			},
		},
	},
	extract: {
		include: ['./src/**/*.{vue,html,jsx,tsx,astro}'],
		exclude: ['node_modules', '.git'],
	},
	plugins: [require('windicss/plugin/typography')],
});
