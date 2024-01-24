// callModelMethod(
//     options: DatasetCallRequestModel | DatasetCallKwRequestModel
//   ): Observable<any> {
//     if ('kwargs' in options) {
//       return this.apiService.post<any, DatasetCallKwRequestModel>(
//         '/dataset/call_kw',
//         options
//       );
//     } else {
//       return this.apiService.post<any, DatasetCallRequestModel>(
//         '/dataset/call',
//         options
//       );
//     }
//   }
import { http } from '@/utils/http';
import API from '../api';
import { DatasetCallKwRequestModel, DatasetCallRequestModel } from '@/constant/model';

export const callModelMethod = (options: DatasetCallRequestModel | DatasetCallKwRequestModel) => {
  if ('kwargs' in options) {
    return http.request('post', API.DATESET_CALL_KW, { data: options });
  } else {
    return http.request('post', API.DATESET_CALL, {
      data: options,
    });
  }
};
