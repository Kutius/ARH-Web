<script lang="ts" setup>
import { useMessage, SelectOption } from 'naive-ui'
import { submitCovidDetection } from '~/api/patient'

const message = useMessage()
const {
	surveyForm,
	showSurvey,
	detectForm,
	showTips,
	surveyFormRef,
	detectFormRef,
} = useCovidDt()

const covidSafe = computed(() => {
	const { v1, v2, v3, v4, v5, v6 } = surveyForm.value
	return [v1, v2, v3, v4, v5, v6].every((item) => item === 'false')
})

const validateSurvey = () => {
	console.log(surveyForm.value)
	if (covidSafe.value) {
		showSurvey.value = false
	} else {
		message.error('信息异常，请联系医院')
	}
}
const submitDetect = () => {
	detectFormRef.value?.validate((errors) => {
		if (!errors) {
			submitCovidDetection(detectForm.value)
				.then(() => {
					message.success('提交成功')
				})
				.catch((err) => {
					message.error(err.message)
				})
		}
	})
}

const rules = {
	arriveDate: {
		required: true,
		message: '请选择到达时间',
	},
	detectType: {
		required: true,
		message: '请选择检测类型',
	},
}

const disablePreviousDate = (ts: number) => ts < Date.now()

interface IDetectTypeOptions extends SelectOption {
	label: '单检' | '混检'
	value: 'solo' | 'mix'
	price: string
}
const detectTypeOptions: IDetectTypeOptions[] = [
	{ label: '单检', value: 'solo', price: '50' },
	{ label: '混检', value: 'mix', price: '10' },
]

const handleUpdateType = (_: string, option: IDetectTypeOptions) => {
	detectForm.value.price = option.price
}

// 用户信息判断
const userStore = useUserStore()
const userFlag = !!(userStore.user.info.name && userStore.user.info.id)
</script>

<template>
	<n-space vertical size="large">
		<n-card
			v-show="showTips"
			title="温馨提示✨"
			closable
			hoverable
			@close="showTips = false"
		>
			<n-text depth="3">
				尊敬的患者:根据国家卫生健康委员会、国家中医药管理司颁发的《新型冠状病毒肺炎诊疗方案》的文件，依照乙类传染病、甲类传染病管理要求，需要全面统计填报新型冠状病毒感染的肺炎疫情防控信息，请您提供真实、准确的流行病学史信息，感谢您的配合。
			</n-text>
			<template #footer>
				<n-text type="warning"> 为了保障您和他人的健康，请如实填写 </n-text>
			</template>
		</n-card>
		<!-- 流调问卷 -->
		<n-card v-if="showSurvey" size="huge">
			<n-form ref="surveyFormRef" :model="surveyForm" label-placement="top">
				<n-grid :cols="24" :x-gap="24">
					<n-form-item-gi
						label="1.近三天是否发热（体温>37.3℃）"
						path="v1"
						:span="12"
					>
						<n-radio-group v-model:value="surveyForm.v1" name="v1">
							<n-space>
								<n-radio value="true"> 是 </n-radio>
								<n-radio value="false"> 否 </n-radio>
							</n-space>
						</n-radio-group>
					</n-form-item-gi>
					<n-form-item-gi
						label="2.入院前14天内有病例报告社区的旅行史或居住史或与来自高危地区人员接触"
						path="v2"
						:span="12"
					>
						<n-radio-group v-model:value="surveyForm.v2" name="v2">
							<n-space>
								<n-radio value="true"> 是 </n-radio>
								<n-radio value="false"> 否 </n-radio>
							</n-space>
						</n-radio-group>
					</n-form-item-gi>
					<n-form-item-gi
						label="3.入院前14天内曾按触过来自有病例报告社区的发热或有呼吸道症状的患者"
						path="v3"
						:span="12"
					>
						<n-radio-group v-model:value="surveyForm.v3" name="v3">
							<n-space>
								<n-radio value="true"> 是 </n-radio>
								<n-radio value="false"> 否 </n-radio>
							</n-space>
						</n-radio-group>
					</n-form-item-gi>
					<n-form-item-gi
						label="4.入院前14天内与新型冠状病毒感染的患者或无症状感染者有接触史"
						path="v4"
						:span="12"
					>
						<n-radio-group v-model:value="surveyForm.v4" name="v4">
							<n-space>
								<n-radio value="true"> 是 </n-radio>
								<n-radio value="false"> 否 </n-radio>
							</n-space>
						</n-radio-group>
					</n-form-item-gi>
					<n-form-item-gi
						label="5.聚集性发病: 2周内在小范围如家庭、办公室、学校班级等场所,出现2例及以上发热和或呼吸道症状的病例"
						path="v5"
						:span="12"
					>
						<n-radio-group v-model:value="surveyForm.v5" name="v5">
							<n-space>
								<n-radio value="true"> 是 </n-radio>
								<n-radio value="false"> 否 </n-radio>
							</n-space>
						</n-radio-group>
					</n-form-item-gi>
					<n-form-item-gi
						label="6.入院前14天内乘坐的“飞机、动车、火年、地铁等公共交通工具有确诊或疑似病例"
						path="v6"
						:span="12"
					>
						<n-radio-group v-model:value="surveyForm.v6" name="v6">
							<n-space>
								<n-radio value="true"> 是 </n-radio>
								<n-radio value="false"> 否 </n-radio>
							</n-space>
						</n-radio-group>
					</n-form-item-gi>
				</n-grid>
			</n-form>
			<template #footer>
				<n-text type="warning">
					请确保以上信息真实性，若您隐瞒上述情况。将构成危害公共安全罪。因提供虚假个人信息和隐瞒病史造成疾病传播等不良后果的，您将承担相关法律责任，特此告知。谢谢您予以配合和理解。
				</n-text>
			</template>
			<template #action>
				<div class="flex justify-around">
					<n-button type="primary" @click="validateSurvey()">
						我已确认
					</n-button>
				</div>
			</template>
		</n-card>
		<!-- 核酸预约 -->
		<n-card
			v-else
			title="核酸检测预约"
			size="large"
			content-style="padding-left: 80px; padding-right: 80px;"
		>
			<n-space vertical :size="[0, 40]">
				<n-alert v-show="!userFlag" title="警告" type="warning">
					您的个人身份信息尚未完善，请先完善后再预约。
				</n-alert>
				<n-form
					ref="detectFormRef"
					:model="detectForm"
					:rules="rules"
					label-width="auto"
					label-placement="left"
					label-align="left"
				>
					<n-form-item label="预约到院日期" path="arriveDate">
						<n-date-picker
							v-model:value="detectForm.arriveDate"
							placeholder="请选择预约到院日期"
							type="date"
							:is-date-disabled="disablePreviousDate"
						/>
					</n-form-item>
					<n-form-item label="检测类型" path="detectType">
						<n-select
							v-model:value="detectForm.detectType"
							placeholder="请选择检测方式"
							:options="detectTypeOptions"
							@update:value="handleUpdateType"
						/>
					</n-form-item>
					<n-form-item label="预约金额" path="price">
						<n-input
							v-model:value="detectForm.price"
							placeholder="选择检测方式后自动识别"
							disabled
						>
							<template #suffix> 元 </template>
						</n-input>
					</n-form-item>
				</n-form>
			</n-space>
			<template #action>
				<div class="flex justify-around">
					<n-button type="primary" @click="submitDetect()"> 提交 </n-button>
				</div>
			</template>
		</n-card>
	</n-space>
</template>
<style scoped></style>
