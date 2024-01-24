import { http } from '@/utils/http';
import API from '../api';
import { GetDataBaseListResult } from './type';
export const getList = () => {
  return http.request<GetDataBaseListResult>('post', API.DATABASE_LIST);
};
