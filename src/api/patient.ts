import service from '~/composables/axios'
import type { IResponseData } from './types/common'
import type {
	IApmtDetailResponse,
	ISpaceInfoResponse,
	IDetectFormParams,
	ISubmitCovidDetectionResponse,
	IUserId,
	IApmtHistoryResponse,
} from './types/patient'

export const apmtDetail = () => {
	return service<IResponseData<IApmtDetailResponse>>({
		method: 'POST',
		url: '/api/apmtDetail',
	})
}

export const userSpace = () => {
	return service<IResponseData<ISpaceInfoResponse>>({
		method: 'POST',
		url: '/api/userSpace',
	})
}

export const submitCovidDetection = (data: IDetectFormParams) => {
	return service<IResponseData<ISubmitCovidDetectionResponse>>({
		method: 'POST',
		url: '/api/submitCovidDetection',
		data: data,
	})
}

export const apmtHistory = (data: IUserId) => {
	return service<IResponseData<IApmtHistoryResponse>>({
		method: 'POST',
		url: '/api/apmtHistory',
		data: data,
	})
}
