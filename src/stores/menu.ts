import { defineStore } from 'pinia'
import { NIcon } from 'naive-ui'
import { Component } from 'vue'
import {
	DocumentOnePage24Regular as DocumentIcon,
	HeartCircle24Regular as HeartIcon,
	PersonInfo20Regular as InfoIcon,
	Stethoscope24Regular as ReserveIcon,
	History24Regular as HistoryIcon,
	AppsListDetail24Regular as ListIcon,
} from '@vicons/fluent'

const renderIcon = (icon: Component) => {
	return () => h(NIcon, null, { default: () => h(icon) })
}
export const useMenuStore = defineStore('menus', {
	state: () => {
		return {
			doctor: [
				{
					icon: renderIcon(DocumentIcon),
					label: 'menu.index',
					hrefName: 'doctor-Index',
					key: 'doctor-Index',
				},
				{
					icon: renderIcon(ListIcon),
					label: '坐诊排班',
					hrefName: 'doctor-Schedule',
					key: 'doctor-Schedule',
				},
			],
			patient: [
				{
					icon: renderIcon(DocumentIcon),
					label: 'menu.index',
					hrefName: 'patient-Index',
					key: 'patient-Index',
				},
				{
					icon: renderIcon(ReserveIcon),
					label: 'menu.appointment',
					hrefName: 'patient-Appointment',
					key: 'patient-Appointment',
				},
				{
					icon: renderIcon(HeartIcon),
					label: 'menu.covid-detection',
					hrefName: 'patient-CovidDetection',
					key: 'patient-CovidDetection',
				},
				{
					icon: renderIcon(InfoIcon),
					label: 'menu.space',
					hrefName: 'patient-Space',
					key: 'patient-Space',
				},
				{
					icon: renderIcon(HistoryIcon),
					label: 'menu.history',
					hrefName: 'patient-History',
					key: 'patient-History',
				},
			],
		}
	},
	actions: {},
	getters: {
		getPatientMenu: () => ['/login', '/'],
	},
})
