<template>
	<!-- <router-view /> -->
	<n-layout has-sider class="layout">
		<n-layout-sider
			:collapsed="collapsed"
			collapse-mode="width"
			:collapsed-width="64"
			position="static"
			:width="200"
			show-trigger="bar"
			:inverted="inverted"
			bordered
			class="layout-sider"
			@collapse="collapsed = true"
			@expand="collapsed = false"
		>
			<n-menu
				:value="selectedKeys"
				:options="menus.value"
				:inverted="inverted"
				:collapsed="collapsed"
				:collapsed-width="64"
				:collapsed-icon-size="20"
				:indent="20"
			/>
		</n-layout-sider>

		<n-layout>
			<n-layout-header> header </n-layout-header>
			<n-layout-content>
				<router-view />
			</n-layout-content>
			<!-- <n-back-top :right="100" /> -->
			<n-layout-footer>footer</n-layout-footer>
		</n-layout>
	</n-layout>
</template>

<script setup lang="ts">
import { useMenuStore } from '~/stores/menu'
// 监听路由变化
const currentRoute = useRoute()
const selectedKeys = ref(currentRoute.name as string)
watch(currentRoute, (route) => {
	selectedKeys.value = route.name as string
})

const inverted = ref(true)
const collapsed = ref(false)
const menus = useMenuStore()
</script>

<style lang="less" scoped>
.layout {
	display: flex;
	flex-direction: row;
	flex: auto;
	.layout-sider {
		min-height: 100vh;
		box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
		position: relative;
		z-index: 13;
	}
}
</style>
