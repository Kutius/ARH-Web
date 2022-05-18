import { MockMethod } from 'vite-plugin-mock'
export default [
	{
		url: '/api/get',
		method: 'get',
		response: () => {
			return {
				code: 0,
				data: {
					name: 'vben',
				},
			}
		},
	},
	{
		url: '/api/post',
		method: 'post',
		timeout: 2000,
		response: {
			code: 0,
			data: {
				name: 'vben',
			},
		},
	},
	{
		url: '/api/login',
		method: 'post',
		timeout: 1500,
		response: {
			code: 0,
			data: {
				name: 'vben',
			},
		},
	},
	{
		url: '/api/register',
		method: 'post',
		timeout: 1000,
		response: {
			code: 0,
			data: {
				name: 'vben',
			},
		},
	},
	{
		url: '/api/notice',
		method: 'get',
		response: {
			code: 0,
			data: {
				content: 'hello world',
			},
		},
	},
	{
		url: '/api/apmtDetail',
		method: 'post',
		response: {
			code: 0,
			data: {
				apmt: [
					{
						id: 20220517123,
						doctorName: '张三',
						doctorJob: '主任医师',
						date: 1653580800000,
						startTime: '7:30',
						endTime: '11:00',
						isProfessional: true,
					},
					{
						id: 20220517821,
						doctorName: '李四',
						doctorJob: '实习医师',
						date: 1653408000000,
						startTime: '13:30',
						endTime: '18:00',
						isProfessional: false,
					},
				],
			},
		},
	},
	{
		url: '/api/userSpace',
		method: 'post',
		response: {
			code: 0,
			data: {
				id: '00123',
				name: '沙克大哥',
				phone: '2379422131',
				idNumber: '09120909090',
				sex: 'male',
			},
		},
	},
	{
		url: '/api/text',
		method: 'post',
		rawResponse: async (req, res) => {
			let reqbody = ''
			await new Promise((resolve) => {
				req.on('data', (chunk) => {
					reqbody += chunk
				})
				req.on('end', () => resolve(undefined))
			})
			res.setHeader('Content-Type', 'text/plain')
			res.statusCode = 200
			res.end(`hello, ${reqbody}`)
		},
	},
] as MockMethod[]
