/*
  入口JS文件：创建vue实例对象
 */

import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'

//声明使用插件（即安装插件）
Vue.use(VueResource) // 内部会调用install方法安装插件，给vm/组件对象提供$http属性（常用方法get/post）

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App />'
})
