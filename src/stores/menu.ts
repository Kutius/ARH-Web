import { defineStore } from 'pinia'
import { RouterLink } from 'vue-router'

export const useMenuStore = defineStore('menus', {
	state: () => {
		return {
			value: [
				{
					label: () =>
						h(
							RouterLink,
							{
								to: { name: 'Index' },
							},
							{ default: () => '首页' }
						),
					key: 'Index',
				},
				{
					label: () =>
						h(
							RouterLink,
							{
								to: {
									name: 'test',
									// params: {
									// 	lang: 'zh-CN',
									// },
								},
							},
							{ default: () => '回家' }
						),
					key: 'test',
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
		}
	},
	actions: {},
	getters: {},
})
