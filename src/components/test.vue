<template>
  <div>
    <h1>{{ name }}</h1>
    <h1>{{ person.age }}</h1>
    {{ personAge }}
  </div>
  <div v-for="item in persons">
    {{ item.name }}
  </div>
  <button @click="changeName">change name</button>
  <button @click="changeAge">Add age</button>
  <button @click="changePerson">changePerson</button>
  <button @click="addPerson">addPerson</button>
</template>

<script setup lang="ts" name="Test">
import { Person } from '@/constant/types';
import { reactive } from 'vue';
import { toRef } from 'vue';
import { computed } from 'vue';
import { watch } from 'vue';
import { ref } from 'vue';
import { onBeforeMount } from 'vue';
import { onUnmounted } from 'vue';
const person = reactive<Person>({ name: 'louis', age: 11 });
const name = toRef(person, 'name');
const persons = reactive<Person[]>([
  { name: '111', age: 1 },
  { name: '222', age: 2 },
]);
function changeName() {
  person.name += '~';
}
function changeAge() {
  person.age += 1;
}
function changePerson() {
  Object.assign(person, { name: 'kris', age: 33 });
}
const personAge = computed(() => {
  return person.age + 1 + 'aaaa';
});
function addPerson() {
  // persons = [...persons, { name: '333', age: 3 }];
  persons.unshift({ name: '333', age: 3 });
}
const personWatch = watch([() => person.name, () => person.age], (newVal, oldVal) => {
  console.log(newVal, oldVal);
});
onBeforeMount(() => {
  console.log('onBeforeMount');
});
onUnmounted(() => {
  console.log('onUnmounted');
});
defineExpose({ person: person, name: name.value });
</script>

<style lang="scss" scoped></style>
@/constant/types
