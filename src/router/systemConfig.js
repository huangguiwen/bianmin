import Layout from '../views/layout/Layout'
export default {
    path: '/systemConfig',
    component: Layout,
    redirect: '/systemConfig/ruleSetting',
    name: 'systemConfig',
    meta: { title: '系统管理', icon: 'example', menu: true, id: 500 },
    children: [
        {
            path: 'baseSetting',
            name: 'baseSetting',
            hidden: false,
            component: () => import('@/views/systemConfig/baseSetting'),
            meta: { title: '基础设置', icon: 'tree', menu: true, perm: 'baseSetting', id: 501 }
        },
        {
            path: 'accountList',
            name: 'accountList',
            hidden: false,
            component: () => import('@/views/systemConfig/accountList'),
            meta: { title: '账号列表', icon: 'tree', menu: true, perm: 'accountList', id: 502 }
        },
        {
            path: 'ruleSetting',
            name: 'ruleSetting',
            hidden: true,
            component: () => import('@/views/systemConfig/ruleSetting'),
            meta: { title: '权限规则', icon: 'tree' }
        },
        {
            path: 'menuManage',
            name: 'menuManage',
            hidden: false,
            component: () => import('@/views/systemConfig/menuManage'),
            meta: { title: '账号角色权限', icon: 'tree', menu: true, perm: 'menuManage', id: 503 }
        }
    ]
}
