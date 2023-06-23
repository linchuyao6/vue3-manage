import { localCache } from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './config'
import MYRequest from './request'

const myRequest = new MYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      const token = localCache.getCache('token')
      if (config.headers && token) {
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    }
  }
})

export default myRequest
