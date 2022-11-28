import {defineConfig} from 'vite'
import {loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import unocss from 'unocss/vite'
import i18Next from 'tangl-i18next-vite'

const path = require('path');

export default defineConfig(({mode}) => {
	Object.assign(process.env, loadEnv(mode, process.cwd()));

	return {
		server: {
			port: 3000,
		},
		plugins: [
			vue(),
			i18Next({
				include: [
					path.resolve(__dirname, './locales/*/*.yml')
				]
			}),
			unocss(),
		]
	}
})
