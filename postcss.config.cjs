const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const pstcssFor = require('postcss-for');

const config = {
	plugins: [
		//Some plugins, like tailwindcss/nesting, need to run before Tailwind,
		tailwindcss(),
		//But others, like autoprefixer, need to run after,
		autoprefixer,
		pstcssFor
	]
};

module.exports = config;
