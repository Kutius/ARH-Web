import service from '~/composables/axios'
import type { IResponseData } from './types/common'

interface IUserInfo {
	id: number
	name: string
}

export const getUserInfo = () => {
	return service<IResponseData<IUserInfo>>({
		method: 'GET',
		url: '/api/get',
	})
}
