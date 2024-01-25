<template>
  <BaseHeader />
  <div class="main-container">
    <navigate-tab />
    <Main></Main>
    <!-- <BaseSide /> -->
    <!-- <div class="w-full py-4">
      <Logos class="my-4" />
      <HelloWorld :msg="'Hello Vue 3 + Element Plus + Vite'" />
    </div> -->
  </div>
</template>

<script setup lang="ts">
import Main from '@/views/main/index.vue';
</script>

<style></style>
