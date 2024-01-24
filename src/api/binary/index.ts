import { http } from '@/utils/http';
import API from '../api';
import { LoadBinaryImageRequestModel } from './type';
export const getImage = (params: LoadBinaryImageRequestModel) => {
  return http.request<Blob>('get', API.BINARY_IMAGE, { params, responseType: 'blob' });
};
