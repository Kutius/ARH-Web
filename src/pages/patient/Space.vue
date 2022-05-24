<script lang="ts" setup>
import { IAppointData } from '~/api/types/patient'
import { apmtHistory } from '~/api/patient'

const loading = ref(true)

const searchForm = ref({
	id: null,
	doctorName: null,
})

const apmtDataFilter = ref<IAppointData[]>([])

// 数据过滤
const dataFilter = (data: IAppointData[]) => {
	return data.filter((e) => {
		for (const [key, value] of Object.entries(searchForm.value)) {
			if (value && e[key as keyof typeof e].includes(value)) return true
		}
		return false
	})
}
const onSearch = () => {
	apmtDataFilter.value = dataFilter(appointData.value)
}
const onReset = () => {
	apmtDataFilter.value = appointData.value
}

// 预约挂号
const appointColumns = [
	{
		title: '订单号',
		key: 'id',
	},
	{
		title: '医生名',
		key: 'doctorName',
	},
	{
		title: '预约到院时间',
		key: 'appointTime',
	},
	{
		title: '坐诊状态',
		key: 'status',
	},
]

const appointPagination = reactive({
	page: 1,
	pageSize: 5,
	showSizePicker: true,
	pageSizes: [5, 10],
	onChange: (page: number) => {
		appointPagination.page = page
	},
	onUpdatePageSize: (pageSize: number) => {
		appointPagination.pageSize = pageSize
		appointPagination.page = 1
	},
})

const appointData = ref<IAppointData[]>([])

const getApmtHistory = async () => {
	const res = await apmtHistory({ uid: '123' })
	if (res.code === 0) {
		// 数据异步
		appointData.value = res.data.history
		apmtDataFilter.value = appointData.value
	}
}
onMounted(() => {
	getApmtHistory().then(() => (loading.value = false))
})
</script>

<template>
	<n-space vertical>
		<n-card size="small" hoverable>
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
			<n-h3> 挂号记录 </n-h3>
			<n-tabs type="segment" animated>
				<n-tab-pane name="chap1" tab="第一章">
					<n-data-table
						:columns="appointColumns"
						:data="apmtDataFilter"
						:pagination="appointPagination"
						:loading="loading"
						bordered
					/>
				</n-tab-pane>
				<n-tab-pane name="chap2" tab="第二章">
					“威尔！着火了！快来帮忙！”我听到女朋友大喊。现在一个难题在我面前——是恢复一个重要的
					Amazon 服务，还是救公寓的火。<br /><br />
					我的脑海中忽然出现了 Amazon
					著名的领导力准则”客户至上“，有很多的客户还依赖我们的服务，我不能让他们失望！所以着火也不管了，女朋友喊我也无所谓，我开始
					debug 这个线上问题。
				</n-tab-pane>
			</n-tabs>
		</n-card>
	</n-space>
</template>
