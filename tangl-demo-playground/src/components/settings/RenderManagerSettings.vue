<template lang="pug">
.grid.grid-cols-2.gap-2
	SettingsLine(name="backgroundColor")
		NColorPicker(v-model:value="renderManager.backgroundColor" :show-alpha="false" :modes="['hex']" size="small")

	//inactive
	h3.grid-col-span-2.py-2.font-bold Inactive (underlay)

	SettingsLine(name="inactiveColor")
		NColorPicker(v-model:value="renderManager.inactiveColor" :show-alpha="false" :modes="['hex']" size="small")
	SettingsLine(name="inactiveDarkness")
		NInputNumber(v-model:value="renderManager.inactiveDarkness"  :min="0" :step="0.01")
	SettingsLine(name="inactiveContrast")
		NInputNumber(v-model:value="renderManager.inactiveContrast"  :min="0" :step="0.01")
	SettingsLine(name="inactiveFrontOpacity")
		NInputNumber(v-model:value="renderManager.inactiveFrontOpacity"  :min="0" :max="1" :step="0.1")

	//selection
	h3.grid-col-span-2.py-2.font-bold Selection

	SettingsLine(name="selectionColor")
		NColorPicker(v-model:value="renderManager.selectionColor" :show-alpha="false" :modes="['hex']" size="small")
	SettingsLine(name="selectionOpacity")
		NInputNumber(
			v-model:value="renderManager.selectionOpacity" :min="0" :max="1" :step="0.1")

	//block
	h3.grid-col-span-2.py-2.font-bold Selection/Navigation

	SettingsLine(name="lockSelection")
		NCheckbox(v-model:checked="renderManager.lockSelection")

	SettingsLine(name="isMultiselectTouch")
		NCheckbox(v-model:checked="renderManager.multiselectTouch")
	SettingsLine(name="isMultiselectClick")
		NCheckbox(v-model:checked="renderManager.multiselectClick")

</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useSettingsStore} from "../../stores/settings";
import {mapState} from "pinia";
import SettingsLine from "../SettingsLine.vue";
import {NColorPicker, NInputNumber, NCheckbox} from "naive-ui";

export default defineComponent({
	setup() {
		return {settings: useSettingsStore()}
	},
	components: {SettingsLine, NColorPicker, NInputNumber, NCheckbox},
	computed: {
		...mapState(useSettingsStore, ["renderManager"])
	}
})
</script>

<style lang="sass">
</style>
