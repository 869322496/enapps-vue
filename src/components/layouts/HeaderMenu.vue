<template>
  <el-menu
    mode="horizontal"
    :menu-trigger="'click'"
    :unique-opened="true"
    :ellipsis="false"
    :close-on-click-outside="true"
    @select="onMenuSelect"
  >
    <header-menu-item
      v-for="item in menuStore.menus"
      :key="item.id"
      :menu="item"
    ></header-menu-item>
  </el-menu>
</template>

<script setup lang="ts" name="HeaderMenu">
import useMenuStore from '@/store/modules/menu';
import { ref } from 'vue';
import { loadMenuAction } from '@/api/menu';
import { ViewType } from '@/constant';
import { ActionLoadModel } from '@/constant/model';
import { userOpenView } from '@/hooks';
const menuStore = useMenuStore();
const openViewService = userOpenView();
async function onMenuSelect(menuId: string) {
  const selectedMenu = menuStore.flattenMenus.find(item => `${item.id}` === `${menuId}`);
  const quickCreate = false;
  const action: any = {
    menuId,
    quickCreate,
    domain: [],
  };
  const res = await loadMenuAction(Number(menuId));
  let [[, , menuAction]] = res.action as [[any, any, menuAction: ActionLoadModel]];
  if (action.viewMode && action.isShortcut) {
    menuAction = { ...menuAction, viewMode: action.viewMode };
  }
  let options = {
    ...menuAction,
    domain: [...(menuAction.domain || []), ...action.domain],
    defaultAction: {
      isShortCut: action.isShortcut,
      context: action.context,
      quickCreate: action.quickCreate,
      calloutDomain: action.calloutDomain,
      shortcutType: action.shortcutType,
      sort: action.sort,
    },
  };
  // if (action.menuAction.defaultAction?.quickCreate) {
  //   options = { ...options, viewType: ViewType.Form };
  // }
  options = { ...options, actionMenuId: action.menuId };
  openViewService.openNewView(options);
}
</script>

<style scoped lang="scss">
.ep-menu--horizontal.ep-menu {
  background-color: var(--ep-color-primary);
  font-weight: 500;
  overflow-x: auto;
  // white-space: nowrap;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}

:deep(.ep-menu--horizontal.ep-menu .ep-sub-menu .ep-sub-menu__title) {
  color: #fff;
  &:hover {
    background-color: var(--ep-color-primary);
    color: #000;
  }
}
:deep(.ep-sub-menu.is-active .ep-sub-menu__title) {
  color: #fff;
}

.ep-menu--horizontal .ep-sub-menu .ep-sub-menu__title .ep-icon {
  display: none !important;
}
</style>
