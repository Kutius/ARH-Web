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
	id: string | null
	name: string | null
	idNumber: string | null
	phone: string | null
	sex: string | null
	age: number | null
}

export interface INoticeResponse {
	content: string
}
