<template lang="pug">
.grid.grid-cols-2.gap-2
	p-button(@click="startPicking()") Start
	p-button(@click="endPicking()") End

	h3.grid-col-span-2.py-2.font-bold Picking options
	SettingsLine(name="stopAtClick")
		NCheckbox(v-model:checked="picker.stopAtClick")
	SettingsLine(name="snapToPoints")
		NCheckbox(v-model:checked="picker.snapToPoints")

	.flex.flex-col(v-if="result")
		h3.grid-col-span-2.py-2.font-bold Picking results
		p rayPoint
		small X:{{rayPoint.x}} Y:{{rayPoint.y}} Z:{{rayPoint.z}}

		p faceNormal
		small X:{{faceNormal.x}} Y:{{faceNormal.y}} Z:{{faceNormal.z}}

</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useSettingsStore} from "../../stores/settings";
import {mapState} from "pinia";
import SettingsLine from "../SettingsLine.vue";
import {NColorPicker, NInputNumber, NCheckbox} from "naive-ui";
import Button from "primevue/button";
import {viewerStore} from "tangl-viewer";
import {RenderManager} from "tangl-viewer";
import {Vector3} from "three";

export default defineComponent({
	setup() {
		return {settings: useSettingsStore()}
	},
	components: {SettingsLine, NColorPicker, NInputNumber, NCheckbox, "p-button": Button},
	computed: {
		...mapState(useSettingsStore, ["picker"])
	},
	data() {
		return {
			rayPoint: new Vector3(),
			faceNormal: new Vector3(),
			result: false,
		}
	},
	methods: {
		startPicking() {
			const renderManager = viewerStore.getRenderManager() as RenderManager;
			renderManager.picker.startPicking(true, this.picker.stopAtClick, this.picker.snapToPoints)
					.then((result: boolean) => {
						this.rayPoint.copy(renderManager.picker.rayPoint)
						this.faceNormal.copy(renderManager.picker.rayFaceNormal)

						this.result = result;
					});
		},
		endPicking() {
			const renderManager = viewerStore.getRenderManager() as RenderManager;
			renderManager.picker.endPicking(false);
		}
	}
})
</script>

<style lang="sass">
</style>
