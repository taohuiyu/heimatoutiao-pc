import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入elementui模块和注册
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'// 页面样式初始化
// 1. axio安装全局配置
import axios from 'axios'
// 2.引入axios 配置baseUrl
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 3.在main.js中引用 并赋值给Vue的原型属性
Vue.prototype.$axios = axios // axios赋值给全局属性
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
