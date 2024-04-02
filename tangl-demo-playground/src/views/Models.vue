<template lang="pug">
.flex.flex-col.h-full
	h1.ml-10.mt-6 Models
	p.ml-10 Select models and click on the 3D view button

	NDataTable.flex-grow.p-4( :columns="columns"
		:data="modelStore.models"
		:row-props="rowProps"
		flex-height= true
		type= 'selection'
		:row-key="rowKey"
		multiple= true
		:checked-row-keys="checkedRowKeys"
		@update:checked-row-keys="handleCheck"
		striped= true)
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {DataTableColumns, DataTableRowKey} from "naive-ui"
import {SelectedModel, useModelStore as useModelStore, Model} from "../stores/model";
import {RowData} from "naive-ui/es/data-table/src/interface";

// @ts-ignore
const env = import.meta.env;


const createColumns = (): DataTableColumns<Model> => {
	return [
		{
			type: 'selection',
			cellProps: (row: SelectedModel) => {
				return {
					onClick: (e: MouseEvent) => {
						e.stopPropagation();
					}
				}
			}
		},
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
		const checkedRowKeysRef = ref<DataTableRowKey[]>([])

		return {
			rowKey: (row: RowData) => row.id,
			checkedRowKeys: checkedRowKeysRef,
			handleCheck(rowKeys: DataTableRowKey[]) {
				checkedRowKeysRef.value = rowKeys
				const selModels = modelStore.getModelsByIds(rowKeys as string[]);

				modelStore.models.forEach(e => e.active = false)
				selModels.forEach(e => e.active = true)

				modelStore.selectedModels = selModels.map(x => ({
					id: x.id,
					name: x.name,
					versions: x.versions
				}));

				console.log("Selected Models...", modelStore.selectedModels);
			},
			modelStore: modelStore,
			columns: createColumns(),
			pagination: false as const,
			rowProps: (row: SelectedModel) => {
				return {
					class: checkedRowKeysRef.value.includes(row.id) ? "active" : "",
					style: 'cursor: pointer;',
					onClick: (e: MouseEvent) => {
						if (e.ctrlKey) {
							checkedRowKeysRef.value.push(row.id);

							modelStore.selectedModels.push({
								id: row.id,
								name: row.name, versions: row.versions
							});

							// e.target?.parentElement?.classList.add("active");
						} else {
							checkedRowKeysRef.value = [row.id];

							// 	if (modelStore.selectedModels.length > 0) {
							// 		let activeEls = document.querySelectorAll('.active');
							// 		activeEls.forEach(e => e.classList.remove('active'))
							// 	}

							modelStore.selectedModels = [];

							modelStore.selectedModels.push({
								id: row.id,
								name: row.name, versions: row.versions
							});

							// e.target?.parentElement?.classList.add("active");
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

.n-data-table
	font-size: 10px
	--n-td-color-hover: var(--tg-primary-100) !important

.active td
	background-color: var(--tg-primary-400-trans1) !important

</style>
