import {
	defineConfig,
	presetWind,
	transformerDirectives,
} from 'unocss'

import extractorPug from '@unocss/extractor-pug'
import {extractorSplit} from '@unocss/core'

export default defineConfig({
	presets: [
		presetWind(),
	],
	extractors: [
		extractorPug(),
		extractorSplit,
	],
	transformers: [
		transformerDirectives(),
	],
})