<template lang="pug">
h2 Silent login...
</template>

<script>
import {vuexOidcProcessSilentSignInCallback} from "vuex-oidc";

export default {
	name: "OidcCallbackSilent",
	mounted() {
		console.log("vuexOidcProcessSilentSignInCallback");
		vuexOidcProcessSilentSignInCallback().catch((error) => console.log("Silent callback error:" + error));
	},
};
</script>