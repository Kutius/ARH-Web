import axios, { AxiosRequestConfig } from 'axios'

const service = axios.create({
	// baseURL: 'http://localhost:3000',
	baseURL: import.meta.env.BASE_URL,
})

// 请求拦截器
service.interceptors.request.use(
	(config) => {
		// 在请求发送之前做一些处理
		return config
	},
	(error) => {
		// 当请求失败时做一些处理
		console.log(error.message)
		return Promise.reject(error)
	}
)

export default <T = any>(config: AxiosRequestConfig) => {
	return service(config).then((res) => res.data as T)
}
