// 系统设置
interface DefaultSettings {
  /**
   * 系统title
   */
  title: string;

  /**
   * 主题模式
   */
  theme: string;

  /**
   * 主题色
   */
  themeColor: string;

  /**
   * 语言
   */
  language: string;
}

const defaultSettings: DefaultSettings = {
  title: 'jh-vue3-admin',
  /**
   *  主题模式
   * dark:暗黑模式
   * light: 明亮模式
   */
  theme: 'light',
  themeColor: '#409EFF',
  language: 'en', // zh-cn| en
};

export default defaultSettings;
