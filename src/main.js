import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
// 封装request模块
import {request} from './network/request'
request({
  url: '/home/multidata'
}).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
