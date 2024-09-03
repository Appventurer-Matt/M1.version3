/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./*.{html,js}'],
	darkMode: ['selector'],
	theme: {
		extend: {
			keyframes: {
				fadeIn: {
					'0%': { opacity: 0 },
					'100%': { opacity: 100 },
				},
			},
			animation: {
				fadeIn: 'fadeIn .5s ease-in-out forwards',
			},
		},
	},
	plugins: [],
}