<template lang="pug">
Splitpanes(:push-other-panes="false" @resized="update")
	Pane.min-w-50(  v-if="state.showMetaTree" :size="state.metaTreeSize" :min-size="10")
		MetaPane(:metaManager="metaManager" :sceneManager="sceneManager" @selected="onMetaSelected")

	Pane.relative
		#viewer.w-full.h-full
		#viewer-cube.absolute.bottom-0.right-0.h-60.w-60
		//#tgv-monitor.absolute.bottom-0.left-0.h-160.w-90.flex.flex-wrap
		//#tgv-bench.absolute.min-w-100

	Pane.min-w-50(v-if="state.showPropsTree" :size="state.propsTreeSize" :min-size="10")
		PropsPane(ref="propsPane" :metaManager="metaManager" :sceneManager="sceneManager")

	Pane.min-w-50(v-if="state.showSettings" :size="state.settingsSize" :min-size="10")
		SettingsPane

//teleport
teleport(to="#header-teleport")
	p-button.header(
		:class="{active:state.showMetaTree}"
		@click="state.showMetaTree=!state.showMetaTree"
	)
		.i-ri-node-tree

	p-button.header(
		:class="{active:state.showPropsTree}"
		@click="state.showPropsTree=!state.showPropsTree"
	)
		.i-ri-list-unordered

	p-button.header(
		:class="{active:state.showSettings}"
		@click="state.showSettings=!state.showSettings"
	)
		.i-ri-sound-module-line

</template>

<script lang="ts">
import {defineComponent} from "vue";

import {
	CoordinatesExtension,
	CropExtension, FlyControllerExtension,
	GeneralModeExtension, MeasureExtension, OrbitControllerExtension, OrbitExtensionOptions, SceneEvents,
	VisibilityExtension
} from "tangl-viewer";
import {DemoBasicExtension} from "../extensions/demo-basic";
import {renderManager, sceneManager, metaManager, isAuth} from "../managers";
import {DemoModeExtension} from "../extensions/demo-mode";
import {mapStores} from "pinia";
import {MOUSE} from "three";
import {useOidcStore} from "../stores/oidc";

import {Splitpanes, Pane} from "splitpanes"
import {useLocalStorage} from "@vueuse/core";
import {FlyExtensionOptions} from "tangl-viewer";
import SettingsPane from "../components/SettingsPane.vue";
import {useSettingsStore} from "../stores/settings";
import {useModelStore} from "../stores/model";
import Button from "primevue/button";
import {ModelsProgressEvent} from "tangl-viewer";

import {MakingGeom1Extension} from "../extensions/making-geom-1";
import {HowtoBasicExtension2} from "../extensions/howto-basic-2";

class ViewState {
	showMetaTree = true
	showPropsTree = true
	showSettings = true

	metaTreeSize = 25
	propsTreeSize = 25
	settingsSize = 25
}

export default defineComponent({
	setup() {
		if (isAuth) {
			const oidcStore = useOidcStore()
			return {metaManager, sceneManager, oidcStore}
		} else
			return {metaManager, sceneManager}

	},
	components: {Splitpanes, Pane, SettingsPane, "p-button": Button},
	data() {
		const state = new ViewState()
		return {state: useLocalStorage("t-playground-3d-view", state)}
	},
	computed: {
		...mapStores(useModelStore, useSettingsStore)
	},
	async mounted() {
		this.state = Object.assign(new ViewState(), this.state)

		let ids: string[] = [];
		if (typeof this.$route.query.ids === "string") ids = [this.$route.query.ids as string];
		else ids = this.$route.query.ids as string[];

		console.log("[Props View] Loading models(length)", ids, ids.length)

		if (ids.length === 0) {
			this.$router.push("/")
		}

		if (this.modelStore.models.length === 0) await this.modelStore.fetchModels();

		if (isAuth && this.oidcStore) {
			const token = this.oidcStore.access_token;
			sceneManager.setToken(token);
			metaManager.setToken(token);
		}

		renderManager?.init("viewer", "viewer-cube", true);

		//set specific underlay params
		renderManager.inactiveDarkness = 1.0;
		renderManager.inactiveContrast = 5.0;
		renderManager.inactiveFrontOpacity = 0.59;


		renderManager.extMan.addExtension(FlyControllerExtension,
				{
					leftMouseButton: MOUSE.PAN,
					rightMouseButton: MOUSE.PAN,
				} as FlyExtensionOptions)

		renderManager.extMan.addExtension(OrbitControllerExtension)
		renderManager.extMan.selectControllerExtension("orbit")

		renderManager.extMan.addExtension(GeneralModeExtension)
		renderManager.extMan.addExtension(DemoModeExtension)
		renderManager.extMan.addExtension(CropExtension)
		renderManager.extMan.addExtension(VisibilityExtension)
		renderManager.extMan.addExtension(MeasureExtension)
		renderManager.extMan.addExtension(CoordinatesExtension)

		renderManager.extMan.selectModeExtension("general")

		// Demo extension
		// renderManager.extMan.addExtension(DemoBasicExtension)

		// How to lessons extensions
		// renderManager.extMan.addExtension(HowtoBasicExtension1)
		// renderManager.extMan.addExtension(HowtoBasicExtension2, {hideToolbar: false})
		// renderManager.extMan.addExtension(MakingGeom1Extension)

		this.settingsStore.sync();
		this.settingsStore.apply();

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
		update(e: { min: number, max: number, size: number }[]) {
			console.log(e)

			if (this.state.showMetaTree)
				this.state.metaTreeSize = e[0].size;

			if (this.state.showPropsTree)
				this.state.propsTreeSize = this.state.showMetaTree ? e[2].size : e[1].size;

			if (this.state.showSettings) {
				let idx = 1;
				if (this.state.showMetaTree) idx++;
				if (this.state.showPropsTree) idx++;
				this.state.settingsSize = e[idx].size;
			}
		},

		onMetaSelected(els: number[]) {
			if (this.$refs.propsPane)
				(this.$refs.propsPane as any).fetchPropsByNumbers(els[0]);
		},
	},

})
</script>
