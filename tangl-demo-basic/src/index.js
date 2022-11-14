import {OrbitControllerExtension, SceneManager, viewerStore} from "tangl-viewer"

const sceneMan = new SceneManager()
const renderMan = viewerStore.createRenderManager("default", sceneMan)

renderMan.init("viewer")
renderMan.extMan.addExtension(OrbitControllerExtension)
renderMan.extMan.selectControllerExtension("orbit")

sceneMan.onAllLoaded(() => {
	renderMan.zoomCameraToSelection()
}).load("0491523c-3e44-f638-93aa-3a077e411e29")