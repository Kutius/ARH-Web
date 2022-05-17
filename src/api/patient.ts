import service from '~/composables/axios'
import type { IResponseData } from './types/common'
import type { IApmtDetailResponse } from './types/patient'

export const apmtDetail = () => {
	return service<IResponseData<IApmtDetailResponse>>({
		method: 'POST',
		url: '/api/apmtDetail',
	})
}
