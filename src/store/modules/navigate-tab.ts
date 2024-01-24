import { CommonUtil } from '@/utils';
import { defineStore } from 'pinia';
import camelcase from 'camelcase';
import * as snakeCase from 'to-snake-case';
const useNavigateTabStore = defineStore('navigateTab', {
  state: () => ({ tabComponents: {} }),
  actions: {
    // prasePythonToBoolean(condition: string, context: Object) {
    //   return this.praser.eval(condition, context);
    // },
    createTab(tab: any) {

    }
  },
});
export default useNavigateTabStore;
