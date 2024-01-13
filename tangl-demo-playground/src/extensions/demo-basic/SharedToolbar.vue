<template lang="pug">
.flex
	p-button.flat(v-tooltip="t('demoExtension.info')" :class="{ active: ext.isActive }" @click="switchMode()")
		.i-mdi-brush
</template>

<script lang="ts">
import {defineComponent, PropType, ref} from "vue";
import {DemoBasicExtension} from "./";
import Tooltip from "primevue/tooltip";
import {NConfigProvider} from "naive-ui";
import Button from "primevue/button";
import {viewerStore} from "tangl-viewer";
import i18next from "i18next";

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
		ext: {type: Object as PropType<DemoBasicExtension>, required: true}
	},
	methods: {
		switchMode() {
			this.ext.isActive = !this.ext.isActive;
			this.$forceUpdate()
		}
	}
});
</script>
