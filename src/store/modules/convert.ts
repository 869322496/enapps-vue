import { CommonUtil } from '@/utils';
import { defineStore } from 'pinia';
import camelcase from 'camelcase';
import * as snakeCase from 'to-snake-case';
const useConvertStore = defineStore('convert', {
  state: () => ({ camelCaseMapping: {} }),
  actions: {
    prasePythonToBoolean(condition: string, context: Object) {
      return this.praser.eval(condition, context);
    },
    toSnakeCase(fieldName: string): string {
      if (CommonUtil.matches(fieldName)) {
        return fieldName;
      }
      const key = fieldName.replace('_', '').replace('-', '').toLocaleLowerCase();
      return this.camelCaseMapping[key] || snakeCase(fieldName);
    },

    toCamelCase(fieldName: string): string {
      if (!fieldName) return fieldName;
      if (CommonUtil.matches(fieldName)) {
        return fieldName;
      }
      return camelcase(fieldName);
    },
    toSnakeCaseBatch<T>(obj: T): T {
      return CommonUtil.toSnakeCaseBatch(obj);
    },
    toCamelCaseBatch<T>(obj: T): T {
      return CommonUtil.toCamelCaseBatch(obj);
    },
  },
});
export default useConvertStore;
