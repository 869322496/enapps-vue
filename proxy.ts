export const proxy = {
  '/ea_product_parameters/parameter/get': {
    target: 'https://newch.erp.zone:3095/ea_product_parameters/parameter/get',
    changeOrigin: true, //开启跨域
    rewrite: path => path.replace(/^\/api/, ''), //去除前缀api
  },
  '/product_product/get_bom_structure': {
    target: 'https://newch.erp.zone:3095/product_product/get_bom_structure',
    changeOrigin: true, //开启跨域
    rewrite: path => path.replace(/^\/api/, ''), //去除前缀api
  },
  '/ea_product_configurator_extended/line/on_changed': {
    target: 'https://newch.erp.zone:3095/ea_product_configurator_extended/line/on_changed',
    changeOrigin: true, //开启跨域
    rewrite: path => path.replace(/^\/api/, ''), //去除前缀api
  },
  '/ea_product_parameters/parameter/save_parameters': {
    target: 'https://newch.erp.zone:3095/ea_product_parameters/parameter/save_parameters',
    changeOrigin: true, //开启跨域
    rewrite: path => path.replace(/^\/api/, ''), //去除前缀api
  },
  '/ea_product_configurator_extended/line/get_save_formula': {
    target: 'https://newch.erp.zone:3095/ea_product_configurator_extended/line/get_save_formula',
    changeOrigin: true, //开启跨域
    rewrite: path => path.replace(/^\/api/, ''), //去除前缀api
  },

  '/ea_product_configurator_extended/line/read_with_params': {
    target: 'https://newch.erp.zone:3095/ea_product_configurator_extended/line/read_with_params',
    changeOrigin: true, //开启跨域
    rewrite: path => path.replace(/^\/api/, ''), //去除前缀api
  },
  '/ea_product_configurator_extended/line': {
    target: 'https://newch.erp.zone:3095/ea_product_configurator_extended/line',
    changeOrigin: true, //开启跨域
    rewrite: path => path.replace(/^\/api/, ''), //去除前缀api
  },
  '/binary/saveas': {
    target: 'https://newch.erp.zone:3095/web/binary/saveas',
    changeOrigin: true, //开启跨域
    rewrite: path => path.replace(/^\/api/, ''), //去除前缀api
  },
  '/binary/get': {
    target: 'https://newch.erp.zone:3095/web/binary/get',
    changeOrigin: true, //开启跨域
    rewrite: path => path.replace(/^\/api/, ''), //去除前缀api
  },
  '/web/binary/image': {
    target: 'https://newch.erp.zone:3095/web/binary/image',
    changeOrigin: true, //开启跨域
    rewrite: path => path.replace(/^\/api/, ''), //去除前缀api
  },
  '/mview/refresh_mview': {
    target: 'https://newch.erp.zone:3095/mview/refresh_mview',
    changeOrigin: true, //开启跨域
    rewrite: path => path.replace(/^\/api/, ''), //去除前缀api
  },
  '/hmrc_api/go_to_web': {
    target: 'https://newch.erp.zone:3095/hmrc_api/go_to_web',
    changeOrigin: true, //开启跨域
    rewrite: path => path.replace(/^\/api/, ''), //去除前缀api
  },
  '/hmrc_api/create_test_user': {
    target: 'https://newch.erp.zone:3095/hmrc_api/create_test_user',
    changeOrigin: true, //开启跨域
    rewrite: path => path.replace(/^\/api/, ''), //去除前缀api
  },
  '/hmrc_api/hmrc_retrieve_vat_obligations': {
    target: 'https://newch.erp.zone:3095/hmrc_api/hmrc_retrieve_vat_obligations',
    changeOrigin: true, //开启跨域
    rewrite: path => path.replace(/^\/api/, ''), //去除前缀api
  },
  '/api': {
    target: 'https://newch.erp.zone:3095/web',
    changeOrigin: true, //开启跨域
    rewrite: path => path.replace(/^\/api/, ''), //去除前缀api
  },
};
