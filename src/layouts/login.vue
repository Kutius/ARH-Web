<template>
	<div class="bg-view">
		<div class="bg-view-container">123</div>
	</div>
	<router-view />
</template>

<style lang="less" scoped>
.bg-view {
	display: flex;
	// flex: auto;
	flex-direction: column;
	// align-items: center;
	height: 100vh;
	overflow: auto;
	background-color: rgb(15, 62, 62);
	&-container {
		padding: 20px 0;
		margin: 0 auto;
		flex: 1;
		width: 200px;
		height: 200px;
		background-color: rgb(255, 255, 255);
	}
}
</style>
