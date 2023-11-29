// 二次封装axios

import axios from 'axios'
import { GET_TOKEN } from '@/utils/token'
import { message as Message } from "antd"
import NProgress from 'nprogress'
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
  timeout: 5000,
})
let httpCount = 0
let errorMessages: any = []
const StartPendding = () => {
  if (!httpCount) {
    NProgress.start();
  }
  httpCount++
}

const EndPendding = () => {
  httpCount--
  if (!httpCount) {
    NProgress.done();
    const messages = errorMessages.splice(0)
    messages.length > 0 && Message.warning(messages);
  }
}


request.interceptors.request.use(
  (config) => {
    const token = GET_TOKEN()

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    StartPendding()
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  (response) => {
    EndPendding()
    if (response.status === 200) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response.data)
    }
  },
  (error) => {
    let message = ''
    const status = error.response.status
    switch (status) {
      // 401: 未登录
      // 未登录则跳转登录页面，并携带当前页面的路径
      // 在登录成功后返回当前页面，这一步需要在登录页操作。
      case 401:
        message = '未登录'
        break
      // 403 token过期
      // 登录过期对用户进行提示
      // 清除本地token和清空vuex中token对象
      // 跳转登录页面
      case 403:
        message = '登录过期，请重新登录'
        break
      case 404:
        message = '网络请求不存在'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = error.response.data.message
        break
    }
    errorMessages.push(message)
    EndPendding()

    return Promise.reject(error)
  },
)

export default request
