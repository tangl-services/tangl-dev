import {GeneralModeExtension, OrbitControllerExtension, SceneManager, Ui, viewerStore} from "tangl-viewer"
import {fetchModels, fetchCompanies, fetchToken, tanglToken} from "./functions.js";

//import styles
import "../node_modules/tangl-viewer/dist/style.css";

//enable viewer locales
Ui.setI18next()

//create main managers
const sceneManager = new SceneManager()
const renderManager = viewerStore.createRenderManager("default", sceneManager)

//init RenderManager with "viewer" DOM element
renderManager.init("viewer")

//add general mode extension
renderManager.extMan.addExtension(GeneralModeExtension)

//select orbit extension as default
renderManager.extMan.selectModeExtension("general")

//add orbit controller extension for basic camera transformation
renderManager.extMan.addExtension(OrbitControllerExtension)

//select orbit extension as default
renderManager.extMan.selectControllerExtension("orbit")

await fetchToken()
sceneManager.setToken(tanglToken)

const companies = await fetchCompanies()
const companyId = companies.filter(c => !c.isPersonal)[0].id

const models = await fetchModels(companyId)
const modelId = models[0].versions[0].id

//load scene from bucket via bucket GUID and zoom camera after load process
sceneManager
    .onAllLoaded(() => {
        //zoom camera to model position and bounds
        renderManager.zoomCameraToSelection()
    }).load(modelId)
