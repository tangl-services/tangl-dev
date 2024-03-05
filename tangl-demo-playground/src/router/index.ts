import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

import Viewer from '../views/Viewer.vue';

import OidcCallback from '../views/oidc/OidcCallback.vue';
import OidcCallbackSilent from '../views/oidc/OidcCallbackSilent.vue';
import Models from '../views/Models.vue';
import {isAuth} from "../managers";

const routes = [
	{
		path: '/',
		component: Models,
		name: 'models',
	},
	{
		path: '/viewer',
		component: Viewer,
		name: 'viewer',
	},
] as RouteRecordRaw[]

//OIDC routes------------------------------------------------
if (isAuth) {
	routes.push({
			path: '/oidc-callback', // Needs to match redirectUri (redirect_uri if you use snake case) in you oidcSettings
			name: 'oidcCallback',
			component: OidcCallback,
			meta: {
				isPublic: true
			}
		},
		{
			path: '/oidc-callback-silent', // Needs to match redirectUri (redirect_uri if you use snake case) in you oidcSettings
			name: 'oidcCallbackSilent',
			component: OidcCallbackSilent,
			meta: {
				isPublic: true
			}
		})
}

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
})
export default router
