import { http } from '@/utils/http';
import API from '../api';

export const loadMenu = () => {
  return http.request<any>('post', API.MENU_LOAD);
};

export const loadMenuAction = (menuId: number) => {
  return http.request<any>('post', API.MENU_ACTION, {
    data: {
      menuId,
    },
  });
};
