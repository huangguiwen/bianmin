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


export default {
    getBianMin,
    addBianMin,
    editBianMin,
    getBianMinAccounts,
    addBianMinAccounts,
    editBianMinAccounts
}