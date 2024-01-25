import { CommonUtil } from '@/utils';
import { defineStore } from 'pinia';
import camelcase from 'camelcase';
import * as snakeCase from 'to-snake-case';
import { TabComponentItem } from '@/constant/model';
export interface TabState {
  currentTabIndex: number;
  currentTabId: string;
  tabComponents: TabComponentItem[];
  changedTabs: string[];
}
const useNavigateTabStore = defineStore('navigateTab', {
  state: (): TabState => ({
    changedTabs: [],
    tabComponents: [],
    currentTabIndex: -1,
    currentTabId: '',
  }),
  actions: {
    createTab(tab: { tabTitle: string; componentOptions: Object; changeToNewTab?: boolean }) {
      const { tabTitle, componentOptions, changeToNewTab = true } = tab;
      const newTabId = CommonUtil.uuid();
      const preTabIndex = this.currentTabIndex;
      const newTabIndex = this.tabComponents.length;
      this.tabComponents.push({
        id: newTabId,
        tabTitle,
        componentOptions,
      });
      if (changeToNewTab) {
        this.currentTabIndex = newTabIndex;
        this.currentTabId = newTabId;
        this.setCurrentTabId();
        // this.afterOpenInNewTab$.next(newTabId);
      } else {
      }
    },
    changeTab(option: { index?: number; id?: string }) {
      const { index, id } = option;
      if (index != -1) {
        this.currentTabIndex = index;
      }
      if (id) {
        this.currentTabId = id;
      }
      this.setCurrentTabId();
    },
    setCurrentTabId() {
      // if (this.tabsWithTitles[this.currentTabId]) {
      //   this.titleService.setTitle(this.tabsWithTitles[this.currentTabId]);
      // }
      // if (this.tabsWithUrl[this.currentTabId]) {
      //   window.history.pushState(null, '', this.tabsWithUrl[this.currentTabId]);
      // }
      // this.setTabUnsavedStatus();
      // e.selectedItem.querySelector('.e-icons').classList.remove('unsaved');
      // e.selectedItem.classList.remove('unsaved');
      // this.tabInstanceIdChange$.next(this.currentTabId);
    },
  },
});
export default useNavigateTabStore;
