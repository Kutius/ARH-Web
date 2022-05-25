<script setup lang="ts">
import { FormInst, useMessage } from 'naive-ui'
import { useRequest } from 'vue-request'
import { userLogin, userRegister } from '~/api/common'

const { t } = useI18n()
const router = useRouter()

const loginRef = ref<FormInst | null>(null)
let loginForm = ref({
	username: '',
	password: '',
	doctor: false,
})
let isRegister = ref(false)

const message = useMessage()

const rules = {
	username: {
		required: true,
		message: t('login.rules.username'),
		trigger: 'blur',
	},
	password: {
		required: true,
		message: t('login.rules.password'),
		trigger: 'blur',
	},
}

// 将用户信息存储到全局store
const userStore = useUserStore()

const { run, loading } = useRequest(userLogin, {
	onSuccess: (res) => {
		if (res.code === 0) {
			userStore.setUser(loginForm.value)
			userStore.user.info = res.data
			message.success(t('login.success'))
			userStore.user.doctor ? router.push('/') : router.push('/patient')
		} else {
			message.error(res.message || t('login.fail'))
		}
	},
	manual: true,
})

const login = () => run(loginForm.value)
// const login = async () => {
// 	const { username, password, doctor } = loginForm.value
// 	const data = { username, password, doctor }
// 	const res = await userLogin(data)

// 	if (res.code === 0) {
// 		userStore.setUser(loginForm.value)
// 		message.success(t('login.success'))
// 		router.push('/')
// 		console.log(userStore.user)
// 	} else {
// 		message.error(t('login.fail'))
// 	}
// }

const register = async () => {
	const { username, password, doctor } = loginForm.value
	const data = { username, password, doctor }
	const res = await userRegister(data)
	if (res.code === 0) {
		message.success(t('register.success'))
		switchSign()
	} else {
		message.error(t('register.fail'))
	}
}

const onSubmit = () => {
	loginRef.value?.validate((errors) => {
		if (!errors) {
			isRegister.value ? register() : login()
		} else {
			console.log(errors)
			message.error(t('login.validate'))
		}
	})
}

const switchSign = () => {
	isRegister.value = !isRegister.value
	loginForm.value.username = ''
	loginForm.value.password = ''
	loginForm.value.doctor = false
}
</script>

<template>
	<div class="login-header">
		<span class="text-20px">
			{{ isRegister ? t('register.logo-name') : t('login.logo-name') }}
		</span>
	</div>

	<div class="login-container">
		<n-form
			ref="loginRef"
			class="w-full"
			:model="loginForm"
			:rules="rules"
			label-width="40"
			label-placement="left"
			:show-label="false"
		>
			<n-form-item path="username">
				<n-input
					v-model:value="loginForm.username"
					:placeholder="t('login.rules.username')"
					clearable
				>
					<template #prefix>
						<i-carbon:user-avatar />
					</template>
				</n-input>
			</n-form-item>
			<n-form-item path="password">
				<n-input
					v-model:value="loginForm.password"
					:placeholder="t('login.rules.password')"
					type="password"
					show-password-on="mousedown"
				>
					<template #prefix>
						<i-carbon:password />
					</template>
				</n-input>
			</n-form-item>
			<n-form-item>
				<n-button
					type="primary"
					class="w-full"
					:loading="loading"
					@click="onSubmit"
				>
					{{ isRegister ? t('register.btn') : t('login.btn') }}
				</n-button>
			</n-form-item>
		</n-form>
	</div>

	<div class="login-footer">
		<div class="footer-item">
			<n-space v-show="!isRegister" class="flex items-center">
				<n-switch v-model:value="loginForm.doctor" />
				{{ t('login.adminLogin') }}
			</n-space>
		</div>
		<div class="cursor-pointer text-green-500 footer-item" @click="switchSign">
			{{ isRegister ? t('register.change') : t('login.change') }}
			<i-carbon:arrow-right />
		</div>
	</div>
</template>

<style lang="less" scoped>
.login-header {
	display: flex;
	justify-content: center;
	margin-bottom: 40px;
}

.login-container {
	display: flex;
	padding: 10px 30px;
}

.login-footer {
	display: flex;
	padding: 0px 30px;
	margin-top: -20px;
	justify-content: space-between;
	.footer-item {
		display: flex;
		align-items: center;
	}
}
</style>

<route lang="yaml">
meta:
  layout: login
</route>
