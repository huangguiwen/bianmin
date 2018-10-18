import { asyncRouterMap, constantRouterMap } from '@/router'
import router from '@/router'
import permissionResolver from 'utils/permissionResolver'
import axios from 'axios' 

const permission = {
    state: {
        routers: constantRouterMap,
        routersAdded: false,
        addRouters: [],
        roles: []
    },
    mutations: {
        setRoutes: (state, routers) => {
            state.addRouters = routers
            state.routers = constantRouterMap.concat(routers)
            if (!state.routersAdded) {
                router.addRoutes(state.routers)
                state.routersAdded = true
            }
        },
        set_roles: (state, roles) => {
          state.roles = roles
        }
    },
    actions:{
        generateRoutes({ commit }) {
            return new Promise(resolve => {
                axios.post("/admin/permission").then(res=>{
                    commit('set_roles', res.data)
                    asyncRouterMap.forEach(router => {
                        router.fullPath = router.path
                        checkChildPerm(res.data, router)
                        setChildFullPath(router)
                    })
                    commit("setRoutes", asyncRouterMap)
                })
                resolve()
            })
        }
    }
}

function setChildFullPath(parent) {
    if (!parent.children || parent.children.length === 0) {
        return false
    }
    let allChildHidden = true
    parent.children.forEach(item => {
        item.fullPath = parent.fullPath + '/' + item.path
        setChildFullPath(item)
        if(!item.hidden) {
            allChildHidden = false
        }
    })
    //如果所有children 都 hidden 了,隐藏自身
    if(allChildHidden){
        parent.hidden = true
    }
}
  
  
  
function checkChildPerm(userPerms, parent) {
    if (!parent.children || parent.children.length === 0) {
        //获取出菜单对应的权限
        if(parent.meta && parent.meta.perm) {
            let menuPerm = parent.meta.perm
            let match = permissionResolver.resolve(menuPerm, userPerms)
            parent.hidden = (parent.hidden===true?true: !match)
        }
        return
    }
    parent.children.forEach(item => {
        checkChildPerm(userPerms,item)
    })
}

export default permission