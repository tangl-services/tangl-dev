<template lang="pug">
n-config-provider.tgv-metatree(:theme-overrides="tanglTheme")
	.p-input-filled.absolute.w-full.h-full.flex.flex-col
		header.flex.gap-2.night.min-h-16
			.flex.items-center
				p-button.header(type="info" @click="redirectReload" :class="{active:$route.name=='models'}")
					.i-mdi-home

				p-button.header( type="info" @click="go('viewer')" :class="{active:$route.name=='viewer'}")
					.i-mdi-cube-outline

			#header-teleport.flex-grow.flex.items-center.border-l-1.border-gray-500

			User(v-if="isAuth")

		.relative.flex-grow.overflow-hidden
			RouterView
</template>

<script lang="ts">
import {defineComponent} from "vue";
import User from "./components/User.vue";
import {isAuth, metaManager, renderManager, sceneManager} from "./managers";
import {useModelStore, SelectedModel} from "./stores/model"
import {mapStores} from "pinia";
import Button from "primevue/button";
import {tanglTheme} from "./naiveui";

export default defineComponent({
	components: {User, "p-button": Button},
	setup() {
		return {isAuth, tanglTheme}
	},
	computed: {
		...mapStores(useModelStore)
	},
	unmounted() {
		sceneManager?.destroy();
	},
	methods: {
		redirectReload() {
			this.$router.push({path: '/'})
		},
		getSelectedModels() {
			const modelIds = this.$route.query.ids;
			return modelIds ? modelIds : this.modelStore.selectedModels.map((m: SelectedModel) => m.id)
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
