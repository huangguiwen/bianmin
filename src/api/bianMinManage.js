import request from '@/utils/request'

// 获取边民信息列表
function getBianMin(data) {
    return request({
        url: '/admin/bianmins',
        method: 'get',
        params: data
    })
}

// 添加边民信息
function addBianMin(data) {
    return request({
        url: '/admin/bianmins',
        method: 'post',
        data: data
    })
}

// 编辑边民信息
function editBianMin(data) {
    return request({
        url: '/admin/bianmins/updateData',
        method: 'post',
        data: data
    })
}



// 获取边民账户列表
function getBianMinAccounts(data) {
    return request({
        url: '/admin/accounts',
        method: 'get',
        params: data
    })
}

// 添加边民账户
function addBianMinAccounts(data) {
    return request({
        url: '/admin/accounts',
        method: 'post',
        data: data
    })
}

// 编辑边民账户
function editBianMinAccounts(data) {
    return request({
        url: '/admin/accounts/updateData',
        method: 'post',
        data: data
    })
}

// 商户账号明细
function getAccountDetail(data) {
    return request({
        url: '/admin/capitalaccount',
        method: 'get',
        data: data
    })
}

// 批量插入边民
function batchImportBianMin(data) {
    return request({
        url: '/admin/bianmins/batchInsert',
        method: 'post',
        data: data
    })
}

// 批量插入边民账户
function batchImportAccount(data) {
    return request({
        url: '/admin/accounts/batchInsert',
        method: 'post',
        data: data
    })
}


// 获取边民账户列表
function getOverViewList(data) {
    return request({
        url: '/admin/accounts/getOverView',
        method: 'get',
        params: data
    })
}

export default {
    getBianMin,
    addBianMin,
    editBianMin,
    getBianMinAccounts,
    addBianMinAccounts,
    editBianMinAccounts,
    getAccountDetail,
    batchImportBianMin,
    batchImportAccount,
    getOverViewList
}