<template>
  <!-- import el component css and config -->
  <el-config-provider namespace="ep">
    <router-view></router-view>
  </el-config-provider>
</template>
<script setup lang="ts"></script>
<style>
.main-container {
  height: calc(100vh - var(--ep-menu-item-height));
}
</style>
