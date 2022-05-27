<script lang="ts" setup>
import { useMessage } from 'naive-ui'
import { getNotice } from '~/api/common'

const message = useMessage()
const noticeContent = ref('')

onMounted(() => {
	initContent()
})

const initContent = async () => {
	getNotice().then((res) => {
		if (res.code === 0) {
			noticeContent.value = res.data.content
		}
	})
}
const noticeSubmit = () => {
	message.success('提交成功')
}
</script>

<template>
	<n-card>
		<n-space vertical>
			<n-h3 prefix="bar">公告管理</n-h3>
			<n-text type="success"> {{ noticeContent || '空' }} </n-text>
			<n-form>
				<n-form-item>
					<n-input
						v-model:value="noticeContent"
						type="textarea"
						placeholder="在这里输入公告内容"
					/>
				</n-form-item>
				<n-form-item>
					<n-button type="primary" @click="noticeSubmit">确定</n-button>
				</n-form-item>
			</n-form>
		</n-space>
	</n-card>
</template>
