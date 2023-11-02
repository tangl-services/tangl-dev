//external styles
import 'uno.css'

//libs
import i18next from "i18next";
import I18NextVue from "i18next-vue";
import LanguageDetector from 'i18next-browser-languagedetector';
//@ts-ignore
import messages from 'tangl-i18next-vite/messages'

import TanglViewer from "tangl-viewer-ui-vue";

//styles
import './assets/sass/style.sass'

import {createApp} from 'vue'
import store from './store'
import router from './router'

import App from './App.vue'

// @ts-ignore
const env = import.meta.env;

const app = createApp(App);
import {createPinia} from 'pinia'

//need for i18next resources parsing
Object.keys(messages).forEach(function (key) {
	messages[key] = ({"translation": messages[key]});
});

const pinia = createPinia()

i18next.use(LanguageDetector).init({
	//debug: true,
	fallbackLng: ["en", "ru"],
	supportedLngs: ["en", "ru"],
	//lng: 'ru',
	resources: messages
})

import naive from "naive-ui";
import PrimeVue from "primevue/config";

app.use(naive);
app.use(PrimeVue, {inputStyle: 'filled', unstyled: false});
app.use(I18NextVue, {i18next});
app.use(store);
app.use(pinia);
app.use(router);
app.use(TanglViewer, {i18next})


import DemoExtensionSharedToolbar from "./extensions/demo-basic/SharedToolbar.vue"
import {DemoBasicExtension} from "./extensions/demo-basic"

import DemoModeDedicatedToolbar from "./extensions/demo-mode/DedicatedToolbar.vue"
import {DemoModeExtension} from "./extensions/demo-mode"

export function register(component: any, name: string = "") {
	name = name != "" ? name : component.name;
	if (!app._context.components[name])
		app.component(name, component);
}

register(DemoExtensionSharedToolbar, DemoBasicExtension.getSharedToolbarName());
register(DemoModeDedicatedToolbar, DemoModeExtension.getDedicatedToolbarName());

app.mount('#app')