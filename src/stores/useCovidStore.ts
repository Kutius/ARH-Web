import { defineStore } from 'pinia'
import type { IDetectFormParams as IDetectForm } from '~/api/types/patient'

export default defineStore('covidStore', {
	state: () => ({
		detectionForm: [] as IDetectForm[],
	}),
	getters: {
		formatData: (state) => {
			const res = state.detectionForm.map((item) => {
				if (item === null) return item
				return {
					arriveDate: item.arriveDate,
					detectType: item.detectType === 'solo' ? '单检' : '混检',
					price: item.price,
				}
			})
			return res
		},
	},
	actions: {},
	persist: true,
})
