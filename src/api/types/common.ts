export interface IResponseData<T> {
	code: number
	message?: string
	data: T
}

export interface ILoginParams {
	username: string
	password: string
	doctor: boolean
}

export interface ILoginResponse {
	username: string
	uid: string
}

export interface INoticeResponse {
	content: string
}
