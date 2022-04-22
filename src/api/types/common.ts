export interface IResponseData<T> {
	code: number
	message?: string
	data: T
}
