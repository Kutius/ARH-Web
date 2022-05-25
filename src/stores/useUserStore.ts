import { ILoginResponse } from './../api/types/common';
import type { ILoginParams } from '../api/types/common'
import { defineStore } from 'pinia'

interface IUserInfo extends ILoginParams {
	isLoggedIn: boolean
	info: ILoginResponse
}

export default defineStore('userStore', {
	state() {
		return {
			user: {
				isLoggedIn: false,
				info: {
					id: null,
					name: null,
					idNumber: null,
					phone: null,
					sex: null,
					age: null,
				},
			} as IUserInfo,
		}
	},
	getters: {},
	actions: {
		setUser(user: ILoginParams) {
			Object.assign(this.user, user)
			this.user.isLoggedIn = true
		},
	},
	persist: true,
})
