import {MetaManager, SceneManager, viewerStore} from "tangl-viewer";
//@ts-ignore
const env = import.meta.env;

export const isAuth = /^true$/i.test(env.VITE_AUTH);

import App from "./App.vue";
import {createApp} from "vue";

export const app = createApp(App);

export const sceneManager = new SceneManager().setServer(env.VITE_TANGL_SERVER)
export const metaManager = new MetaManager().setServer(env.VITE_TANGL_SERVER, env.VITE_TANGL_CACHE_SERVER)

export const renderManager = viewerStore.createRenderManager("default", sceneManager, metaManager)!
metaManager.useCache = true;

