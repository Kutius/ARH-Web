<script setup lang="ts">
const { t, locale } = useI18n()

const { isDark, toggleDark } = useDarks()
/* eslint-disable no-undef */
defineProps({
	collapsed: Boolean,
})
const userStore = useUserStore()

const router = useRouter()
const currentRoute = unref(router.currentRoute)

const logOut = () => {
	userStore.$reset()
	router.push('/login')
}

const refreshPage = () => {
	router.replace({
		path: '/redirect' + currentRoute.fullPath,
	})
}

const redirectSpace = () => router.push(currentRoute.fullPath + '/space')

const toggleLocale = () => {
	locale.value = locale.value === 'zh-CN' ? 'en' : 'zh-CN'
}
</script>

<template>
	<div class="header-box">
		<div class="header-box-left">
			<!-- 折叠 -->
			<div
				class="header-box-trigger"
				@click="$emit('update:collapsed', !collapsed)"
			>
				<n-icon v-if="collapsed" size="18">
					<i-carbon:folder-details-reference />
				</n-icon>
				<n-icon v-else size="18">
					<i-carbon:folder-details />
				</n-icon>
			</div>
			<!-- 刷新 -->
			<n-tooltip placement="bottom">
				<template #trigger>
					<div class="header-box-trigger" @click="refreshPage()">
						<n-icon size="18">
							<i-carbon:restart />
						</n-icon>
					</div>
				</template>
				{{ t('header.refresh') }}
			</n-tooltip>
		</div>

		<div class="header-box-right">
			<div class="header-box-trigger" @click="toggleDark()">
				<n-icon v-if="isDark" size="18">
					<i-carbon:light-filled />
				</n-icon>
				<n-icon v-else size="18">
					<i-carbon:moon />
				</n-icon>
			</div>
			<n-tooltip placement="bottom">
				<template #trigger>
					<div class="header-box-trigger" @click="toggleLocale()">
						<n-icon size="18">
							<i-carbon:language />
						</n-icon>
					</div>
				</template>
				{{ t('header.language') }}
			</n-tooltip>
			<n-tooltip placement="bottom">
				<template #trigger>
					<div class="header-box-trigger" @click="redirectSpace()">
						<n-gradient-text type="info">
							{{ userStore.user.username }}
						</n-gradient-text>
					</div>
				</template>
				{{ t('header.user') }}
			</n-tooltip>
			<n-tooltip placement="bottom">
				<template #trigger>
					<div class="header-box-trigger" @click="logOut()">
						<n-icon size="18">
							<i-carbon:logout />
						</n-icon>
					</div>
				</template>
				{{ t('header.logout') }}
			</n-tooltip>
		</div>
	</div>
</template>

<style scoped lang="less">
.header-box {
	// 导航栏样式
	padding: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 60px;

	&-left {
		// 左侧样式
		display: flex;
		align-items: center;
	}

	&-right {
		// 右侧样式
		display: flex;
		align-items: center;
		margin-right: 20px;
	}

	&-trigger {
		// 导航栏触发器样式
		display: flex;
		align-items: center;
		justify-content: center;
		height: 60px;
		cursor: pointer;
		width: auto;
		padding: 0 12px;
		transition: all 0.2s ease-in-out;

		&:hover {
			background: hsla(0, 0%, 100%, 0.08);
		}

		.n-gradient-text {
			font-size: 1.2rem;
		}
	}
}
</style>
