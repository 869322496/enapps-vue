<template>
  <div class="flex items-center bg-primary">
    <header-menu-filter></header-menu-filter>
    <span class="username">{{ authStore.companyName }} ({{ authStore.username }})</span>
    <el-dropdown ref="dropDownMenu" :trigger="'click'" :hide-on-click="false">
      <el-avatar :size="40" :src="circleUrl" />
      <template #dropdown>
        <el-dropdown-menu>
          <div class="company-name">{{ authStore.companyName }}({{ authStore.dbName }})</div>
          <el-dropdown-item>
            <font-awesome-icon icon="fa-solid fa-home" class="setting-menu-icon" /> Home
          </el-dropdown-item>
          <el-dropdown-item>
            <font-awesome-icon icon="fa-solid fa-home" class="setting-menu-icon" /> Perfences
          </el-dropdown-item>
          <el-dropdown-item>
            <font-awesome-icon icon="fa-solid fa-home" class="setting-menu-icon" />
            <div class="setting-menu-name">Change Company</div>
            <el-select
              v-if="authStore.companyList?.length"
              v-model="authStore.companyId"
              class="ml-2"
              placeholder="Select"
              style="min-width: 100px"
            >
              <el-option
                v-for="item in authStore.companyList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-dropdown-item>
          <el-dropdown-item>
            <font-awesome-icon icon="fa-solid fa-home" class="setting-menu-icon" /> Manage Callouts
          </el-dropdown-item>
          <el-dropdown-item>
            <font-awesome-icon icon="fa-solid fa-home" class="setting-menu-icon" /> Contrast
          </el-dropdown-item>
          <el-dropdown-item @click="onSelected('Font weight')">
            <font-awesome-icon icon="fa-solid fa-home" class="setting-menu-icon" /> Font weight
          </el-dropdown-item>
          <el-dropdown-item>
            <font-awesome-icon icon="fa-solid fa-home" class="setting-menu-icon" /> Callouts Theme
          </el-dropdown-item>
          <el-dropdown-item @click="onSelected(AvatarMenuItemsName.Themes)">
            <div class="w-full">
              <div class="setting-menu-item">
                <font-awesome-icon icon="fa-solid fa-home" class="setting-menu-icon" />
                <div class="setting-menu-name">Themes</div>
                <div
                  class="theme-indictor"
                  :style="{ backgroundColor: settingsStore.themeColor }"
                ></div>
              </div>
              <div v-if="isThemeChooserShow">
                <el-divider />
                <div class="theme-chooser-container">
                  <div
                    v-for="(themeItem, index) in settingsStore.themeColors"
                    :key="index"
                    :style="{ backgroundColor: themeItem }"
                    class="theme-color-item"
                    @click.stop="settingsStore.changeThemeColor(themeItem)"
                  ></div>
                </div>
              </div>
            </div>
          </el-dropdown-item>
          <el-dropdown-item>
            <font-awesome-icon icon="fa-solid fa-home" class="setting-menu-icon" /> Switch to old UI
          </el-dropdown-item>
          <el-dropdown-item>
            <font-awesome-icon icon="fa-solid fa-home" class="setting-menu-icon" /> About
          </el-dropdown-item>
          <el-dropdown-item @click="onSelected(AvatarMenuItemsName.LogOut)">
            <font-awesome-icon icon="fa-solid fa-home" class="setting-menu-icon" /> Log out
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts" name="BaseHeaderSetting">
import { AVATAR_REQUEST_OPTIONS, AvatarMenuItemsName, ImageOptions } from '@/constant';
import useAuthStore from '@/store/modules/auth';
import { CookieUtil } from '@/utils';
import { onMounted, ref } from 'vue';
import { getImage } from '@/api/binary';
import { LoadBinaryImageRequestModel } from '@/api/binary/type';
import useSettingStore from '@/store/modules/setting';

import { DropdownInstance } from 'element-plus';
const authStore = useAuthStore();
const settingsStore = useSettingStore();
const isThemeChooserShow = ref(false);
const circleUrl = ref('');
const dropDownMenu = ref(null);

onMounted(() => {
  settingsStore.changeThemeColor(settingsStore.themeColor); // 设置主题颜色
  if (authStore?.auth?.uid) {
    loadImage({ ...AVATAR_REQUEST_OPTIONS, id: authStore.auth.uid }).then(res => {
      circleUrl.value = URL.createObjectURL(res);
    });
  }
});

function onSelected(e) {
  switch (e) {
    case AvatarMenuItemsName.Home:
      window.location.href = window.location.origin + '/?';
      break;
    case AvatarMenuItemsName.Preferences:
      // this.openPreferences();
      break;
    case AvatarMenuItemsName.ManageCallouts:
      // this.authFacade.auth$.pipe(take(1)).subscribe(({ shortcuts }) => {
      //   const menuId: number = shortcuts.find(item => item.menuId)?.menuId;
      //   if (menuId) {
      //     this.menuFacade.loadMenuAction({ resId: menuId });
      //   }
      //   this.avatarMenu.toggle();
      // });

      // this.menuFacade.allMenu$.pipe(take(1)).subscribe(res => {
      //   const calloutMenu = res.find(
      //     e =>
      //       e?.action?.resModel === 'ir.ui.view_shortcut_alert' ||
      //       e?.name?.indexOf('Callouts') > -1
      //   );
      //   // e => e?.action?.resModel === 'ir.ui.view_shortcut_alert'
      //   if (calloutMenu) {
      //     this.menuFacade.loadMenuAction(calloutMenu);
      //   }
      // });
      break;
    case AvatarMenuItemsName.Themes:
      isThemeChooserShow.value = !isThemeChooserShow.value;
      break;
    case AvatarMenuItemsName.About:
      break;
    case AvatarMenuItemsName.Switch:
      window.open(this.webBaseUrl, '_blank');
      break;
    case AvatarMenuItemsName.LogOut:
      dropDownMenu.value.handleClose();
      authStore.logout();
      break;
  }
}
function loadImage(options: ImageOptions): Promise<Blob> {
  const timeStamp = new Date().getTime();

  let params: LoadBinaryImageRequestModel = {
    session_id: CookieUtil.getInstanceSessionId(),
    model: options.model,
    id: options.id,
    field: options.field,
    t: timeStamp,
  };

  if (options?.args) {
    for (const [key, value] of Object.entries(options.args)) {
      params = { ...params, [key]: `${value}` };
    }
  }

  return getImage(params);
}
</script>

<style lang="scss" scoped>
.ep-divider--horizontal {
  margin: 10px 0;
}
.theme-indictor {
  width: 50px;
  height: 20px;
  border-radius: 5px;
}
.theme-chooser-container {
  display: flex;
  align-items: center;
  padding: 5px;
  justify-content: space-between;

  .theme-color-item {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 5px;
  }
}
.setting-menu-item {
  display: flex;
  align-items: center;
}
.setting-menu-name {
  flex: 1;
}
.setting-menu-icon {
  margin-right: 5px;
}
:deep(.ep-avatar--circle) {
  min-width: 40px;
}
.company-name {
  text-align: center;
  font-size: 14px;
  margin: 0px 10px;
}
.username {
  margin: 0 10px;
  white-space: nowrap;
}
</style>
