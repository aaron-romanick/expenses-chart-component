// vite.config.js

import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		rollupOptions: {
			output: {
				assetFileNames: 'styles.css',
				entryFileNames: 'main.js',
			},
		},
	},
})