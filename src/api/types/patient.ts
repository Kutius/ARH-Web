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
