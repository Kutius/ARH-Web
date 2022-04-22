<script setup lang="ts">
import { FormInst, useMessage } from 'naive-ui'
// import { getUserInfo } from '../api/common'
const { t } = useI18n()

const loginRef = ref<FormInst | null>(null)
let loginForm = ref({
	username: '',
	password: '',
	doctor: false,
})
let isRegister = ref(false)

const message = useMessage()

const rules = {
	username: { required: true, message: '请输入账号', trigger: 'blur' },
	password: { required: true, message: '请输入密码', trigger: 'blur' },
}
const onSubmit = () => {
	// getUserInfo().then((res) => {})

	loginRef.value?.validate((errors) => {
		if (!errors) {
			message.success('Valid')
		} else {
			console.log(errors)
			message.error('Invalid')
		}
	})
}

const register = () => {
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
			<n-form-item label="账号" path="username">
				<n-input
					v-model:value="loginForm.username"
					placeholder="请输入账号"
					clearable
				>
					<template #prefix>
						<i-carbon:user-avatar />
					</template>
				</n-input>
			</n-form-item>
			<n-form-item label="密码" path="password">
				<n-input
					v-model:value="loginForm.password"
					placeholder="请输入密码"
					type="password"
					show-password-on="mousedown"
				>
					<template #prefix>
						<i-carbon:password />
					</template>
				</n-input>
			</n-form-item>
			<n-form-item>
				<n-button type="primary" class="w-full" @click="onSubmit">
					{{ isRegister ? t('register.btn') : t('login.btn') }}
				</n-button>
			</n-form-item>
		</n-form>
	</div>

	<div class="login-footer">
		<div class="footer-item">
			<n-space v-if="!isRegister" class="flex items-center">
				<n-switch v-model:value="loginForm.doctor" />
				医生 / 管理员登录
			</n-space>
		</div>
		<div class="cursor-pointer text-green-500 footer-item" @click="register">
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
