export interface IApmtDetail {
	id: number
	doctorName: string
	doctorJob: string
	date: number
	startTime: string
	endTime: string
	isProfessional: boolean
}

export interface IApmtDetailResponse {
	apmt: IApmtDetail[]
}

export interface IApmtDetailData {
	department: string
	timestamp: number
}

export interface ISpaceInfoResponse {
	id: string | null
	name: string | null
	idNumber: string | null
	phone: string | null
	sex: string | null
	age: number | null
}

export interface IDetectFormParams {
	arriveDate: null | number
	detectType: null | string
	price: null | string
}

export interface ISubmitCovidDetectionResponse {
	result: string
}

export interface IUserId {
	id: string
}

export interface IAppointData {
	id: string
	doctorName: string
	appointTime: string
	status: string
}

export interface ICovidData {
	appointTime: string
	status: string
}

export interface IApmtHistoryResponse {
	history: IAppointData[]
}

export interface ICovidHistoryResponse {
	history: ICovidData[]
}
