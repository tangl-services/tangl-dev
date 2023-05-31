<template lang="pug">
.absolute.flex.w-full.h-full.bg-gray-100.overflow-hidden
	.w-100.p-2
		tgv-metatree(:metaManager="metaManager"  @selected="onMetaSelected")

	.relative.flex-grow.h-full.flex.overflow-hidden
		#viewer.flex-grow.h-full
		tgv-extensions-ui
		tgv-toolbar.absolute.tgv-bg-blur

	.w-100.p-2
		tgv-propstree(ref="propsTree" :metaManager="metaManager")
</template>

<script lang="ts">
import {defineComponent} from "vue";

import {
	CoordinatesExtension,
	CropExtension, FlyControllerExtension,
	GeneralModeExtension, MeasureExtension, OrbitControllerExtension, SceneEvents,
	VisibilityExtension
} from "tangl-viewer";
import {DemoBasicExtension} from "../extensions/demo-basic";
import {renderManager, sceneManager, metaManager} from "../managers";
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
		let ids: string[] = [];
		if (typeof this.$route.query.ids === "string") ids = [this.$route.query.ids as string];
		else ids = this.$route.query.ids as string[];

		console.log("[Props View] Loading models(length)", ids, ids.length)

		if (ids.length === 0) {
			this.$router.push("/")
		}

		const token = oidcStore.state.oidcStore.access_token;
		sceneManager.setToken(token);
		metaManager.setToken(token);

		renderManager?.init("viewer");
		renderManager.setBackgroundColor(0xffffff);

		// Built-in extensions
		renderManager.extMan.addExtension(OrbitControllerExtension)
		renderManager.extMan.addExtension(FlyControllerExtension)
		renderManager.extMan.addExtension(GeneralModeExtension)
		renderManager.extMan.addExtension(DemoModeExtension)
		renderManager.extMan.addExtension(CropExtension)
		renderManager.extMan.addExtension(VisibilityExtension)
		renderManager.extMan.addExtension(MeasureExtension)
		renderManager.extMan.addExtension(CoordinatesExtension)

		renderManager.extMan.selectControllerExtension("orbit")
		renderManager.extMan.selectModeExtension("general")
		// Demo extension
		renderManager.extMan.addExtension(DemoBasicExtension)

		this.onSceneSelected = this.onSceneSelected.bind(this)
		sceneManager.addEventListener(SceneEvents.Selected, this.onSceneSelected)

		sceneManager
				.onAllLoaded(() => {
					renderManager?.zoomCameraToSelection();
				})
				.load((ids as string[]).join(";"))

		await metaManager.load(this.modelStore.getModelsByIds(ids))


	},
	unmounted() {
		renderManager?.destroy();
		sceneManager?.clear();
		metaManager?.destroy();
	},
	methods: {
		onMetaSelected(e: { geomNums: number[], elNums: number[] }) {
			console.log(e)
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