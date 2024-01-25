<template>{{ tabTitle }}</template>

<script setup lang="ts" name="EnappsMain">
import { MainOptionsModel } from '@/constant/model';

interface MainProps {
  options: MainOptionsModel;
  tabId: string;
  tabTitle: string | HTMLElement;
}

const { options, tabId, tabTitle } = withDefaults(defineProps<MainProps>(), {
  options: () => ({
    id: 0,
    name: '',
    resModel: '',
    views: [],
    searchViewId: [0, ''],
    context: {},
    viewType: '',
    recordId: 0,
    recordIds: [],
    parentContext: {},
    defaultAction: {},
    target: '',
    type: '',
    flags: {},
    viewMode: '',
    domain: [],
    isFirstLoad: false,
    bomStructure: false,
    isDevelopMode: false,
  }),
});
</script>

<style></style>
