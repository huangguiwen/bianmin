import Layout from '../views/layout/Layout'
export default {
    path: '/login',
    component: Layout,
    redirect: '/login/firstLogin',
    name: 'login',
    hidden: true,
    meta: { title: '登录', icon: 'example' },
    children: [
        {
            path: 'firstLogin',
            name: 'firstLogin',
            component: () => import('@/views/login/firstLogin'),
            meta: { title: '首次登录', icon: 'tree' }
        },
        {
            path: 'forgetPassword',
            name: 'forgetPassword',
            component: () => import('@/views/login/forgetPassword'),
            meta: { title: '忘记密码', icon: 'tree' }
        },
        {
            path: 'accountManage',
            name: 'accountManage',
            component: () => import('@/views/login/accountManage'),
            meta: { title: '账号管理', icon: 'tree' }
        }
    ]
}
