import { http } from '@/utils/http';
import API from '../api';
import { AuthenticateRequestPayload, AuthenticateResponsePayload } from './type';

export const getSessionInfo = () => {
  return http.request<any>('post', API.SESSION_GET_SESSION_INFO, { data: {} });
};

export const authenticate = (data: AuthenticateRequestPayload) => {
  return http.request<AuthenticateResponsePayload>('post', API.SESSION_AUTHENTICATE, { data });
};
export const logout = () => {
  return http.request('post', API.SESSION_LOGOUT);
};
