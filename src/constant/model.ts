import { Domain } from './types';

export interface DatasetCallRequestModel {
  model: string;
  method: string;
  args: any[];
  domainId?: number | null;
  contextId?: number | null;
  sessionId?: string;
}

export interface DatasetCallKwRequestModel extends DatasetCallRequestModel {
  kwargs: object;
}
export interface MenuEntity {
  id: string; // Primary ID
  name: string;
  icon?: string;
  iconColor?: string;
  parentId?: [number, string] | string | null;
  action?: ActionLoadModel;
  quickCreate?: boolean;
  children?: MenuEntity[];
}

export interface ActionLoadModel extends ActionModel {
  searchViewId: [number | false, string];
  name: string;
  target: string;
  context: any;
  viewMode: string;
  viewId?: any[];
  resModel: string;
  views: [number | false, string][];
  domain: Domain;
  bomStructure?;
}

export interface ActionCallButtonModel extends ActionModel {
  name?: string;
  target?: string;
  context?: object;
  viewMode?: string;
  resModel?: string;
  viewId?: any[];
  views?: [number | false, string][];
}
export interface ActionModel {
  type: string;
  flags: Flags;
  warning?: string | boolean;
  title?: string;
  width?: string;
  url?: string;
  resId?: number;
  save?: string;
  recordId?: number;
  recordIds?: number[];
  parentContext?: {};
  viewType?: string;
  closeCurrent?: boolean;
  defaultAction?: any;
  id: number;
  showSaveButton?: any;
  extended?: any;
  preMethod?: any;
  actionMenuId?: number;
  isFirstLoad?: boolean;
  isDevelopMode?: boolean;
  model?: string;
  openAttachmentInNewTab?: string;
}
export interface Flags {
  defaultView?: string;
  actionButtons?: boolean;
  newWindow?: boolean;
  autoSearch?: boolean;
  displayTitle?: boolean;
  pager?: boolean;
  searchView?: boolean;
  sidebar?: boolean;
  viewsWwitcher?: boolean;
}
