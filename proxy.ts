export const proxy = {
  '/ea_product_parameters/parameter/get': {
    target: process.env.VITE_PROXY_URL + '/ea_product_parameters/parameter/get',
    changeOrigin: true, //开启跨域
    rewrite: path => path.replace(/^\/api/, ''), //去除前缀api
  },
  '/product_product/get_bom_structure': {
    target: process.env.VITE_PROXY_URL + '/product_product/get_bom_structure',
    changeOrigin: true, //开启跨域
    rewrite: path => path.replace(/^\/api/, ''), //去除前缀api
  },
  '/ea_product_configurator_extended/line/on_changed': {
    target: process.env.VITE_PROXY_URL + '/ea_product_configurator_extended/line/on_changed',
    changeOrigin: true, //开启跨域
    rewrite: path => path.replace(/^\/api/, ''), //去除前缀api
  },
  '/ea_product_parameters/parameter/save_parameters': {
    target: process.env.VITE_PROXY_URL + '/ea_product_parameters/parameter/save_parameters',
    changeOrigin: true, //开启跨域
    rewrite: path => path.replace(/^\/api/, ''), //去除前缀api
  },
  '/ea_product_configurator_extended/line/get_save_formula': {
    target: process.env.VITE_PROXY_URL + '/ea_product_configurator_extended/line/get_save_formula',
    changeOrigin: true, //开启跨域
    rewrite: path => path.replace(/^\/api/, ''), //去除前缀api
  },

  '/ea_product_configurator_extended/line/read_with_params': {
    target: process.env.VITE_PROXY_URL + '/ea_product_configurator_extended/line/read_with_params',
    changeOrigin: true, //开启跨域
    rewrite: path => path.replace(/^\/api/, ''), //去除前缀api
  },
  '/ea_product_configurator_extended/line': {
    target: process.env.VITE_PROXY_URL + '/ea_product_configurator_extended/line',
    changeOrigin: true, //开启跨域
    rewrite: path => path.replace(/^\/api/, ''), //去除前缀api
  },
  '/binary/saveas': {
    target: process.env.VITE_PROXY_URL + '/web/binary/saveas',
    changeOrigin: true, //开启跨域
    rewrite: path => path.replace(/^\/api/, ''), //去除前缀api
  },
  '/binary/get': {
    target: process.env.VITE_PROXY_URL + '/web/binary/get',
    changeOrigin: true, //开启跨域
    rewrite: path => path.replace(/^\/api/, ''), //去除前缀api
  },
  '/web/binary/image': {
    target: process.env.VITE_PROXY_URL + '/web/binary/image',
    changeOrigin: true, //开启跨域
    rewrite: path => path.replace(/^\/api/, ''), //去除前缀api
  },
  '/mview/refresh_mview': {
    target: process.env.VITE_PROXY_URL + '/mview/refresh_mview',
    changeOrigin: true, //开启跨域
    rewrite: path => path.replace(/^\/api/, ''), //去除前缀api
  },
  '/hmrc_api/go_to_web': {
    target: process.env.VITE_PROXY_URL + '/hmrc_api/go_to_web',
    changeOrigin: true, //开启跨域
    rewrite: path => path.replace(/^\/api/, ''), //去除前缀api
  },
  '/hmrc_api/create_test_user': {
    target: process.env.VITE_PROXY_URL + '/hmrc_api/create_test_user',
    changeOrigin: true, //开启跨域
    rewrite: path => path.replace(/^\/api/, ''), //去除前缀api
  },
  '/hmrc_api/hmrc_retrieve_vat_obligations': {
    target: process.env.VITE_PROXY_URL + '/hmrc_api/hmrc_retrieve_vat_obligations',
    changeOrigin: true, //开启跨域
    rewrite: path => path.replace(/^\/api/, ''), //去除前缀api
  },
  '/api': {
    target: process.env.VITE_PROXY_URL + '/web',
    changeOrigin: true, //开启跨域
    rewrite: path => path.replace(/^\/api/, ''), //去除前缀api
  },
};
