<template>
  <el-input
    v-model="keyword"
    placeholder="please search menu"
    size="default"
    clearable
    :prefix-icon="Search"
  ></el-input>
</template>

<script setup lang="ts" name="HeaderMenuFilter">
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
const keyword = ref('');
</script>

<style scoped lang="scss">
$input-width: 100px;
@mixin activeStyles {
  .ep-input__inner {
    padding-left: 8px;
  }
}
.ep-input {
  max-width: 150px;
}

:deep(.ep-input__icon) {
  margin-right: 0px !important;
}
:deep(.ep-input__wrapper) {
  border-radius: 50px;
  height: 34px;
  transition: width 0.3s ease;
  width: 14px;
  &:hover {
    width: 150px;
    @include activeStyles;
  }
}
</style>
