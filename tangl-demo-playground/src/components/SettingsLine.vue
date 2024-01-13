<template lang="pug">
.flex.items-center
	p {{name}}
slot
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
	props: {
		name: {type: String, required: true}
	}
})
</script>
