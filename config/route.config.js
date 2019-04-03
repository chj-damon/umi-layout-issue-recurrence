export default [
  {
    path: '/base',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/base/warehouse', component: './warehouse' },
      { path: '/base/goods', component: './goods' },
    ],
  },
  {
    path: '/test',
    component: '../layouts/BasicLayout',
    routes: [{ path: '/test/goods', component: './goods' }],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [{ path: '/', redirect: '/homepage' }, { path: '/homepage', component: './homepage' }],
  },
  {
    component: '404',
  },
];
