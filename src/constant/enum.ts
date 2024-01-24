export enum FilterOperators {
  Not = '!',
  In = 'in',
  NotIn = 'not in',
  Equal = '=',
  NotEqual = '!=',
  LessOrEqualThan = '<=',
  GreaterOrEqualThan = '>=',
  LessThan = '<',
  GreaterThan = '>',
  Contains = 'ilike',
  NotContains = 'not ilike',
  WeekNumber = 'week_number',
  Set = '∃',
  NotSet = '∄',
  StartWith = 'start_with',
  EndWith = 'end_with',
  True = 'true',
  False = 'false',
  Is = 'is',
  IsNot = 'is not',
}
export enum FieldType {
  Id = 'id',
  Char = 'char',
  Text = 'text',
  Iframe = 'iframe',
  Float = 'float',
  FloatLock = 'float_with_lock',
  Integer = 'integer',
  Boolean = 'boolean',
  Date = 'date',
  MonthPicker = 'month_picker',
  DateTime = 'datetime',
  FloatTime = 'float_time',
  Selection = 'selection',
  Select = 'select',
  One2One = 'one2one',
  One2Many = 'one2many',
  One2ManyList = 'one2many_list',
  Many2One = 'many2one',
  Parameteriser = 'parameteriser',
  Many2Many = 'many2many',
  Many2ManyTags = 'many2many_tags',
  ProgressBar = 'progressbar',
  StatusBar = 'statusbar',
  RichText = 'wysiwyg',
  Configurator = 'configurator_lines',
  ConfiguratorParameteriser = 'configurator_parameteriser',
  Binary = 'binary',
  Image = 'image',
  Geolocation = 'geolocation',
  TreeStructure = 'tree_structure',
  CharAutocomplete = 'char_autocomplete',
  EditTree = 'edit_tree',
  Phone = 'phone',
  Url = 'url',
  Email = 'email',
  WarningInfo = 'warning_info',
  ColorPicker = 'color',
  RPC = 'rpc',
  JSONB = 'jsonb',
  Reference = 'reference',
  Script = 'script',
}
export enum ViewItemType {
  Field = 'field',
  Button = 'button',
  Label = 'label',
  EditTree = 'edit_tree',
  Filter = 'filter',
  // form specific item types
  Notebook = 'notebook',
  Search = 'search',
  Group = 'group',
  Placeholder = 'placeholder',
  Newline = 'newline',
  Separator = 'separator',
  Html = 'html',
  Strong = 'strong',
  Div = 'div',
  Span = 'span',
  Script = 'script',
  Ul = 'ul',
  Li = 'li',
  Img = 'img',
  Br = 'br',
  P = 'p',
  B = 'b',
  Hr = 'hr',
  T = 't',
  OL = 'ol',
  Body = 'body',
  Header = 'header',
  Head = 'head',
  H4 = 'h4',
  A = 'a',
  Templates = 'templates',
  Data = 'data',
}

export enum ParametersValueType {
  DescriptionValue = 'descriptionValue',
  OptionValue = 'optionValue',
  DecimalValue = 'decimalValue',
}

export enum AvatarMenuItemsName {
  Home = 'Home',
  Preferences = 'Preferences',
  ChangeCompany = 'Change Company',
  ManageCallouts = 'Manage Callouts',
  Contrast = 'Contrast',
  FontWeight = 'Font Weight',
  CalloutsTheme = 'Callouts Theme',
  Themes = 'Themes',
  Switch = 'Switch to old UI',
  About = 'About',
  LogOut = 'Log out',
}
export enum ViewType {
  List = 'list',
  Form = 'form',
  Calendar = 'calendar',
  Graph = 'graph',
  Kanban = 'kanban',
  Tree = 'tree',
  Map = 'map',
  Page = 'page',
}

export enum ActionType {
  New = 'ir.actions.act_window',
  Refresh = 'ir.actions.act_window_refresh',
  Close = 'ir.actions.act_window_close',
  Report = 'ir.actions.report.xml',
  Link = 'ir.actions.act_url',
  Binary = 'binary',
  Url = 'url',
  Server = 'ir.actions.server',
  Iframe = 'ir.actions.act_iframe_window',
}

export enum ViewOpenType {
  Dialog = 'new',
  NewTab = 'current',
  Background = 'background',
}
