<script lang="ts" setup>
import { DataTableColumns, FormInst, NButton, useMessage } from 'naive-ui'

const message = useMessage()

const searchForm = ref({
	scheduleDate: '',
})

const apmtDataFilter = ref<Schedule[]>([
	{
		id: '1',
		doctorName: '张三',
		scheduleDate: '2022/06/01',
		scheduleStartTime: '10:00',
		scheduleEndTime: '11:00',
		totalCount: 10,
	},
])
const loadingAmpt = ref(false)

interface Schedule {
	id: string | null
	doctorName: string | null
	scheduleDate: string | null
	scheduleStartTime: string | null
	scheduleEndTime: string | null
	totalCount: number | null
}

const createColumns = ({
	play,
}: {
	play: (row: Schedule) => void
}): DataTableColumns<Schedule> => {
	return [
		{
			title: '编号',
			key: 'id',
		},
		{
			title: '医生名',
			key: 'doctorName',
		},
		{
			title: '排班日期',
			key: 'scheduleDate',
		},
		{
			title: '坐诊开始时间',
			key: 'scheduleStartTime',
		},
		{
			title: '坐诊结束时间',
			key: 'scheduleEndTime',
		},
		{
			title: '总挂号数',
			key: 'totalCount',
		},
		{
			title: '操作',
			key: 'actions',
			render(row) {
				return h(
					NButton,
					{
						strong: true,
						size: 'small',
						onClick: () => play(row),
					},
					{ default: () => '编辑' }
				)
			},
		},
	]
}

const scheduleColumns = createColumns({
	play(row: Schedule) {
		// message.info(`Play ${row.id}`)
		editMode.value = true
		modalForm.value = row
		showModal.value = true
	},
})

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

// 模态框
interface Modal {
	id?: string | null
	doctorName?: string | null
	scheduleDate: string | null
	scheduleStartTime: string | null
	scheduleEndTime: string | null
	totalCount: number | null
}
const editMode = ref(false) // 当前是否为编辑的状态
const showModal = ref(false)
const modalFormRef = ref<FormInst | null>(null)
const modalForm = ref<Modal>({
	scheduleDate: null,
	scheduleStartTime: null,
	scheduleEndTime: null,
	totalCount: 1,
})
const modalRules = {
	scheduleDate: { required: true, message: '请选择排班日期' },
	scheduleStartTime: { required: true, message: '请选择坐诊开始时间' },
	scheduleEndTime: [
		{ required: true, message: '请选择坐诊结束时间' },
		{
			validator: (rule: any, value: string) => {
				const toNumber = (v: string) => Number(v.replace(':', ''))
				return toNumber(value) > toNumber(modalForm.value.scheduleStartTime!)
			},
			message: '结束时间不能小于开始时间',
			trigger: 'input',
		},
	],
	totalCount: { required: true, message: '请输入总挂号数' },
}
const modalSubmit = () => {
	modalFormRef.value?.validate((errors) => {
		if (!errors) {
			// submitCovidDetection(detectForm.value)
			// 	.then(() => {
			// 		message.success('提交成功')
			// 	})
			// 	.catch((err) => {
			// 		message.error(err.message)
			// 	})
			if (editMode.value) {
				const _INDEX = apmtDataFilter.value.findIndex(
					(item) => item.id === modalForm.value.id
				)
				apmtDataFilter.value[_INDEX].scheduleDate = modalForm.value.scheduleDate
				apmtDataFilter.value[_INDEX].scheduleStartTime =
					modalForm.value.scheduleStartTime
				apmtDataFilter.value[_INDEX].scheduleEndTime =
					modalForm.value.scheduleEndTime
				apmtDataFilter.value[_INDEX].totalCount = modalForm.value.totalCount
			} else {
				apmtDataFilter.value.push({
					...modalForm.value,
					id: String(apmtDataFilter.value.length + 1),
					doctorName: '张三',
				})
			}
			message.success('提交成功')
			console.log(modalForm.value)
			showModal.value = false
		}
	})
}
const onModalClose = () => {
	modalForm.value = {
		scheduleDate: null,
		scheduleStartTime: null,
		scheduleEndTime: null,
		totalCount: 1,
	}
	editMode.value = false
}
// 时间列表
const hours = Array.from({ length: 11 }, (_, i) => 8 + i)
const disablePreviousDate = (ts: number) => ts < Date.now()

/* 搜索 */
const searchFlag = ref(false)
const searchFilter = computed(() => {
	if (searchFlag.value) {
		return apmtDataFilter.value.filter((item) => {
			return item.scheduleDate!.includes(searchForm.value.scheduleDate)
		})
	} else {
		return apmtDataFilter.value
	}
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
				<n-form-item label="排班日期" path="scheduleDate">
					<n-input
						v-model:value="searchForm.scheduleDate"
						placeholder="输入排班日期"
					/>
				</n-form-item>
				<n-form-item>
					<n-button strong secondary type="primary" @click="searchFlag = true">
						查询
					</n-button>
				</n-form-item>
				<n-form-item>
					<n-button strong secondary @click="searchFlag = false">
						重置
					</n-button>
				</n-form-item>
			</n-form>
		</n-card>
		<n-card>
			<n-row :gutter="[0, 24]">
				<n-col :span="12">
					<div style="display: flex; justify-content: flex-start">
						<n-h3 prefix="bar">坐诊安排</n-h3>
					</div>
				</n-col>
				<n-col :span="12">
					<div style="display: flex; justify-content: flex-end">
						<n-button quaternary type="primary" @click="showModal = true">
							新增
						</n-button>
					</div>
				</n-col>
			</n-row>

			<n-data-table
				:columns="scheduleColumns"
				:data="searchFilter"
				:pagination="appointPagination"
				:loading="loadingAmpt"
				bordered
			/>
		</n-card>
	</n-space>
	<!-- 模态框 -->
	<n-modal
		v-model:show="showModal"
		preset="card"
		title="坐诊安排"
		size="small"
		@after-leave="onModalClose"
		:segmented="true"
		:style="{ maxWidth: '500px' }"
		:content-style="{ paddingLeft: '40px', paddingRight: '40px' }"
	>
		<n-form
			ref="modalFormRef"
			:model="modalForm"
			label-width="auto"
			label-placement="left"
			:rules="modalRules"
		>
			<n-form-item label="排班日期" path="scheduleDate">
				<n-date-picker
					v-model:formatted-value="modalForm.scheduleDate"
					format="yyyy/MM/dd"
					type="date"
					:is-date-disabled="disablePreviousDate"
					:actions="null"
					clearable
				/>
			</n-form-item>
			<n-form-item label="坐诊开始时间" path="scheduleStartTime">
				<n-time-picker
					v-model:formatted-value="modalForm.scheduleStartTime"
					value-format="H:mm"
					format="H:mm"
					:hours="hours"
					:minutes="[0, 30]"
				/>
			</n-form-item>
			<n-form-item label="坐诊结束时间" path="scheduleEndTime">
				<n-time-picker
					v-model:formatted-value="modalForm.scheduleEndTime"
					value-format="H:mm"
					format="H:mm"
					:hours="hours"
					:minutes="[0, 30]"
				/>
			</n-form-item>
			<n-form-item label="总挂号数" path="totalCount">
				<n-input-number v-model:value="modalForm.totalCount" :min="1" />
			</n-form-item>
		</n-form>

		<template #action>
			<div class="flex justify-evenly">
				<n-button @click="showModal = false"> 取消 </n-button>
				<n-button type="primary" @click="modalSubmit"> 确定 </n-button>
			</div>
		</template>
	</n-modal>
</template>

<style scoped></style>
