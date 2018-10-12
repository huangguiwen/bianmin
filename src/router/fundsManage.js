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
        },
        {
            path: 'rechargeCheckDetail',
            name: 'rechargeCheckDetail',
            hidden: true,
            component: () => import('@/views/fundsManage/rechargeCheckDetail'),
            meta: { title: '充值详情', icon: 'tree' },
        },
        {
            path: 'addRechargeOrder',
            name: 'addRechargeOrder',
            hidden: true,
            component: () => import('@/views/fundsManage/addRechargeOrder'),
            meta: { title: '添加充值订单', icon: 'tree' },
        },
        {
            path: 'withdrawManage',
            name: 'withdrawManage',
            component: () => import('@/views/fundsManage/withdrawManage'),
            meta: { title: '提现管理', icon: 'tree' },
        }
    ]
}
