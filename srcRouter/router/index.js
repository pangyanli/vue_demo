/*
 路由器对象模块
*/
import Vue from 'vue'
import VueRouter from 'vue-router'

import About from '../views/About.vue'
import Home from '../views/Home.vue'
import News from '../views/News.vue'
import Message from '../views/Message.vue'
import MessageDetail from '../views/MessageDetail.vue'

// 声明使用插件
Vue.use(VueRouter)

// 创建路由
export default new VueRouter({
  // 配置多个路由
  routes: [
    { // 一般路由
      path: '/about',
      component: About
    },
    { // 一般路由
      path: '/home',
      component: Home,
      // 创建子路由
      children: [
        { // 一般路由
          path: '/home/news',  // 写法一
          component: News
        },
        { // 一般路由
          path: 'message',  // 写法二
          component: Message,
          children:[
            {
              // ：是占位符，id是标识
              path: 'detail/:id',
              component: MessageDetail
            }
          ]
        },
        { // 自动跳转到指定路由,默认上来显示该路由
          path: '/',
          redirect: 'news'
        }
      ]
    },
    { // 自动跳转到指定路由，默认上来显示该路由
      path: '/',
      redirect: '/about'
    }

  ]
})

