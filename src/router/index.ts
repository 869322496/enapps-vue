import { createRouter, createWebHashHistory } from 'vue-router';
import { Routes } from './routes';

const router = createRouter({
  history: createWebHashHistory(),
  routes: Routes,
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
});

export default router;
