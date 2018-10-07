import request from '@/utils/request'

// 登录
export function login(username, password) {
    return request({
        url: '/admin/base/login',
        method: 'post',
        data: {
        isRemember: 0,
        username,
        password
        }
    })
}

// 第一次登录设置密码
export function firstLogin(data) {
    return request({
        url: '/admin/base/firstLogin',
        method: 'post',
        data
    })
}

// 账户管理
export function setInfo(data) {
    return request({
        url: '/admin/base/setinfo',
        method: 'post',
        data
    })
}

// 获取用户信息
export function getInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: { token }
    })
}

// 退出登录
export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}
