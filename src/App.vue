<script setup lang="ts">
import { darkTheme } from 'naive-ui'
import { zhCN, enUS } from 'naive-ui'

const { isDark } = useDarks()
const { locale } = useI18n()
const theme = computed(() => (isDark.value ? darkTheme : null))
const uiLocale = computed(() => (locale.value === 'zh-CN' ? zhCN : enUS))
</script>

<template>
	<n-message-provider>
		<n-config-provider :theme="theme" :locale="uiLocale">
			<router-view />
		</n-config-provider>
	</n-message-provider>
</template>
