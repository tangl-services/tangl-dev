// @ts-ignore
const env = import.meta.env;

import {VuexOidcClientSettings} from "vuex-oidc"

export const oidcSettings = {
	client_id: "e35e3f8b-8197-5b4d-8249-3a077cfedc50",
	client_secret: "ff7eb513-db87-b66d-f743-3a077cfedc51",

	response_type: "code",
	scope: "openid email profile role IdentityServerApi Tangl.Server",

	authority: env.VITE_AUTHORITY,
	redirect_uri: env.VITE_REDIRECT_URI,
	silentRedirectUri: env.VITE_SILENT_REDIRECT_URI,
	postLogoutRedirectUri: env.VITE_POST_LOGOUT_REDIRECT_URI,

	automaticSilentRenew: true, // If true oidc-client will try to renew your token when it is about to expire
} as VuexOidcClientSettings
