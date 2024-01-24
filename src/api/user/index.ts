import { http } from '@/utils/http';
import type { UserResult, RefreshTokenResult } from './type';
import API from '../api';
/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<UserResult>('post', API.LOGIN, { data });
};

/** 刷新token */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>('post', API.REFRESH_TOKEN, { data });
};
