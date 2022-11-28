<template lang="pug">
.absolute.w-full.h-full.flex.flex-col
	.header.flex.gap-2.p-1.bg-black
		.flex.flex-grow.gap-2
			button.ml-3(type="info" @click="redirectReload")
				i-icon(icon="mdi-home")
			button.header.ml-3(v-if="modelStore.selectedModels.length>0" type="info" @click="$router.push('/Basic')") Basic
			button.header.ml-3(v-if="modelStore.selectedModels.length>0" type="info" @click="$router.push('WithProps')") With Props
			button.header.ml-3(v-if="modelStore.selectedModels.length>0" type="info" @click="$router.push('WithFloatingProps')") With Floating Props

		User

	.relative.flex-grow.overflow-hidden
		RouterView
</template>

<script lang="ts">
import {defineComponent} from "vue";
import User from "./components/User.vue";
import {metaManager, renderManager} from "./managers";
import {modelStore} from "./stores/model"
import {mapStores} from "pinia";

export default defineComponent({
	components: {User},
	computed: {
		...mapStores(modelStore)
	},
	unmounted() {
		renderManager.destroy()
		metaManager?.destroy()
	},
	methods: {
		redirectReload() {
			this.$router.push({path: '/'})
		}
	}
})
</script>

<style lang="sass">
.header
	color: white
	font-family: v-sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important
	font-weight: 500
	border-style: none

.header:hover
	background-color: black
	color: rgb(187, 187, 187)
</style>