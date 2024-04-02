//styles
import 'uno.css'
import naive from "naive-ui";
import PrimeVue from "primevue/config";

//i18next
import i18next from "i18next";
import I18NextVue from "i18next-vue";
import LanguageDetector from 'i18next-browser-languagedetector';

//@ts-ignore
import messages from 'tangl-i18next-vite/messages'

//viewer
import {Ui} from "tangl-viewer";

//styles
import './assets/sass/style.sass'

import router from './router'
import {PiniaOidcClientSettings} from "pinia-oidc/types/oidc";


import {createPinia, setActivePinia} from 'pinia'
import {piniaOidcCreateRouterMiddleware} from "pinia-oidc";
import {createOidcStore, useOidcStore} from "./stores/oidc";
import {app, isAuth} from "./managers";

//need for i18next resources parsing
Object.keys(messages).forEach(function (key) {
	messages[key] = ({"translation": messages[key]});
});

const pinia = createPinia()
setActivePinia(pinia);

i18next.use(LanguageDetector).init({
	//debug: true,
	fallbackLng: ["en", "ru"],
	supportedLngs: ["en", "ru"],
	//lng: 'ru',
	resources: messages
})


app.use(naive);
app.use(PrimeVue, {inputStyle: 'filled', unstyled: false});
app.use(I18NextVue, {i18next});
app.use(pinia);
app.use(router);

Ui.setI18next(i18next)

//@ts-ignore
const env = import.meta.env;


if (isAuth) {
	const piniaOidcClientSettings: PiniaOidcClientSettings = {
		authority: env.VITE_AUTHORITY,
		client_id: "e35e3f8b-8197-5b4d-8249-3a077cfedc50",
		client_secret: "ff7eb513-db87-b66d-f743-3a077cfedc51",
		response_type: "code",
		redirect_uri: env.VITE_REDIRECT_URI,
		silent_redirect_uri: env.VITE_SILENT_REDIRECT_URI,
		scope: 'openid email profile role IdentityServerApi Tangl.Server',
		acr_values: undefined,
		automaticSilentRenew: true,
		automaticSilentSignin: false,
	}

	createOidcStore(piniaOidcClientSettings)
	router?.beforeEach(piniaOidcCreateRouterMiddleware(useOidcStore(pinia) as any));
}

app.mount('#app')
