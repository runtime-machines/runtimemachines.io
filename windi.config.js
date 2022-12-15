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
			boxShadow: {
				glow: '0px 0px 30px 4px rgba(245,116,61,0.9)',
				'white-glow': '0px 0px 30px 4px rgba(255,255,255,0.9)',
			},
			animation: {
				wiggle: 'wiggle 1s ease-in-out',
				wigglechild: 'wigglechild 1s ease-in-out',
				wigglemiddle: 'wigglemiddle 1s ease-in-out',
			},
			keyframes: {
				wiggle: {
					'0%, 100%': { 'margin-left': '50%' },
					'60%': { 'margin-left': '50.4%' },
					'80%': { 'margin-left': '49.6%' },
					'20%': { 'margin-left': '50.8%' },
					'40%': { 'margin-left': '49.2%' },
				},
				wigglechild: {
					'0%, 100%': { left: '-50%' },
					'60%': { left: '-50.4%' },
					'80%': { left: '-49.6%' },
					'20%': { left: '-50.8%' },
					'40%': { left: '-49.2%' },
				},
				wigglemiddle: {
					'0%, 100%': { left: '50%' },
					'60%': { left: '50.4%' },
					'80%': { left: '49.6%' },
					'20%': { left: '50.8%' },
					'40%': { left: '49.2%' },
				},
			},
		},
	},
	extract: {
		include: ['./src/**/*.{vue,html,jsx,tsx,astro}'],
		exclude: ['node_modules', '.git'],
	},
	plugins: [require('windicss/plugin/typography')],
});
