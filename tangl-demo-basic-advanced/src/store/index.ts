import {createStore} from 'vuex'
import {oidcSettings} from '../oidc'
import {VuexOidcClientSettings, vuexOidcCreateStoreModule, VuexOidcErrorPayload} from "vuex-oidc";
import {User} from "oidc-client";

//import {SceneManager} from "tangl.viewer";
//import {MetaManager} from "tangl.viewer";
//import {ViewerStore} from "tangl.viewer";

// export const global = {
// 	vstore: new ViewerStore() as ViewerStore,
// 	sceneMan: new SceneManager(import.meta.env.VITE_TANGL_SERVER),
// 	metaMan: new MetaManager(import.meta.env.VITE_TANGL_SERVER),
// 	collisionMan: new Collisions.CollisionManager(),
//
// 	viewer: undefined,
// 	metaTree: undefined,
//
// 	app: null
// };

//global.vstore.addMetaManager("default", global.metaMan)

function userLoaded(user: User) {
	console.log('OIDC user: ' + user.profile.sub + ' is loaded');
	//    store.dispatch("user/fetchUserInfoByIds", { id: user.profile.sub, companyId: user.profile.company_id });
}

function createOidcStore(oidcSettings: VuexOidcClientSettings) {
	return vuexOidcCreateStoreModule(oidcSettings,
		{
			namespaced: true,
			dispatchEventsOnWindow: true,
		},
		{
			userLoaded: (user: User) => userLoaded(user),
			userUnloaded: () => console.log('OIDC user is unloaded'),
			accessTokenExpiring: () => console.log('Access token will expire'),
			accessTokenExpired: () => console.log('Access token did expire'),
			silentRenewError: () => console.log('Silent renew error occured'),
			userSignedOut: () => console.log('OIDC user is signed out'),
			oidcError: (payload: VuexOidcErrorPayload | undefined) => console.log(`An error occured at ${payload?.context}:`, payload?.error),
			automaticSilentRenewError: (payload: VuexOidcErrorPayload | undefined) => console.log('Automatic silent renew failed.', payload?.error)
		});
}

export default createStore({
	modules: {
		oidcStore: createOidcStore(oidcSettings),
	},
})