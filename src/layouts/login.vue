<template>
	<div class="bg-view">
		<div class="bg-view-container bg-blue-200/40 shadow">
			<router-view />
		</div>
	</div>
</template>

<style lang="less" scoped>
.bg-view {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	overflow: auto;
	background-image: url(/assets/login.svg);
	background-repeat: no-repeat;
	background-position: 50%;
	background-size: 100%;

	&-container {
		border-radius: 10px;
		padding: 30px 15px;
		width: 400px;
		height: 340px;
	}
}
</style>
