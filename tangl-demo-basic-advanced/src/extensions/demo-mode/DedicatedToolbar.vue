<template lang="pug">
button.tgv-btn(v-tippy="{ content: $t('demoModeExt.reset') }" v-on:click="clear()")
	i-icon(icon="mdi-cube-off-outline")

button.tgv-chip(
	@click="onWhiteVisible()"
	:class="{ 'bg-gray-100': !ext.isWhiteVisible, 'text-gray-400': !ext.isWhiteVisible, 'bg-gray-200': ext.isWhiteVisible, 'text-black': ext.isWhiteVisible }"
)
	| {{$t("demoModeExt.whiteVisible")}}

button.tgv-chip(
	@click="onColoredVisible()"
	:class="{ 'bg-orange-100': !ext.isColoredVisible, 'text-gray-400': !ext.isColoredVisible, 'text-white': ext.isColoredVisible, 'bg-gradient-to-tr from-orange-500 via-yellow-500 to-blue-500': ext.isColoredVisible }"
)
	| {{$t("demoModeExt.coloredVisible")}}

</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {DemoModeExtension} from "./";
import {viewerStore} from "tangl-viewer";

export default defineComponent({
	props: {
		ext: {type: Object as PropType<DemoModeExtension>, required: true}
	},
	methods: {
		clear() {
			const renderMan = viewerStore.getRenderManager(this.ext?.viewerName)!;
			const ext = renderMan.extMan.getExtensionByName(this.ext.getName()) as DemoModeExtension;

			ext.clear();
		},

		onColoredVisible() {
			const renderMan = viewerStore.getRenderManager(this.ext?.viewerName)!;
			const ext = renderMan.extMan.getExtensionByName(this.ext.getName()) as DemoModeExtension;

			this.ext.isColoredVisible = !this.ext.isColoredVisible;
			ext?.setup();
		},

		onWhiteVisible() {
			const renderMan = viewerStore.getRenderManager(this.ext?.viewerName)!;
			const ext = renderMan.extMan.getExtensionByName(this.ext.getName()) as DemoModeExtension;

			this.ext.isWhiteVisible = !this.ext.isWhiteVisible;
			ext?.setup();
		}
	},
})
</script>