const enum API {
  LOGIN = '/login',
  REFRESH_TOKEN = '/refresh-token',
  DATABASE_LIST = '/database/get_list',
  DATESET_CALL_KW = '/dataset/call_kw',
  DATESET_CALL = '/dataset/call',
  SESSION_AUTHENTICATE = '/session/authenticate',
  SESSION_GET_SESSION_INFO = '/session/get_session_info',
  SESSION_LOGOUT = '/session/destroy',
  BINARY_IMAGE = '/binary/image',
  MENU_LOAD = '/menu/load',
  MENU_ACTION = '/menu/action',
}
export default API;
