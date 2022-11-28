<template lang="pug">
#viewer.relative.h-full
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {OrbitControllerExtension} from "tangl-viewer"
import {renderManager, sceneManager} from "../managers"
import {modelStore} from "../stores/model"
import oidcStore from "../store";
import {mapStores} from "pinia";

// @ts-ignore
const env = import.meta.env;

export default defineComponent({
	computed: {
		...mapStores(modelStore)
	},
	async mounted() {
		renderManager?.init("viewer");
		renderManager.extMan.addExtension(OrbitControllerExtension)
		renderManager.extMan.selectControllerExtension("orbit")

		const token = oidcStore.state.oidcStore.access_token;
		sceneManager.setToken(token);

		let id = this.getSelectedModelsIds(this.modelStore.selectedModels);

		sceneManager
				.onAllLoaded(() => {
					renderManager?.zoomCameraToSelection();
				})
				.load(id)


	},
	unmounted() {
		renderManager?.destroy()
	},
	methods: {
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
	}
})
</script>