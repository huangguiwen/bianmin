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


export default {
    getRuleSettingList,
    getUsersList
}