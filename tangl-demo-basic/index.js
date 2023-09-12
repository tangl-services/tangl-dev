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

const companies = await fetchCompanies()
const companyId = companies[0].id

const models = await fetchModels(companyId)
const modelId = models[0].versions[0].id

//load scene from bucket via bucket GUID and zoom camera after load process
sceneManager
	 .onAllLoaded(() => {
		 renderManager.zoomCameraToSelection()
	 }).load(modelId)