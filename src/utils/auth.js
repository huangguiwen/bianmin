import Cookies from 'js-cookie'

const AUTHKEY = 'token'
const SESSIONID = 'sessionId'
const USERINFO = 'userInfo'
const PERMISSION = 'permission'


export function getAuthKey() {
  return Cookies.get(AUTHKEY)
}

export function setAuthKey(data) {
  return Cookies.set(AUTHKEY, data)
}

export function removeAuthKey() {
  return Cookies.remove(AUTHKEY)
}

export function getSessionId() {
    return Cookies.get(SESSIONID)
}

export function setSessionId(data) {
    return Cookies.set(SESSIONID, data)
}

export function removeSessionId() {
    return Cookies.remove(SESSIONID)
}

export function getUserInfo() {
    return Cookies.getJSON(USERINFO)
}

export function setUserInfo(data) {
    return Cookies.set(USERINFO, data)
}

export function removeUserInfo() {
    return Cookies.remove(USERINFO)
}

export function getPermission() {
    return Cookies.getJSON(PERMISSION)
}

export function setPermission(data) {
    return Cookies.set(PERMISSION, data)
}

export function removePermission() {
    return Cookies.remove(PERMISSION)
}

