import { createApp } from 'vue';
import App from '@/App.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// fontawesome核心注册器 必须在appvue引入
import { library } from '@fortawesome/fontawesome-svg-core';

// 按需引入faicons
import faIcons from '@/constant/icon';

// 使用tailwindcss样式工具类
import 'tailwindcss/tailwind.css';

// 自定义全局样式
import './styles/index.scss';

// 全局浏览器顶部进度条
import 'nprogress/nprogress.css';

// 单独引入某个组件的样式
import 'element-plus/theme-chalk/src/message.scss';
import 'element-plus/theme-chalk/src/notification.scss';
import 'element-plus/theme-chalk/src/menu.scss';
import 'element-plus/theme-chalk/src/avatar.scss';
import './styles/custom_vars.scss';
import './styles/custom_tools.scss';
// 时间工具类 默认国际化
import 'dayjs/locale/en';
import router from '@/router';
import { createPinia } from 'pinia';
import '@/router/permission';
import useAuthStore from '@/store/modules/auth';
import useSettingStore from './store/modules/setting';

const app = createApp(App);
// 注册fontawesome
library.add(...faIcons);
app.component('font-awesome-icon', FontAwesomeIcon);
// 注册store
const pinia = createPinia();
app.use(pinia);
// 注册路由   !!必须在store前 否则会无权限跳转
app.use(router);
const authStore = useAuthStore();
const settingStore = useSettingStore();
// 自定义ep :root中全局变量
settingStore.initEpCSSProperty();
await authStore.init();
// 引入全局el-icon
// import * as ElementPlusIconsVue from '@element-plus/icons-vue';
// 注册el-icon
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component);
// }
app.mount('#app');
