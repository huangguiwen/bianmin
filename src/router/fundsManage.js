import Layout from '../views/layout/Layout'
export default {
    path: '/fundsManage',
    component: Layout,
    redirect: '/fundsManage/rechargeManage',
    name: 'fundsManage  ',
    hidden: false,
    meta: { title: '资金管理', icon: 'example' },
    children: [
        {
            path: 'rechargeManage',
            name: 'rechargeManage',
            component: () => import('@/views/fundsManage/rechargeManage'),
            meta: { title: '充值管理', icon: 'tree' },
        }
    ]
}
