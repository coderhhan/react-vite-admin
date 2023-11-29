import type { AxiosRequestConfig, AxiosResponse } from 'axios'
export interface HhRequestInterceptors<T = AxiosResponse> {
  requestInterceptor: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch: (err: any) => any
  responseInterceptor: (res: T) => T
  responseInterceptorCatch: (err: any) => any
}

export interface HhRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HhRequestInterceptors<T>
  isShowLoading?: boolean
}
