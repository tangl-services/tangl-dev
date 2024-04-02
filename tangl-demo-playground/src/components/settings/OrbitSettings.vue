<template lang="pug">
.grid.grid-cols-2.gap-2
	h3.grid-col-span-2.py-2.font-bold Common options

	SettingsLine(name="autoRotate")
		NCheckbox(v-model:checked="orbit.autoRotate")
	SettingsLine(name="autoRotateSpeed")
		NInputNumber(v-model:value="orbit.autoRotateSpeed"  :min="0" :step="0.1")

	h3.grid-col-span-2.py-2.font-bold Speed
	SettingsLine(name="zoomSpeed")
		NInputNumber(v-model:value="orbit.zoomSpeed"  :min="0" :step="0.01")
	SettingsLine(name="zoomDollySpeed")
		NInputNumber(v-model:value="orbit.zoomDollySpeed"  :min="0" :step="0.01")

	h3.grid-col-span-2.py-2.font-bold Mouse actions
	SettingsLine(name="leftMouseButton")
		NDropdown(:options="mouseActions" key="key" @select="onMouseAction('leftMouseButton',$event)")
			p-button {{getMouseAction(orbit.leftMouseButton)}}
	SettingsLine(name="rightMouseButton")
		NDropdown(:options="mouseActions" key="key" @select="onMouseAction('rightMouseButton',$event)")
			p-button {{getMouseAction(orbit.rightMouseButton)}}
	SettingsLine(name="middleMouseButton")
		NDropdown(:options="mouseActions" key="key" @select="onMouseAction('middleMouseButton',$event)")
			p-button {{getMouseAction(orbit.middleMouseButton)}}
	SettingsLine(name="middleAltMouseButton")
		NDropdown(:options="mouseActions" key="key" @select="onMouseAction('middleAltMouseButton',$event)")
			p-button {{getMouseAction(orbit.middleAltMouseButton)}}

	h3.grid-col-span-2.py-2.font-bold Touch actions
	SettingsLine(name="oneTap")
		NDropdown(:options="touchActions" key="key" @select="onMouseAction('oneTap',$event)")
			p-button {{getTouchAction(orbit.oneTap)}}
	SettingsLine(name="twoTaps")
		NDropdown(:options="touchActions" key="key" @select="onMouseAction('twoTaps',$event)")
			p-button {{getTouchAction(orbit.twoTaps)}}


</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useSettingsStore} from "../../stores/settings";
import {mapState} from "pinia";
import SettingsLine from "../SettingsLine.vue";
import {NColorPicker, NInputNumber, NCheckbox, NDropdown} from "naive-ui";
import Button from "primevue/button";
import {viewerStore} from "tangl-viewer";
import {RenderManager} from "tangl-viewer";
import {MOUSE, TOUCH, Vector3} from "three";

export default defineComponent({
	setup() {
		return {settings: useSettingsStore()}
	},
	components: {SettingsLine, NColorPicker, NInputNumber, NCheckbox, "p-button": Button, NDropdown},
	computed: {
		...mapState(useSettingsStore, ["orbit"])
	},
	data() {
		return {
			mouseActions: [
				{label: "NONE", key: undefined},
				{label: "PAN", key: MOUSE.PAN},
				{label: "ROTATE", key: MOUSE.ROTATE},
				{label: "DOLLY", key: MOUSE.DOLLY},
			],
			touchActions: [
				{label: "NONE", key: undefined},
				{label: "ROTATE", key: TOUCH.ROTATE},
				{label: "PAN", key: TOUCH.PAN},
				{label: "DOLLY_PAN", key: TOUCH.DOLLY_PAN},
				{label: "DOLLY_ROTATE", key: TOUCH.DOLLY_ROTATE},
			]
		}
	},
	methods: {
		getMouseAction(action: MOUSE) {
			return action != undefined ? this.mouseActions.find(x => x.key == action)?.label : ""
		},
		getTouchAction(action: TOUCH) {
			return action != undefined ? this.touchActions.find(x => x.key == action)?.label : ""
		},
		onMouseAction(prop: string, key: MOUSE | TOUCH | undefined) {
			console.log(prop, key)
			this.orbit[prop] = key;
		}
	}
})
</script>

<style lang="sass">
</style>
