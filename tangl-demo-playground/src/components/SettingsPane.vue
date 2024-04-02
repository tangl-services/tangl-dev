<template lang="pug">
.flex.gap-2.p-2
	.flex-grow
	//p-button(@click="settings.apply()") Apply
	p-button.p-button-text(@click="settings.import()") Import
	p-button.p-button-text(@click="settings.export()") Export
	p-button(@click="settings.reset()") Reset

NTabs.px-2(type="line" justify-content="space-evenly" v-model:value="state.activeIndex")
	NTabPane(name="RenderManager" )
		RenderManagerSettings
	NTabPane(name="Picker")
		PickerSettings
	NTabPane(name="OrbitControllerExtension")
		OrbitSettings
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import {useLocalStorage} from "@vueuse/core";
import {useSettingsStore} from "../stores/settings";
import {mapState} from "pinia";
import Button from "primevue/button";
import {NTab, NTabPane, NTabs} from "naive-ui";

export default defineComponent({
	setup() {
		return {settings: useSettingsStore()}
	},
	components: {Accordion, AccordionTab, "p-button": Button, NTabs, NTabPane},
	data() {
		const state = {
			activeIndex: "RenderManager"
		}
		return {state: useLocalStorage("tg-playground-settings", state)}
	},
	computed: {
		...mapState(useSettingsStore, ["renderManager","orbit"])
	},
	watch: {
		renderManager: {
			deep: true,
			handler() {
				this.settings.apply();
			}
		},
		orbit: {
			deep: true,
			handler() {
				this.settings.apply();
			}
		}
	},
})
</script>

<style lang="sass">
.n-tabs
	.n-tabs-nav
		border-bottom: var(--tg-gray-200) 1px solid

	.n-tabs-wrapper
		--at-apply: "flex-wrap w-full"

	.n-tabs-bar
		background: var(--tg-primary-400)
		display: none

	.n-tabs-tab
		font-size: 1.1rem
		font-weight: 500 !important
		--at-apply: "flex-grow justify-center px-4"
		border-bottom: transparent 2px solid

		&.n-tabs-tab--active
			--at-apply: "text-$tg-primary-400"
			border-bottom: var(--tg-primary-400) 2px solid


.p-accordion-tab
	box-shadow: none
	--at-apply: "border-b-0"

.p-accordion-header
	--at-apply: "border-1"

	*
		font-weight: bold
		font-size: 1.3rem

</style>
