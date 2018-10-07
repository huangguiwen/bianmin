import Layout from '../views/layout/Layout'
export default {
    path: '/bianMinManage',
    component: Layout,
    redirect: '/bianMinManage/bianMinInfo',
    name: 'bianMinManage',
    hidden: false,
    meta: { title: '边民管理', icon: 'example' },
    children: [
        {
            path: 'bianMinInfo',
            name: 'bianMinInfo',
            component: () => import('@/views/bianMinManage/bianMinInfo'),
            meta: { title: '边民信息', icon: 'tree' },
        },{   
            path: 'bianMinAccount',
            name: 'bianMinAccount',
            component: () => import('@/views/bianMinManage/bianMinAccount'),
            meta: { title: '边民账户列表', icon: 'tree' }
        },{   
            path: 'addBianMinInfo',
            name: 'addBianMinInfo',
            hidden: true,
            component: () => import('@/views/bianMinManage/addBianMinInfo'),
            meta: { title: '添加边民信息', icon: 'tree' }
        },{   
            path: 'bianMinInfoDetail',
            name: 'bianMinInfoDetail',
            hidden: true,
            component: () => import('@/views/bianMinManage/bianMinInfoDetail'),
            meta: { title: '边民信息详情', icon: 'tree' }
        }
    ]
}
