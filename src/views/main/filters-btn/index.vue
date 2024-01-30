<template>
  <el-dropdown ref="dropDownMenu" :trigger="'click'" :hide-on-click="false">
    <el-button type="primary">
      Filters<el-icon class="el-icon--right"><arrow-down /></el-icon>
    </el-button>
    <template #dropdown>
      <div class="filters-dropdown">
        <div class="header">Filters</div>
        <div class="header">Actions</div>
        <div v-for="item in actions" :key="item.value" class="item">{{ item.label }}</div>
      </div>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts" name="FiltersBtn">
import { FilterActions } from '@/constant';
import { ArrowDown } from '@element-plus/icons-vue';

const actions = Object.entries(FilterActions).map(([key, value]) => ({
  label: key,
  value: value,
}));
</script>
<style scoped lang="scss">
$border-color: var(--ep-border-color);
.filters-dropdown {
  .header {
    height: 35px;
    border-bottom: 1px solid $border-color;
    line-height: 35px;
    text-align: center;
    font-size: 15px;
    background: #f8f9fa;
    color: var(--ep-color-primary);
    font-weight: bold;
  }
  .item {
    height: 30px;
    line-height: 30px;
    text-align: left;
    border-bottom: 1px solid $border-color;
    padding: 0 10px;
    &:hover {
      cursor: pointer;
      background-color: var(--ep-color-primary-light-9);
    }
    &:last-of-type {
      border-bottom: unset;
    }
  }
}
</style>
