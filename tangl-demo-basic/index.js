import {OrbitControllerExtension, SceneManager, viewerStore} from "tangl-viewer"
import {fetchModels, fetchCompanies, fetchToken, tanglToken} from "./functions.js";

//create main managers
const sceneManager = new SceneManager()
const renderManager = viewerStore.createRenderManager("default", sceneManager)

//init RenderManager with "viewer" DOM element
renderManager.init("viewer")

//add orbit controller extension for basic camera transformation
renderManager.extMan.addExtension(OrbitControllerExtension)

//select orbit extension as default
renderManager.extMan.selectControllerExtension("orbit")

await fetchToken()
sceneManager.setToken(tanglToken)

// const companies = await fetchCompanies()
// const companyid = companies[0].id
//
// const models = await fetchModels(companyid)
// const modelid = models[0].id

//load scene from bucket via bucket GUID and zoom camera after load process
sceneManager
	 .onAllLoaded(() => {
		 renderManager.zoomCameraToSelection()
	 }).load("52340e85-61af-45a9-63a5-3a077e4e4f99")