import {defineStore} from 'pinia'
import oidcStore from "../store";
import axios from "axios";

// @ts-ignore
const env = import.meta.env;

export type Model = {
    id: string,
    sw: string
    name: string
    elementsCount: number
    date: string
    lastModifiedEmail: string
    desc: string
    versionIndex: number
    versions: Array<any>
}

export type SelectedModel = {
    id: string;
    name: string;
    versions: any[]
}

export const modelStore = defineStore('model', {
    state: () => ({
        selectedModels: [] as SelectedModel[],
        models: [] as Model[]
    }),
    actions: {
        getModelsByIds(ids: string[]): SelectedModel[] {
            return this.models.filter((m: Model) => ids.includes(m.id))
        },
        async fetchModels() {
            console.log("[ModelsStore] Fetching models...")
            const sToken = sessionStorage.getItem("tangl_token");
            const token = sToken ? sToken : oidcStore.state.oidcStore.access_token;

            const compId = "178fda74-d35c-fec7-1d4a-3a077ce1cc24"; // Company id
            const res = await axios.get(env.VITE_TANGL_SERVER + "/api/app/metaModelsList/" + compId, {
                responseType: "json",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).catch(err => console.error(err));

            if (res) {
                let modelsRes = res.data as Model[];
                modelsRes.forEach(model => {
                    let lastModelVersion = model.versions[model.versions.length - 1];
                    model.id = lastModelVersion.id,
                    model.date = lastModelVersion.date
                    model.elementsCount = lastModelVersion.elementsCount
                    model.desc = lastModelVersion.desc
                    model.versionIndex = lastModelVersion.versionIndex
                });
                this.models = modelsRes;
            }
        }
    }
})