import {OrbitControllerExtension, SceneManager, viewerStore} from "tangl-viewer"

const TANGL_AUTH_SERVER = "https://auth.st.tangl.cloud"
var TANGL_TOKEN = undefined;

async function fetchToken() {
	const response = await window.axios.post(TANGL_AUTH_SERVER + "/connect/token", {
			 client_id: "e35e3f8b-8197-5b4d-8249-3a077cfedc50",
			 client_secret: "ff7eb513-db87-b66d-f743-3a077cfedc51",
			 grant_type: "password",
			 username: "devdemo@tangl.cloud",
			 password: "Devdemo1!",
		 },
		 {
			 headers: {
				 'Content-Type': 'application/x-www-form-urlencoded'
			 },
		 })

	if (response?.data?.access_token) {
		TANGL_TOKEN = response.data.access_token;
		console.info("Acces token is fetched: ", response.data.access_token)
	}
}


await fetchToken()

//create main managers
const sceneManager = new SceneManager()
const renderManager = viewerStore.createRenderManager("default", sceneManager)

//init RenderManager with "viewer" DOM element
renderManager.init("viewer")
//add orbit controller extension for basic camera transformation
renderManager.extMan.addExtension(OrbitControllerExtension)
//select orbit extension as default
renderManager.extMan.selectControllerExtension("orbit")

//load scene from bucket via bucket GUID and zoom camera after load process
sceneManager.onAllLoaded(() => {
	renderManager.zoomCameraToSelection()
}).load("0491523c-3e44-f638-93aa-3a077e411e29")