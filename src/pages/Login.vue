<script setup lang="ts">
import { FormInst, useMessage } from 'naive-ui'
const loginRef = ref<FormInst | null>(null)
const loginForm = ref({
	username: '',
	password: '',
})
const message = useMessage()
const rules = {
	username: { required: true, message: '请输入账号', trigger: 'blur' },
	password: { required: true, message: '请输入密码', trigger: 'blur' },
}

const onSubmit = () => {
	loginRef.value?.validate((errors) => {
		if (!errors) {
			message.success('Valid')
		} else {
			console.log(errors)
			message.error('Invalid')
		}
	})
}
</script>

<template>
	<div class="login-header">
		<span class="text-20px">挂号预约管理系统</span>
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
					v-model="loginForm.username"
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
					v-model="loginForm.password"
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
					立即登录
				</n-button>
			</n-form-item>
		</n-form>
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
</style>

<route lang="yaml">
meta:
  layout: login
</route>
