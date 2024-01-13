<template lang="pug">
h2 {{$t("oidc.restoring")}}
</template>

<script lang="ts">

import {defineComponent} from "vue";
import {oidcClientSettings, useOidcStore} from "../../stores/oidc";
import {piniaOidcProcessSignInCallback} from "pinia-oidc";

export default defineComponent({
	name: "OidcCallbackSilent",
	setup() {
		return {
			oidcStore: useOidcStore()
		}
	},
	mounted() {
		console.log("oidcProcessSilentSignInCallback");
		piniaOidcProcessSignInCallback(oidcClientSettings)
	},
});
</script>
