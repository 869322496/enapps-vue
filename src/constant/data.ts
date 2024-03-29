import { FieldType, FilterOperators } from './enum';

export const advancedConditionOptions = [
  {
    text: 'is true',
    value: FilterOperators.True,
    types: [FieldType.Boolean],
  },
  {
    text: 'is false',
    value: FilterOperators.False,
    types: [FieldType.Boolean],
  },
  {
    text: 'contains',
    value: FilterOperators.Contains,
    types: [
      FieldType.Char,
      FieldType.One2Many,
      FieldType.Many2One,
      FieldType.Text,
      FieldType.Many2Many,
      FieldType.Binary,
    ],
  },
  {
    text: "doesn't contain",
    value: FilterOperators.NotContains,
    types: [
      FieldType.Char,
      FieldType.One2Many,
      FieldType.Many2One,
      FieldType.Text,
      FieldType.Many2Many,
      FieldType.Binary,
    ],
  },
  {
    text: 'is equal to',
    value: FilterOperators.Equal,
    types: [
      FieldType.DateTime,
      FieldType.Char,
      FieldType.One2Many,
      FieldType.Date,
      FieldType.MonthPicker,
      FieldType.Many2One,
      FieldType.Text,
      FieldType.Many2Many,
      FieldType.Float,
      FieldType.Binary,
      FieldType.Integer,
    ],
  },
  {
    text: 'is not equal to',
    value: FilterOperators.NotEqual,
    types: [
      FieldType.DateTime,
      FieldType.Char,
      FieldType.One2Many,
      FieldType.Date,
      FieldType.MonthPicker,
      FieldType.Many2One,
      FieldType.Text,
      FieldType.Many2Many,
      FieldType.Float,
      FieldType.Binary,
      FieldType.Integer,
    ],
  },
  {
    text: 'greater than',
    value: FilterOperators.GreaterThan,
    types: [
      FieldType.DateTime,
      FieldType.Char,
      FieldType.One2Many,
      FieldType.Date,
      FieldType.MonthPicker,
      FieldType.Many2One,
      FieldType.Text,
      FieldType.Many2Many,
      FieldType.Float,
      FieldType.Binary,
      FieldType.Integer,
    ],
  },
  {
    text: 'less than',
    value: FilterOperators.LessThan,
    types: [
      FieldType.DateTime,
      FieldType.Char,
      FieldType.One2Many,
      FieldType.Date,
      FieldType.MonthPicker,
      FieldType.Many2One,
      FieldType.Text,
      FieldType.Many2Many,
      FieldType.Float,
      FieldType.Binary,
      FieldType.Integer,
    ],
  },
  {
    text: 'greater or equal than',
    value: FilterOperators.GreaterOrEqualThan,
    types: [
      FieldType.DateTime,
      FieldType.Char,
      FieldType.One2Many,
      FieldType.Date,
      FieldType.MonthPicker,
      FieldType.Many2One,
      FieldType.Text,
      FieldType.Many2Many,
      FieldType.Float,
      FieldType.Binary,
      FieldType.Integer,
    ],
  },
  {
    text: 'less or equal than',
    value: FilterOperators.LessOrEqualThan,
    types: [
      FieldType.DateTime,
      FieldType.Char,
      FieldType.One2Many,
      FieldType.Date,
      FieldType.MonthPicker,
      FieldType.Many2One,
      FieldType.Text,
      FieldType.Many2Many,
      FieldType.Float,
      FieldType.Binary,
      FieldType.Integer,
    ],
  },
  {
    text: 'is',
    value: FilterOperators.Equal,
    types: [FieldType.Selection, FieldType.Id],
  },
  {
    text: 'is not',
    value: FilterOperators.NotEqual,
    types: [FieldType.Selection],
  },
  {
    text: 'is set',
    value: FilterOperators.Set,
    types: [
      FieldType.DateTime,
      FieldType.Char,
      FieldType.One2Many,
      FieldType.Date,
      FieldType.MonthPicker,
      FieldType.Many2One,
      FieldType.Selection,
      FieldType.Text,
      FieldType.Many2Many,
      FieldType.Float,
      FieldType.Binary,
      FieldType.Integer,
    ],
  },
  {
    text: 'is not set',
    value: FilterOperators.NotSet,
    types: [
      FieldType.DateTime,
      FieldType.Char,
      FieldType.One2Many,
      FieldType.Date,
      FieldType.MonthPicker,
      FieldType.Many2One,
      FieldType.Selection,
      FieldType.Text,
      FieldType.Many2Many,
      FieldType.Float,
      FieldType.Binary,
      FieldType.Integer,
    ],
  },
  {
    text: 'start with',
    value: FilterOperators.StartWith,
    types: [
      FieldType.Char,
      FieldType.One2Many,
      FieldType.Many2One,
      FieldType.Text,
      FieldType.Many2Many,
      FieldType.Float,
      FieldType.Binary,
      FieldType.Integer,
    ],
  },
  {
    text: 'end with',
    value: FilterOperators.EndWith,
    types: [
      FieldType.Char,
      FieldType.One2Many,
      FieldType.Many2One,
      FieldType.Text,
      FieldType.Many2Many,
      FieldType.Float,
      FieldType.Binary,
      FieldType.Integer,
    ],
  },
];
export const CUSTOM_COLOUR_FILTER_FIELD_NAME = 'custom_colour_filter';
export const LOGIN_PASSWORD_INCORRECT_MESSAGE = 'Invalid username or password';
export const LOGIN_SUCCESS_MESSAGE = 'Login successfully';
export const INSTANCE_NAME = 'instance0';
export const AVATAR_REQUEST_OPTIONS = {
  model: 'res.users',
  field: 'avatar',
  args: { avatar: 1 },
};

export const ENAPPS_ICONS = {
  filter: 'fa-solid fa-filter',
  add: 'fa-solid fa-plus',
  plus: 'fa-solid fa-plus',
  pullrequest: 'fa-solid fa-plus',
  delete: 'fa-solid fa-trash',
  iconFirst: 'fa-solid fa-angles-left',
  iconPrev: 'fa-solid fa-angle-left',
  iconNext: 'fa-solid fa-angle-right',
  iconLast: 'fa-solid fa-angles-right',
  iconReload: 'fa-solid fa-rotate',
  iconSave: 'fa-solid fa-floppy-disk',
  iconCreate: 'fa-solid fa-square-plus',
  iconCopy: 'fa-solid fa-copy',
  iconDelete: 'fa-solid fa-trash',
  openLink: 'fa-solid fa-square-up-right',
  faWindowMaximize: 'fa-solid fa-window-maximize',
  list: 'fa-solid fa-list',
  form: 'fa-solid fa-desktop',
  calendar: 'fa-solid fa-calendar-days',
  graph: 'fa-solid fa-chart-pie',
  kanban: 'fa-brands fa-trello',
  map: 'fa-solid fa-location-dot',
  pivot: 'fa-solid fa-clipboard-list',
  error: 'fa-solid fa-circle-exclamation',
  iconExternalLink: 'fa-solid fa-arrow-up-right-from-square',
  iconCheckbox: 'fa-solid fa-list-check',
};

export const MENU_ICON = {
  'terp-stock': 'fa-solid fa-warehouse',
  'icon-plus': 'fa-solid fa-plus',
  STOCK_JUSTIFY_FILL: 'fa-solid fa-folder-tree',
  'terp-folder-yellow': 'fa-solid fa-money-check',
  STOCK_PREFERENCES: 'fa-solid fa-gears',
  STOCK_REFRESH: 'fa-solid fa-arrow-rotate-left',
  'terp-stock_symbol-selection': 'fa-solid fa-ruler-combined',
  'terp-gtk-select-all': 'fa-solid fa-envelopes-bulk',
  'icon-bell': 'fa-solid fa-bell',
  'terp-graph': 'fa-solid fa-clipboard',
  'terp-folder-green': 'fa-solid fa-code-commit',
  'terp-folder-blue': 'fa-solid fa-people-group',
  'terp-gtk-jump-to-ltr': 'fa-solid fa-rotate-right',
  STOCK_OPEN: 'fa-solid fa-folder-open',
  'icon-circler': 'fa-solid fa-backward',
  STOCK_CONVERT: 'fa-solid fa-list-check',
  'terp-accessories-archiver': 'fa-solid fa-file-lines',
  STOCK_JUSTIFY_CENTER: 'fa-solid fa-file-invoice',
  'terp-folder-orange': 'fa-solid fa-scale-unbalanced',
  'terp-stock_format-default': 'fa-solid fa-arrows-to-eye',
  'terp-product': 'fa-solid fa-box-open',
  'terp-partner': 'fa-regular fa-handshake',
  'icon-tools': 'fa-solid fa-screwdriver-wrench',
  'terp-stock_format-scientific': 'fa-solid fa-wand-magic',
  'terp-gtk-go-back-ltr': 'fa-solid fa-circle-chevron-left',
  'terp-gtk-jump-to-rtl': 'fa-solid fa-basket-shopping',
  'icon-move': 'fa-solid fa-file-lines',
  'terp-gtk-go-back-rtl': 'fa-solid fa-circle-chevron-right',
  'icon-emptycart': 'fa-solid fa-basket-shopping',
  'terp-stage': 'fa-solid fa-signal',
  'icon-briefcase': 'fa-solid fa-briefcase',
  'terp-purchase': 'fa-solid fa-building',
  'terp-crm': 'fa-solid fa-address-book',
  STOCK_GO_FORWARD: 'fa-solid fa-cart-flatbed',
  'terp-sale': 'fa-solid fa-cart-arrow-down',
  'terp-mail-': 'fa-solid fa-envelope',
  'icon-invoice': 'fa-solid fa-link',
  'terp-report': 'fa-solid fa-cash-register',
  STOCK_PRINT: 'fa-solid fa-arrow-right-arrow-left',
  'terp-stock_effects-object-colorize': 'fa-solid fa-industry',
  STOCK_INDENT: 'fa-solid fa-boxes-stacked',
  'icon-appointment-agenda': 'fa-solid fa-list',
  'icon-colors': 'fa-solid fa-palette',
  'terp-dolar': 'fa-solid fa-money-bill-wave',
  'terp-dolar_ok!': 'fa-solid fa-arrows-to-eye',
  'internal-stock-transfers': 'fa-solid fa-arrows-left-right-to-line',
  'terp-account': 'fa-solid fa-book',
  STOCK_REDO: 'fa-solid fa-retweet',
  'icon-exclamation-sign': 'fa-solid fa-exclamation',
  'icon-barchartasc': 'fa-solid fa-chart-line',
  'terp-project': 'fa-solid fa-diagram-project',
  'icon-puzzle-plugin': 'fa-solid fa-list-check',
  'icon-lego': 'fa-solid fa-cubes',
  'terp-tools': 'fa-solid fa-trowel-bricks',
  'icon-tasks': 'fa-solid fa-bars-progress',
  'terp-personal': 'fa-solid fa-user-large',
  'icon-splitthree': 'fa-solid fa-arrows-split-up-and-left',
  'icon-print': 'fa-solid fa-print',
  'icon-timeline': 'fa-solid fa-timeline',
  'icon-mountains': 'fa-solid fa-chevron-down',
  'icon-trolleyload': 'fa-solid fa-box',
  'terp-check': 'fa-solid fa-money-check-dollar',
  'terp-emblem-important': 'fa-solid fa-receipt',
  'terp-accessories-archiver+': 'fa-solid fa-chart-column',
  'icon-workshirt': 'fa-solid fa-layer-group',
  'icon-link': 'fa-solid fa-link',
  'icon-settingstwo-gearalt': 'fa-solid fa-gears',
  STOCK_EDIT: 'fa-solid fa-pen-to-square',
  'icon-barcode': 'fa-solid fa-barcode',
  'icon-tagalt-pricealt': 'fa-solid fa-tag',
  STOCK_EXECUTE: 'fa-solid fa-gears',
  STOCK_INDEX: 'fa-solid fa-mattress-pillow',
  STOCK_DIALOG_QUESTION: 'fa-solid fa-bullseye',
  'icon-factory': 'fa-solid fa-industry',
  'icon-indentrightalt': 'fa-solid fa-bars-staggered',
  'icon-squareapp': 'fa-solid fa-square',
  'icon-report': 'fa-solid fa-tag',
  STOCK_COLOR_PICKER: 'fa-solid fa-bell',
  'icon-pattern': 'fa-solid fa-crop-simple',
  'icon-sum': 'fa-solid fa-equals',
  'icon-iphone': 'fa-solid fa-mobile-screen',
  'icon-scope-scan': 'fa-solid fa-bullseye',
  'gtk-execute': 'fa-solid fa-gears',
  'icon-notificationtop': 'fa-solid fa-message',
  'icon-script': 'fa-solid fa-scroll',
  'icon-shortcut': 'fa-solid fa-square-up-right',
  'icon-ajax': 'fa-solid fa-layer-group',
  'icon-cgicenter': 'fa-solid fa-arrows-to-circle',
  'gtk-connect': 'fa-solid fa-circle-nodes',
  STOCK_PROPERTIES: 'fa-solid fa-gear',
  'icon-asteroid': 'fa-solid fa-meteor',
  STOCK_NEW: 'fa-solid fa-sheet-plastic',
  'icon-check': 'fa-solid fa-square-check',
  'icon-clockalt-timealt': 'fa-solid fa-clock',
  'icon-stopwatch': 'fa-solid fa-stopwatch',
  'icon-upload': 'fa-solid fa-circle-chevron-up',
  'icon-lineheight': 'fa-solid fa-grip-lines',
  'icon-monitor': 'fa-solid fa-display',
  'icon-python': 'fa-solid fa-gear',
  'icon-split': 'fa-solid fa-arrows-split-up-and-left',
};

export const DEFAULT_ICON = 'fa-solid fa-folder-open';
