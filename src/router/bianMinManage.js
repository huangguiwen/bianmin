import Layout from '../views/layout/Layout'
export default {
    path: '/bianMinManage',
    component: Layout,
    redirect: '/bianMinManage/bianMinInfo',
    name: 'bianMinManage',
    hidden: false,
    meta: { title: '边民管理', icon: 'example', menu: true },
    children: [
        {
            path: 'bianMinInfo',
            name: 'bianMinInfo',
            component: () => import('@/views/bianMinManage/bianMinInfo'),
            meta: { title: '边民信息', icon: 'tree', menu: true }
        },{   
            path: 'bianMinAccount',
            name: 'bianMinAccount',
            component: () => import('@/views/bianMinManage/bianMinAccount'),
            meta: { title: '边民账户列表', icon: 'tree', menu: true }
        },{   
            path: 'accountOverview',
            name: 'accountOverview',
            component: () => import('@/views/bianMinManage/accountOverview'),
            meta: { title: '边民账户概览', icon: 'tree', menu: true }
        },{   
            path: 'singleAccountDetail',
            name: 'singleAccountDetail',
            hidden: true,
            component: () => import('@/views/bianMinManage/singleAccountDetail'),
            meta: { title: '账户明细', icon: 'tree' }
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
        },{   
            path: 'bianMinBatchImport',
            name: 'bianMinBatchImport',
            hidden: true,
            component: () => import('@/views/bianMinManage/bianMinBatchImport'),
            meta: { title: '批量导入边民信息', icon: 'tree' }
        },{   
            path: 'accountBatchImport',
            name: 'accountBatchImport',
            hidden: true,
            component: () => import('@/views/bianMinManage/accountBatchImport'),
            meta: { title: '批量导入账户信息', icon: 'tree' }
        }
    ]
}
