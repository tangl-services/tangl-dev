import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import unocss from 'unocss/vite'

const path = require('path');

export default defineConfig(() => {
	return {
		server: {
			port: 3000,
		},
		plugins: [
			vue(),
			unocss(),
		]
	}
})
