import path, { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { viteMockServe } from 'vite-plugin-mock';
import AutoImport from 'unplugin-auto-import/vite';
import { proxy } from './proxy';
import dotenv from 'dotenv';
import fs from 'fs';
const pathSrc = path.resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  if (fs.existsSync('.env.development') && command === 'serve') {
    dotenv.config({ path: '.env.development' });
  }
  return {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
    plugins: [
      vue(),
      eslintPlugin(),
      // mock启动，只在开发环境使用
      viteMockServe({ enable: command === 'serve', mockPath: 'mock' }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
      }),
      Components({
        // allow auto load markdown components under `./src/components/`
        extensions: ['vue', 'md'],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
        directoryAsNamespace: false,
        dts: 'src/components.d.ts',
      }),
    ],

    css: {
      postcss: {
        plugins: [
          // 样式工具类
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
      // 每个文件中都自动导入ep定义的变量
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element/index.scss" as *;`,
        },
      },
    },
    // 配置跨域
    server: {
      open: false, //是否自动打开浏览器，可选项
      cors: true, //允许跨域。
      // 设置代理
      // proxy: {
      // 将请求代理到另一个服务器
      // '/api': {
      //   target: 'https://alloyteam-api.onrender.com/', //这是你要跨域请求的地址前缀
      //   changeOrigin: true, //开启跨域
      //   rewrite: (path) => path.replace(/^\/api/, ''), //去除前缀api
      // },
      // },
      proxy: proxy,
    },
  };
});
