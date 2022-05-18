import { CascaderOption } from 'naive-ui'
import type { IApmtDetail } from '~/api/types/patient'

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
