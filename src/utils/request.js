import axios from 'axios'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      // TODO：业务错误
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // TODO: 提示错误消息
    return Promise.reject(error)
  }
)

export default service
