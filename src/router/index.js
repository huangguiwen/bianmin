import Vue from 'vue'
import Router from 'vue-router'


// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import login from './login'
import bianMinManage from './bianMinManage'
import merchantManage from './merchantManage'
import fundsManage from './fundsManage'
import systemConfig from './systemConfig'
import operationManage from './operationManage'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
    { 
        path: '/login', 
        component: () => import('@/views/login/index'), 
        hidden: true 
    },{ 
        path: '/404', 
        component: () => import('@/views/404'), 
        hidden: true 
    },{
        path: '/',
        component: Layout,
        redirect: '/home',
        hidden: true,
        children: [{
            path: 'home',
            meta: {title: '首页'},
            component: () => import('@/views/home/index')
        }]
    }
]

export const asyncRouterMap = [
    { 
        path: '*',
        redirect: '/404', 
        hidden: true 
    },
    login,
    bianMinManage,
    merchantManage,
    fundsManage,
    operationManage,
    systemConfig
]

constantRouterMap.forEach(router => {
    router.fullPath = router.path
    setChildFullPath(router)
})

function setChildFullPath(parent) {
    if (!parent.children || parent.children.length === 0) {
      return false
    }
    parent.children.forEach(item => {
      item.fullPath = parent.fullPath + '/' + item.path
      setChildFullPath(item)
    })
}

const router = new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
  })

export default router

