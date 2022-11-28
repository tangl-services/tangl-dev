import {MetaManager, SceneManager, viewerStore} from "tangl-viewer";

export const sceneManager = new SceneManager()
export const renderManager = viewerStore.createRenderManager("default", sceneManager)!
export const metaManager = new MetaManager()
 
