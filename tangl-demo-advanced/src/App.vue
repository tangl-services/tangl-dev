<template lang="pug">
.absolute.w-full.h-full.flex.flex-col
	.header.flex.gap-2.p-1.bg-black
		.flex.flex-grow.gap-2.items-center
			button.ml-3(type="info" @click="redirectReload")
				i-icon(icon="mdi-home")
			small.ml-10.text-gray 3D view presets
			button.header( type="info" @click="go('Basic')") Basic
			button.header.ml-3( type="info" @click="go('WithProps')") With Props
			button.header.ml-3( type="info" @click="go('WithFloatingProps')") With Floating Props

		User

	.relative.flex-grow.overflow-hidden
		RouterView
</template>

<script lang="ts">
import {defineComponent} from "vue";
import User from "./components/User.vue";
import {metaManager, renderManager} from "./managers";
import {modelStore, SelectedModel} from "./stores/model"
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
		},
		getSelectedModels() {
			return this.modelStore.selectedModels.map((m: SelectedModel) => m.id)
		},
		go(name: string) {
			this.$router.push({name, query: {ids: this.getSelectedModels()}}); 
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