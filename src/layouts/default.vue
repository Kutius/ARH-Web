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
			class="layout-sider"
			@collapse="collapsed = true"
			@expand="collapsed = false"
		>
			<n-menu
				:value="selectedKeys"
				:options="currentRoleMenu"
				:inverted="inverted"
				:collapsed="collapsed"
				:collapsed-width="64"
				:collapsed-icon-size="20"
				:indent="20"
				:render-label="renderMenuLabel"
			/>
		</n-layout-sider>

		<n-layout>
			<n-layout-header>
				<Header v-model:collapsed="collapsed" />
			</n-layout-header>
			<n-layout-content>
				<div class="bg-dark-900/6 pt-2 pl-3 pr-3 min-h-screen">
					<router-view />
				</div>
				<n-back-top />
			</n-layout-content>
			<n-layout-footer>
				<Footer />
			</n-layout-footer>
		</n-layout>
	</n-layout>
</template>

<script setup lang="ts">
import Header from '~/components/header.vue'
import Footer from '~/components/footer.vue'
import { useMenuStore } from '~/stores/menu'
import { MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router'

const { t } = useI18n()

// 监听路由变化
const currentRoute = useRoute()
const selectedKeys = ref(currentRoute.name as string)
watch(currentRoute, (route) => {
	selectedKeys.value = route.name as string
})

const inverted = ref(true)
const collapsed = ref(false)
const menus = useMenuStore()

const userStore = useUserStore()

const currentRoleMenu = computed(() => {
	return userStore.user.doctor ? menus.value : menus.patient
})

// 自定义渲染label
const renderMenuLabel = (option: MenuOption) => {
	if ('hrefName' in option) {
		return h(
			RouterLink,
			{
				to: { name: option.hrefName as string },
			},
			{ default: () => t(option.label as string) }
		)
	}
	return t(option.label as string)
}
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
