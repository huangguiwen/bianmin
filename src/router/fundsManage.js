import Layout from '../views/layout/Layout'
export default {
    path: '/fundsManage',
    component: Layout,
    redirect: '/fundsManage/rechargeManage',
    name: 'fundsManage',
    hidden: false,
    meta: { title: '资金管理', icon: 'example', menu: true, id: 300 },
    children: [
        {
            path: 'rechargeManage',
            name: 'rechargeManage',
            component: () => import('@/views/fundsManage/rechargeManage'),
            meta: { title: '充值管理', icon: 'tree', menu: true, perm: 'rechargeManage', id: 301 },
        },{
            path: 'rechargeCheckDetail',
            name: 'rechargeCheckDetail',
            hidden: true,
            component: () => import('@/views/fundsManage/rechargeCheckDetail'),
            meta: { title: '充值详情', icon: 'tree' },
        },{
            path: 'addRechargeOrder',
            name: 'addRechargeOrder',
            hidden: true,
            component: () => import('@/views/fundsManage/addRechargeOrder'),
            meta: { title: '添加充值订单', icon: 'tree' },
        },{
            path: 'withdrawManage',
            name: 'withdrawManage',
            component: () => import('@/views/fundsManage/withdrawManage'),
            meta: { title: '提现管理', icon: 'tree', menu: true, perm: 'withdrawManage', id: 302 },
        },{
            path: 'withdrawDispose',
            name: 'withdrawDispose',
            hidden: true,
            component: () => import('@/views/fundsManage/withdrawDispose'),
            meta: { title: '提现处理', icon: 'tree' },
        },{
            path: 'withdrawCheckDetail',
            name: 'withdrawCheckDetail',
            hidden: true,
            component: () => import('@/views/fundsManage/withdrawCheckDetail'),
            meta: { title: '提现详情', icon: 'tree' },
        },{
            path: 'withdrawManage1',
            name: 'withdrawManage1',
            component: () => import('@/views/fundsManage/withdrawManage1'),
            meta: { title: '提现管理7878', icon: 'tree', menu: true, perm: 'withdrawManage1', id: 303 },
        }
    ]
}
