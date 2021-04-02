import Vue from 'vue'
// 配置ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
