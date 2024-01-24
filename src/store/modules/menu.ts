import { MenuEntity } from '@/constant/model';
import { defineStore } from 'pinia';
import { loadMenu } from '@/api/menu/index';
import _ from 'lodash';
import { CommonUtil } from '@/utils';
import { DEFAULT_ICON, MENU_ICON } from '@/constant';
import { toRaw } from 'vue';
const useMenuStore = defineStore('menu', {
  state: (): { menus: MenuEntity[]; flattenMenus: MenuEntity[] } => ({
    menus: [],
    flattenMenus: [],
  }),
  getters: {},
  actions: {
    async loadMenus() {
      const res = await loadMenu();
      this.menus = res.data.children;
      const getMenuIcon = ({ icon, name }: MenuEntity) => {
        if (MENU_ICON[icon] && icon) {
          return MENU_ICON[icon] || DEFAULT_ICON;
        } else {
          console.warn(`missng the icon map: ${name} --- ${icon}`);
          return DEFAULT_ICON;
        }
      };
      this.flattenMenus = CommonUtil.flattenTree<MenuEntity>(toRaw(this.menus), 'parentId');
      const menuArr = this.flattenMenus.map(item => ({
        ...item,
        icon: getMenuIcon(item),
        parentId: item.parentId ? item.parentId[0] : false,
        children: [],
      }));
      this.menus = CommonUtil.toTree<MenuEntity>(menuArr, 'parentId');
    },
  },
});
export default useMenuStore;
