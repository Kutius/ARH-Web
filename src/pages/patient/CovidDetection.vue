<script lang="ts" setup>
import { FormInst } from 'naive-ui'

const showTips = ref<boolean>(true)

const formRef = ref<FormInst | null>(null)
const surveyForm = ref<FormData>({ v1: '' })
const rules = {}

interface FormData {
	v1: string
}
</script>

<template>
	<n-space vertical>
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
		<n-card>
			<n-form
				ref="formRef"
				:model="surveyForm"
				:rules="rules"
				label-placement="top"
			>
				<n-grid :cols="24" :x-gap="12">
					<n-form-item-gi
						label="1.近三天是否发热（体温>37.3℃）"
						path=""
						:span="11"
					>
						<n-input v-model="surveyForm.v1" />
					</n-form-item-gi>
					<n-form-item-gi label="1" path="" :span="11" :offset="2">
						<n-input v-model="surveyForm.v1" />
					</n-form-item-gi>
					<n-form-item-gi>
						<n-button type="primary">立即创建</n-button>
					</n-form-item-gi>
				</n-grid>
			</n-form>
		</n-card>
	</n-space>
</template>
<style scoped></style>
