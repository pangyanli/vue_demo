/*
  入口JS：创建vue实例对象
*/
import Vue from 'vue'
import App from './App.vue'  // 1、引入组件
import './base.css'  // 引入base样式

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { // 2、将组件映射成标签
    App
  },
  // 3、使用组件标签
  template: '<App />'
})

