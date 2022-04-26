import { ILoginParams } from '../api/types/common'
import { defineStore } from 'pinia'

interface IUserStore extends ILoginParams {
	isLoggedIn: boolean
}

export default defineStore('userStore', {
	state() {
		return {
			user: useLocalStorage('user-profile', {
				isLoggedIn: false,
			} as IUserStore),
		}
	},
	getters: {},
	actions: {
		setUser(user: ILoginParams) {
			Object.assign(this.user, user)
			this.user.isLoggedIn = true
		},
	},
})
