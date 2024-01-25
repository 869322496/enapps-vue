<template>
  <el-menu-item v-if="!menu.children.length" :index="menu.id?.toString()" class="justify-between">
    <div class="menu-title-container">
      <font-awesome-icon v-if="menu.icon && !!menu.parentId" :icon="menu.icon" class="menu-icon" />
      {{ menu.name }}
    </div>
    <font-awesome-icon v-if="menu.quickCreate" :icon="'fa-solid fa-plus'" class="menu-icon" />
  </el-menu-item>
  <el-sub-menu v-else :index="menu.id?.toString()">
    <template #title>
      <div class="menu-title-container">
        <font-awesome-icon
          v-if="menu.icon && !!menu.parentId"
          :icon="menu.icon"
          class="menu-icon"
        />
        {{ menu.name }}
      </div>
      <font-awesome-icon v-if="menu.quickCreate" :icon="'fa-solid fa-plus'" class="menu-icon" />
    </template>
    <header-menu-item
      v-for="(item, index) in menu.children"
      :key="index"
      :menu="item"
      class="justify-between"
    ></header-menu-item>
  </el-sub-menu>
</template>

<script setup lang="ts" name="MenuItem">
import { MenuEntity } from '@/constant/model';
import { DEFAULT_ICON, MENU_ICON } from '@/constant';
import { onBeforeMount } from 'vue';
const { menu } = withDefaults(defineProps<{ menu: MenuEntity }>(), {
  menu: null,
});
</script>
<style lang="scss" scoped>
.menu-icon {
  width: 20px;
}
.menu-title-container {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.875rem;

  // color: #fff;
  // &:hover {
  //   color: #000;
  // }
}
// :deep(.ep-menu--horizontal > .ep-sub-menu .ep-sub-menu__title:hover) {
//   background-color: inherit !important;
// }
// :deep(.ep-sub-menu__title) {
//   &:hover {
//     background-color: inherit !important;
//   }
// }
</style>
