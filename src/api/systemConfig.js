import request from '@/utils/request'

function getRuleSettingList() {
    return request({
        url: '/admin/rules',
        method: 'post'
    })
}

// 获取用户列表
function getUsersList(data) {
    return request({
        url: '/admin/users',
        method: 'get',
        params: data
    })
}

// 添加新用户
function addUser(data) {
    return request({
        url: '/admin/users',
        method: 'post',
        data: data
    })
}

// 添加新用户
function updateDataUser(data) {
    return request({
        url: '/admin/users/updateData',
        method: 'post',
        data: data
    })
}

// 获取基础设置
function getMerchantList(data) {
    return request({
        url: '/admin/capitalconf',
        method: 'get',
        params: data
    })
}

// 提交基础设置
function updateMerchant(data) {
    return request({
        url: '/admin/capitalconf/updateData',
        method: 'post',
        data: data
    })
}


export default {
    getRuleSettingList,
    getUsersList,
    getMerchantList,
    updateMerchant,
    addUser,
    updateDataUser
}