<script lang="ts" setup>
import { apmtDetail, userSpace } from '~/api/patient'
import { StepsProps, useMessage } from 'naive-ui'

const {
	department,
	timestamp,
	timeChoose,
	options,
	apmtList,
	timestampToTime,
	disablePreviousDate,
	resetData,
} = useApmt()

const message = useMessage()

// 加载列表数据
onMounted(() => {
	getApmt()
	getUserSpace()
})

// 获取排班信息
const getApmt = async () => {
	const res = await apmtDetail()
	if (res.code === 0) {
		apmtList.value = res.data.apmt
	}
}

// 获取用户信息
const userFlag = ref<boolean>(false)
const getUserSpace = async () => {
	const res = await userSpace()
	if (res.code === 0) {
		if (!(res.data.name && res.data.idNumber)) {
			userFlag.value = true
			stepStatus.value = 'error'
		}
	}
}

// 时间选项
const apmtChoices = computed(() =>
	apmtList.value
		.filter((item) => item.date === timestamp.value)
		.map((filted) => ({
			label: `${filted.startTime}~${filted.endTime}`,
			value: filted.id,
		}))
)

const handlerDepartment = (v: string) => {
	console.log(v)
	timestamp.value = null
	timeChoose.value = null
}
const handlerTimestamp = (v: number) => {
	console.log(v)
	timeChoose.value = null
}
const handlerTimeChoose = (v: number) => {
	console.log(v)
}

// 步骤条进度
const currentStep = computed(() => {
	if (isCompleted.value) return 4
	else if (department.value && timestamp.value) return 3
	else if (department.value) return 2
	else return 1
})

// 步骤条状态
const stepStatus = ref<StepsProps['status']>('process')

// 步骤条文案
const finalText = computed(() =>
	userFlag.value ? '请先完善个人信息' : '提交成功'
)

const isCompleted = computed(
	() => department.value && timestamp.value && timeChoose.value
)

const findApmt = (id: number) =>
	apmtChoices.value.find((item) => item.value === id)

/* 按钮结算 */
const Router = useRouter()
const goSpace = () => Router.push('/patient/space')

const submit = () => {
	message.success('提交成功')
}
</script>

<template>
	<n-space vertical size="large">
		<n-card title="预约挂号" size="medium">
			<template #header-extra>
				<n-button quaternary type="primary" @click="resetData()">
					清除全部
				</n-button>
			</template>
			<n-cascader
				v-model:value="department"
				placeholder="请选择"
				expand-trigger="hover"
				check-strategy="child"
				:options="options"
				filterable
				clearable
				@update:value="handlerDepartment"
			/>
		</n-card>
		<n-grid x-gap="16" y-gap="16" :cols="8">
			<n-gi span="4">
				<n-card v-if="department" title="日期选择">
					<n-date-picker
						v-model:value="timestamp"
						type="date"
						:is-date-disabled="disablePreviousDate"
						:actions="['now']"
						clearable
						@update:value="handlerTimestamp"
					/>
				</n-card>
			</n-gi>
			<n-gi span="4">
				<n-card v-if="timestamp" title="选择时间">
					<n-select
						v-model:value="timeChoose"
						:options="apmtChoices"
						clearable
						@update:value="handlerTimeChoose"
					/>
				</n-card>
			</n-gi>
			<n-gi :span="isCompleted ? 3 : 0">
				<n-card class="h-52">
					<n-descriptions label-placement="top" title="预约信息">
						<n-descriptions-item label="挂号科室">
							{{ department }}
						</n-descriptions-item>
						<n-descriptions-item label="日期">
							{{ timestampToTime(timestamp as number) }}
						</n-descriptions-item>
						<n-descriptions-item label="时间">
							{{findApmt(timeChoose as number)?.label}}
						</n-descriptions-item>
					</n-descriptions>
					<template #action>
						<div class="flex justify-around">
							<n-button type="warning" @click="goSpace()"> 个人信息 </n-button>
							<n-button type="primary" @click="submit()"> 提交预约 </n-button>
						</div>
					</template>
				</n-card>
			</n-gi>
			<n-gi :span="isCompleted ? 5 : 8">
				<n-card class="h-52" content-style="display:flex;align-items:center">
					<n-steps :current="currentStep" :status="stepStatus" size="small">
						<n-step title="选择科室" description="选择您所需要挂号的科室" />
						<n-step title="选择预约日期" description="选择预定挂号的日期" />
						<n-step
							title="选择预约时间"
							description="选择所需要预约挂号的时间"
						/>
						<n-step title="提交预约" :description="finalText" />
					</n-steps>
				</n-card>
			</n-gi>
		</n-grid>
	</n-space>
</template>

<style lang="less" scoped></style>
