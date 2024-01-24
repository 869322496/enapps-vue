<template>
  <img class="company-logo" src="@/assets/images/enapps-logo.png" />
  <el-form
    ref="formTpl"
    class="login-form"
    :label-position="'top'"
    :model="form"
    :inline="false"
    :size="'large'"
  >
    <el-form-item label="Select database">
      <el-select v-model="form.db" :placeholder="'Database'" class="db-select">
        <el-option
          v-for="item in dbList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Login">
      <el-input v-model="form.login"></el-input>
    </el-form-item>
    <el-form-item label="Password">
      <el-input v-model="form.password" type="password" show-password></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="submit-btn" :loading="loading" @click="onSubmit">
        Log in
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts" name="Login">
import { reactive, ref, onMounted } from 'vue';
import { getList } from '@/api/database';
import { toRaw } from 'vue';
import useAuthStore from '@/store/modules/auth';
const formTpl = ref();
const dbList = ref<{ value: string; label: string }[]>([]);
const form = reactive({
  login: '',
  password: '',
  db: '',
});
const authStore = useAuthStore();
const loading = ref(false);
onMounted(() => {
  initDatabse();
});
async function initDatabse() {
  try {
    const res = await getList();
    dbList.value = res.dbList.map(item => ({ label: item, value: item }));
    if (dbList.value.length) {
      form.db = dbList.value[0].value;
    }
  } catch (e) {}
}
async function onSubmit() {
  try {
    loading.value = true;
    const res = await authStore.login(toRaw(form));
  } catch (e) {
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped lang="scss">
.login-form {
  max-width: 500px;
  min-width: 245px;
  margin: 0 auto;
  border: 0.5px solid #bebebe;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.36);
  padding: 20px;
  background: #f9f9f9;
  width: 100%;
}
.submit-btn {
  width: 100%;
  margin-top: 10px;
}
.company-logo {
  height: 60px;
  margin: 0 auto;
  margin-bottom: 20px;
  margin-top: 5vh;
  display: block;
}
.db-select {
  width: 100%;
}

:deep(.ep-form-item__label) {
  margin-bottom: 5px !important;
  font-weight: 500;
}
:deep(.ep-form-item--large) {
  margin-bottom: 10px;
}
</style>
@/store/auth
