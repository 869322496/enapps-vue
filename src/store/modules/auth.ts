import { callModelMethod } from '@/api/dataset';
import { authenticate, getSessionInfo, logout } from '@/api/session';
import { AuthenticateRequestPayload, AuthenticateResponsePayload } from '@/api/session/type';
import {
  INSTANCE_NAME,
  LOGIN_PASSWORD_INCORRECT_MESSAGE,
  LOGIN_SUCCESS_MESSAGE,
} from '@/constant/data';
import { DatasetCallKwRequestModel } from '@/constant/model';
import { RouterEnum } from '@/router/routes';
import { ElMessage, ElNotification } from 'element-plus';
import { defineStore } from 'pinia';
type AuthState = {
  sessionId: string;
  auth: AuthenticateResponsePayload;
  userInfo: UserInfo;
  companyId: number;
};
import router from '@/router';
import { CookieUtil } from '@/utils';
import { UserInfo } from '@/constant';
import useMenuStore from './menu';

const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    sessionId: '',
    auth: null,
    userInfo: null,
    companyId: null,
  }),
  getters: {
    username: state => state.userInfo?.name || '',
    companyName: state => {
      if (state.userInfo?.companyId?.length === 0) return '';
      return state.userInfo?.companyId[1] || '';
    },
    companyList: state => {
      return state.auth?.companyNames || [];
    },
    dbName: state => state?.auth?.db || '',
  },
  actions: {
    setDb(db: string) {
      this.db = db;
    },
    async init() {
      try {
        const authInfo = await getSessionInfo();
        this.auth = authInfo;
        // session not expired
        if (authInfo?.uid) {
          await this.loadUserInfo(authInfo.uid);
        } else {
          this.logout(true);
          // session expired and  need to login
        }
        const menuStore = useMenuStore();
        await menuStore.loadMenus();
      } catch (e) {}
    },
    async loadUserInfo(id: number) {
      const options: DatasetCallKwRequestModel = {
        model: 'res.users',
        method: 'read',
        kwargs: {},
        args: [id, ['name', 'company_id']],
      };
      const userInfo: UserInfo = (await callModelMethod(options)) as UserInfo;
      this.userInfo = userInfo;
      if (userInfo?.companyId?.length === 0) return;
      this.companyId = userInfo.companyId[0];
    },

    async login(data: AuthenticateRequestPayload) {
      try {
        const res = await authenticate(data);
        if (!res.uid) {
          ElMessage.error(LOGIN_PASSWORD_INCORRECT_MESSAGE);
          return false;
        } else {
          this.auth = res;
          CookieUtil.setCookie(`${INSTANCE_NAME}|session_id`, this.auth.sessionId);
          await this.init();
          ElNotification.success(LOGIN_SUCCESS_MESSAGE);
          router.replace({ name: RouterEnum.home });
          return true;
        }
      } catch (e) {
        return false;
      }
    },

    async logout(force?: boolean) {
      try {
        force || (await logout());
        this.$reset();
        router
          .push({ name: RouterEnum.login })
          .then()
          .catch(err => {
            console.log(err);
          });
        CookieUtil.deleteInstanceSessionId();
        CookieUtil.deleteCookie('sessionid');
      } catch (e) {
        return false;
      }
    },
  },
});
export default useAuthStore;
