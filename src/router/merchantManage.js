import Layout from '../views/layout/Layout'
export default {
    path: '/merchantManage',
    component: Layout,
    redirect: '/merchantManage/merchantInfo',
    name: 'merchantManage',
    hidden: false,
    meta: { title: '商户管理', icon: 'example', menu: true },
    children: [
        {
            path: 'merchantInfo',
            name: 'merchantInfo',
            component: () => import('@/views/merchantManage/merchantInfo'),
            meta: { title: '商户信息', icon: 'tree', menu: true, perm: 'merchantInfo' },
        },{
            path: 'shopAccountDetail',
            name: 'shopAccountDetail',
            component: () => import('@/views/merchantManage/shopAccountDetail'),
            meta: { title: '账户明细', icon: 'tree', menu: true, perm: 'shopAccountDetail' },
        },
        {
            path: 'merchantDetail',
            name: 'merchantDetail',
            hidden: true,
            component: () => import('@/views/merchantManage/merchantDetail'),
            meta: { title: '商户信息详情', icon: 'tree' },
        },
        {
            path: 'singleShopAccountDetail',
            name: 'singleShopAccountDetail',
            hidden: true,
            component: () => import('@/views/merchantManage/singleShopAccountDetail'),
            meta: { title: '单个账户明细', icon: 'tree' },
        }
    ]
}
