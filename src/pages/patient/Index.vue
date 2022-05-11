<script lang="ts" setup>
import { useRequest } from 'vue-request'
import { getNotice } from '~/api/common'

const period = new Date().getHours()
const greets = computed(() => {
	if (period >= 7 && period <= 11) {
		return '早上好'
	} else if (period >= 12 && period <= 14) {
		return '中午好'
	} else if (period >= 15 && period <= 18) {
		return '下午好'
	} else if (period >= 19 || period <= 6) {
		return '晚上好'
	}
})

const { data } = useRequest(getNotice)
</script>

<template>
	<n-card>
		<n-thing>
			<template #avatar>
				<n-avatar>
					<n-icon>
						<i-carbon:hospital />
					</n-icon>
				</n-avatar>
			</template>
			<template #header> {{ greets }} </template>
			<template #header-extra>
				<n-button circle size="small">
					<template #icon>
						<i-carbon:send-alt-filled />
					</template>
				</n-button>
			</template>
			{{ data?.data.content || '暂无公告' }}
			<template #action>
				<n-space>
					<n-button size="small"> 1 块钱 </n-button>
				</n-space>
			</template>
			<template #footer>
				<div class="data-number">
					<n-statistic label="已预约挂号"> 99 </n-statistic>
					<n-statistic label="已预约核酸"> 99 </n-statistic>
				</div>
			</template>
		</n-thing>
	</n-card>
</template>

<style lang="less" scoped>
.data-number {
	display: flex;
	justify-content: space-around;
	align-items: center;
}
</style>
