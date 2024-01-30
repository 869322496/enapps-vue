<template>
  <!-- {{ tabTitle }} -->
  <div class="flex items-center px-3">
    <div class="flex items-center justify-center gap-3">
      <span
        v-for="(view, index) in options.views"
        :key="index"
        class="view-icon"
        :class="{ active: activeViewType === view[1] }"
        @click="onViewTypeChange(view[1])"
      >
        <font-awesome-icon :icon="ENAPPS_ICONS[view[1]]" />
      </span>
    </div>
    <SearchBar />
  </div>
</template>

<script setup lang="ts" name="EnappsMain">
import { ENAPPS_ICONS, MainOptionsModel, ViewType } from '@/constant';
import { onBeforeMount, ref } from 'vue';
import SearchBar from './search-bar/index.vue';
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
const activeViewType = ref<ViewType>(ViewType.List);
onBeforeMount(() => {
  const defaultViewType = getDefaultViewType();
  console.log(defaultViewType);
});
function onViewTypeChange(type: ViewType) {
  activeViewType.value = type;
}
function getDefaultViewType(): ViewType {
  let defaultViewType;
  if (options.flags?.defaultView) {
    return options.flags?.defaultView as ViewType;
  }
  if (options.defaultAction && options.defaultAction.quickCreate) {
    return options.viewType as ViewType;
  }
  if (options.viewMode) {
    if (options.viewMode?.includes(',')) {
      defaultViewType = options.viewMode.split(',')[0];
      if (options.views[0][0]) {
        const viewsDefault = options.views[0][1] as ViewType;
        defaultViewType = viewsDefault;
      }
    } else {
      defaultViewType = options.viewMode;
    }
  } else if (options.viewType) {
    defaultViewType = options.viewType;
  } else {
    defaultViewType = options.views[0][1] as ViewType;
  }

  if (defaultViewType === ViewType.Tree) {
    defaultViewType = ViewType.List;
  }
  // if (options.isFirstLoad) {
  //   const { viewType } = routerService.getQueryParams();
  //   if (viewType) {
  //     defaultViewType = viewType;
  //   }
  // }
  return defaultViewType;
}
</script>

<style scoped lang="scss">
@mixin active-view-type {
  color: var(--ep-color-primary);
}
.view-icon {
  cursor: pointer;
  &.active {
    @include active-view-type;
  }
  &:hover {
    @include active-view-type;
  }
}
</style>
