import request from '@/utils/request'

// 获取充值列表
function getRechargeList(data) {
    return request({
        url: '/admin/recharges',
        method: 'get',
        params: data
    })
}

// 充值审核或修改
function auditRecharge(data) {
    return request({
        url: '/admin/recharges/updateData',
        method: 'post',
        data: data
    })
}

// 获取提现列表
function getWithdrawList(data) {
    return request({
        url: '/admin/deposits',
        method: 'get',
        params: data
    })
}

// 提现审核或修改
function auditWithdraw(data) {
    return request({
        url: '/admin/deposits/updatedata',
        method: 'post',
        data: data
    })
}
export default {
    getRechargeList,
    auditRecharge,
    getWithdrawList,
    auditWithdraw
}