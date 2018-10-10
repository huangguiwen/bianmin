import request from '@/utils/request'

// 获取商户信息列表
function getMerchantList(data) {
    return request({
        url: '/admin/shops',
        method: 'get',
        params: data
    })
}

// 获取商户审核信息
function getCheckMessage(data) {
    return request({
        url: '/admin/shops/getExanime',
        method: 'get',
        params: data
    })
}

// 提交商户审核信息
function submitCheckMessage(data) {
    return request({
        url: '/admin/shops/exanime',
        method: 'post',
        data: data
    })
}
export default {
    getMerchantList,
    getCheckMessage,
    submitCheckMessage
}