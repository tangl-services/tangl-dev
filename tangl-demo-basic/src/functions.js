import axios from "axios";

const TANGL_AUTH_SERVER = "https://auth.tangl.cloud"
const TANGL_SERVER = "https://platform.tangl.cloud"
export let tanglToken = undefined;

export async function fetchToken() {
	//post request
	const response = await axios.post(TANGL_AUTH_SERVER + "/connect/token", {
			client_id: "e35e3f8b-8197-5b4d-8249-3a077cfedc50", //Demo API client
			client_secret: "ff7eb513-db87-b66d-f743-3a077cfedc51", //Demo API client
			grant_type: "password",
			username: "devdemo@tangl.cloud", //Demo account
			password: "Devdemo1!", //Demo account
		},
		{
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
		})

	if (response?.data?.access_token) {
		//store token
		tanglToken = response.data.access_token;
		console.info("Acces token is fetched: ", response.data.access_token)
	}
}

export async function fetchCompanies() {
	const response = await axios.get(TANGL_AUTH_SERVER + "/api/app/company",
		{
			headers: {
				'Authorization': 'Bearer ' + tanglToken
			},
		})

	if (response?.data) {
		console.info("Companies are fetched: ", response.data)
	}

	return response.data
}

export async function fetchModels(companyId) {
	const response = await axios.get(TANGL_SERVER + "/api/app/metaModelsList/" + companyId,
		{
			headers: {
				'Authorization': 'Bearer ' + tanglToken
			},
		})

	if (response?.data) {
		console.info("Models are fetched: ", response.data)
	}

	return response.data
}
