<template lang="pug">
h2 Processing...
</template>
<script>
import {defineComponent} from "vue";
import {mapActions} from "vuex";

export default defineComponent({
	name: "OidcCallback",
	methods: {
		...mapActions(["oidcStore/oidcSignInCallback", "oidcStore/signOutOidc"]),
	},
	mounted() {
		this["oidcStore/oidcSignInCallback"]()
				.then((redirectPath) => {
					this.$router.push(redirectPath);
				})
				.catch((err) => {
					console.error("" + err);
				});
	},
});
</script>