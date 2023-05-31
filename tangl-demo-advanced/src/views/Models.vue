<template lang="pug">
.flex.flex-col.h-full
	h2.ml-10.mt-10 MODELS
	p.ml-10 Select models and click on the one of 3D view presets
	NDataTable.flex-grow.p-10( :columns="columns"
		:data="modelStore.models"
		:row-props="rowProps"
		flex-height= true
		type= 'selection'
		multiple= true
		striped= true)

</template>

<script lang="ts">
import {defineComponent} from "vue";
import {DataTableColumns} from "naive-ui"
import axios from "axios";
import oidcStore from "../store";
import {SelectedModel, modelStore as useModelStore, Model} from "../stores/model";

// @ts-ignore
const env = import.meta.env;


const createColumns = (): DataTableColumns<Model> => {
	return [
		{
			title: 'FORMAT',
			key: 'sw'
		},
		{
			title: 'VERSION NUMBER',
			key: 'versionIndex'
		},
		{
			title: 'MODEL OR DATA',
			key: 'name'
		},
		{
			title: 'COVER',
			key: 'elementsCount'
		},
		{
			title: 'DATE',
			key: 'date'
		},
		{
			title: 'AUTHOR OF CHANGES',
			key: 'lastModifiedEmail'
		},
		{
			title: 'DESCRIPTION',
			key: 'desc'
		}
	]
}


export default defineComponent({
	setup() {
		const modelStore = useModelStore()
		return {
			modelStore: modelStore,
			columns: createColumns(),
			pagination: false as const,
			rowProps: (row: SelectedModel) => {
				return {
					style: 'cursor: pointer;',
					onClick: (e: MouseEvent) => {
						if (e.ctrlKey) {
							modelStore.selectedModels.push({
								id: row.versions[row.versions.length - 1].id,
								name: row.name, versions: row.versions
							});

							e.target?.parentElement?.classList.add("active");
						} else {
							if (modelStore.selectedModels.length > 0) {
								let activeEls = document.querySelectorAll('.active');
								activeEls.forEach(e => e.classList.remove('active'))
							}

							modelStore.selectedModels = [];

							modelStore.selectedModels.push({
								id: row.versions[row.versions.length - 1].id,
								name: row.name, versions: row.versions
							});

							e.target?.parentElement?.classList.add("active");
						}

						console.log("Selected Models...", modelStore.selectedModels);
					}
				}
			}
		}
	},
	async mounted() {
		this.modelStore.selectedModels = []

		await this.modelStore.fetchModels();
	},
	unmounted() {

	}
})

</script>
<style lang="sass">
h2
	font-family: v-sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
	font-size: 24px
	font-weight: 700
	color: #b30047

.n-data-table
	font-size: 10px
	--n-td-color-hover: #b3004825 !important

.active td
	background-color: #b30048c6 !important
	color: white !important

</style>