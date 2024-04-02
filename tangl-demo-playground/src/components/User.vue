<template lang="pug">
.flex.gap-2.right-0.m-1.items-center(v-if="oidcStore.oidcIsAuthenticated")
	.i-ri-shield-user-line.text-gray.w-5.h-5
	p {{oidcStore.user.email}}

	p-button.tool(@click="oidcStore.signOutOidc()")
		.i-ri-logout-box-r-line

	div(v-for="lg in $i18next.languages")
		p.font-bold(class="text-$tg-primary-400" v-if="$i18next.language===lg") {{lg}}
		p-button.flat(
			v-if="$i18next.language!=lg"
			@click="$i18next.changeLanguage(lg)") {{lg}}

</template>

<script lang="ts">
import {defineComponent} from "vue";
import {mapActions, mapGetters, mapState} from "pinia";
import {useOidcStore} from "../stores/oidc";
import Button from "primevue/button";

export default defineComponent({
	components: {"p-button": Button},
	setup() {
		return {oidcStore: useOidcStore()}
	},
})
</script>

<style lang="sass">
.btn
	--at-apply: "bg-gray-200 px-1 rounded-sm hover:(bg-gray-400)"
</style>
