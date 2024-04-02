// @ts-ignore
const env = import.meta.env;

import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

import OidcCallback from '../views/oidc/OidcCallback.vue';
import OidcCallbackSilent from '../views/oidc/OidcCallbackSilent.vue';
import User from '../views/User.vue';
import {vuexOidcCreateRouterMiddleware} from "vuex-oidc";
import store from "../store";

const routes = [
	{
		path: '/',
		component: User,
		name: 'User',
	},
	//OIDC routes
	{
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
	},
] as RouteRecordRaw[]

const router = createRouter({
	history: createWebHistory(env.BASE_URL),
	routes
})

router.beforeEach(vuexOidcCreateRouterMiddleware(store, 'oidcStore'))

export default router