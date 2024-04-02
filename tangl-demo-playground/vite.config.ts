import {defineConfig} from 'vite'
import {loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import unocss from 'unocss/vite'
import i18Next from 'tangl-i18next-vite'
import * as path from "path";
import Components from "unplugin-vue-components/vite";

export default defineConfig(({mode}) => {
	Object.assign(process.env, loadEnv(mode, process.cwd()));

	return {
		server: {
			port: 3000,
		},
		rollupOptions: {
			output: {
				globals: {
					vue: 'Vue'
				}
			}
		},
		plugins: [
			vue(),
			i18Next({
				include: [
					path.resolve(__dirname, './locales/*/*.yml')
				]
			}),
			unocss(),
			Components({
				dirs: ["src/components", "src/views"],
			}),
		]
	}
})
