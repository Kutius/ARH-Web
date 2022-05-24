import { userSpace } from '~/api/patient'

export default () => {
	const flag = ref<boolean>(false)

	const getUserSpace = async (callback?: any) => {
		const res = await userSpace()
		if (res.code === 0) {
			if (!(res.data.name && res.data.idNumber)) {
				flag.value = true
				callback()
			}
		}
	}
	return {
		flag,
		getUserSpace,
	}
}
