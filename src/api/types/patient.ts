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
