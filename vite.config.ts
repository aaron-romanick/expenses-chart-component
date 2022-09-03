// vite.config.js

import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	base: '/expenses-chart-component/',
	build: {
		rollupOptions: {
			output: {
				assetFileNames: 'styles.css',
				entryFileNames: 'main.js',
			},
		},
	},
})