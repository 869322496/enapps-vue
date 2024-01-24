import Axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type CustomParamsSerializer,
} from 'axios';
import type {
  EnappsHttpError,
  RequestMethods,
  EnappsHttpResponse,
  EnappsHttpRequestConfig,
} from './types.d';
import { stringify } from 'qs';
import { formatToken, getToken } from '../auth';
import { CookieUtil } from '../cookie';
import NProgress from 'nprogress';
import useConvertStore from '@/store/modules/convert';
const defaultConfig: AxiosRequestConfig = {
  // 请求超时时间
  timeout: 10000,
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer,
  },
};

class EnappsHttp {
  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }
  private static idCounter = 0;
  /** token过期后，暂存待执行的请求 */
  private static requests = [];

  /** 防止重复刷新token */
  private static isRefreshing = false;

  /** 初始化配置对象 */
  private static initConfig: EnappsHttpRequestConfig = {};

  /** 保存当前Axios实例对象 */
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);

  /** 重连原始请求 */
  private static retryOriginalRequest(config: EnappsHttpRequestConfig) {
    return new Promise(resolve => {
      EnappsHttp.requests.push((token: string) => {
        config.headers['Authorization'] = formatToken(token);
        resolve(config);
      });
    });
  }

  /** 请求拦截 */
  private httpInterceptorsRequest(): void {
    EnappsHttp.axiosInstance.interceptors.request.use(
      async (config: EnappsHttpRequestConfig): Promise<any> => {
        // 开启进度条动画
        NProgress.start();
        // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
        config = this.handleRequest(config);
        return config;

        /** 请求白名单，放置一些不需要token的接口（通过设置请求白名单，防止token过期后再请求造成的死循环问题） */
        // const whiteList = ['/refresh-token', '/login'];
        // return whiteList.find((url) => url === config.url)
        //   ? config
        //   : new Promise((resolve) => {
        //       const data = getToken();
        //       if (data) {
        //         const now = new Date().getTime();
        //         const expired = parseInt(`${data.expires}`) - now <= 0;
        //         if (expired) {
        //           if (!EnappsHttp.isRefreshing) {
        //             EnappsHttp.isRefreshing = true;
        //             // token过期刷新
        //             // useUserStoreHook()
        //             //   .handRefreshToken({ refreshToken: data.refreshToken })
        //             //   .then((res) => {
        //             //     const token = res.data.accessToken;
        //             //     config.headers['Authorization'] = formatToken(token);
        //             //     EnappsHttp.requests.forEach((cb) => cb(token));
        //             //     EnappsHttp.requests = [];
        //             //   })
        //             //   .finally(() => {
        //             //     EnappsHttp.isRefreshing = false;
        //             //   });
        //           }
        //           resolve(EnappsHttp.retryOriginalRequest(config));
        //         } else {
        //           config.headers!['Authorization'] = formatToken(
        //             data.accessToken
        //           );
        //           resolve(config);
        //         }
        //       } else {
        //         resolve(config);
        //       }
        //     });
      },
      error => {
        return Promise.reject(error);
      }
    );
  }

  /** 响应拦截 */
  private httpInterceptorsResponse(): void {
    const instance = EnappsHttp.axiosInstance;
    instance.interceptors.response.use(
      (response: EnappsHttpResponse) => {
        const $config = response.config;
        // 关闭进度条动画
        NProgress.done();
        // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
        response = this.handleResponse(response);
        return response.data;
      },
      (error: EnappsHttpError) => {
        const $error = error;
        $error.isCancelRequest = Axios.isCancel($error);
        // 关闭进度条动画
        NProgress.done();
        // 所有的响应异常 区分来源为取消请求/非取消请求
        return Promise.reject($error);
      }
    );
  }

  /** 通用请求工具函数 */
  public request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: EnappsHttpRequestConfig
  ): Promise<T> {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig,
    } as EnappsHttpRequestConfig;

    // 单独处理自定义请求/响应回调
    return new Promise((resolve, reject) => {
      EnappsHttp.axiosInstance
        .request(config)
        .then((response: undefined) => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /** 单独抽离的post工具函数 */
  public post<T, P>(
    url: string,
    params?: AxiosRequestConfig<T>,
    config?: EnappsHttpRequestConfig
  ): Promise<P> {
    return this.request<P>('post', url, params, config);
  }

  /** 单独抽离的get工具函数 */
  public get<T, P>(
    url: string,
    params?: AxiosRequestConfig<T>,
    config?: EnappsHttpRequestConfig
  ): Promise<P> {
    return this.request<P>('get', url, params, config);
  }

  private handleRequest(config: EnappsHttpRequestConfig): EnappsHttpRequestConfig {
    if (config.method === 'post') {
      const convertStore = useConvertStore();
      const queryString = window.location.search;
      const params = new URLSearchParams(queryString);
      const isDevelopMode = params.has('debug');
      config.data = {
        id: 'r' + ++EnappsHttp.idCounter + '',
        jsonrpc: '2.0',
        method: 'call',
        params: {
          ...config.data,
          debug: isDevelopMode ? 1 : undefined,
          sessionId: CookieUtil.getInstanceSessionId(),
        },
      };
      const notToSnakeUrls = ['hmrc_api'];
      const snakeCaseObject: any = convertStore.toSnakeCaseBatch(config.data);
      const { url } = config;
      if (!notToSnakeUrls.some(reg => url.includes(reg))) {
        config.data = snakeCaseObject;
      }
    }
    return config;
  }

  private handleResponse(response: EnappsHttpResponse): EnappsHttpResponse {
    if (response.config.responseType === 'blob') {
      return response;
    }

    const convertStore = useConvertStore();
    if (response.data?.result?.fields) {
      let newMapping = {};
      Object.keys(response.data?.result?.fields).forEach(field => {
        const key = field.replace('_', '').replace('-', '').toLocaleLowerCase();
        newMapping = {
          ...newMapping,
          [key]: field,
        };
      });
      convertStore.camelCaseMapping = {
        ...convertStore.camelCaseMapping,
        ...newMapping,
      };
    }
    response.data = convertStore.toCamelCaseBatch(response.data.result);
    return response;
  }
}

export const http = new EnappsHttp();
