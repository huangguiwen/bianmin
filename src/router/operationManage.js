import Layout from '../views/layout/Layout'
export default {
    path: '/operationManage',
    component: Layout,
    redirect: '/operationManage/rechargeAnalysis',
    name: 'operationManage',
    hidden: false,
    meta: { title: '运营管理', icon: 'example', menu: true },
    children: [
        {
            path: 'rechargeAnalysis',
            name: 'rechargeAnalysis',
            component: () => import('@/views/operationManage/rechargeAnalysis'),
            meta: { title: '充值分析', icon: 'tree', menu: true, perm: 'rechargeAnalysis' },
        },
        {
            path: 'withdrawAnalysis',
            name: 'withdrawAnalysis',
            component: () => import('@/views/operationManage/withdrawAnalysis'),
            meta: { title: '提现分析', icon: 'tree', menu: true, perm: 'withdrawAnalysis' },
        },
        {
            path: 'shopsAnalysis',
            name: 'shopsAnalysis',
            component: () => import('@/views/operationManage/shopsAnalysis'),
            meta: { title: '商户分析', icon: 'tree', menu: true, perm: 'shopsAnalysis' },
        },
        {
            path: 'accountGeneral',
            name: 'accountGeneral',
            component: () => import('@/views/operationManage/accountGeneral'),
            meta: { title: '账户概况分析', icon: 'tree', menu: true, perm: 'accountGeneral' },
        },
        {
            path: 'accountAmount',
            name: 'accountAmount',
            component: () => import('@/views/operationManage/accountAmount'),
            meta: { title: '账户额度范围', icon: 'tree', menu: true, perm: 'accountAmount' },
        }
    ]
}
