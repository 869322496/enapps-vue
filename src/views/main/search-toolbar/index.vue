<template>
  <div class="search-toolbar">
    <div class="btn"><font-awesome-icon icon="fa-solid fa-star" /></div>
    <div class="btn"><font-awesome-icon icon="fa-solid fa-filter" /></div>
    <div class="btn"><font-awesome-icon icon="fa-solid fa-search" /></div>
    <div class="btn"><font-awesome-icon icon="fa-solid fa-circle-xmark" /></div>
  </div>
</template>
<script setup lang="ts" name="SearchToolbar"></script>
<style scoped lang="scss">
.search-toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
  .btn {
    border: 1px solid #ccc;
    width: 32px;
    box-sizing: border-box;
    display: flex;
    height: 32px;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-size: 12px;
    transition: color 0.2s;
    &:hover {
      cursor: pointer;
      color: var(--ep-color-primary);
    }
  }
}
</style>
