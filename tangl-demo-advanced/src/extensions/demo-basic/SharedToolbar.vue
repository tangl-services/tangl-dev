<template lang="pug">
.flex
	button.tgv-btn(v-tippy="{content: $t('demoExtension.info')}" :class="{ active: ext.isActive }" @click="this.ext.isActive = !this.ext.isActive")
		i-icon(icon="mdi-brush")
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {DemoBasicExtension} from "./";

export default defineComponent({
	props: {
		ext: {type: Object as PropType<DemoBasicExtension>, required: true}
	}
});
</script>