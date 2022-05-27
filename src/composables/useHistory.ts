import { IAppointData,ICovidData } from '~/api/types/patient'

//
import type { IDetectFormParams as IDetectForm } from '~/api/types/patient'

export default () => {
	const searchForm = ref({
		id: null,
		doctorName: null,
	})

	const apmtDataFilter = ref<IAppointData[]>([])
	const appointData = ref<IAppointData[]>([])
	const covidData = ref<IDetectForm[]>([])

	// 数据过滤
	const dataFilter = (data: IAppointData[]) => {
		return data.filter((e) => {
			for (const [key, value] of Object.entries(searchForm.value)) {
				if (value && e[key as keyof typeof e].includes(value)) return true
			}
			return false
		})
	}

	// 预约挂号
	const appointColumns = [
		{
			title: '订单号',
			key: 'id',
		},
		{
			title: '医生名',
			key: 'doctorName',
		},
		{
			title: '预约到院时间',
			key: 'appointTime',
		},
		{
			title: '坐诊状态',
			key: 'status',
		},
	]
	// 预约挂号
	const covidColumns = [
		{
			title: '预约到院时间',
			key: 'arriveDate',
		},
		{
			title: '检测类型',
			key: 'detectType',
		},
		{
			title: '价格',
			key: 'price',
		},
	]

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
	const covidPagination = reactive({
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

	return {
		searchForm,
		apmtDataFilter,
		appointData,
		covidData,
		dataFilter,
		appointColumns,
		covidColumns,
		appointPagination,
		covidPagination
	}
}
