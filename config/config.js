import routeConfig from './route.config';
import theme from './theme';

export default {
  routes: routeConfig,
  targets: {
    ie: 11,
  },
  history: 'hash',
  context: {
    designWidth: 1920,
  },
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: false,
        dynamicImport: {
          webpackChunkName: true,
          loadingComponent: './components/Loading.tsx',
        },
        title: '共享交换平台',
        locale: {
          enable: true, // default false
          default: 'zh-CN', // default zh-CN
          baseNavigator: true,
        },
        library: 'react',
        dll: true,
        pwa: false,
        hardSource: false,
        fastClick: true,
      },
    ],
  ],
  // 配置之后可以将请求的地址从mock地址切换到正式地址
  proxy: {
    '/api': {
      target: 'http://magicrent.web.test.thundersdata.com',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  // 配置antd的基础样式
  theme,
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  define: {
    'process.env.AUTH_SERVER': 'http://api.thundersdata.com',
    'process.env.RESOURCE_SERVER': 'http://authorization.test.thundersdata.com',
  },
};
