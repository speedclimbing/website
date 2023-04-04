const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	theme: {
		extend: {
			colors: {
				'dark-white': '#F7F7F7',
				black: '#111827',
				'dark-grey': '#1F2937',
				grey: '#374151',
				'light-grey': '#6B7280',
				red: '#DA3C2B',
				yellow: '#DD972A'
			},
			fontFamily: {
				Roboto: ['Roboto', 'sans-serif'],
				Raleway: ['Raleway', 'sans-serif']
			}
		}
	},

	plugins: [require('flowbite/plugin')],
	darkMode: 'media'
};

module.exports = config;
