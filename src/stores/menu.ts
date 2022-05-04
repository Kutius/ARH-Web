import { defineStore } from 'pinia'
import { NIcon } from 'naive-ui'
import { Component } from 'vue'
import CarbonAlignBoxMiddleCenter from '~icons/carbon/align-box-middle-center'

const renderIcon = (icon: Component) => {
	return () => h(NIcon, null, { default: () => h(icon) })
}

export const useMenuStore = defineStore('menus', {
	state: () => {
		return {
			value: [
				{
					icon: renderIcon(CarbonAlignBoxMiddleCenter),
					label: '首页',
					hrefName: 'Index',
					key: 'Index',
				},
				{
					label: '回家',
					hrefName: 'test',
					key: 'test',
				},
				{
					label: '病人首页',
					hrefName: 'patient-Index',
					key: 'patient-Index',
				},
				{
					label: '寻羊冒险记',
					key: 'a-wild-sheep-chase',
					disabled: true,
				},
				{
					label: '舞，舞，舞',
					key: 'dance-dance-dance',
					children: [
						{
							type: 'group',
							label: '人物',
							key: 'people',
							children: [
								{
									label: '叙事者',
									key: 'narrator',
								},
								{
									label: '羊男',
									key: 'sheep-man',
								},
							],
						},
						{
							label: '饮品',
							key: 'beverage',
							children: [
								{
									label: '威士忌',
									key: 'whisky',
								},
							],
						},
						{
							label: '食物',
							key: 'food',
							children: [
								{
									label: '三明治',
									key: 'sandwich',
								},
							],
						},
						{
							label: '过去增多，未来减少',
							key: 'the-past-increases-the-future-recedes',
						},
					],
				},
			],
			patient: [
				{
					label: '病人首页',
					hrefName: 'patient-Index',
					key: 'patient-Index',
				},
			],
		}
	},
	actions: {},
	getters: {
		getPatientMenu: () => ['/login', '/'],
	},
})
