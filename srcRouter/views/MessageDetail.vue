<template>
  <ul>
    <li>id: {{$route.params.id}}</li>
    <li>title: {{detailMessage.title}}</li>
    <li>content: {{detailMessage.content}}</li>
  </ul>
</template>

<script>
  const allMessges = [
    {id:1, title: 'Message001',content: 'detail0001'},
    {id:2, title: 'Message002',content: 'detail0002'},
    {id:3, title: 'Message003',content: 'detail0003'}
    ]
  export default{
    data(){
      return {
        detailMessage:{}
      }
    },
    mounted() {  // 一上来就要初始化数据，但是mouted只执行一次,所以点击第一个可以正常显示，再点击内容就无法更新了
      // 得到请求参数中的id
      // 注意这里取出来的id是字符串，必须要转换成数字了，才能和下面的message.id做比较
      const id = this.$route.params.id * 1
//      this.detailMessage = allMessges.find(message => message.id === id)
      this.showUI(id)
    },
    watch: {
      // 因为mouted只会执行一次，而每次数据变化$route都会变化，所以监视$route，更新数据
      $route: function(newValue){
        const id = newValue.params.id * 1
//        this.detailMessage = allMessges.find(message => message.id === id)
        this.showUI(id)
      }
    },
    methods: {
      // 因为两处都用到这些代码，所以可以封装这些代码，方便复用
      showUI(id){
        const message = allMessges.find(message => message.id === id)
        // 更新数据
        this.detailMessage = message
      }
    }


  }
</script>

<style>

</style>
