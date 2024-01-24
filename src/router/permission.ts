import router from '@/router';
import { ElMessage } from 'element-plus';
import { RouterEnum } from '@/router/routes';
import { CookieUtil } from '@/utils';
router.beforeEach((to, from) => {
  if (!CookieUtil.getInstanceSessionId() && to.name !== RouterEnum.login) {
    // ElMessage({
    //   type: 'info',
    //   message: '请先登录',
    // });
    return { name: RouterEnum.login };
  }
});
// router.afterEach((to, from) => {})
