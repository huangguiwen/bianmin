import request from '@/utils/request'

function getRuleSettingList() {
    return request({
        url: '/admin/rules',
        method: 'post'
    })
}

function getUsersList(data) {
    return request({
        url: '/admin/users',
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
    updateMerchant
}