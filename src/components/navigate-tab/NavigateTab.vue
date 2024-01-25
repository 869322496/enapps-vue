<template>
  <div class="navigate-tab">
    <div v-if="hasScrollbar" class="left button" :class="{ disabled: atStart }" @click="onLeft()">
      <span class="e-icons e-chevron-left"></span>
    </div>
    <div
      ref="tabInstance"
      class="items-container"
      @mousemove="onMouseMove"
      @mousedown="onMouseDown"
    >
      <div
        v-for="(item, i) in tabsService.tabComponents"
        :key="item.id"
        :class="{ active: tabsService.currentTabIndex === i }"
        class="item-container"
      >
        <div
          class="item"
          :class="{
            'tab-active': tabsService.currentTabIndex === i,
            unsaved: tabsService.changedTabs[item.id],
            active: tabsService.currentTabIndex === i,
          }"
          @contextmenu.prevent="onItemRemove(i)"
          @mouseup="onItemMouseUp($event, i)"
          @click="onItemClick(i)"
        >
          <div
            style="display: flex; align-items: center; justify-content: center"
            v-html="item.tabTitle"
          ></div>
          <i
            class="e-icons e-close navigate-close"
            title="Close"
            @click.prevent="onItemRemove(i)"
          ></i>
        </div>

        <div class="item-border"></div>
      </div>
    </div>
    <div v-if="hasScrollbar" class="right button" :class="{ disabled: atEnd }" @click="onRight">
      <span class="e-icons e-chevron-right"></span>
    </div>
    <div class="item-space" :class="{ 'no-border': !tabsService.tabComponents?.length }"></div>

    <!-- <div
      (click)="onLogoClick()"
      class="logo-container"
      [class.no-border]="(tabsService.componentRefs$ | async).length === 0"
    >
      <img [src]="companyLogoUrl$ | async" *ngIf="companyLogoUrl$ | async" />
    </div> -->
  </div>
</template>

<script setup lang="ts" name="NavigateTab">
import useNavigateTabStore from '@/store/modules/navigate-tab';
import { ref } from 'vue';
const tabsService = useNavigateTabStore();
const tabInstance = ref<HTMLDivElement>();
const atStart = ref(true);
const atEnd = ref(true);
const hasScrollbar = ref(false);
const scrollDistance = 100;
function onMouseMove(args) {}
function onMouseDown(args) {}
function onRight() {
  tabInstance.value.scrollTo({
    left: tabInstance.value.scrollLeft + scrollDistance,
    behavior: 'smooth',
  });
}
function onLeft() {
  tabInstance.value.scrollTo({
    left: tabInstance.value.scrollLeft - scrollDistance,
    behavior: 'smooth',
  });
}
function onItemRemove(i: number) {
  this.tabsService?.removeTab(i, () => {
    this.onScroll();
  });
}
function onItemMouseUp(event: MouseEvent, i: number) {
  if (event.button === 1) {
    // tabsService?.removeTab(i, () => {
    //   onScroll();
    // });
  }
}
function onItemClick(index: number) {
  if (tabsService.currentTabIndex === index) {
    return;
  }
  tabsService.changeTab({ index });
  // if (this.isDragging) {
  //   this.isDragging = false;
  //   console.log('dragging');
  //   return;
  // }
  // // if there is already an other item sticky need to reset
  // if (this.tabsService.currentTabIndex != index) {
  //   this.resetItemPostion(this.tabsService.currentTabIndex);
  // }
  // this.tabsService?.changeTab(index);
  // this.tabsService.currentTabIndex = index;
  // this.onScroll();
}
</script>

<style scoped lang="scss">
.no-border {
  border-bottom: unset !important;
}
.navigate-tab {
  display: flex;
  align-items: flex-end;
  margin: 10px;
  // padding: 0px 0px 0px 4px;
  // margin: 0 10px;
  // img {
  //   height: 50px;
  // }
  .button {
    height: 38px;
    font-size: 16px;
    color: #fff;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s ease;
    background: #e9ecef;
    color: #6c757d;
    display: flex;
    align-items: center;
    max-width: 28px;
    width: 100%;
    justify-content: center;
    border-bottom: 1px solid var(--ep-color-primary);
    .e-icons.e-chevron-left:before {
      font-size: 18px;
    }
    .e-icons.e-chevron-right:before {
      font-size: 18px;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
    &:hover:not(.disabled) {
      background: #dee2e6;
      color: #6c757d;
    }
  }

  .items-container {
    // flex: 1;
    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    .item-container {
      &.sticky {
      }
      padding: 0 3px;
      display: inline-block;
      height: 38px;
      position: relative;
      border-bottom: 1px solid var(--ep-color-primary);
      border-radius: 4px 4px 0 0;
    }
    .item {
      height: 38px;
      flex: none;
      transition:
        background-color 0.2s ease,
        color 0.2s ease;
      background-color: var(--ep-color-primary-transparent);
      border-radius: 4px 4px 0 0;
      border: 1px solid var(--ep-color-primary);
      border-bottom: 0;
      position: relative;
      display: flex;
      align-items: center;
      padding: 0 10px;
      font-size: 0.813rem;
      // font-family: 'Poppins', Arial, 'Lucida Grande', Helvetica, Verdana, sans-serif;
      cursor: pointer;
      i {
        font-size: 12px;
        margin-top: 3px;
      }
      // &:hover {
      //   color: var(--theme-color);
      // }
    }

    // .item.dragging {
    //   opacity: 0;
    // }
    .item-border {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: #fff;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.2s ease;
    }

    .item.active {
      // color: var(--theme-color);

      background: #ffffff;
    }
  }
  .item-space {
    flex: 1;
    border-bottom: 1px solid var(--ep-color-primary);
  }
  .items-container::-webkit-scrollbar {
    /* WebKit */
    width: 0;
    height: 0;
  }
}
.logo-container {
  height: 50px !important;
  width: 220px !important;
  border-bottom: 1px solid var(--ep-color-primary);
  img {
    object-fit: contain;
    cursor: pointer;
    height: 50px !important;
    width: 220px !important;
  }
}
.item-container:first-child {
  padding-left: 0px !important;
}
// .e-toolbar
//   .e-toolbar-items:not(.e-tbar-pos)
//   .e-hscroll-bar
//   .e-toolbar-item:first-child {
//   margin-left: 0px;
// }

.item-container:last-child {
  padding-right: 0px !important;
}
.navigate-close {
  margin-left: 5px;
  font-size: 12px;
  margin-top: 2px;
}
</style>
