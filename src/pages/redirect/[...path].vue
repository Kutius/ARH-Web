<template></template>
<script lang="ts">
export default {
	beforeRouteEnter(to: any, from: any, next: any) {
		console.log(from.fullPath)
		next(from.fullPath)
	},
}
</script>
