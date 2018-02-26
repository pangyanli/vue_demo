/*
  入口JS，创建vue实例对象
*/
import Vue from 'vue'
import App from './app.vue'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App />'
})
