import Layout from '../views/layout/Layout'
export default {
    path: '/merchantManage',
    component: Layout,
    redirect: '/merchantManage/merchantInfo',
    name: 'merchantManage',
    hidden: false,
    meta: { title: '商户管理', icon: 'example' },
    children: [
        {
            path: 'merchantInfo',
            name: 'merchantInfo',
            component: () => import('@/views/merchantManage/merchantInfo'),
            meta: { title: '商户信息', icon: 'tree' },
        }
    ]
}
