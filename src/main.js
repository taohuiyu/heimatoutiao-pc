import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入elementui模块和注册
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'// 引入样式
import './styles/index.less'
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
