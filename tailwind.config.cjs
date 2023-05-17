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
				yellow: '#DD972A',
				green: '#057A55'
			},
			fontFamily: {
				Roboto: ['Roboto', 'sans-serif'],
				Raleway: ['Raleway', 'sans-serif']
			},
			animation: {
				blink: 'blink 4s linear infinite',
				eyes: 'eyes 10s ease-in-out infinite'
			},
			keyframes: {
				blink: {
					'0%, 96%': { transform: 'scaleY(1)' },
					'98%': { transform: 'scaleY(0.1)' }
				},
				eyes: {
					'0%, 25%, 50%, 75%': { transform: 'translate(0, 0)' },
					'30%, 45%': { transform: 'translate(-10px, 0)' },
					'80%, 95%': { transform: 'translate(10px, 0)' }
				}
			},
			boxShadow: {
				'box-light': '0 10px 50px 0 rgba(17, 24, 39, .05)',
				'box-dark': '0 10px 50px 0 rgba(247, 247, 247, .02)'
			}
		}
	},

	safelist: [
		'object-bottom',
		'object-center',
		'object-left',
		'object-left-bottom',
		'object-left-top',
		'object-right',
		'object-right-bottom',
		'object-right-top',
		'object-top'
	],

	plugins: [require('flowbite/plugin')],
	darkMode: 'media'
};

module.exports = config;
