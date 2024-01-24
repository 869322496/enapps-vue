import { defineStore } from 'pinia';
import { useChangeColor } from '@/utils';
import { ref } from 'vue';
import { useStorage } from '@vueuse/core';
import defaultSettings from '@/settings';
const { getLightColor, getDarkColor } = useChangeColor();
const useSettingStore = defineStore('setting', () => {
  // state
  const themeColors = ref<string[]>([
    '#409EFF',
    '#304156',
    '#11a983',
    '#13c2c2',
    '#6959CD',
    '#f5222d',
  ]);
  const themeColor = useStorage<string>('themeColor', defaultSettings.themeColor);

  // actions
  function changeThemeColor(color: string) {
    document.documentElement.style.setProperty('--ep-color-primary', color);
    document.documentElement.style.setProperty(
      '--ep-color-primary-dark-2',
      `${getDarkColor(color, 0.1)}`
    );
    for (let i = 1; i <= 9; i++) {
      document.documentElement.style.setProperty(
        `--ep-color-primary-light-${i}`,
        `${getLightColor(color, i / 10)}`
      );
    }
    changeSetting({ key: 'themeColor', value: color });
  }

  function changeSetting(param: { key: string; value: any }) {
    const { key, value } = param;
    switch (key) {
      case 'themeColor':
        themeColor.value = value;
        break;
      default:
        break;
    }
  }
  function initEpCSSProperty() {
    // document.documentElement.style.setProperty('--ep-menu-item-height', ' 60px');
    // document.documentElement.style.setProperty('--ep-menu-base-level-padding', '13px');
    // document.documentElement.style.setProperty('--ep-menu-bg-color', 'var(--ep-color-primary)');
    // document.documentElement.style.setProperty('--ep-menu-text-color', '#fff');
    // document.documentElement.style.setProperty('   --ep-menu-hover-text-color', '#000');
  }
  return {
    themeColors,
    themeColor,
    changeThemeColor,
    changeSetting,
    initEpCSSProperty,
  };
});

export default useSettingStore;
