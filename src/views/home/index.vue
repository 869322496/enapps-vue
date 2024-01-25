<template>
  <BaseHeader />
  <div class="main-container">
    <navigate-tab />
    <template v-for="(item, index) in tabStore.tabComponents" :key="index">
      <div :style="{ display: index === tabStore.currentTabIndex ? 'block' : 'none' }">
        <EnappsMain
          :options="item.componentOptions"
          :tab-id="item.id"
          :tab-title="item.tabTitle"
        ></EnappsMain>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import useNavigateTabStore from '@/store/modules/navigate-tab';
import EnappsMain from '@/views/main/index.vue';
const tabStore = useNavigateTabStore();
</script>

<style></style>
