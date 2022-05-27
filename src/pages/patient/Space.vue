<script lang="ts" setup>
import { useMessage } from 'naive-ui'
import { changePassword, userSpace } from '~/api/patient'
import space from '~/composables/spaceLogic'

const message = useMessage()

const {
	userForm,
	pwdForm,
	userFormRef,
	pwdFormRef,
	rules,
	confirmPwdRules,
	idParse,
} = space()

const userFormSubmit = () => {
	userFormRef.value?.validate((errors) => {
		if (!errors) {
			userSpace({ id: userForm.value.id! }).then((res) => {
				if (res.code === 0) {
					console.log(userForm.value)
					userStore.user.info = userForm.value
					message.success('修改成功')
				} else {
					message.error(res.message || '修改失败')
				}
			})
		} else {
			message.error('信息不完整')
		}
	})
}
const pwdSubmit = () => {
	pwdFormRef.value?.validate((errors) => {
		if (!errors) {
			changePassword({
				id: userStore.user.info.id!,
				newPassword: pwdForm.value.password,
			}).then((res) => {
				if (res.code === 0) {
					message.success('修改成功')
				} else {
					message.error(res.message || '修改失败')
				}
			})
		}
	})
}

// 从pinia中取出用户实例
const userStore = useUserStore()

const idInputBlur = () => {
	userForm.value.age = idParse(userForm.value.idNumber!).age
}
</script>

<template>
	<!-- <n-space vertical> -->
	<n-card>
		<n-h3 prefix="bar">我的信息</n-h3>

		<n-form
			ref="userFormRef"
			:model="userForm"
			:rules="rules"
			label-width="auto"
			label-placement="left"
			require-mark-placement="right-hanging"
			:style="{
				maxWidth: '640px',
				margin: 'auto',
			}"
		>
			<n-form-item label="姓名" path="name">
				<n-input v-model:value="userForm.name" clearable />
			</n-form-item>
			<n-form-item label="用户账号" path="username">
				<n-text depth="3">{{ userStore.user.username }}</n-text>
			</n-form-item>
			<n-form-item label="联系电话" path="phone">
				<n-input v-model:value="userForm.phone" />
			</n-form-item>
			<n-form-item label="身份证号" path="idNumber">
				<n-input v-model:value="userForm.idNumber" @blur="idInputBlur" />
			</n-form-item>
			<n-form-item label="性别" path="sex">
				<n-radio-group v-model:value="userForm.sex" name="sex">
					<n-space>
						<n-radio value="male"> 男 </n-radio>
						<n-radio value="female"> 女 </n-radio>
					</n-space>
				</n-radio-group>
			</n-form-item>
			<n-form-item label="年龄" path="age">
				<n-text depth="3">{{ userForm.age || '暂无' }}</n-text>
			</n-form-item>
			<n-row :gutter="[0, 24]">
				<n-col :span="24">
					<div style="display: flex; justify-content: flex-end">
						<n-button round type="primary" @click="userFormSubmit">
							保存
						</n-button>
					</div>
				</n-col>
			</n-row>
		</n-form>

		<n-h3 prefix="bar">修改密码</n-h3>
		<n-form
			ref="pwdFormRef"
			:model="pwdForm"
			:rules="confirmPwdRules"
			label-width="auto"
			label-placement="left"
			require-mark-placement="right-hanging"
			:style="{
				maxWidth: '640px',
				margin: 'auto',
			}"
		>
			<n-form-item label="新密码" path="password">
				<n-input
					v-model:value="pwdForm.password"
					type="password"
					show-password-on="click"
					first
				/>
			</n-form-item>
			<n-form-item label="确认密码" path="confirmPwd">
				<n-input
					v-model:value="pwdForm.confirmPwd"
					type="password"
					show-password-on="click"
					first
					:disabled="!pwdForm.password"
				/>
			</n-form-item>
			<n-row :gutter="[0, 24]">
				<n-col :span="24">
					<div style="display: flex; justify-content: flex-end">
						<n-button round type="primary" @click="pwdSubmit"> 确定 </n-button>
					</div>
				</n-col>
			</n-row>
		</n-form>
	</n-card>
	<!-- </n-space> -->
</template>
