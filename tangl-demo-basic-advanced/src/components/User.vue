<template lang="pug">
.flex.gap-1.right-0.m-1.items-center(v-if="oidcIsAuthenticated")
	p {{user.email}}
	button.btn.text-black(@click="signOutOidc()") Exit

	div(v-for="lg in $i18next.languages")
		p.font-bold(v-if="$i18next.language===lg") {{lg}}
		button.btn.text-black(
			v-if="$i18next.language!=lg"
			@click="$i18next.changeLanguage(lg)") {{lg}}

</template>

<script lang="ts">
import {defineComponent} from "vue";
import {mapActions, mapGetters, mapState} from "vuex";

export default defineComponent({
	computed: {
		...mapState("oidcStore", ["user"]),
		...mapGetters("oidcStore", ["oidcIsAuthenticated"])
	},
	methods: {
		...mapActions("oidcStore", ["signOutOidc","signOutOidcCallback"]),
	},
})
</script>

<style lang="sass">
.btn
	--at-apply: "bg-gray-200 px-1 rounded-sm hover:(bg-gray-400)"
</style>