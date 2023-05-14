const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const pstcssEach = require('postcss-each');

const config = {
	plugins: [
		//Some plugins, like tailwindcss/nesting, need to run before Tailwind,
		tailwindcss(),
		//But others, like autoprefixer, need to run after,
		autoprefixer,
		pstcssEach
	]
};

module.exports = config;
