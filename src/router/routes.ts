import { RouteRecordRaw } from 'vue-router';

export enum RouterEnum {
  login = '/login',
  home = '/home',
  notFound = '/404',
}

export const Routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: RouterEnum.login,
    component: () => import('@/views/login/login.vue'),
  },
  {
    path: '/',
    name: RouterEnum.home,
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/404',
    name: RouterEnum.notFound,
    component: () => import('@/views/404/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any',
  },
];
