import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import './assets/css/global.css'

// 引入iconfont
import './assets/font/iconfont.css'

// 导入axios
import axios from 'axios'
// 挂载
Vue.prototype.$http = axios
axios.defaults.baseURL="http://localhost:9000"


Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
