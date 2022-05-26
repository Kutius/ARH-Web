<script lang="ts" setup>
import { useRequest } from 'vue-request'
import { getNotice } from '~/api/common'

const { t } = useI18n()
const period = new Date().getHours()
const greets = computed(() => {
	if (period >= 7 && period <= 11) {
		return t('patient.index.good-morning')
	} else if (period >= 12 && period <= 14) {
		return t('patient.index.good-noon')
	} else if (period >= 15 && period <= 18) {
		return t('patient.index.good-afternood')
	} else if (period >= 19 || period <= 6) {
		return t('patient.index.good-night')
	}
})

const { data } = useRequest(getNotice)
</script>

<template>
	<n-card hoverable>
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
			{{ data?.data.content || t('patient.index.notice-content') }}
			<template #action>
				<n-space>
					<n-button size="small"> 1 块钱 </n-button>
				</n-space>
			</template>
			<template #footer>
				<div class="data-number">
					<n-statistic :label="t('patient.index.statistic.appoint')">
						<n-number-animation :from="0" :to="99" />
					</n-statistic>
					<n-statistic :label="t('patient.index.statistic.covid-detection')">
						<n-number-animation :from="0" :to="17" />
					</n-statistic>
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
