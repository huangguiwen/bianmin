import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import { getAuthKey } from '@/utils/auth'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import '@/icons' // icon
import '@/permission' // permission control
import '@/utils'
import '@/filters'
import '@/mock'

Vue.use(ElementUI)

Vue.config.productionTip = false

if(getAuthKey()){
    store.dispatch('generateRoutes')
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
