import {defineStore} from 'pinia'

export const modelStore = defineStore('model', {
	state: () => ({
		selectedModels: [] // Stores the Ids and the names of the selected models in the table
	}),
})