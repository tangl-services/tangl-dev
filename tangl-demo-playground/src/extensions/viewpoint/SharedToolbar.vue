<template lang="pug">
.flex.items-center
	p-button.flat(

		v-tippy="{content: $t('viewpointExtension.store')}"
		class="" @click="ext.storeViewpoint()")
		i-icon(icon="mdi-camera-enhance-outline")

	p-button.flat(
		v-if="ext.state.isViewpointStored"
		v-tippy="{content: $t('viewpointExtension.restore')}"
		class="" @click="ext.restoreViewpoint()")
		i-icon(icon="mdi-camera-flip-outline")
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {ViewpointExtension} from "./";

export default defineComponent({
	props: {
		ext: {type: Object as PropType<ViewpointExtension>, required: true}
	}
});
</script>
