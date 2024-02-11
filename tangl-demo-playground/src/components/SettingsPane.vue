<template lang="pug">
.flex.gap-2.p-2
	.flex-grow
	//p-button(@click="settings.apply()") Apply
	p-button.p-button-text(@click="settings.import()") Import
	p-button.p-button-text(@click="settings.export()") Export
	p-button(@click="settings.reset()") Reset

Accordion(multiple :activeIndex="state.activeIndex") 
	AccordionTab(header="RenderManager" )
		RenderManagerSettings
	AccordionTab(header="Picker")
		PickerSettings
	//AccordionTab(header="OrbitControllerExtension" )
	//AccordionTab(header="FlyControllerExtension" )
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import {useLocalStorage} from "@vueuse/core";
import {useSettingsStore} from "../stores/settings";
import {mapState} from "pinia";
import Button from "primevue/button";

export default defineComponent({
	setup() {
		return {settings: useSettingsStore()}
	},
	components: {Accordion, AccordionTab, "p-button": Button},
	data() {
		const state = {
			activeIndex: []
		}
		return {state: useLocalStorage("tg-playground-settings", state)}
	},
	computed: {
		...mapState(useSettingsStore, ["renderManager"])
	},
	watch: {
		renderManager: {
			deep: true,
			handler() {
				this.settings.apply();
			}
		}
	},
})
</script>

<style lang="sass">
.p-accordion-tab
	box-shadow: none
	--at-apply: "border-b-0"

.p-accordion-header
	--at-apply: "border-1"

	*
		font-weight: bold
		font-size: 1.3rem

</style>
