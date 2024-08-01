import { Config } from 'tailwindcss'

const config: Config = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {},
	},
	plugins: [],
	darkMode: ['selector', '[data-mantine-color-scheme="dark"]'],
}

export default config
