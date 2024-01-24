import { MenuEntity } from '@/constant/model';
import { defineStore } from 'pinia';
import { loadMenu } from '@/api/menu/index';
import _ from 'lodash';
import { CommonUtil } from '@/utils';
import { DEFAULT_ICON, MENU_ICON } from '@/constant';
import { toRaw } from 'vue';
const useMenuStore = defineStore('menu', {
  state: (): { menus: MenuEntity[] } => ({
    menus: [],
  }),
  getters: {
    menuList: state => {
      const getMenuIcon = ({ icon, name }: MenuEntity) => {
        if (MENU_ICON[icon] && icon) {
          return MENU_ICON[icon] || DEFAULT_ICON;
        } else {
          console.warn(`missng the icon map: ${name} --- ${icon}`);
          return DEFAULT_ICON;
        }
      };
      const menuArr = CommonUtil.flattenTree<MenuEntity>(toRaw(state.menus), 'parentId').map(
        item => ({
          ...item,
          icon: getMenuIcon(item),
          parentId: item.parentId ? item.parentId[0] : false,
          children: [],
        })
      );
      const result = CommonUtil.toTree<MenuEntity>(menuArr, 'parentId');
      return result;
    },
  },
  actions: {
    async loadMenus() {
      const res = await loadMenu();
      this.menus = res.data.children;
      console.log(this.menus);
    },
  },
});
export default useMenuStore;
