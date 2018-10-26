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

// 获取菜单权限数据
function getAuth(data) {
    return request({
        url: '/admin/auth',
        method: 'get',
        params: data
    })
}

// 提交菜单权限数据
function submitAuth(data) {
    return request({
        url: '/admin/auth',
        method: 'post',
        data: data
    })
}

// 编辑菜单权限数据
function editAuth(data) {
    return request({
        url: '/admin/auth/updatedata',
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
    updateDataUser,
    getAuth,
    submitAuth,
    editAuth
}