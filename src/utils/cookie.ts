export const INSTANCE_NAME = 'instance0';
export class CookieUtil {
  static setCookie(key, value) {
    const ttl = 24 * 60 * 60 * 365;
    document.cookie = [
      key + '=' + encodeURIComponent(JSON.stringify(value)),
      'path=/',
      'max-age=' + ttl,
      'expires=' + new Date(new Date().getTime() + ttl * 1000),
    ].join(';');
  }
  static getCookie(key) {
    var nameEQ = key + '=';
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; ++i) {
      var cookie = cookies[i].replace(/^\s*/, '');
      if (cookie.indexOf(nameEQ) === 0) {
        const cookieValue = cookie.substring(nameEQ.length);
        if (cookieValue !== 'undefined' && cookieValue) {
          return JSON.parse(decodeURIComponent(cookieValue));
        } else {
          return null;
        }
      }
    }
    return null;
  }

  static getInstanceSessionId(): string {
    const instanceSessionId = this.getCookie(`${INSTANCE_NAME}|session_id`);
    return instanceSessionId;
  }
  static deleteInstanceSessionId(): void {
    this.deleteCookie(`${INSTANCE_NAME}|session_id`);
  }

  static deleteCookie(key) {
    var d = new Date();
    d.setTime(d.getTime() + -1 * 24 * 60 * 60 * 1000);
    var expires = 'expires=' + d.toUTCString();
    document.cookie = key + '=' + '' + '; ' + expires;
  }
}
