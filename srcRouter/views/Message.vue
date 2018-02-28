<template>
 <div>
   <ul>
     <li v-for="(message, index) in messages" :key="index">
       <router-link :to="`/home/message/detail/${message.id}`">{{message.title}}</router-link>
       <button @click="pushShow(message.id)">push查看</button>
       <button @click="replaceShow(message.id)">replace查看</button>
     </li>
   </ul>
   <button @click="$router.back()">返回</button>
   <router-view></router-view>
 </div>
</template>

<script>
  export default{
    data(){
      return {
        messages: []
      }
    },
    mounted(){
      const  messages = [
        {id:1, title: 'Message001'},
        {id:2, title: 'Message002'},
        {id:3, title: 'Message003'}
      ]
      // 模拟异步获取数据
      setTimeout(() => {  // 注意必须使用箭头函数，否则this的指向就会出问题
        this.messages = messages
      },1000)
    },
    methods: {
      pushShow(id){
        this.$router.push(`/home/message/detail/${id}`)
      },
      replaceShow(id){
        this.$router.replace(`/home/message/detail/${id}`)
      }
    }
  }
</script>

<style>

</style>
