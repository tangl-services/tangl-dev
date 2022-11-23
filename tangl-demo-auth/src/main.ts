import '@unocss/reset/tailwind.css'
import 'uno.css'

import {createApp} from 'vue'
import store from './store'
import router from './router'

import App from './App.vue'

const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app')