import service from '~/composables/axios'
import type { IResponseData } from './types/common'
import type {
	IApmtDetailResponse,
	ISpaceInfoResponse,
	IDetectFormParams,
	ISubmitCovidDetectionResponse,
	IUserId,
	IApmtHistoryResponse,
	ICovidHistoryResponse,
	IChangePasswordForm,
	IResultResponse,
} from './types/patient'

export const apmtDetail = () => {
	return service<IResponseData<IApmtDetailResponse>>({
		method: 'POST',
		url: '/api/apmtDetail',
	})
}

// 用户信息修改/保存
export const userSpace = (data: IUserId) => {
	return service<IResponseData<ISpaceInfoResponse>>({
		method: 'POST',
		url: '/api/userSpace',
		data: data,
	})
}

export const submitCovidDetection = (data: IDetectFormParams) => {
	return service<IResponseData<ISubmitCovidDetectionResponse>>({
		method: 'POST',
		url: '/api/submitCovidDetection',
		data: data,
	})
}

// 预约记录
export const apmtHistory = (data: IUserId) => {
	return service<IResponseData<IApmtHistoryResponse>>({
		method: 'POST',
		url: '/api/apmtHistory',
		data: data,
	})
}

// 核酸记录
export const covidHistory = (data: IUserId) => {
	return service<IResponseData<ICovidHistoryResponse>>({
		method: 'POST',
		url: '/api/covidHistory',
		data: data,
	})
}

// 修改密码
export const changePassword = (data: IChangePasswordForm) => {
	return service<IResponseData<IResultResponse>>({
		method: 'POST',
		url: '/api/changePassword',
		data: data,
	})
}
