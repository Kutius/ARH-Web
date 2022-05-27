<script lang="ts" setup>
import { NTag } from 'naive-ui'

const { covidPagination, appointPagination } = useHistory()

const searchForm = ref({
	doctorName: '',
	patientName: '',
})

const doctorColumns = [
	{
		title: '医生名',
		key: 'doctorName',
	},
	{
		title: '性别',
		key: 'sex',
	},
	{
		title: '电话',
		key: 'phone',
	},
	{
		title: '职位',
		key: 'position',
		render(row: { position: any }) {
			return h(
				NTag,
				{
					style: {
						marginRight: '6px',
					},
					type: 'info',
				},
				{
					default: () => row.position,
				}
			)
		},
	},
	{
		title: '年龄',
		key: 'age',
	},
]
const patientColumns = [
	{
		title: '病人账户',
		key: 'patientUsername',
	},
	{
		title: '病人姓名',
		key: 'patientName',
	},
	{
		title: '电话',
		key: 'phone',
	},
	{
		title: '性别',
		key: 'sex',
		render(row: { sex: any }) {
			return h(
				NTag,
				{
					style: {
						marginRight: '6px',
					},
					type: 'info',
					round: true,
				},
				{
					default: () => row.sex,
				}
			)
		},
	},
	{
		title: '年龄',
		key: 'age',
	},
	{
		title: '身份证号',
		key: 'idNumber',
	},
	{
		title: '出生日期',
		key: 'birthDate',
	},
]
const doctorDataFilter = ref([
	{
		doctorName: '华佗',
		sex: '男',
		phone: '13333333333',
		position: '主治医师',
		age: '30',
	},
	{
		doctorName: '张仲景',
		sex: '男',
		phone: '1333232323',
		position: '医师',
		age: '42',
	},
	{
		doctorName: '艾什',
		sex: '女',
		phone: '827193972',
		position: '副主任医师',
		age: '56',
	},
])
const patientData = ref([
	{
		patientUsername: 'test1',
		patientName: 'vben',
		phone: '278638112',
		sex: '男',
		age: '21',
		idNumber: '361233199503221987',
		birthDate: '1995/03/22',
	},
	{
		patientUsername: 'test2',
		patientName: 'vben',
		phone: '2722112',
		sex: '男',
		age: '22',
		idNumber: '361233200003221987',
		birthDate: '2000/03/22',
	},
	{
		patientUsername: 'test3',
		patientName: 'vben',
		phone: '1232112',
		sex: '女',
		age: '32',
		idNumber: '361233199003221987',
		birthDate: '1990/03/22',
	},
	{
		patientUsername: 'test4',
		patientName: 'vben',
		phone: '6343112',
		sex: '男',
		age: '47',
		idNumber: '361233197502121987',
		birthDate: '1975/02/12',
	},
])

const onSearch = () => {}
const onReset = () => {}

// 当前打开的tab
const currentTab = ref('')
const handleTabsChange = (v: string) => {
	currentTab.value = v
	console.log(v)
}
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
				<n-form-item
					label="医生姓名"
					path="doctorName"
					v-if="currentTab === 'doctor'"
				>
					<n-input
						v-model:value="searchForm.doctorName"
						placeholder="输入医生姓名"
					/>
				</n-form-item>
				<n-form-item label="病人姓名" path="patientName" v-else>
					<n-input
						v-model:value="searchForm.patientName"
						placeholder="输入病人姓名"
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
			<n-h3 prefix="bar"> 用户管理 </n-h3>
			<n-tabs type="segment" animated @update:value="handleTabsChange">
				<n-tab-pane name="doctor" tab="医生管理" display-directive="show:lazy">
					<n-data-table
						:columns="doctorColumns"
						:data="doctorDataFilter"
						:pagination="appointPagination"
						bordered
					/>
				</n-tab-pane>
				<n-tab-pane name="patient" tab="病人管理" display-directive="show:lazy">
					<n-data-table
						:columns="patientColumns"
						:data="patientData"
						:pagination="covidPagination"
						bordered
					/>
				</n-tab-pane>
			</n-tabs>
		</n-card>
	</n-space>
</template>
