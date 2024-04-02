import {
	defineConfig,
	presetIcons,
	presetWind,
	transformerDirectives,
} from 'unocss'

import extractorPug from '@unocss/extractor-pug'
import {extractorSplit} from '@unocss/core'

export default defineConfig({
	presets: [
		presetWind(),
		presetIcons({
			scale: 1.5,
			warn: true,
		})
	],
	extractors: [
		extractorPug(),
		extractorSplit,
	],
	transformers: [
		transformerDirectives(),
	],
})
