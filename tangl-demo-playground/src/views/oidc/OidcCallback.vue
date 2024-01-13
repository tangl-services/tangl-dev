<template lang="pug">
.OidcCallback
	h2 {{$t("oidc.authorizing")}}
</template>

<script>
import {defineComponent} from "vue";
import {useOidcStore} from "../../stores/oidc";

export default defineComponent({
	name: "OidcCallback",
	setup() {
		return {
			oidcStore: useOidcStore(),
		}
	},
	mounted() {
		this.oidcStore.oidcSignInCallback()
				.then(async (redirectPath) => {
					this.$router.push(redirectPath);
				})
				.catch((err) => {
					console.error("oidcStore/oidcSignInCallback error", err);
					this.$router.push('/oidc-callback-error')
				});
	},
});
</script>
