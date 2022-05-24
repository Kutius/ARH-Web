import { FormInst } from 'naive-ui'
import type { IDetectFormParams as IDetectForm } from '~/api/types/patient'

export default () => {
	const showTips = ref<boolean>(true)
	const showSurvey = ref<boolean>(true)

	const surveyFormRef = ref<FormInst | null>(null)
	const surveyForm = ref({
		v1: null,
		v2: null,
		v3: null,
		v4: null,
		v5: null,
		v6: null,
	})

	const detectFormRef = ref<FormInst | null>(null)
	const detectForm = ref<IDetectForm>({
		arriveDate: null,
		detectType: null,
		price: null,
	})

	return {
		showTips,
		showSurvey,
		surveyFormRef,
		surveyForm,
		detectFormRef,
		detectForm,
	}
}
