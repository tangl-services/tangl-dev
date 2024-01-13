<template lang="pug">
.flex.flex-col.h-full.w-full
	#tgv-metatree.flex-grow.overflow-hidden

</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {MetaManager, SceneManager, SceneEvents, viewerStore} from "tangl-viewer";
import {Ui} from "tangl-viewer";

let metaTreeComponent: Ui.MetaTreeContext;

export default defineComponent({
	name: "tg-meta-pane",
	emits: ["selected"],
	props: {
		metaManager: {type: Object as PropType<MetaManager>, required: true},
		sceneManager: {type: Object as PropType<SceneManager>, required: true}
	},
	mounted() {
		metaTreeComponent = Ui.appendMetaTree("tgv-metatree", this.metaManager, {
			selected: this.onMetaSelected
		})

		this.onSceneSelected = this.onSceneSelected.bind(this)
		this.sceneManager.addEventListener(SceneEvents.Selected, this.onSceneSelected)
	},
	methods: {
		onMetaSelected(e: { elNums: number[] }) {
			const renderManager = viewerStore.getRenderManager()!;
			renderManager.sceneManager.updateSelection(e.elNums, false, false);

			renderManager.requestUpdate(false);

			this.$emit("selected", e.elNums)
		},
		onSceneSelected() {
			if (this.sceneManager.selElNums.length > 0)
				metaTreeComponent?.selectEls(this.sceneManager.selElNums[0], true)
			else
				metaTreeComponent?.clearSelection()
		},
	},
});
</script>
