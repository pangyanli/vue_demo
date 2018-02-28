<template>
  <!-- 有四种情况：1、输入关键字之前显示：请输入关键字搜索 ；2、点击搜索了有一个Loading加载的过程
    3、搜索成功，显示相关内容；4、搜索失败：提示请求失败
  -->
 <div>
   <h2 v-if="firstNew">请输入关键字搜索</h2>
   <h2 v-if="loading">Loading...</h2>
   <h2 v-if="errorMsg">{{errorMsg}}</h2>
   <div class="row">
     <div class="card" v-for="(user, index) in users" :key="index">
       <a :href="user.url" target="_blank">
         <img :src="user.avatar" style='width: 100px'/>
       </a>
       <p class="card-text">{{user.name}}</p>
     </div>
   </div>
 </div>
</template>

<script>
  import PubSub from 'pubsub-js'
  import axios from 'axios'
  export default{
    data(){
      return {
        firstNew: true,
        loading: false,
        errorMsg: '',
        users: []
      }
    },
    mounted () {
      //订阅消息,消息名为 search
      // 函数一调用就需要发送新的ajax请求
      PubSub.subscribe('search',(message,searchName) => {
        // 发请求前先更新状态
        this.firstNew = false
        this.loading = true
        this.users = []
        this.errorMsg = ''
        // 发送请求
        const url = `https://api.github.com/search/users?q=${searchName}` // 注意拼串
        axios.get(url)
          .then(response => {// 请求成功
            const result = response.data
            this.loading = false
            // 因为items里面包含的东西很多，而且与我们定义的变量不一致，所以需要进一步处理才能赋值给users
            this.users = result.items.map(item => ({ // 注意返回一个对象，所以要加小括号包大括号
              url: item.html_url,
              avatar:item.avatar_url ,
              name:item.login
            }))
          })
          .catch(error => {// 请求失败
            this.loading = false
            this.errorMsg = '抱歉，您输入的内容没有搜索到！'
          })

      })
    }
  }
</script>

<style>
  .card {
    float: left;
    width: 33.333%;
    padding: .75rem;
    margin-bottom: 2rem;
    border: 1px solid #efefef;
    text-align: center;
  }

  .card > img {
    margin-bottom: .75rem;
    border-radius: 100px;
  }

  .card-text {
    font-size: 85%;
  }

</style>
