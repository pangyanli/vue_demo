/*
  入口JS文件：创建vue实例对象
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router'

new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App />',
  router  // 注册路由器
})
