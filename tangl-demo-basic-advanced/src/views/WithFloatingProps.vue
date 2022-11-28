<template lang="pug">
.flex.absolute.h-full.w-full.items-end.justify-center.overflow-hidden.tgv-night
	#viewer.absolute.bg-red.w-full.h-full
	tgv-extensions-ui
	tgv-toolbar.absolute.tgv-bg-night.tgv-bg-blur

	.absolute.flex.w-100.min-h-10.left-0.top-0.bottom-20.m-1.p-2.tgv-bg-night.tgv-bg-blur
		.w-full
			tgv-metatree(:metaManager="metaManager"  @selected="onMetaSelected")

	.absolute.flex.w-100.min-h-10.right-0.top-0.bottom-20.m-1.p-2.tgv-bg-night.tgv-bg-blur
		.w-full
			tgv-propstree(ref="propsTree" :metaManager="metaManager")
</template>

<script lang="ts">
import {defineComponent} from "vue";

import {
	CoordinatesExtension,
	CropExtension,
	GeneralModeExtension, MeashureExtension, OrbitControllerExtension, SceneEvents,
	VisibilityExtension
} from "tangl-viewer";

import {renderManager, sceneManager, metaManager} from "../managers";
import {DemoBasicExtension} from "../extensions/demo-basic";
import {modelStore} from "../stores/model";
import oidcStore from "../store";
import {DemoModeExtension} from "../extensions/demo-mode";
import {mapStores} from "pinia";

export default defineComponent({
	setup() {
		return {metaManager}
	},
	computed: {
		...mapStores(modelStore)
	},
	async mounted() {
		const token = oidcStore.state.oidcStore.access_token;
		sceneManager.setToken(token);
		metaManager.setToken(token);

		renderManager?.init("viewer");
		renderManager.setBackgroundColor(0x222222);
		// Built-in extensions
		renderManager.extMan.addExtension(OrbitControllerExtension)
		renderManager.extMan.addExtension(GeneralModeExtension)
		renderManager.extMan.addExtension(DemoModeExtension)
		renderManager.extMan.addExtension(CropExtension)
		renderManager.extMan.addExtension(VisibilityExtension)
		renderManager.extMan.addExtension(MeashureExtension)
		renderManager.extMan.addExtension(CoordinatesExtension)

		renderManager.extMan.selectControllerExtension("orbit")
		renderManager.extMan.selectModeExtension("general")

		// Demo extension
		renderManager.extMan.addExtension(DemoBasicExtension)

		this.onSceneSelected = this.onSceneSelected.bind(this)
		sceneManager.addEventListener(SceneEvents.Selected, this.onSceneSelected)

		let id = this.getSelectedModelsIds(this.modelStore.selectedModels);
		sceneManager
				.onAllLoaded(() => {
					renderManager?.zoomCameraToSelection();
				})
				.load(id)

		metaManager.load(this.modelStore.selectedModels)
	},
	unmounted() {
		renderManager?.destroy()
	},
	methods: {
		onMetaSelected(e: { geomNums: number[], elNums: number[] }) {
			sceneManager.updateSelection(e.elNums, false);
		},
		onSceneSelected(e: any) {
			if (this.$refs.propsTree)
				(this.$refs.propsTree as any).fetchPropsByNumbers(sceneManager.selElNums[0]);
		},
		getSelectedModelsIds(modelsIds: any[]) {
			let id: string | string[] = "0491523c-3e44-f638-93aa-3a077e411e29"; // Default model
			if (modelsIds && modelsIds.length > 0) {
				if (modelsIds.length == 1)
					id = modelsIds[0].id;
				else {
					let ids = [];
					for (let i = 0; i < modelsIds.length; i++)
						ids.push(modelsIds[i].id);
					id = ids.join(";");
				}
			}
			return id
		}
	},
})
</script>