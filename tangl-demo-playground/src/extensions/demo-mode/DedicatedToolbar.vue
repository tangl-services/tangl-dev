<template lang="pug">
.flex.items-center.gap-2.pr-2
	p-button.flat(v-tooltip="t('demoModeExt.reset')" v-on:click="clear()")
		.i-mdi-cube-off-outline

	button.tgv-chip.px-1(
		@click="onWhiteVisible()"
		:class="{ 'bg-gray-100': !ext.isWhiteVisible, 'text-gray-400': !ext.isWhiteVisible, 'bg-gray-200': ext.isWhiteVisible, 'text-black': ext.isWhiteVisible }"
	)
		| {{t("demoModeExt.whiteVisible")}}

	button.tgv-chip.px-1(
		@click="onColoredVisible()"
		:class="{ 'bg-orange-100': !ext.isColoredVisible, 'text-gray-400': !ext.isColoredVisible, 'text-white': ext.isColoredVisible, 'bg-gradient-to-tr from-orange-500 via-yellow-500 to-blue-500': ext.isColoredVisible }"
	)
		| {{t("demoModeExt.coloredVisible")}}

</template>

<script lang="ts">
import {defineComponent, PropType, ref} from "vue";
import {DemoModeExtension} from "./";
import {viewerStore} from "tangl-viewer";
import i18next from "i18next";
import Button from "primevue/button";
import {NConfigProvider} from "naive-ui";
import Tooltip from "primevue/tooltip";

export default defineComponent({
	setup(props: any) {
		const renderManager = viewerStore.getRenderManager(props.ext?.viewerName)!;
		return {extMan: ref(renderManager.extMan)}
	},
	data() {
		return {t: i18next.t}
	},
	components: {"p-button": Button, NConfigProvider},
	directives: {tooltip: Tooltip},
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
