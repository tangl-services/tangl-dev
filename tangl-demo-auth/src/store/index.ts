import {createStore} from 'vuex'
import {oidcSettings} from '../oidc'
import {VuexOidcClientSettings, vuexOidcCreateStoreModule, VuexOidcErrorPayload} from "vuex-oidc";
import {User} from "oidc-client";

function createOidcStore(oidcSettings: VuexOidcClientSettings) {
	return vuexOidcCreateStoreModule(oidcSettings,
		{
			namespaced: true,
			dispatchEventsOnWindow: true,
		},
		{
			userLoaded: (user: User) => (user: User) => console.log('OIDC user: ' + user.profile.sub + ' is loaded'),
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