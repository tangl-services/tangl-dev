<template lang="pug">
.flex.flex-col.h-full.w-full.overflow-hidden
	#tgv-propstree.overflow-hidden.flex-grow
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {MetaManager, SceneManager, SceneEvents} from "tangl-viewer";
import {metaManager, sceneManager} from "../managers";
import {Ui} from "tangl-viewer";

let propsTreeComponent: Ui.PropsTreeContext;

export default defineComponent({
	name: "tg-props-pane",
	props: {
		metaManager: {type: Object as PropType<MetaManager>, required: true},
		sceneManager: {type: Object as PropType<SceneManager>, required: true}
	},
	mounted() {
		propsTreeComponent = Ui.appendPropsTree("tgv-propstree", metaManager)

		this.onSceneSelected = this.onSceneSelected.bind(this)
		this.sceneManager.addEventListener(SceneEvents.Selected, this.onSceneSelected);
	},
	methods: {
		onSceneSelected() {
			propsTreeComponent.fetchPropsByNumbers(sceneManager.selElNums[0]);
		},
		fetchPropsByNumbers(elNum: number) {
			propsTreeComponent.fetchPropsByNumbers(elNum);
		},
	},
});
</script>
