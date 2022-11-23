<template lang="pug">
.flex.justify-center
	.flex.flex-col.gap-4.p-10.items-center.max-w-200(v-if="oidcIsAuthenticated")
		img(src="favicon.ico")
		p.font-bold You are logged in!
		h2 {{user.email}}
		button.btn(@click="signOutOidc()") Exit
		p.font-bold Access Token
		small.break-all {{token}}
	
	.flex.flex-col.gap-4.p-10.items-center.max-w-600(v-else)
		p.font-bold You are not logged in :(

</template>

<script lang="ts">
import {defineComponent} from "vue";
import {mapActions, mapGetters, mapState} from "vuex";
import oidcStore from "../store";

export default defineComponent({
	data() {
		return {
			token: ""
		}
	},
	computed: {
		...mapState("oidcStore", ["user"]),
		...mapGetters("oidcStore", ["oidcIsAuthenticated"])
	},
	methods: {
		...mapActions("oidcStore", ["signOutOidc"]),
	},
	async mounted() {
		this.token = oidcStore.state.oidcStore.access_token;
	},
})

</script>
<style lang="sass">
h1
	font-size: 1.5rem
	font-weight: bold

h2
	font-size: 1.3rem
	font-weight: bold

.btn
	--at-apply: "bg-gray-200 px-1 rounded-sm hover:(bg-gray-400)"
</style>