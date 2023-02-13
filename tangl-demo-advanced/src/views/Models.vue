<template lang="pug">
.flex.flex-col.h-full
	h2.ml-10.mt-10 MODELS
	NDataTable.flex-grow.p-10( :columns="columns"
		:data="models"
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
import {modelStore as useModelStore} from "../stores/model";

// @ts-ignore
const env = import.meta.env;
type Model = {
	sw: string
	name: string
	elementsCount: number
	date: string
	lastModifiedEmail: string
	desc: string
}

const createColumns = (): DataTableColumns<Model> => {
	return [
		{
			title: 'FORMAT',
			key: 'sw'
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
			rowProps: (row: Object) => {
				return {
					style: 'cursor: pointer;',
					onClick: (e) => {
						if (e.ctrlKey) {
							modelStore.selectedModels.push({id: row.id, name: row.name});
							e.target.parentElement.classList.add("active");
						} else {
							if (modelStore.selectedModels.length > 0) {
								let activeEls = document.querySelectorAll('.active');
								activeEls.forEach(e => e.classList.remove('active'))
							}
							modelStore.selectedModels = [];
							modelStore.selectedModels.push({id: row.id, name: row.name});
							e.target.parentElement.classList.add("active");
						}

						console.log("Selected Models...", modelStore.selectedModels);
					}
				}
			}
		}
	},
	data() {
		return {
			models: [] as Model[]
		}
	},
	async mounted() {
		// @ts-ignore
		const env = import.meta.env;
		this.modelStore.selectedModels = []

		const sToken = sessionStorage.getItem("tangl_token");
		const token = sToken ? sToken : oidcStore.state.oidcStore.access_token;

		const compId = "178fda74-d35c-fec7-1d4a-3a077ce1cc24"; // Company id
		const res = await axios.get(env.VITE_TANGL_SERVER + "/api/app/metaModelsList/" + compId, {
			responseType: "json",
			headers: {
				Authorization: `Bearer ${token}`
			},
		}).catch(err => console.error(err));

		if (res) this.models = res.data;


	},
	unmounted() {

	}
})

</script>
<style lang="sass" scope>
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