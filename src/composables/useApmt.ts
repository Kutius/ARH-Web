import { CascaderOption } from 'naive-ui'
import type { IApmtDetail } from '~/api/types/patient'

let department = ref(null)
const options: CascaderOption[] = [
	{
		value: 'nei-ke',
		label: '内科',
		children: [
			{
				value: 'hu-xi-nei',
				label: '呼吸内科',
			},
			{
				value: 'xiao-hua-nei',
				label: '消化内科',
			},
			{
				value: 'shen-jing-nei',
				label: '神经内科',
			},
			{
				value: 'nei-fen-mi',
				label: '内分泌科',
			},
		],
	},
	{
		value: 'wai-ke',
		label: '外科',
		children: [
			{
				value: 'nanjing',
				label: 'Nanjing',
			},
		],
	},
	{
		value: 'fu-chan-ke',
		label: '妇产科',
		children: [
			{
				value: 'nanjing',
				label: 'Nanjing',
			},
		],
	},
	{
		value: 'er-ke',
		label: '儿科',
		children: [
			{
				value: 'nanjing',
				label: 'Nanjing',
			},
		],
	},
]
let timestamp = ref<number | null>(null)
const resetData = () => {
	timestamp.value = null
	department.value = null
}

const _DAY = 86400000
const disablePreviousDate = (ts: number) =>
	ts < Date.now() - _DAY || !apmtList.value.some((e) => e.date === ts)
let apmtList = ref<IApmtDetail[]>([])

export default () => ({
	department,
	options,
	timestamp,
	resetData,
	disablePreviousDate,
	apmtList,
})
