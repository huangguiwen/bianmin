import { login, logout, getInfo } from '@/api/login'
import { getAuthKey, setAuthKey, removeAuthKey, getSessionId, setSessionId, getUserInfo, setUserInfo, setPermission,getPermission } from '@/utils/auth'
// import axios from 'axios' 

const user = {
  state: {
    authKey: getAuthKey(),
    sessionId: getSessionId(),
    userInfo: getUserInfo()
  },

  mutations: {
    SET_AUTHKEY: (state, authKey) => {
      state.authKey = authKey
    },
    SET_SESSIONID: (state, sessionId) => {
      state.sessionId = sessionId
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },

  actions: {
    // 登录
    Login({ dispatch, commit, getters }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(async response => {
          const data = response.data
          setAuthKey(data.authKey)
          commit('SET_AUTHKEY', data.authKey)
          setSessionId(data.sessionId)
          commit('SET_SESSIONID', data.sessionId)
          setUserInfo(data.userInfo)
          commit('SET_USERINFO', data.userInfo)
          await dispatch('generateRoutes')
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.authKey).then(response => {
          const data = response.data
          if (data.userInfo && data.userInfo.length > 0) { // 验证返回的userInfo是否是一个非空数组
            commit('SET_USERINFO', data.userInfo)
          } else {
            reject('getInfo: userInfo must be a non-null array !')
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.authKey).then(() => {
          commit('SET_AUTHKEY', '')
          commit('SET_USERINFO', [])
          removeAuthKey()
          resolve()
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_AUTHKEY', '')
        commit('SET_USERINFO', [])
        removeAuthKey()
        resolve()
      })
    }
  }
}

export default user
