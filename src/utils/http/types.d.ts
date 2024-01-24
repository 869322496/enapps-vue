import type { Method, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';

export type ResultType = {
  accessToken?: string;
};

export type RequestMethods = Extract<
  Method,
  'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'
>;

export interface EnappsHttpError extends AxiosError {
  isCancelRequest?: boolean;
}

export interface EnappsHttpResponse extends AxiosResponse {
  config: EnappsHttpRequestConfig;
}

export interface EnappsHttpRequestConfig extends AxiosRequestConfig {
  beforeRequestCallback?: (request: EnappsHttpRequestConfig) => void;
  beforeResponseCallback?: (response: EnappsHttpResponse) => void;
}

export default class EnappsHttp {
  request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: EnappsHttpRequestConfig
  ): Promise<T>;
  post<T, P>(url: string, params?: T, config?: EnappsHttpRequestConfig): Promise<P>;
  get<T, P>(url: string, params?: T, config?: EnappsHttpRequestConfig): Promise<P>;
}
