import { ILoginResponse } from './../api/types/common'
import { FormInst, FormItemRule, FormRules } from 'naive-ui'

export default () => {
	const userStore = useUserStore()

	const userForm = ref<ILoginResponse>(userStore.user.info)
	const pwdForm = ref({
		password: '',
		confirmPwd: '',
	})

	const userFormRef = ref<FormInst | null>(null)
	const pwdFormRef = ref<FormInst | null>(null)
	const rules: FormRules = {
		name: {
			required: true,
			message: '请输入姓名',
			trigger: 'blur',
		},
		phone: {
			required: true,
			message: '请输入手机号',
			trigger: 'blur',
		},
		idNumber: [
			{
				required: true,
				message: '请输入身份证号',
				trigger: 'blur',
			},
			{
				pattern:
					/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
				message: '请输入正确的身份证号',
				trigger: ['input', 'blur'],
			},
		],
		sex: {
			required: true,
			message: '请选择性别',
		},
	}
	const confirmPwdRules: FormRules = {
		password: {
			required: true,
			message: '请输入密码',
			trigger: 'blur',
		},
		confirmPwd: [
			{
				required: true,
				message: '请再次输入密码',
				trigger: ['input', 'blur'],
			},
			{
				validator: (rule: FormItemRule, value: string) => {
					return value === pwdForm.value.password
				},
				message: '两次密码输入不一致',
				trigger: 'input',
			},
		],
	}

	// 从身份证号识别
	const idParse = (id: string) => {
		console.log(id)
		const year = parseInt(id.slice(6, 10))
		const month = parseInt(id.slice(10, 12))
		const day = parseInt(id.slice(12, 14))
		const birth = new Date(year, month - 1, day)
		const now = new Date()
		const age = now.getFullYear() - birth.getFullYear()
		return { year, month, day, age }
	}

	return {
		userForm,
		pwdForm,
		userFormRef,
		pwdFormRef,
		rules,
		confirmPwdRules,
		idParse,
	}
}
