/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{html,vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false, // 关闭默认样式 关键。否则会覆盖很多基础样式
  },
  plugins: [],
};
