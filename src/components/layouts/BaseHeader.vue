<template>
  <div class="flex items-center justify-between bg-primary">
    <header-menu ref="menuRef" class="flex-1"></header-menu>

    <header-setting ref="settingRef"></header-setting>
    <!-- <button>
      <i inline-flex i="dark:ep-moon ep-sunny" />
    </button> -->
  </div>
</template>
<script lang="ts" setup name="BaseHeader">
import { toggleDark } from '@/composables/dark';
import { onMounted, onUnmounted, ref } from 'vue';
const menuRef = ref(null);
const settingRef = ref(null);

onMounted(() => {
  const updateMaxWidth = () => {
    if (menuRef.value && settingRef.value) {
      const settingWidth = settingRef.value.$el.getBoundingClientRect().width;
      menuRef.value.$el.style.maxWidth = `${window.innerWidth - settingWidth}px`;
    }
  };

  window.addEventListener('resize', updateMaxWidth);
  updateMaxWidth();

  onUnmounted(() => {
    window.removeEventListener('resize', updateMaxWidth);
  });
});
</script>
<style lang="scss" scoped>
:deep(.ep-menu--horizontal.ep-menu) {
  border-bottom: unset;
}
</style>
