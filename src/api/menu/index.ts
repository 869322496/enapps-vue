import { http } from '@/utils/http';
import API from '../api';

export const loadMenu = () => {
  return http.request<any>('post', API.MENU_LOAD);
};
