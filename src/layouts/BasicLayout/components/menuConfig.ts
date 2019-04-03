const menuConfig = [
  {
    resourceKey: 'homepage',
    description: '首页',
    apiUrl: '/homepage',
    icon: 'icon-homepage',
  },
  {
    resourceKey: 'base',
    description: '基础管理',
    icon: 'icon-base',
    children: [
      {
        resourceKey: 'warehouse',
        description: '仓库信息',
        apiUrl: '/base/warehouse',
        icon: '',
      },
      {
        resourceKey: 'goods',
        description: '商品信息',
        apiUrl: '/test/goods',
        icon: '',
      },
    ],
  },
];

export { menuConfig };
