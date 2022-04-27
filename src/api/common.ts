import service from '~/composables/axios'
import type {
	IResponseData,
	ILoginParams,
	ILoginResponse,
} from './types/common'

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

export const userLogin = (data: ILoginParams) => {
	return service<IResponseData<ILoginResponse>>({
		method: 'POST',
		url: '/api/login',
		data: data,
	})
}

export const userRegister = (data: ILoginParams) => {
	return service<IResponseData<ILoginResponse>>({
		method: 'POST',
		url: '/api/register',
		data: data,
	})
}
