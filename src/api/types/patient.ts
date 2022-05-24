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

enum sex {
	male,
	female,
}

export interface ISpaceInfoResponse {
	id: string
	name: string
	phone: string
	idNumber: string
	sex: sex
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
	uid: string
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
