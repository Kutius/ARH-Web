<script lang="ts" setup>
import { apmtHistory, covidHistory } from '~/api/patient'

const {
	searchForm,
	apmtDataFilter,
	appointData,
	covidData,
	dataFilter,
	appointColumns,
	covidColumns,
	covidPagination,
	appointPagination,
} = useHistory()

const loadingAmpt = ref(true)
const loadingCov = ref(true)

const onSearch = () => {
	apmtDataFilter.value = dataFilter(appointData.value)
}
const onReset = () => {
	apmtDataFilter.value = appointData.value
}

const getApmtHistory = async () => {
	const res = await apmtHistory({ uid: '123' })
	if (res.code === 0) {
		// 数据异步
		appointData.value = res.data.history
		apmtDataFilter.value = appointData.value
	}
}
const getCovidHistory = async () => {
	const res = await covidHistory({ uid: '123' })
	if (res.code === 0) {
		covidData.value = res.data.history
	}
}

onMounted(() => {
	getApmtHistory().then(() => (loadingAmpt.value = false))
	getCovidHistory().then(() => (loadingCov.value = false))
})

// 当前打开的tab
const currentTab = ref('')
const handleTabsChange = (v: string) => {
	currentTab.value = v
	console.log(v)
}
</script>

<template>
	<n-space vertical>
		<n-card v-show="currentTab !== 'covid'" size="small" hoverable>
			<n-form
				ref="formRef"
				inline
				label-width="auto"
				:model="searchForm"
				label-placement="left"
				size="small"
				:show-feedback="false"
			>
				<n-form-item label="订单号" path="id">
					<n-input v-model:value="searchForm.id" placeholder="输入订单号" />
				</n-form-item>
				<n-form-item label="医生姓名" path="doctorName">
					<n-input
						v-model:value="searchForm.doctorName"
						placeholder="输入医生姓名"
					/>
				</n-form-item>
				<n-form-item>
					<n-button strong secondary type="primary" @click="onSearch()">
						查询
					</n-button>
				</n-form-item>
				<n-form-item>
					<n-button strong secondary @click="onReset()"> 重置 </n-button>
				</n-form-item>
			</n-form>
		</n-card>
		<n-card>
			<n-h3 prefix="bar">
				{{ currentTab === 'apmt' ? '挂号记录' : '核酸检测记录' }}
			</n-h3>
			<n-tabs type="segment" animated @update:value="handleTabsChange">
				<n-tab-pane name="apmt" tab="挂号记录" display-directive="show:lazy">
					<n-data-table
						:columns="appointColumns"
						:data="apmtDataFilter"
						:pagination="appointPagination"
						:loading="loadingAmpt"
						bordered
					/>
				</n-tab-pane>
				<n-tab-pane name="covid" tab="核检记录" display-directive="show">
					<n-data-table
						:columns="covidColumns"
						:data="covidData"
						:pagination="covidPagination"
						:loading="loadingCov"
						bordered
					/>
				</n-tab-pane>
			</n-tabs>
		</n-card>
	</n-space>
</template>
