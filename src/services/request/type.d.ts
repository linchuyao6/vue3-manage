import type {
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
export interface MYInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}

export interface MYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: MYInterceptors<T>
}
export interface InterRequestConfig<T = AxiosResponse>
  extends InternalAxiosRequestConfig {
  interceptors?: MYInterceptors<T>
}
