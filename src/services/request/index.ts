import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { MYRequestConfig, InterRequestConfig } from './type'
class MYRequest {
  instance: AxiosInstance
  constructor(config: MYRequestConfig) {
    this.instance = axios.create(config)
    // 每个instance实例都添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return err
      }
    )
    // 针对特定的实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  // 封装请求方法
  request<T = any>(config: MYRequestConfig<T>) {
    // 单词请求成功的拦截处理
    // if (config.interceptors?.requestSuccessFn) {
    //   config = config.interceptors.requestSuccessFn(config)
    // }
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  get<T = any>(config: MYRequestConfig<T>) {
    return this.request({
      ...config,
      method: 'GET'
    })
  }
  post<T = any>(config: MYRequestConfig<T>) {
    return this.request({
      ...config,
      method: 'POST'
    })
  }
  delete<T = any>(config: MYRequestConfig<T>) {
    return this.request({
      ...config,
      method: 'DELETE'
    })
  }
  patch<T = any>(config: MYRequestConfig<T>) {
    return this.request({
      ...config,
      method: 'PATCH'
    })
  }
}

export default MYRequest
