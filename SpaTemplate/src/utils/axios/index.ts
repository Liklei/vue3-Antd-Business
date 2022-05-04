import axios, { AxiosRequestConfig, Method } from 'axios'
import { message } from 'ant-design-vue'
import { errorHandle } from './errorCode'
import { getAppEnvConfig } from '../env'
import { useAuthStoreWithOut } from '@/store/modules/auth'

const { VITE_GLOB_API_URL } = getAppEnvConfig()
const store = useAuthStoreWithOut()

interface PendingType {
  url?: string
  method?: Method
  params: any
  data: any
  cancel: any
}

const pending: Array<PendingType> = []
const CancelToken = axios.CancelToken

const removePending = (config: AxiosRequestConfig) => {
  for (const key in pending) {
    const item: number = +key
    const list: PendingType = pending[key]
    if (
      list.url === config.url &&
      list.method === config.method &&
      JSON.stringify(list.params) === JSON.stringify(config.params) &&
      JSON.stringify(list.data) === JSON.stringify(config.data)
    ) {
      list.cancel('操作太频繁，请稍后再试')
      pending.splice(item, 1)
    }
  }
}

const instance = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin-Type': '*'
  },
  timeout: 1000 * 30,
  baseURL: VITE_GLOB_API_URL,
  withCredentials: false
})

instance.interceptors.request.use(
  (config) => {
    removePending(config)
    config.cancelToken = new CancelToken((c) => {
      pending.push({
        url: config.url,
        method: config.method,
        params: config.params,
        data: config.data,
        cancel: c
      })
    })
    // TODO 登录流程控制中，根据本地是否存在token判断用户的登录情况, 登录后请设置localStorage
    // if (window.localStorage.get(store.state.authModule.Roles)) {
    //   config.headers.Authorization = window.localStorage.get(store.state.authModule.Roles)
    // }
    return config
  },
  (error) => {
    message.error(error.data.error.message)
    return Promise.reject(error.data.error.message)
  }
)

instance.interceptors.response.use(
  (config) => {
    // TODO 通用加载组件展示
    removePending(config.config)
    if (config.status === 200 || config.status === 204) {
      setTimeout(() => {
        // TODO 通用加载组件隐藏
      }, 400)
      return Promise.resolve(config)
    } else {
      return Promise.reject(config)
    }
  },
  (error) => {
    const { response } = error
    if (response) {
      errorHandle(response.status, response.data.message)
      const config = error.config
      const [RETRY_COUNT, RETRY_DELAY] = [3, 1000]
      if (config && RETRY_COUNT) {
        config.__retryCount = config.__retryCount || 0
        if (config.__retryCount >= RETRY_COUNT) {
          return Promise.reject(response || { message: error.message })
        }
        config.__retryCount++
        const backoff = new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve()
          }, RETRY_DELAY || 1)
        })
        return backoff.then(() => {
          return instance(config)
        })
      }

      return Promise.reject(response)
    } else {
      //TODO 全局无网络组件显示
      store.setNetWork()
    }
  }
)

export default instance
