<template lang="pug">
.flex
	p-button.flat(v-tooltip="t('demoExtension.info')" :class="{ active: ext.isActive }" @click="ext.switchMode()")
		.i-mdi-brush
</template>

<script lang="ts">
import {defineComponent, PropType, reactive, ref} from "vue";
import {DemoBasicExtension} from "./";
import Tooltip from "primevue/tooltip";
import Button from "primevue/button";
import {viewerStore} from "tangl-viewer";
import i18next from "i18next";
import {CommandExtensionEvent, ExtensionEvents} from "tangl-viewer";

export default defineComponent({
	setup(props: any) {
		const renderManager = viewerStore.getRenderManager(props.ext?.viewerName)!;
		const ext = renderManager.extMan.getExtensionByName(props.extName);
		return {ext: ext ? reactive(ext as DemoBasicExtension) : undefined, extMan: reactive(renderManager.extMan)}
	},
	data() {
		return {t: i18next.t}
	},
	components: {"p-button": Button},
	directives: {tooltip: Tooltip},
	props: {
		extName: {type: String, required: true},
		viewerName: {type: String, required: true},
	},
	mounted() {
		const renderManager = viewerStore.getRenderManager(this.ext?.viewerName)!;

		renderManager?.extMan.addAutoEventListener(ExtensionEvents.CommandChanged, (e: Event) => {
			const ce = e as CommandExtensionEvent;
			if (ce.oldCommandExt?.getName() == this.ext.getName()) this.$forceUpdate();
		})
	},
});
</script>
