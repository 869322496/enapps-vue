import { CommonUtil } from '@/utils';
import { defineStore } from 'pinia';
import camelcase from 'camelcase';
import * as snakeCase from 'to-snake-case';
import { TabComponentItem } from '@/constant/model';
const useNavigateTabStore = defineStore('navigateTab', {
  state: (): { tabComponents: TabComponentItem[] } => ({ tabComponents: [] }),
  actions: {
    createTab(tab: { tabTitle: string; componentOptions: Object; changeToNewTab: boolean }) {
      const { tabTitle, componentOptions, changeToNewTab } = tab;
      const newTabId = CommonUtil.uuid();
      this.tabComponents.push({
        id: newTabId,
        tabTitle,
        componentOptions,
      });
    },
  },
});
export default useNavigateTabStore;
