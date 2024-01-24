import { FieldType, FilterOperators } from './enum';
export type Person = {
  name: string;
  age: number;
};
export type AdvancedConditionOptions = {
  text: string;
  value: FilterOperators;
  types: FieldType[];
};
export type ImageOptions = {
  model: string;
  id: number;
  field?: string;
  args?: object;
};
export type UserInfo = {
  companyId: Array<'string' | 'number'>;
  id: number;
  name: string;
};
export type Domain = (string | string[])[][];
