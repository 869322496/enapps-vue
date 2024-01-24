<template>
  <el-menu
    mode="horizontal"
    :menu-trigger="'click'"
    :unique-opened="true"
    :close-on-click-outside="true"
    @select="onMenuSelect"
  >
    <!-- <el-sub-menu v-for="(item, index) in menuStore.menuList" :key="item.id" :index="`${index}`">
      <template #title>{{ item.name }}</template>
    </el-sub-menu> -->
    <header-menu-item
      v-for="item in menuStore.menuList"
      :key="item.id"
      :menu="item"
    ></header-menu-item>
  </el-menu>
</template>

<script setup lang="ts" name="HeaderMenu">
import useMenuStore from '@/store/modules/menu';
import { ref } from 'vue';
const menuStore = useMenuStore();
function onMenuSelect(args, a, b) {}
</script>

<style scoped lang="scss">
// .ep-menu {
//   background-color: var(--ep-color-primary);
// }
.ep-menu--horizontal.ep-menu {
  background-color: var(--ep-color-primary);
  max-width: 70vw !important;
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
