import axios from 'axios'
import store from '@/store'
import { message as $message } from '@/libs'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    config.headers.icode = '你需要在这里填入你的 icode'
    if (store.getters.token) {
      // 如果token存在 注入token
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config // 必须返回配置
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      $message('warn', message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // 处理 token 超时问题
    if (error.response && error.response.data && error.response.data.code === 401) {
      store.dispatch('user/logout')
    }
    $message('error', error.response.data.message)
    return Promise.reject(error)
  }
)

export default service
