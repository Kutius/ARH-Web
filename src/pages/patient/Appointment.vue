<script lang="ts" setup>
import { apmtDetail } from '~/api/patient'

const {
	department,
	options,
	timestamp,
	apmtList,
	disablePreviousDate,
	resetData,
} = useApmt()

// 加载列表数据
onMounted(() => getApmt())

const getApmt = async () => {
	const res = await apmtDetail()
	if (res.code === 0) {
		apmtList.value = res.data.apmt
	}
}

let timeChoose = ref(null)

// options
const apmtChoices = computed(() =>
	apmtList.value
		.filter((item) => item.date === timestamp.value)
		.map((filted) => ({
			label: `${filted.startTime}~${filted.endTime}`,
			value: filted.id,
		}))
)
</script>

<template>
	<n-space vertical>
		<n-card title="预约挂号" size="medium">
			<template #header-extra>
				<n-button quaternary type="primary" @click="resetData()">
					清除全部
				</n-button>
			</template>
			<n-cascader
				v-model:value="department"
				placeholder="请选择"
				expand-trigger="click"
				check-strategy="child"
				:options="options"
				filterable
				clearable
			/>
		</n-card>
		<n-card v-if="department" title="日期选择">
			<n-date-picker
				v-model:value="timestamp"
				type="date"
				:is-date-disabled="disablePreviousDate"
				:actions="['now']"
				clearable
			/>
		</n-card>
		<n-card v-if="timestamp" title="选择时间">
			<n-select v-model:value="timeChoose" :options="apmtChoices" clearable />
		</n-card>
	</n-space>
</template>

<style lang="less" scoped></style>
