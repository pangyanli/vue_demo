<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input type="text" placeholder="enter the name you search" v-model="searchName"/>
      <button @click="search">Search</button>
    </div>
  </section>
</template>

<script>
  import PubSub from 'pubsub-js'
  export default{
    data(){
      return {
        searchName: ''
      }
    },
    methods: {
      search(){
        //检查输入是否合法
        const searchName = this.searchName
        if(searchName){
          // 合法，则发布消息(search),参数一是消息名，参数二是数据
          PubSub.publish('search',searchName)
        }

      }
    }
  }
</script>

<style>

</style>
