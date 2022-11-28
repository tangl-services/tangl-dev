import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

import Basic from '../views/Basic.vue';
import WithProps from '../views/WithProps.vue';
import WithFloatingProps from '../views/WithFloatingProps.vue';

import OidcCallback from '../views/oidc/OidcCallback.vue';
import OidcCallbackSilent from '../views/oidc/OidcCallbackSilent.vue';
import Models from '../views/Models.vue';
import {vuexOidcCreateRouterMiddleware} from "vuex-oidc";
import store from "../store";

const routes = [
	{
		path: '/',
		component: Models,
		name: 'Models',
	},
	{
		path: '/Basic',
		component: Basic,
		name: 'Basic',
	},
	{
		path: '/WithProps',
		component: WithProps,
		name: 'WithProps',
	},
	{
		path: '/WithFloatingProps',
		component: WithFloatingProps,
		name: 'WithFloatingProps',
	},
	//OIDC routes------------------------------------------------
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
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
})

router.beforeEach(vuexOidcCreateRouterMiddleware(store, 'oidcStore'))

export default router