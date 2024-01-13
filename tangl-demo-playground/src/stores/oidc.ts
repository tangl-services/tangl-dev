import {defineStore, StoreDefinition} from "pinia";
import {piniaOidcCreateStoreModule} from "pinia-oidc";

import {User} from "oidc-client-ts";
import {
	PiniaOidcClientSettings,
	PiniaOidcErrorPayload,
	PiniaOidcStoreListeners,
	PiniaOidcStoreSettings
} from "pinia-oidc/types/oidc";

export var useOidcStore: StoreDefinition;
export var oidcClientSettings: PiniaOidcClientSettings;

export function createOidcStore(oidcSettings: PiniaOidcClientSettings) {
	oidcClientSettings = oidcSettings;

	useOidcStore = defineStore("oidcStore",
		piniaOidcCreateStoreModule(oidcSettings, {
			dispatchEventsOnWindow: true,
		} as PiniaOidcStoreSettings, {
			userLoaded: (user: User) => userLoaded(user),
			userUnloaded: () => console.log('OIDC user is unloaded'),
			accessTokenExpiring: () => console.log('OIDC access token will expire'),
			accessTokenExpired: () => console.log('OIDC access token did expire'),
			silentRenewError: () => console.log('OIDC Silent renew error occured'),
			userSignedOut: () => console.log('OIDC user is signed out'),
			oidcError: (payload: PiniaOidcErrorPayload | undefined) => console.log(`OIDC error occurred at ${payload?.context}:`, payload?.error),
			automaticSilentRenewError: (payload: PiniaOidcErrorPayload | undefined) => console.log(`OIDC automatic silent renew failed at ${payload?.context}:`, payload?.error)
		} as PiniaOidcStoreListeners)
	);
}

function userLoaded(user: User) {
	console.log('OIDC user: ' + user.profile.sub + ' is loaded');
}

