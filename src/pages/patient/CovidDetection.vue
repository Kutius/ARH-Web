<script lang="ts" setup>
import { FormInst, useMessage } from 'naive-ui'

const message = useMessage()

const showTips = ref<boolean>(true)

const formRef = ref<FormInst | null>(null)
const surveyForm = ref({
	v1: null,
	v2: null,
	v3: null,
	v4: null,
	v5: null,
	v6: null,
})

const covidSafe = computed(() => {
	const { v1, v2, v3, v4, v5, v6 } = surveyForm.value
	return [v1, v2, v3, v4, v5, v6].every((item) => item === 'true')
})

const submitSurvey = () => {
	console.log(surveyForm.value)
	if (covidSafe.value) {
		message.success('验证成功')
	} else {
		message.error('验证失败')
	}
}
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
		<n-card size="huge">
			<n-form ref="formRef" :model="surveyForm" label-placement="top">
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
					<n-button type="primary" @click="submitSurvey()"> 我已确认 </n-button>
				</div>
			</template>
		</n-card>
	</n-space>
</template>
<style scoped></style>
