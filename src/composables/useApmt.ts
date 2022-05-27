import { CascaderOption } from 'naive-ui'
import type { IApmtDetail } from '~/api/types/patient'

const options: CascaderOption[] = [
	{
		value: 'nei-ke',
		label: '内科',
		children: [
			{
				value: '呼吸内科',
				label: '呼吸内科',
			},
			{
				value: '消化内科',
				label: '消化内科',
			},
			{
				value: '神经内科',
				label: '神经内科',
			},
			{
				value: '内分泌科',
				label: '内分泌科',
			},
		],
	},
	{
		value: 'wai-ke',
		label: '外科',
		children: [
			{
				value: '普通外科',
				label: '普通外科',
			},
			{
				value: '胸外科',
				label: '胸外科',
			},
			{
				value: '泌尿外科',
				label: '泌尿外科',
			},
			{
				value: '骨科',
				label: '骨科',
			},
		],
	},
	{
		value: 'fu-chan-ke',
		label: '妇产科',
		children: [
			{
				value: '产科',
				label: '产科',
			},
			{
				value: '妇科',
				label: '妇科',
			},
		],
	},
	{
		value: 'er-ke',
		label: '儿科',
		children: [
			{
				value: '儿内科',
				label: '儿内科',
			},
			{
				value: '儿外科',
				label: '儿外科',
			},
		],
	},
]
let department = ref<string | null>(null)
let timestamp = ref<number | null>(null)
let timeChoose = ref<number | null>(null)

let apmtList = ref<IApmtDetail[]>([])

const _DAY = 86400000

const resetData = () => {
	timestamp.value = null
	department.value = null
	timeChoose.value = null
}

const disablePreviousDate = (ts: number) =>
	ts < Date.now() - _DAY || !apmtList.value.some((e) => e.date === ts)

const timestampToTime = (ts: number) => {
	const date = new Date(ts)
	const Y = date.getFullYear() + '-'
	const M =
		(date.getMonth() + 1 < 10
			? '0' + (date.getMonth() + 1)
			: date.getMonth() + 1) + '-'
	const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ''
	return Y + M + D
}

export default () => ({
	department,
	options,
	timestamp,
	resetData,
	disablePreviousDate,
	apmtList,
	timeChoose,
	timestampToTime
})
